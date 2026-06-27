"use client";

import { useMemo, useState } from "react";
import { getRoadmapPathForResult } from "@/lib/resultRoadmap";

type ResultKey = "career_agent" | "ai_school" | "side_business" | "roadmap" | "qualification";
type ScoreKey = ResultKey | "money" | "growth" | "freedom" | "stability" | "lost";
type PlanStep = "career_agent" | "side_business" | "learn_ai" | "read_books" | "organize_options";

type Option = {
  label: string;
  scores: Partial<Record<ScoreKey, number>>;
};

type Result = {
  key: ResultKey;
  name: string;
  essence: string;
  oneLine: string;
  firstStep: string;
  traits: string[];
  strengths: string[];
  keywords: string[];
  accent: string;
};

const questions: { title: string; options: Option[] }[] = [
  {
    title: "今いちばん気になっていることは？",
    options: [
      { label: "今の年収や評価が妥当か知りたい", scores: { career_agent: 3, money: 2 } },
      { label: "会社以外の収入源を作りたい", scores: { side_business: 3, freedom: 2 } },
      { label: "転職するべきか迷っている", scores: { career_agent: 2, roadmap: 1 } },
      { label: "副業に興味はあるが何から始めるか分からない", scores: { side_business: 2, lost: 1 } },
    ],
  },
  {
    title: "収入を増やすなら、どちらが今の気持ちに近い？",
    options: [
      { label: "本業の年収アップを狙いたい", scores: { career_agent: 3, money: 2 } },
      { label: "副業で月数万円を目指したい", scores: { side_business: 3, freedom: 1 } },
      { label: "まず自分の可能性を客観的に知りたい", scores: { career_agent: 2, roadmap: 1 } },
      { label: "小さく試せる収入源を探したい", scores: { side_business: 2, growth: 1 } },
    ],
  },
  {
    title: "今の仕事について、近い感覚は？",
    options: [
      { label: "もっと評価されてもいい気がする", scores: { career_agent: 3, money: 1 } },
      { label: "今の会社だけに頼るのは少し不安", scores: { side_business: 3, stability: 1 } },
      { label: "仕事内容や環境を変えたい気持ちがある", scores: { career_agent: 2, roadmap: 1 } },
      { label: "本業は続けながら別の可能性も見たい", scores: { side_business: 2, stability: 1 } },
    ],
  },
  {
    title: "最初に知れると安心する情報は？",
    options: [
      { label: "自分の市場価値や適正年収", scores: { career_agent: 3 } },
      { label: "自分に合う副業の種類", scores: { side_business: 3 } },
      { label: "転職すべきか残るべきか", scores: { career_agent: 2, roadmap: 1 } },
      { label: "本業と副業を両立する方法", scores: { side_business: 2, growth: 1 } },
    ],
  },
  {
    title: "今すぐ大きく変えることへの抵抗感は？",
    options: [
      { label: "抵抗はあるので、まず情報を集めたい", scores: { career_agent: 2, roadmap: 1 } },
      { label: "小さく始められるなら試したい", scores: { side_business: 2, growth: 1 } },
      { label: "良い条件があれば転職も考えたい", scores: { career_agent: 3 } },
      { label: "会社を辞めずに選択肢を増やしたい", scores: { side_business: 3, stability: 1 } },
    ],
  },
  {
    title: "平日や休日に使える時間は？",
    options: [
      { label: "あまり時間がないので、まず相談で整理したい", scores: { career_agent: 2, roadmap: 1 } },
      { label: "週に数時間なら副業準備に使えそう", scores: { side_business: 3 } },
      { label: "求人や年収相場を見る時間は取れそう", scores: { career_agent: 2 } },
      { label: "学びながら少しずつ収入源を作りたい", scores: { side_business: 2, growth: 1 } },
    ],
  },
  {
    title: "将来の不安に近いものは？",
    options: [
      { label: "今の会社で年収が上がるか不安", scores: { career_agent: 3, money: 1 } },
      { label: "収入源が一つだけなのが不安", scores: { side_business: 3, stability: 1 } },
      { label: "自分のスキルが外で通用するか不安", scores: { career_agent: 2, qualification: 1 } },
      { label: "副業や新しい働き方に乗り遅れそうで不安", scores: { side_business: 2, ai_school: 1 } },
    ],
  },
  {
    title: "相談するとしたら、何を相談したい？",
    options: [
      { label: "今の経験でどんな会社を狙えるか", scores: { career_agent: 3 } },
      { label: "自分に合う副業や始め方", scores: { side_business: 3 } },
      { label: "転職した場合の年収や働き方", scores: { career_agent: 2, money: 1 } },
      { label: "副業で何から学ぶべきか", scores: { side_business: 2, growth: 1 } },
    ],
  },
  {
    title: "半年後、どうなっていたら嬉しい？",
    options: [
      { label: "自分の市場価値を知って、落ち着いて判断できている", scores: { career_agent: 3, roadmap: 1 } },
      { label: "小さな副業の準備が始まっている", scores: { side_business: 3 } },
      { label: "今の会社に残るか転職するか整理できている", scores: { career_agent: 2 } },
      { label: "会社以外の選択肢が見えている", scores: { side_business: 2, freedom: 1 } },
    ],
  },
  {
    title: "最後に、今いちばん近い気持ちは？",
    options: [
      { label: "まず外の評価を知って安心したい", scores: { career_agent: 3 } },
      { label: "まず副業という選択肢を知りたい", scores: { side_business: 3 } },
      { label: "今後の働き方を整理したい", scores: { career_agent: 2, roadmap: 1 } },
      { label: "収入の柱を増やす準備をしたい", scores: { side_business: 2, stability: 1 } },
    ],
  },
];

