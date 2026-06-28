import type { CtaType, DiagnosisScores, RoadmapType } from "@/types/roadmap";
import { roadmaps } from "@/data/roadmaps";

type ScorePatch = Partial<DiagnosisScores>;

export type AnswerOption = {
  label: string;
  helper: string;
  scores: ScorePatch;
};

export type Question = {
  id: string;
  title: string;
  lead: string;
  options: AnswerOption[];
};

export type DiagnosisResult = {
  roadmapType: RoadmapType;
  ctaType: CtaType;
  resultName: string;
  summary: string;
  firstStep: string;
};

const baseScores: DiagnosisScores = {
  stability: 0,
  workstyle: 0,
  organize: 0,
  career_agent: 0,
  side_business: 0,
};

export const questions: Question[] = [
  {
    id: "current-work",
    title: "今の仕事について、いちばん近い気持ちは？",
    lead: "正解はありません。今の感覚に近いものを選んでください。",
    options: [
      {
        label: "続けられるけど、将来の収入が少し不安",
        helper: "生活を守りながら選択肢を増やしたい",
        scores: { stability: 2, side_business: 2 },
      },
      {
        label: "今の働き方が自分に合っているか気になる",
        helper: "環境や評価を一度見直したい",
        scores: { workstyle: 2, career_agent: 2 },
      },
      {
        label: "まだ何が不安なのか整理できていない",
        helper: "まず考える順番を決めたい",
        scores: { organize: 2, career_agent: 1 },
      },
    ],
  },
  {
    id: "income",
    title: "収入を増やすなら、どの形が自然ですか？",
    lead: "今すぐ実行する前提ではなく、気持ちとして近いものを選んでください。",
    options: [
      {
        label: "今の仕事を続けながら増やしたい",
        helper: "生活リズムを大きく崩したくない",
        scores: { stability: 2, side_business: 2 },
      },
      {
        label: "自分に合う職場なら年収アップも考えたい",
        helper: "働き方と評価の両方を見直したい",
        scores: { workstyle: 2, career_agent: 2 },
      },
      {
        label: "そもそも何から考えればいいか知りたい",
        helper: "選択肢を並べて整理したい",
        scores: { organize: 2 },
      },
    ],
  },
  {
    id: "risk",
    title: "今、大きな変化への抵抗感はありますか？",
    lead: "無理なく進めるために大切な質問です。",
    options: [
      {
        label: "かなりある。まずは小さく始めたい",
        helper: "安心できる範囲で準備したい",
        scores: { stability: 2, side_business: 1 },
      },
      {
        label: "納得できるなら環境を変えることも考えたい",
        helper: "判断材料があれば動けそう",
        scores: { workstyle: 2, career_agent: 2 },
      },
      {
        label: "変化よりも、まず自分の考えを整理したい",
        helper: "急がず順番を決めたい",
        scores: { organize: 2, career_agent: 1 },
      },
    ],
  },
  {
    id: "free-time",
    title: "平日や休日に使える時間はどれくらいですか？",
    lead: "時間の使い方によって、合う一歩は変わります。",
    options: [
      {
        label: "少しなら作れそう",
        helper: "週に数時間から試せそう",
        scores: { stability: 1, side_business: 2 },
      },
      {
        label: "時間よりも、今の環境の見直しを優先したい",
        helper: "働き方そのものが気になっている",
        scores: { workstyle: 2, career_agent: 2 },
      },
      {
        label: "忙しくて、まず優先順位を決めたい",
        helper: "全部はできないから整理したい",
        scores: { organize: 2 },
      },
    ],
  },
  {
    id: "decision",
    title: "行動する前に、何があると安心ですか？",
    lead: "あなたが進みやすい判断材料を見つけます。",
    options: [
      {
        label: "会社以外で収入を作るイメージ",
        helper: "小さな収入源があると安心できそう",
        scores: { stability: 1, side_business: 2 },
      },
      {
        label: "自分が外でどう評価されるかの目安",
        helper: "今の働き方を比べて判断したい",
        scores: { workstyle: 2, career_agent: 2 },
      },
      {
        label: "まず何を考えるべきかの整理",
        helper: "情報よりも順番がほしい",
        scores: { organize: 2 },
      },
    ],
  },
  {
    id: "interest",
    title: "今いちばん気になる言葉はどれですか？",
    lead: "直感で選んで大丈夫です。",
    options: [
      {
        label: "副収入",
        helper: "収入の柱を少し増やしたい",
        scores: { stability: 1, side_business: 3 },
      },
      {
        label: "働き方",
        helper: "自分に合う環境を知りたい",
        scores: { workstyle: 2, career_agent: 2 },
      },
      {
        label: "方向性",
        helper: "自分が何を望んでいるか整理したい",
        scores: { organize: 2 },
      },
    ],
  },
  {
    id: "current-concern",
    title: "最近、よく考えることは？",
    lead: "いまの不安の中心に近いものを選んでください。",
    options: [
      {
        label: "今の収入だけで将来大丈夫かな",
        helper: "別の収入の可能性を知りたい",
        scores: { stability: 2, side_business: 2 },
      },
      {
        label: "この会社にずっといていいのかな",
        helper: "外の選択肢も見てみたい",
        scores: { workstyle: 2, career_agent: 2 },
      },
      {
        label: "結局、何から始めればいいんだろう",
        helper: "頭の中を整理したい",
        scores: { organize: 2 },
      },
    ],
  },
  {
    id: "learning",
    title: "新しいことを始めるなら、どれが近いですか？",
    lead: "無理なく続けられそうな形を選んでください。",
    options: [
      {
        label: "今の仕事に加えて、少しずつ試したい",
        helper: "小さく経験を増やしたい",
        scores: { stability: 2, side_business: 2 },
      },
      {
        label: "自分の強みを活かせる場所を知りたい",
        helper: "評価される環境を探したい",
        scores: { workstyle: 2, career_agent: 2 },
      },
      {
        label: "まず選択肢を知ってから決めたい",
        helper: "比べて納得したい",
        scores: { organize: 2, career_agent: 1 },
      },
    ],
  },
  {
    id: "support",
    title: "誰かに相談するとしたら、何を聞きたいですか？",
    lead: "最後の提案を決めるための質問です。",
    options: [
      {
        label: "今の仕事を続けながら収入を増やす方法",
        helper: "副業や学び方を知りたい",
        scores: { stability: 1, side_business: 3 },
      },
      {
        label: "自分に合う働き方や会社があるか",
        helper: "今の環境と比べて考えたい",
        scores: { workstyle: 2, career_agent: 3 },
      },
      {
        label: "転職か副業か、まず何を優先すべきか",
        helper: "一緒に整理したい",
        scores: { organize: 3, career_agent: 1, side_business: 1 },
      },
    ],
  },
  {
    id: "first-step",
    title: "今日このあと、できそうな一歩は？",
    lead: "ここで選んだものが、ロードマップの方向性に反映されます。",
    options: [
      {
        label: "収入を増やす選択肢を見てみる",
        helper: "今の仕事を続けながら考えたい",
        scores: { stability: 2, side_business: 3 },
      },
      {
        label: "自分に合う働き方を相談してみる",
        helper: "環境の選択肢を知りたい",
        scores: { workstyle: 2, career_agent: 3 },
      },
      {
        label: "まず今の状況を整理する",
        helper: "焦らず順番を決めたい",
        scores: { organize: 3 },
      },
    ],
  },
];

export function calculateScores(answers: number[]): DiagnosisScores {
  return answers.reduce<DiagnosisScores>((scores, answerIndex, questionIndex) => {
    const option = questions[questionIndex]?.options[answerIndex];
    if (!option) return scores;

    for (const [key, value] of Object.entries(option.scores) as [keyof DiagnosisScores, number][]) {
      scores[key] += value;
    }

    return scores;
  }, { ...baseScores });
}

export function getDiagnosisResult(scores: DiagnosisScores): DiagnosisResult {
  const primaryRoadmap = (["stability", "workstyle", "organize"] as RoadmapType[]).reduce((best, current) => {
    if (scores[current] > scores[best]) return current;
    return best;
  }, "organize");

  const ctaType: CtaType =
    primaryRoadmap === "stability"
      ? "side_business"
      : primaryRoadmap === "workstyle"
        ? "career_agent"
        : scores.side_business > scores.career_agent
          ? "side_business"
          : "career_agent";

  const roadmap = roadmaps[primaryRoadmap];

  return {
    roadmapType: primaryRoadmap,
    ctaType,
    resultName: roadmap.resultName,
    summary: roadmap.tendency,
    firstStep: roadmap.steps[0].title,
  };
}
