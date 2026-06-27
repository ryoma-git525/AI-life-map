export type RoadmapType = "market-value" | "ai-skill" | "side-business" | "career" | "stability";

export type StepCategory = "career_agent" | "side_business" | "learn_ai" | "read_books" | "organize_options";

export type RoadmapStep = {
  id: StepCategory;
  title: string;
  time: string;
  cost: string;
  cta?: string;
  url?: string;
  description: string;
  purpose: string;
  benefits: string[];
  recommendedFor: string[];
  reason: string;
  futureOptions: string[];
};

export type RoadmapTypeConfig = {
  type: RoadmapType;
  resultName: string;
  firstStep: string;
  diagnosisComment: string;
  reason: string;
  order: StepCategory[];
  accent: string;
};

export type RankedRoadmapStep = RoadmapStep & {
  rank: number;
  priority: string;
  stepComment: string;
};
