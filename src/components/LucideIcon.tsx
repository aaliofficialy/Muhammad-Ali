import React from "react";
import { 
  Globe, 
  ShieldAlert, 
  Cpu, 
  TrendingUp, 
  Users, 
  BookOpen, 
  Briefcase, 
  Shield, 
  Linkedin, 
  Twitter, 
  Github, 
  MapPin, 
  Star, 
  ArrowRight, 
  ArrowUpRight, 
  Check, 
  Menu, 
  X, 
  Calendar, 
  Award, 
  Lock, 
  Sparkles,
  PhoneCall,
  ExternalLink,
  DollarSign
} from "lucide-react";

interface LucideIconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function LucideIcon({ name, className = "", size = 20 }: LucideIconProps) {
  switch (name) {
    case "Globe":
      return <Globe className={className} size={size} />;
    case "Computer":
    case "Cpu":
      return <Cpu className={className} size={size} />;
    case "TrendingUp":
      return <TrendingUp className={className} size={size} />;
    case "UsersShared":
    case "Users":
      return <Users className={className} size={size} />;
    case "BookOpen":
      return <BookOpen className={className} size={size} />;
    case "Briefcase":
      return <Briefcase className={className} size={size} />;
    case "Shield":
      return <Shield className={className} size={size} />;
    case "Linkedin":
      return <Linkedin className={className} size={size} />;
    case "Twitter":
      return <Twitter className={className} size={size} />;
    case "Github":
      return <Github className={className} size={size} />;
    case "MapPin":
      return <MapPin className={className} size={size} />;
    case "Star":
      return <Star className={className} size={size} />;
    case "ArrowRight":
      return <ArrowRight className={className} size={size} />;
    case "ArrowUpRight":
      return <ArrowUpRight className={className} size={size} />;
    case "Check":
      return <Check className={className} size={size} />;
    case "Menu":
      return <Menu className={className} size={size} />;
    case "X":
      return <X className={className} size={size} />;
    case "Calendar":
      return <Calendar className={className} size={size} />;
    case "Award":
      return <Award className={className} size={size} />;
    case "Lock":
      return <Lock className={className} size={size} />;
    case "Sparkles":
      return <Sparkles className={className} size={size} />;
    case "PhoneCall":
      return <PhoneCall className={className} size={size} />;
    case "ExternalLink":
      return <ExternalLink className={className} size={size} />;
    case "DollarSign":
      return <DollarSign className={className} size={size} />;
    default:
      return <Sparkles className={className} size={size} />;
  }
}