const results: Record<ResultKey, Result> = {
  career_agent: {
    key: "career_agent",
    name: "市場価値アップタイプ",
    essence: "今の会社だけで自分を判断するのは少しもったいない人です。",
    oneLine: "まずは外の市場でどう見られるかを知ると、未来の選択肢が広がりやすくなります。",
    firstStep: "転職無料相談で市場価値を知る",
    traits: ["慎重に判断したい", "収入や働き方を見直したい", "比較材料があると動きやすい"],
    strengths: ["現実的に考えられる", "自分の可能性を広げようとしている", "納得して選べる"],
    keywords: ["挑戦", "収入", "選択"],
    accent: "from-sky-400 to-blue-500",
  },
  ai_school: {
    key: "ai_school",
    name: "選択肢アップデートタイプ",
    essence: "新しい収入源や働き方を知ると、前に進みやすい人です。",
    oneLine: "まず副業スクールで選択肢を知ると、今の仕事を続けながら未来の幅を広げやすくなります。",
    firstStep: "副業スクールで選択肢を増やす",
    traits: ["新しいことを学ぶ意欲がある", "効率化やスキルアップに関心がある", "未来に備えたい"],
    strengths: ["学ぶ意欲がある", "時代の変化に気づける", "小さく試せる"],
    keywords: ["学び", "成長", "未来"],
    accent: "from-violet-400 to-sky-400",
  },
  side_business: {
    key: "side_business",
    name: "副業チャレンジタイプ",
    essence: "会社だけに頼らず、安心できる未来を小さく育てたい人です。",
    oneLine: "まず副業スクールで選択肢を知るだけでも、将来への不安は少し整理しやすくなります。",
    firstStep: "副業スクールで選択肢を増やす",
    traits: ["会社以外の収入に関心がある", "無理なく始めたい", "自由度を少し増やしたい"],
    strengths: ["選択肢を増やそうとしている", "小さく挑戦できる", "生活を大切にできる"],
    keywords: ["自由", "安心", "収入"],
    accent: "from-emerald-400 to-teal-400",
  },
  roadmap: {
    key: "roadmap",
    name: "キャリア整理タイプ",
    essence: "迷っているのではなく、選択肢が多すぎるだけかもしれない人です。",
    oneLine: "まず転職無料相談で市場価値を知ると、今後の選択肢を整理しやすくなります。",
    firstStep: "転職無料相談で市場価値を知る",
    traits: ["自分に合う道をちゃんと見つけたい", "情報を集めてから判断したい", "納得感を大切にしたい"],
    strengths: ["丁寧に考えられる", "自分の人生を大切にしている", "整理すれば行動できる"],
    keywords: ["整理", "納得", "選択"],
    accent: "from-violet-400 to-indigo-400",
  },
  qualification: {
    key: "qualification",
    name: "安定スキルアップタイプ",
    essence: "今の生活を守りながら、着実に未来の幅を広げたい人です。",
    oneLine: "まず市場価値を知ることで、どんな準備が安心につながるか整理しやすくなります。",
    firstStep: "転職無料相談で市場価値を知る",
    traits: ["安定を大切にしたい", "無理なく準備したい", "長く使えるスキルに関心がある"],
    strengths: ["継続を大切にできる", "リスクを見ながら判断できる", "着実に準備できる"],
    keywords: ["安定", "学び", "準備"],
    accent: "from-blue-400 to-emerald-400",
  },
};

const resultKeys: ResultKey[] = ["career_agent", "ai_school", "side_business", "roadmap", "qualification"];

function calculateScores(answers: number[]) {
  const scores: Record<string, number> = {};

  answers.forEach((answer, questionIndex) => {
    const option = questions[questionIndex]?.options[answer];
    if (!option) return;
    Object.entries(option.scores).forEach(([key, value]) => {
      scores[key] = (scores[key] ?? 0) + (value ?? 0);
    });
  });

  return scores;
}

