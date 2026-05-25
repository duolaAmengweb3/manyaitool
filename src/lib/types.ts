export type ToolCategory =
  | "developer"
  | "text"
  | "design"
  | "converter"
  | "generator"
  | "calculator";

export interface ToolContent {
  whatIs: string;
  howToUse: string[];
  features: string[];
  faq: { question: string; answer: string }[];
  relatedSlugs: string[];
}

export interface ToolDefinition {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  category: ToolCategory;
  keywords: string[];
  content: ToolContent;
  component: React.ComponentType;
}
