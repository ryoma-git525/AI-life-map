import type { RoadmapType, RoadmapTypeConfig } from "@/types/roadmap";

export const roadmapTypes: Record<RoadmapType, RoadmapTypeConfig> = {
  "market-value": {
    type: "market-value",
    resultName: "市場価値アップタイプ",
    firstStep: "市場価値を知る",
    accent: "from-sky-400 to-blue-500",
    diagnosisComment:
      "今回の回答では、今すぐ転職することよりも、まず自分の市場価値を知ることが重要だと判断しました。理由は、今後転職・副業・学習のどれを選ぶ場合でも、判断材料が増えるからです。比較できる材料があるだけで、今の会社に残るか、動くか、学ぶかを落ち着いて選びやすくなります。",
    reason:
      "今回の回答では、今すぐ大きく環境を変えるよりも、まず判断材料を増やすことが大切だと考えられます。そのため、このロードマップでは「市場価値を知る」ことから順番に並べています。",
    order: ["career_agent", "ai_school", "side_business", "books", "career_coaching", "qualification"],
  },
  "ai-skill": {
    type: "ai-skill",
    resultName: "AI活用スタートタイプ",
    firstStep: "AIを学ぶ",
    accent: "from-violet-400 to-sky-400",
    diagnosisComment:
      "今回の回答では、焦って大きく環境を変えるよりも、これからの仕事で使える武器を一つ持つことが大切だと判断しました。AIを学ぶことで、今の仕事の効率化だけでなく、副業や転職の選択肢も見えやすくなる可能性があります。",
    reason:
      "今回の回答では、未来に向けて使えるスキルを増やすことが、いちばん自然な一歩だと考えられます。まずAIの使い道を知り、その後に副業や市場価値へ広げる順番にしています。",
    order: ["ai_school", "books", "side_business", "career_agent", "qualification", "career_coaching"],
  },
  "side-business": {
    type: "side-business",
    resultName: "副業チャレンジタイプ",
    firstStep: "副業を知る",
    accent: "from-emerald-400 to-teal-400",
    diagnosisComment:
      "今回の回答では、会社を辞めることではなく、会社以外の選択肢を小さく持つことが大切だと判断しました。副業の可能性を知るだけでも、将来への不安は少し整理しやすくなります。まずは自分に合う形を知るところからで大丈夫です。",
    reason:
      "今回の回答では、収入や働き方の選択肢を少し増やしたい気持ちが見られます。大きく始めるより、まず自分に合う副業を知るところから並べています。",
    order: ["side_business", "ai_school", "books", "career_agent", "career_coaching", "qualification"],
  },
  career: {
    type: "career",
    resultName: "キャリア整理タイプ",
    firstStep: "キャリアを整理する",
    accent: "from-violet-400 to-indigo-400",
    diagnosisComment:
      "今回の回答では、何かを急いで始めることよりも、選択肢の順番を整理することが大切だと判断しました。転職・副業・学習のどれが正解かを一人で決めようとしなくても大丈夫です。まず並べて比べるだけでも、次の一歩は見えやすくなります。",
    reason:
      "今回の回答では、選択肢が多くて最初の一歩が決めにくい状態が見られます。まず方向性を整理し、その後に市場価値や学習を見ていく順番にしています。",
    order: ["career_coaching", "career_agent", "books", "ai_school", "side_business", "qualification"],
  },
  stability: {
    type: "stability",
    resultName: "安定スキルアップタイプ",
    firstStep: "安定スキルを身につける",
    accent: "from-blue-400 to-emerald-400",
    diagnosisComment:
      "今回の回答では、大きなリスクを取ることよりも、今の生活を守りながら選択肢を増やすことが大切だと判断しました。資格や専門スキルは、安心感を保ちながら未来の幅を広げる手段になります。急に変えるのではなく、準備から始める進み方が合っています。",
    reason:
      "今回の回答では、安心感を保ちながら未来に備えたい気持ちが見られます。まず安定につながるスキルを知り、次に本やAIで学び方を広げる順番にしています。",
    order: ["qualification", "books", "ai_school", "career_agent", "career_coaching", "side_business"],
  },
};
