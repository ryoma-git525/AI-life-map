import { roadmapSteps } from "@/data/roadmapSteps";
import { roadmapTypes } from "@/data/roadmapTypes";
import type { RankedRoadmapStep, RoadmapType, StepCategory } from "@/types/roadmap";

const typeStepComments: Partial<Record<RoadmapType, Partial<Record<StepCategory, string>>>> = {
  "market-value": {
    career_agent:
      "今の会社だけで自分を判断していると、本来の可能性に気づきにくいことがあります。まずは比較材料を持つことから始めるのがおすすめです。",
    side_business:
      "市場価値を知ったあとに副業の選択肢を見ると、転職以外の収入アップ方法も落ち着いて比べやすくなります。",
  },
  "ai-skill": {
    side_business:
      "今のあなたは、本業を続けながら選択肢を増やす進め方が合いやすいタイプです。まず副業の入口を知るだけでも十分な一歩です。",
    career_agent:
      "副業の選択肢を見たあとに市場価値も確認すると、本業・副業のどちらを優先するか判断しやすくなります。",
  },
  "side-business": {
    side_business:
      "いきなり大きく稼ごうとする必要はありません。まずは自分に合う副業を知るだけでも十分な一歩です。",
    career_agent:
      "副業を考える場合でも、今の経験が外でどう評価されるかを知っておくと、本業とのバランスを決めやすくなります。",
  },
  career: {
    career_agent:
      "迷っている時ほど、まず現在地を知ることが役に立ちます。市場価値を知ると、転職するかどうかを急がず考えられます。",
    side_business:
      "市場価値を見たあとに副業の選択肢も知ると、会社に残る場合の安心材料も増やしやすくなります。",
  },
  stability: {
    career_agent:
      "安定を大切にする場合も、今の市場価値を知ることはリスクの低い情報収集になります。急いで転職する必要はありません。",
    side_business:
      "市場価値を確認したあとに副業を知ると、収入源を増やす選択肢も無理なく検討できます。",
  },
};

const defaultStepComments: Record<StepCategory, string> = {
  career_agent: "市場価値を知ると、今の場所に残る場合も、外を見る場合も判断材料が増えます。",
  side_business: "小さく試せる副業を知ることで、会社以外の選択肢を落ち着いて考えやすくなります。",
  learn_ai: "いきなり申し込む前に、生成AIで何ができるかを知るだけでも、仕事や副業の考え方が整理しやすくなります。",
  read_books: "まだ相談に進む気持ちが強くない時は、本や無料情報で考えを整えることも立派な一歩です。",
  organize_options: "選択肢が多い時は、転職と副業のどちらを先に見るか整理してから進む方が納得しやすくなります。",
};

const validStepCategories: StepCategory[] = ["career_agent", "side_business", "learn_ai", "read_books", "organize_options"];

export function getRoadmapType(type: string) {
  if (type in roadmapTypes) return roadmapTypes[type as RoadmapType];
  return null;
}

export function getRoadmapSteps(type: RoadmapType, plan?: string): RankedRoadmapStep[] {
  const config = roadmapTypes[type];
  const order = parsePlan(plan) ?? config.order;

  return order.map((category, index) => ({
    ...roadmapSteps[category],
    rank: index + 1,
    priority: getPriorityLabel(index),
    stepComment: typeStepComments[type]?.[category] ?? defaultStepComments[category],
  }));
}

function parsePlan(plan?: string) {
  if (!plan) return null;

  const seen = new Set<StepCategory>();
  const parsed = plan
    .split(",")
    .filter((value): value is StepCategory => validStepCategories.includes(value as StepCategory))
    .filter((value) => {
      if (seen.has(value)) return false;
      seen.add(value);
      return true;
    });

  return parsed.length > 0 ? parsed : null;
}

export function getPriorityLabel(index: number) {
  if (index === 0) return "★★★★★ 最優先";
  if (index === 1) return "★★★★☆ 次におすすめ";
  if (index === 2) return "★★★★☆ 余裕があれば";
  return "★★★☆☆ 参考に見る";
}