function calculateResult(scores: Record<string, number>) {
  const resultKey = resultKeys.reduce<ResultKey>((best, key) => ((scores[key] ?? 0) > (scores[best] ?? 0) ? key : best), "roadmap");
  return results[resultKey];
}

function getPersonalRoadmapPlan(scores: Record<string, number>): PlanStep[] {
  const careerScore = scores.career_agent ?? 0;
  const sideScore = scores.side_business ?? 0;
  const needsOrganizing = (scores.roadmap ?? 0) + (scores.lost ?? 0) >= Math.max(careerScore, sideScore);
  const prefersLearning = (scores.ai_school ?? 0) + (scores.growth ?? 0) >= 3;
  const prefersStability = (scores.qualification ?? 0) + (scores.stability ?? 0) >= 4;
  const plan: PlanStep[] = [];

  if (needsOrganizing) plan.push("organize_options");
  if (prefersStability && careerScore <= sideScore + 1) plan.push("read_books");
  if (prefersLearning && sideScore >= careerScore - 1) plan.push("learn_ai");

  if (sideScore > careerScore + 1) {
    plan.push("side_business", "career_agent");
  } else {
    plan.push("career_agent", "side_business");
  }

  if (prefersLearning && !plan.includes("learn_ai")) plan.push("learn_ai");
  if (!plan.includes("read_books")) plan.push("read_books");

  return plan.filter((step, index) => plan.indexOf(step) === index).slice(0, 4);
}

