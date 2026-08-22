export interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string; // lucide icon name
  category: "IT" | "Digital" | "Consulting";
  features: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: "IT / Dev" | "Crypto" | "Social Growth";
  metrics: { label: string; value: string }[];
  technologies: string[];
  image: string; // Unsplash URLs or high-quality abstract svgs
  link?: string;
  featured?: boolean;
}

export interface Skill {
  name: string;
  level: number; // 0-100 percentage
  category: "IT & Architecture" | "Crypto & Finance" | "Growth & Creation" | "AI & Tools";
  yearsOfExp: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  avatar: string;
  rating: number;
  content: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  thumbnail: string;
  publishDate: string;
  author: {
    name: string;
    avatar: string;
    title: string;
  };
  tags: string[];
  status: "draft" | "published";
  featured?: boolean;
  seoMetadata?: {
    title?: string;
    description?: string;
    keywords?: string;
  };
}

export interface Comment {
  id: string;
  articleId: string;
  author: string;
  content: string;
  createdAt: string;
}

export interface Ad {
  id: string;
  name: string;
  code: string;
  location: "homepage" | "sidebar" | "header" | "footer" | "between_articles" | "blog_pages" | "article_specific";
  articleId?: string; // If article_specific
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}
