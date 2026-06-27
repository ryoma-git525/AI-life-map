export function getRoadmapPathForResult(resultKey: string) {
  const paths: Record<string, string> = {
    career_agent: "/roadmap/market-value",
    ai_school: "/roadmap/ai-skill",
    side_business: "/roadmap/side-business",
    coaching: "/roadmap/career",
    roadmap: "/roadmap/career",
    qualification: "/roadmap/stability",
  };

  return paths[resultKey] ?? "/roadmap/career";
}
