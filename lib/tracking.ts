import type { CtaType, RoadmapType } from "@/types/roadmap";

type AffiliateClickPayload = {
  roadmapType: RoadmapType;
  ctaType: CtaType;
  targetUrl: string;
};

export function trackAffiliateClick(payload: AffiliateClickPayload) {
  console.log("affiliate_click", payload);
}
