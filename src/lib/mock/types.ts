export type UserRole = "Guest" | "Member" | "Admin";

export interface DietOption {
  id: string;
  label: string;
}

export interface VideoRecipe {
  id: string;
  title: string;
  duration: string;
  author: string;
  authorHandle: string;
  authorInitials: string;
  verified: boolean;
  views: string;
  rating: number;
  reviewsCount?: string;
  kcal: number;
  time: string;
  difficulty: "Easy" | "Medium" | "Advanced";
  cuisine: string;
  category: string;
  image?: string;
  description: string;
  ingredients: { name: string; amount: string }[];
  steps: string[];
  aiSummary: {
    durationNote: string;
    keyIngredients: string[];
    speechTranscript: string;
  };
  comments: CommentItem[];
}

export interface CommentItem {
  id: string;
  author: string;
  authorInitials: string;
  verified?: boolean;
  content: string;
  timestamp: string;
  votes: number;
  userVoted?: "up" | "down" | null;
}

export interface ForumPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorHandle: string;
  authorInitials: string;
  verified: boolean;
  category: string;
  tags: string[];
  votes: number;
  userVoted?: "up" | "down" | null;
  commentsCount: number;
  timestamp: string;
  comments: CommentItem[];
}

export interface VeganPlace {
  id: string;
  name: string;
  district: string;
  address: string;
  distance: string;
  rating: number;
  reviewsCount: number;
  type: "Vegan" | "Vegetarian" | "Grocer" | "Café";
  openingHours: string;
  popularDish: string;
  x: number; // percentage on SVG map
  y: number; // percentage on SVG map
}

export interface TrendingTopic {
  tag: string;
  posts: string;
}

export interface MealItem {
  name: string;
  kcal: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  time: string;
  inSeason?: boolean;
}

export interface DayPlan {
  day: string; // "Monday", etc.
  shortDay: string; // "Mon", etc.
  date: string;
  breakfast: MealItem;
  lunch: MealItem;
  dinner: MealItem;
  totalKcal: number;
  targetKcal: number;
  actualKcalWearable?: number;
}

export interface DetectedIngredient {
  id: string;
  name: string;
  freshness: "Fresh" | "Use soon";
  category: string;
  confidence: number;
}

export interface SubstitutionItem {
  original: string;
  substitute: string;
  reason: string;
  ratio: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  substitution?: SubstitutionItem;
}

export interface AdminStat {
  label: string;
  value: string;
  change: string;
  positive: boolean;
}

export interface AdminMember {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  initials: string;
  videoCount: number;
  postCount: number;
  joinedDate: string;
  status: "Active" | "Suspended" | "Pending";
}

export interface AdminContentItem {
  id: string;
  title: string;
  type: "Blog" | "Video" | "Comment";
  author: string;
  date: string;
  reports: number;
  status: "Published" | "Under Review" | "Removed";
}

export interface ModerationItem {
  id: string;
  contentId: string;
  contentType: "Post" | "Video" | "Comment";
  author: string;
  snippet: string;
  flagReasons: ("Misinformation" | "Spam" | "Dangerous claim" | "Offensive" | "Inappropriate")[];
  aiConfidence: number;
  reportedAt: string;
  status: "Pending" | "Approved" | "Removed" | "Escalated";
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  type: "Food Type" | "Recipe Category";
  recipeCount: number;
  status: "Active" | "Archived";
}

export interface AIModelMetric {
  id: string;
  name: string;
  version: string;
  accuracy: number;
  latencyMs: number;
  dailyQueries: number;
  status: "Optimal" | "Degraded" | "Maintenance";
  overrideMode: boolean;
}
