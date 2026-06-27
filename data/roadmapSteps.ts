import type { RoadmapStep, StepCategory } from "@/types/roadmap";

const affiliateUrls: Record<StepCategory, string> = {
  career_agent: process.env.NEXT_PUBLIC_AFFILIATE_CAREER_AGENT_URL ?? "https://example.com/career-agent",
  ai_school: process.env.NEXT_PUBLIC_AFFILIATE_AI_SCHOOL_URL ?? "https://example.com/ai-school",
  side_business: process.env.NEXT_PUBLIC_AFFILIATE_SIDE_BUSINESS_URL ?? "https://example.com/side-business",
  career_coaching: process.env.NEXT_PUBLIC_AFFILIATE_COACHING_URL ?? "https://example.com/career-coaching",
  qualification: process.env.NEXT_PUBLIC_AFFILIATE_QUALIFICATION_URL ?? "https://example.com/qualification",
  books: process.env.NEXT_PUBLIC_AFFILIATE_BOOKS_URL ?? "https://example.com/books",
};

export const roadmapSteps: Record<StepCategory, RoadmapStep> = {
  career_agent: {
    id: "career_agent",
    title: "市場価値を知る",
    time: "約3分",
    cost: "無料で確認可能",
    cta: "無料で市場価値を診断する",
    url: affiliateUrls.career_agent,
    description:
      "今の自分が市場でどう評価されるかを知ることで、転職するかどうかを落ち着いて判断しやすくなります。",
    purpose: "今の自分が市場でどう評価されるか知る",
    benefits: ["適正年収の目安", "向いている企業や職種", "今の市場価値", "転職すべきかの判断材料"],
    recommendedFor: ["今の年収や評価にモヤモヤがある", "転職するかはまだ決めきれていない", "まず客観的な材料がほしい"],
    reason:
      "転職する・しないを決める前に、外の基準を知っておくと、今の仕事を続ける場合も次に動く場合も判断しやすくなります。",
  },
  ai_school: {
    id: "ai_school",
    title: "AIを学ぶ",
    time: "約10分",
    cost: "無料情報あり",
    cta: "無料でAI学習について見る",
    url: affiliateUrls.ai_school,
    description:
      "AIを仕事や副業で使えるようになると、作業効率・収入源・転職の選択肢が広がる可能性があります。",
    purpose: "これからの仕事で使えるAI活用の入口を知る",
    benefits: ["AIでできること", "仕事での活用例", "学ぶ順番", "副業や転職への活かし方"],
    recommendedFor: ["AIに興味はあるけど何から始めるか迷う", "今の仕事の効率を上げたい", "将来に使えるスキルを持ちたい"],
    reason:
      "生成AIの使い方を知っておくと、仕事・副業・転職の判断材料にもなります。最初に使い方を知ると、選べる未来が増えやすくなります。",
  },
  side_business: {
    id: "side_business",
    title: "副業を知る",
    time: "約5分",
    cost: "無料診断あり",
    cta: "無料で副業について相談する",
    url: affiliateUrls.side_business,
    description:
      "会社以外の収入源を小さく作ることで、将来への不安を減らしやすくなります。",
    purpose: "自分に合う副業の選択肢を知る",
    benefits: ["向いている副業ジャンル", "月数万円を目指す流れ", "本業と両立する考え方", "無料で始める入口"],
    recommendedFor: ["会社以外の収入源に興味がある", "いきなり大きく始めるのは不安", "生活の安心感を少し増やしたい"],
    reason:
      "副業は大きく稼ぐことより、自分に合う選択肢を知るところから始めると続けやすくなります。",
  },
  career_coaching: {
    id: "career_coaching",
    title: "キャリアを整理する",
    time: "約5分",
    cost: "無料相談あり",
    cta: "無料相談してみる",
    url: affiliateUrls.career_coaching,
    description:
      "転職・副業・学習のどれを優先すべきか迷っている場合は、まず方向性を整理すると動きやすくなります。",
    purpose: "転職・副業・学習の優先順位を整理する",
    benefits: ["自分に合う働き方", "今やるべきこと", "後回しでいいこと", "相談するかの判断材料"],
    recommendedFor: ["選択肢が多くて決めきれない", "一人で考えると堂々巡りになる", "納得してから動きたい"],
    reason:
      "迷っている時ほど、情報を増やす前に選択肢を並べることが役に立ちます。順番が見えると、一歩目が軽くなります。",
  },
  qualification: {
    id: "qualification",
    title: "安定スキルを身につける",
    time: "約5分",
    cost: "無料資料あり",
    cta: "おすすめ講座を見る",
    url: affiliateUrls.qualification,
    description:
      "資格や専門スキルを身につけることで、今の仕事を続けながら選択肢を増やしやすくなります。",
    purpose: "安定を守りながら増やせるスキル候補を知る",
    benefits: ["将来に強いスキル", "資格や講座の候補", "無理のない学習ペース", "今の仕事への活かし方"],
    recommendedFor: ["大きなリスクは取りたくない", "着実に準備したい", "長く使えるスキルを身につけたい"],
    reason:
      "環境を急に変えなくても、スキルを増やすことで選択肢は広がります。安定を大切にしたい人に合う進め方です。",
  },
  books: {
    id: "books",
    title: "本で学ぶ",
    time: "約3分",
    cost: "低コスト",
    cta: "最初に読むべき本を見る",
    url: affiliateUrls.books,
    description:
      "いきなりスクールや相談に進むのが不安な人は、まず本で考え方や知識を整理するのもおすすめです。",
    purpose: "低コストで考え方や知識を整理する",
    benefits: ["最初に読むべき本", "キャリアやお金の考え方", "AIや副業の基礎知識", "自分のペースで学ぶ入口"],
    recommendedFor: ["まずは自分で考えたい", "相談や講座の前に基礎を知りたい", "低コストで始めたい"],
    reason:
      "本はすぐに大きな決断をしなくても始められる選択肢です。考え方を整理すると、次に見る情報を選びやすくなります。",
  },
};
