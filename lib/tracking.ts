import type { RoadmapType, StepCategory } from "@/types/roadmap";

type AffiliateClickPayload = {
  roadmapType: RoadmapType;
  stepCategory: StepCategory;
  stepTitle: string;
  targetUrl: string;
};

export function trackAffiliateClick(payload: AffiliateClickPayload) {
  console.log("affiliate_click", payload);
}
