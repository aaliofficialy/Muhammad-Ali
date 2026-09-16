import crypto from "node:crypto";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID;
const FIREBASE_CLIENT_EMAIL = process.env.FIREBASE_CLIENT_EMAIL;
const FIREBASE_PRIVATE_KEY = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

for (const [name, value] of Object.entries({ OPENAI_API_KEY, FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY })) {
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
}

const today = new Date().toISOString().slice(0, 10);
const topics = [
  "AI automation for small businesses",
  "practical data analysis and dashboard tips",
  "website conversion and UX improvements",
  "business process automation",
  "digital marketing and social growth",
  "Excel, Power BI, SQL or Python productivity",
  "AI tools and practical workflows",
  "cybersecurity and responsible technology",
];
const topic = topics[Math.floor(Math.random() * topics.length)];

const system = `You write concise, useful English content for a professional portfolio website focused on AI, data, web development, automation and digital growth. Create evergreen educational content, not clickbait. Do not invent statistics, client results, quotes, news events, product claims, or sources. If a factual claim could change over time, phrase it generally. Keep the tone professional and practical. Return ONLY valid JSON.`;
const user = `Create one daily website post for ${today}. Topic direction: ${topic}. Alternate naturally between Article, Story, Tip, Data Insight, AI Update, Business Insight, and How-To formats. Use this exact JSON shape: {"title":"...","slug":"...","content":"...","excerpt":"...","category":"...","tags":["...","...","..."],"seoTitle":"...","seoDescription":"..."}. Content should be 450-700 words, use plain text with short paragraphs and simple headings separated by blank lines. The category must be one of: Article, Story, Tip, Data Insight, AI Update, Business Insight, How-To. Make the post useful to a business owner or professional.`;

async function openAI() {
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-5-mini",
      input: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      max_output_tokens: 1800,
    }),
  });
  if (!response.ok) throw new Error(`OpenAI request failed: ${response.status} ${await response.text()}`);
  const data = await response.json();
  const text = data.output_text;
  if (!text) throw new Error("OpenAI returned no output text");
  return JSON.parse(text);
}

function createServiceAccountJwt() {
  const now = Math.floor(Date.now() / 1000);
  const header = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })).toString("base64url");
  const payload = Buffer.from(JSON.stringify({
    iss: FIREBASE_CLIENT_EMAIL,
    scope: "https://www.googleapis.com/auth/datastore",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  })).toString("base64url");
  const unsigned = `${header}.${payload}`;
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(unsigned);
  signer.end();
  return `${unsigned}.${signer.sign(FIREBASE_PRIVATE_KEY, "base64url")}`;
}

async function getAccessToken() {
  const assertion = createServiceAccountJwt();
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });
  if (!response.ok) throw new Error(`Google OAuth failed: ${response.status} ${await response.text()}`);
  const data = await response.json();
  return data.access_token;
}

const article = await openAI();
const token = await getAccessToken();
const documentId = `daily-${today}`;
const documentUrl = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/articles/${documentId}`;
const thumbnail = `https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80`;

const fields = {
  title: { stringValue: article.title },
  slug: { stringValue: article.slug || `${today}-${article.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}` },
  content: { stringValue: article.content },
  excerpt: { stringValue: article.excerpt },
  category: { stringValue: article.category },
  thumbnail: { stringValue: thumbnail },
  publishDate: { stringValue: new Date().toISOString() },
  author: { mapValue: { fields: {
    name: { stringValue: "Muhammad Ali" },
    avatar: { stringValue: "" },
    title: { stringValue: "AI, Data & Digital Solutions" },
  } } },
  tags: { arrayValue: { values: (article.tags || []).slice(0, 6).map((tag) => ({ stringValue: tag })) } },
  status: { stringValue: "published" },
  featured: { booleanValue: false },
  seoMetadata: { mapValue: { fields: {
    title: { stringValue: article.seoTitle || article.title },
    description: { stringValue: article.seoDescription || article.excerpt },
    keywords: { stringValue: (article.tags || []).join(", ") },
  } } },
};

const response = await fetch(documentUrl, {
  method: "PATCH",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ fields }),
});
if (!response.ok) throw new Error(`Firestore write failed: ${response.status} ${await response.text()}`);

console.log(`Published daily content: ${article.title} (${documentId})`);
