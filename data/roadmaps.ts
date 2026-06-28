import type { CtaType, FinalCta, Roadmap, RoadmapType } from "@/types/roadmap";

const careerAgentUrl = process.env.NEXT_PUBLIC_AFFILIATE_CAREER_AGENT_URL ?? "https://example.com/career-agent";
const sideBusinessUrl = process.env.NEXT_PUBLIC_AFFILIATE_SIDE_BUSINESS_URL ?? "https://example.com/side-business";

export const finalCtas: Record<CtaType, FinalCta> = {
  career_agent: {
    type: "career_agent",
    button: "あなたの場合はどうなのか、無料で相談してみる",
    note: "今すぐ転職する必要はありません。まずは、自分に合う働き方があるのかを知るところから始めてみましょう。",
    url: careerAgentUrl,
  },
  side_business: {
    type: "side_business",
    button: "あなたに合う収入の増やし方を無料で相談してみる",
    note: "今の仕事を続けながら、収入を増やす方法があるのか。まずは話を聞いてみるだけでも大丈夫です。",
    url: sideBusinessUrl,
  },
};

export const roadmaps: Record<RoadmapType, Roadmap> = {
  stability: {
    type: "stability",
    title: "今の仕事を続けながら、将来の安心を増やすプラン",
    resultName: "安定準備タイプ",
    accent: "from-emerald-400 to-sky-500",
    defaultCtaType: "side_business",
    tendency:
      "今の仕事を大きく変えるよりも、生活の安定を保ちながら選択肢を増やす方が進みやすい状態です。",
    description:
      "今の仕事はそこまで嫌ではないけれど、収入や将来に少し不安がある人向けの進め方です。",
    steps: [
      {
        title: "今の仕事を続けながら収入を増やす方法を知る",
        body:
          "今の生活を大きく変えなくても、収入を増やす方法はあります。まずは「どんな選択肢があるのか」を知ることから始めてみましょう。",
      },
      {
        title: "これからの時代に必要なスキルを知る",
        body:
          "少しずつでも知識を増やしておくことで、将来選べる働き方は確実に増えていきます。",
      },
      {
        title: "今の働き方を一度見直してみる",
        body:
          "今の会社を辞めるかどうかではなく、「今の環境が本当に自分に合っているのか」を整理してみましょう。",
      },
      {
        title: "小さな行動を一つ始める",
        body:
          "未来は、大きな決断ではなく、小さな行動の積み重ねで変わっていきます。",
      },
      {
        title: "半年後の自分を想像してみる",
        body: "今より少し安心して働けている自分をイメージしてみましょう。",
      },
    ],
  },
  workstyle: {
    type: "workstyle",
    title: "今よりもっと自分に合う働き方を見つけるプラン",
    resultName: "働き方見直しタイプ",
    accent: "from-sky-400 to-blue-600",
    defaultCtaType: "career_agent",
    tendency:
      "今の働き方に違和感があり、収入や評価、自分に合う環境を見直すと判断しやすい状態です。",
    description:
      "今の仕事に違和感がある、年収や評価に不満がある、自分に合う働き方を知りたい人向けの進め方です。",
    steps: [
      {
        title: "今より自分に合う働き方があるか知る",
        body:
          "今すぐ転職する必要はありません。まずは「他にも選択肢があるのか」を知るだけでも気持ちは大きく変わります。",
      },
      {
        title: "自分の強みを整理する",
        body: "自分がどんな環境で力を発揮できるのかを整理してみましょう。",
      },
      {
        title: "将来も評価されるスキルを知る",
        body:
          "これからの時代に必要とされる力を知っておくことで、自信を持って選択できるようになります。",
      },
      {
        title: "収入を増やす方法も考えてみる",
        body:
          "転職だけが答えではありません。働き方の選択肢を広げることで、焦らず決断できるようになります。",
      },
      {
        title: "納得できる働き方を選ぶ",
        body: "「なんとなく辞める」のではなく、「納得して選ぶ」ことが一番大切です。",
      },
    ],
  },
  organize: {
    type: "organize",
    title: "何から始めればいいか整理するプラン",
    resultName: "方向性整理タイプ",
    accent: "from-violet-400 to-sky-500",
    defaultCtaType: "career_agent",
    tendency:
      "将来への不安や情報の多さで、最初の一歩を決めにくい状態です。まず順番を整理することが役に立ちます。",
    description:
      "将来が漠然と不安、何を始めればいいか分からない、転職か副業かも決められていない人向けの進め方です。",
    steps: [
      {
        title: "今の自分を整理する",
        body: "焦る必要はありません。まずは今の状況を整理することが最初の一歩です。",
      },
      {
        title: "将来の選択肢を知る",
        body: "転職、副業、学び。まずは「どんな選択肢があるのか」を知ることから始めましょう。",
      },
      {
        title: "小さく試してみる",
        body:
          "いきなり大きく変える必要はありません。少しずつ経験を増やしていくことが大切です。",
      },
      {
        title: "自分に合う方法を見つける",
        body: "人によって正解は違います。だからこそ、自分に合う進め方を探していきましょう。",
      },
      {
        title: "一歩踏み出す準備をする",
        body:
          "未来は、何か特別な人だけが変えられるものではありません。小さな一歩を積み重ねた人から変わっていきます。",
      },
    ],
  },
};
