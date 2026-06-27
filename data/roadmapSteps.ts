import type { RoadmapStep, StepCategory } from "@/types/roadmap";

const serviceUrls: Record<"career_agent" | "side_business", string> = {
  career_agent: process.env.NEXT_PUBLIC_AFFILIATE_CAREER_AGENT_URL ?? "https://example.com/career-agent",
  side_business: process.env.NEXT_PUBLIC_AFFILIATE_SIDE_BUSINESS_URL ?? "https://example.com/side-business",
};

export const roadmapSteps: Record<StepCategory, RoadmapStep> = {
  career_agent: {
    id: "career_agent",
    title: "転職無料相談で市場価値を知る",
    time: "約3分",
    cost: "無料相談・無料診断",
    cta: "無料で市場価値を相談する",
    url: serviceUrls.career_agent,
    description:
      "今の自分が外の市場でどう見られるかを知ることで、転職するかどうかを落ち着いて判断しやすくなります。",
    purpose: "転職するかを決める前に、自分の市場価値を知る",
    benefits: ["適正年収の目安", "今の経験が活かせる職種", "転職すべきかの判断材料", "今の会社に残る場合の比較軸"],
    recommendedFor: ["年収や評価にモヤモヤがある", "転職するかはまだ決めきれていない", "まず客観的な材料がほしい"],
    reason:
      "最初に市場価値を知っておくと、転職だけでなく副業や学習を選ぶ場合も、今の自分に必要な準備が見えやすくなります。",
    futureOptions: ["必要ならAI学習で仕事の効率を上げる", "資格や専門スキルで市場価値を補強する", "本で転職や働き方の考え方を整理する"],
  },
  side_business: {
    id: "side_business",
    title: "副業スクールで選択肢を増やす",
    time: "約5分",
    cost: "無料相談・無料診断",
    cta: "無料で副業について相談する",
    url: serviceUrls.side_business,
    description:
      "会社以外の収入源を小さく作る選択肢を知ることで、今すぐ転職しなくても将来への安心感を増やしやすくなります。",
    purpose: "会社以外の収入源を作る入口を知る",
    benefits: ["自分に合う副業ジャンル", "月数万円を目指す流れ", "本業と両立する考え方", "副業を始める前の注意点"],
    recommendedFor: ["会社だけに頼ることに不安がある", "副業に興味はあるが何から始めるか迷う", "まず小さく選択肢を増やしたい"],
    reason:
      "副業は大きく稼ぐことより、自分に合う選択肢を知るところから始めると続けやすくなります。今の働き方を変えずに、未来の余白を作りやすい一歩です。",
    futureOptions: ["生成AIを使って作業効率を上げる", "必要な資格や専門スキルを後から学ぶ", "本でお金や副業の基礎を整理する"],
  },
  learn_ai: {
    id: "learn_ai",
    title: "生成AIでできることを知る",
    time: "約10分",
    cost: "無料情報からでOK",
    description:
      "すぐに講座へ申し込む必要はありません。まず、仕事や副業で生成AIをどう使えるのかを知るだけでも、選択肢の見え方が変わります。",
    purpose: "仕事・副業・学習に使える道具を知る",
    benefits: ["仕事の効率化のヒント", "副業に活かせる作業の例", "今後学ぶべきことの整理"],
    recommendedFor: ["新しいスキルに関心がある", "副業や転職の前に準備したい", "まず情報収集から始めたい"],
    reason:
      "生成AIは転職先を決めるものでも、副業を始めるものでもありません。ただ、選択肢を広げるための道具として知っておくと、次の判断がしやすくなります。",
    futureOptions: ["必要なら副業スクールで実践方法を相談する", "市場価値を確認して仕事への活かし方を考える", "本や無料記事で基礎を整理する"],
  },
  read_books: {
    id: "read_books",
    title: "本や無料情報で考え方を整理する",
    time: "約15分",
    cost: "低コスト・無料情報からでOK",
    description:
      "まだ相談や診断に進む気持ちが強くない場合は、まず本や無料情報で考え方を整理するだけでも十分です。",
    purpose: "焦らず自分のペースで判断材料を増やす",
    benefits: ["キャリアやお金の考え方", "副業を始める前の注意点", "転職相談前に整理しておくこと"],
    recommendedFor: ["まだ申し込みや相談には抵抗がある", "まず自分で考えたい", "情報を整理してから動きたい"],
    reason:
      "今すぐ誰かに相談するより、自分の中で考えを整える時間が役に立つ場合があります。小さく情報を入れるだけでも、次の一歩は選びやすくなります。",
    futureOptions: ["必要だと感じたら市場価値を相談する", "副業への関心が強くなったらスクールで相談する", "生成AIや資格などの学びを検討する"],
  },
  organize_options: {
    id: "organize_options",
    title: "転職と副業の優先順位を整理する",
    time: "約5分",
    cost: "無料でできる",
    description:
      "転職と副業のどちらが正解かをすぐに決める必要はありません。まず、今の悩みが収入・働き方・時間・安心感のどれに近いか整理します。",
    purpose: "自分に合う順番を決める前の準備をする",
    benefits: ["今の悩みの整理", "転職向きか副業向きかの仮説", "相談前に確認したいこと"],
    recommendedFor: ["選択肢が多くて決めきれない", "いきなり外部サービスへ進むのは早いと感じる", "まず頭の中を整理したい"],
    reason:
      "迷っている状態で申し込むより、先に優先順位を整理した方が納得して行動しやすくなります。ここは行動前の準備として置いています。",
    futureOptions: ["市場価値を確認して本業の可能性を見る", "副業スクールで会社以外の選択肢を見る", "必要なら本や無料情報で考え方を補強する"],
  },
};