export default function Home() {
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const currentQuestion = answers.length;
  const complete = answers.length === questions.length && !analyzing;
  const scores = useMemo(() => calculateScores(answers), [answers]);
  const result = useMemo(() => calculateResult(scores), [scores]);
  const roadmapPlan = useMemo(() => getPersonalRoadmapPlan(scores), [scores]);
  const roadmapPath = `${getRoadmapPathForResult(result.key)}?plan=${roadmapPlan.join(",")}`;
  const progress = complete ? 100 : Math.round((answers.length / questions.length) * 100);

  function choose(index: number) {
    if (selected !== null || analyzing) return;
    setSelected(index);
    window.setTimeout(() => {
      const next = [...answers, index];
      setAnswers(next);
      setSelected(null);
      if (next.length === questions.length) {
        setAnalyzing(true);
        window.setTimeout(() => setAnalyzing(false), 1800);
      }
    }, 260);
  }

  function restart() {
    setStarted(false);
    setAnswers([]);
    setSelected(null);
    setAnalyzing(false);
  }

  return (
    <main className="min-h-screen px-4 py-5 text-ink sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-40px)] w-full max-w-5xl flex-col">
        <header className="flex items-center justify-between py-2">
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-to-br from-sky-400 to-violet-400 text-sm font-black text-white shadow-glow">
              AI
            </div>
            <div>
              <p className="text-sm font-bold tracking-[0.08em] text-slate-900">AI人生設計図</p>
              <p className="text-[11px] text-slate-500">Future Route Diagnostic</p>
            </div>
          </div>
          <div className="rounded-full border border-sky-100 bg-white/80 px-3 py-1 text-xs font-bold text-slate-600 shadow-sm">登録不要</div>
        </header>

        {!started ? (
          <section className="grid flex-1 items-center gap-8 py-8 md:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="mb-4 inline-flex rounded-full border border-sky-100 bg-white/80 px-4 py-2 text-xs font-black text-sky-700 shadow-sm">
                2分で完了 / 登録不要 / すべて選択式
              </p>
              <h1 className="text-4xl font-black leading-tight text-slate-950 sm:text-6xl">
                あなたに合う
                <br />
                “未来の選択肢”がわかる
              </h1>
              <p className="mt-5 text-base font-bold leading-8 text-slate-700">
                転職相談で市場価値を知るべき？
                <br />
                副業スクールで選択肢を増やすべき？
                <br />
                今の状況と理想の未来から、あなたに合う最初の一歩を無料で診断します。
              </p>
              <button
                type="button"
                onClick={() => setStarted(true)}
                className="mt-7 w-full rounded-2xl bg-gradient-to-r from-emerald-400 to-sky-500 px-6 py-4 text-base font-black text-white shadow-action transition hover:-translate-y-0.5 sm:w-auto"
              >
                無料で診断をはじめる
              </button>
            </div>
            <div className="glass rounded-[2rem] p-5">
              <p className="text-sm font-black text-slate-950">実際にわかるタイプ例</p>
              <div className="mt-4 grid gap-3">
                {Object.values(results)
                  .slice(0, 4)
                  .map((item) => (
                    <div key={item.key} className="rounded-2xl bg-white p-4 shadow-soft">
                      <p className="text-base font-black text-slate-950">{item.name}</p>
                      <p className="mt-1 text-xs font-bold leading-5 text-slate-500">{item.oneLine}</p>
                    </div>
                  ))}
              </div>
            </div>
          </section>
        ) : analyzing ? (
          <section className="flex flex-1 items-center justify-center">
            <div className="glass w-full max-w-md rounded-[2rem] p-8 text-center">
              <p className="text-3xl font-black text-slate-950">診断結果を整理中...</p>
              <p className="mt-4 text-sm font-bold leading-7 text-slate-600">
                回答内容を分析しています。
                <br />
                あなたに合う未来ロードマップを作成しています。
              </p>
            </div>
          </section>
        ) : complete ? (
          <section className="py-6">
            <div className="glass mx-auto max-w-3xl rounded-[2rem] p-5 sm:p-8">
              <p className="text-xs font-black tracking-[0.16em] text-sky-700">あなた専用の未来ロードマップ</p>
              <div className="mt-4 rounded-[1.5rem] bg-white p-5 shadow-soft">
                <p className="text-lg font-black leading-8 text-slate-950">
                  今の回答を見る限り、焦って人生を大きく変える必要はありません。
                </p>
                <p className="mt-3 text-sm font-bold leading-7 text-slate-600">
                  今のあなたに必要なのは、頑張ることではなく、順番を整理することです。
                </p>
              </div>
              <div className={`mt-5 rounded-[2rem] bg-gradient-to-br ${result.accent} p-5 text-white shadow-glow`}>
                <p className="text-sm font-bold opacity-90">診断結果から見たあなたは</p>
                <h1 className="mt-2 text-3xl font-black">{result.essence}</h1>
                <p className="mt-4 text-sm font-bold leading-7 opacity-95">
                  その結果、今回の診断では「{result.name}」というタイプになりました。
                </p>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <InfoCard title="あなたらしい特徴" items={result.traits} />
                <InfoCard title="回答から見えたあなたの強み" items={result.strengths} />
              </div>

              <div className="mt-5 rounded-[1.5rem] border border-sky-100 bg-sky-50/80 p-5">
                <p className="text-xs font-black text-sky-700">最初に見るべき選択肢</p>
                <p className="mt-2 text-2xl font-black text-slate-950">{result.firstStep}</p>
                <p className="mt-3 text-sm font-bold leading-7 text-slate-700">{result.oneLine}</p>
              </div>

              <div className="mt-5 rounded-[1.5rem] bg-white p-5 shadow-soft">
                <p className="text-lg font-black text-slate-950">あなたの未来キーワード</p>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {result.keywords.map((keyword) => (
                    <div key={keyword} className="rounded-2xl bg-sky-50 px-3 py-5 text-center text-lg font-black text-sky-700">
                      {keyword}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-[1.5rem] border border-sky-100 bg-white p-5 shadow-soft">
                <p className="text-sm font-bold leading-7 text-slate-700">
                  ここから先は、診断結果に合わせた「次の一歩の順番」を見るページです。
                  気になるものだけ見れば大丈夫です。
                </p>
              </div>

              <a
                href={roadmapPath}
                className="mt-5 block rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-4 text-center text-base font-black text-white shadow-action transition hover:-translate-y-0.5"
              >
                あなた専用ロードマップを見る
              </a>

              <button type="button" onClick={restart} className="mt-4 w-full rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-500">
                もう一度診断する
              </button>
            </div>
          </section>
        ) : (
          <section className="flex flex-1 flex-col justify-center py-5">
            <div className="mb-5">
              <div className="mb-3 flex items-center justify-between text-xs font-bold text-slate-500">
                <span>
                  Q{currentQuestion + 1} / {questions.length}
                </span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-gradient-to-r from-sky-400 via-action to-violet-400 transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className="glass rounded-[2rem] p-5 sm:p-7">
              <h2 className="text-2xl font-black leading-tight text-slate-950">{questions[currentQuestion].title}</h2>
              <div className="mt-5 grid gap-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() => choose(index)}
                    className={`rounded-2xl border bg-white p-4 text-left text-sm font-black text-slate-800 shadow-sm transition ${
                      selected === index ? "scale-[1.02] border-emerald-300 bg-emerald-50" : "border-slate-100 hover:border-sky-200 hover:bg-sky-50"
                    }`}
                  >
                    <span className="mr-2 text-sky-600">{String(index + 1).padStart(2, "0")}</span>
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function InfoCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[1.5rem] bg-white p-5 shadow-soft">
      <p className="text-base font-black text-slate-950">{title}</p>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm font-bold leading-6 text-slate-600">
            <span className="text-sky-500">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
