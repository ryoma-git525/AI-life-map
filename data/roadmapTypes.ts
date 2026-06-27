import type { RoadmapType, RoadmapTypeConfig } from "@/types/roadmap";

export const roadmapTypes: Record<RoadmapType, RoadmapTypeConfig> = {
  "market-value": {
    type: "market-value",
    resultName: "市場価値アップタイプ",
    firstStep: "転職無料相談で市場価値を知る",
    accent: "from-sky-400 to-blue-500",
    diagnosisComment:
      "今回の回答では、今すぐ大きく環境を変えるよりも、まず自分の市場価値を知ることから始めるのがおすすめです。理由は、転職・副業・学習のどれを選ぶ場合でも、外の基準を知っておくと判断しやすくなるからです。",
    reason:
      "まず市場価値を知り、そのうえで会社以外の収入源も検討する順番にしています。転職を決めるためではなく、選択肢を落ち着いて比較するためのロードマップです。",
    order: ["career_agent", "side_business", "learn_ai", "read_books"],
  },
  "ai-skill": {
    type: "ai-skill",
    resultName: "選択肢アップデートタイプ",
    firstStep: "副業スクールで選択肢を増やす",
    accent: "from-violet-400 to-sky-400",
    diagnosisComment:
      "今回の回答では、新しいスキルや働き方への関心が見られました。まず副業の選択肢を知ることで、今の仕事を続けながら未来の可能性を広げやすくなります。その後、市場価値を確認すると、転職するかどうかも判断しやすくなります。",
    reason:
      "最初に副業スクールで選択肢を広げ、次に転職無料相談で市場価値を確認する順番にしています。学習や資格は、その後に必要に応じて選べば大丈夫です。",
    order: ["learn_ai", "side_business", "career_agent", "read_books"],
  },
  "side-business": {
    type: "side-business",
    resultName: "副業チャレンジタイプ",
    firstStep: "副業スクールで選択肢を増やす",
    accent: "from-emerald-400 to-teal-400",
    diagnosisComment:
      "今回の回答では、会社以外の収入源や自由度への関心が高く見られました。まず副業スクールで自分に合う始め方を知ると、今の生活を大きく変えずに選択肢を増やしやすくなります。",
    reason:
      "副業を先に知り、その後で市場価値を確認する順番にしています。会社以外の可能性と、今の自分の外部評価を両方見ることで判断材料が増えます。",
    order: ["side_business", "learn_ai", "career_agent", "read_books"],
  },
  career: {
    type: "career",
    resultName: "キャリア整理タイプ",
    firstStep: "転職無料相談で市場価値を知る",
    accent: "from-violet-400 to-indigo-400",
    diagnosisComment:
      "今回の回答では、選択肢が多くて最初の一歩が決めにくい状態が見られます。まず転職無料相談で市場価値を知ると、今の仕事を続ける場合も、副業を考える場合も、判断の軸が作りやすくなります。",
    reason:
      "最初に市場価値を知って現在地を確認し、次に副業スクールで会社以外の選択肢を見る順番にしています。迷いを減らすための順番です。",
    order: ["organize_options", "career_agent", "side_business", "read_books"],
  },
  stability: {
    type: "stability",
    resultName: "安定スキルアップタイプ",
    firstStep: "転職無料相談で市場価値を知る",
    accent: "from-blue-400 to-emerald-400",
    diagnosisComment:
      "今回の回答では、今の生活を守りながら選択肢を増やしたい気持ちが見られます。まず市場価値を知ることで、急に転職するのではなく、どんな準備をすれば安心につながるか整理しやすくなります。",
    reason:
      "市場価値を先に確認し、その後で副業という収入の選択肢を見る順番にしています。資格や読書は、必要な準備が見えてから選べば十分です。",
    order: ["read_books", "career_agent", "side_business", "learn_ai"],
  },
};
