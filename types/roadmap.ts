export type RoadmapType = "stability" | "workstyle" | "organize";

export type CtaType = "career_agent" | "side_business";

export type RoadmapStep = {
  title: string;
  body: string;
};

export type FinalCta = {
  type: CtaType;
  button: string;
  note: string;
  url: string;
};

export type Roadmap = {
  type: RoadmapType;
  title: string;
  resultName: string;
  description: string;
  tendency: string;
  steps: RoadmapStep[];
  defaultCtaType: CtaType;
  accent: string;
};

export type DiagnosisScores = {
  stability: number;
  workstyle: number;
  organize: number;
  career_agent: number;
  side_business: number;
};
