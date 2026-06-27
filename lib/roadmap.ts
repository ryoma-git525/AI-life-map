import { roadmapSteps } from "@/data/roadmapSteps";
import { roadmapTypes } from "@/data/roadmapTypes";
import type { RankedRoadmapStep, RoadmapType, StepCategory } from "@/types/roadmap";

const typeStepComments: Partial<Record<RoadmapType, Partial<Record<StepCategory, string>>>> = {
  "market-value": {
    career_agent:
      "今の会社だけで自分を判断していると、本来の可能性に気づきにくいことがあります。まずは比較材料を持つことから始めるのがおすすめです。",
  },
  "ai-skill": {
    ai_school:
      "今のあなたは、環境を変える前に「使える武器」を増やすと選択肢が広がりやすいタイプです。",
  },
  "side-business": {
    side_business:
      "いきなり大きく稼ごうとする必要はありません。まずは自分に合う副業を知るだけでも十分な一歩です。",
  },
  career: {
    career_coaching:
      "迷っている時ほど、一人で結論を出そうとせず、選択肢を並べて比較することが役に立ちます。",
  },
  stability: {
    qualification:
      "大きなリスクを取らずに未来を広げるなら、まずは資格や専門スキルを知ることが安心につながります。",
  },
};

const defaultStepComments: Record<StepCategory, string> = {
  career_agent: "市場価値を知ると、今の場所に残る場合も、外を見る場合も判断材料が増えます。",
  ai_school: "AIを知っておくと、仕事・学習・副業のどれにも応用しやすくなります。",
  side_business: "小さく試せる副業を知ることで、会社以外の選択肢を落ち着いて考えやすくなります。",
  career_coaching: "選択肢を整理すると、今すぐ動くことと、後で考えていいことを分けやすくなります。",
  qualification: "安定につながるスキルは、今の生活を守りながら未来の選択肢を増やす助けになります。",
  books: "まず本で考え方を知るだけでも、次に見るべき情報が選びやすくなります。",
};

export function getRoadmapType(type: string) {
  if (type in roadmapTypes) return roadmapTypes[type as RoadmapType];
  return null;
}

export function getRoadmapSteps(type: RoadmapType): RankedRoadmapStep[] {
  const config = roadmapTypes[type];

  return config.order.map((category, index) => ({
    ...roadmapSteps[category],
    rank: index + 1,
    priority: getPriorityLabel(index),
    stepComment: typeStepComments[type]?.[category] ?? defaultStepComments[category],
  }));
}

export function getPriorityLabel(index: number) {
  if (index === 0) return "★★★★★ 最優先";
  if (index === 1) return "★★★★☆ 次におすすめ";
  if (index === 2) return "★★★★☆ 余裕があれば";
  return "★★★☆☆ 参考に見る";
}
