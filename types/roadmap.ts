export type RoadmapType = "market-value" | "ai-skill" | "side-business" | "career" | "stability";

export type StepCategory =
  | "career_agent"
  | "ai_school"
  | "side_business"
  | "career_coaching"
  | "qualification"
  | "books";

export type RoadmapStep = {
  id: StepCategory;
  title: string;
  time: string;
  cost: string;
  cta: string;
  url: string;
  description: string;
  purpose: string;
  benefits: string[];
  recommendedFor: string[];
  reason: string;
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
