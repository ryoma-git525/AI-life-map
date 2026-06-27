"use client";

import { useMemo, useState } from "react";
import { getRoadmapPathForResult } from "@/lib/resultRoadmap";

type ResultKey = "career_agent" | "ai_school" | "side_business" | "roadmap" | "qualification";
type ScoreKey = ResultKey | "money" | "growth" | "freedom" | "stability" | "lost";

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
    title: "今の生活で一番モヤモヤすることは？",
    options: [
      { label: "給料がなかなか増えない", scores: { career_agent: 2, money: 2 } },
      { label: "将来どうなるか不安", scores: { roadmap: 2, stability: 1 } },
      { label: "やりたいことがわからない", scores: { roadmap: 2, lost: 2 } },
      { label: "会社に依存しない働き方をしたい", scores: { side_business: 2, freedom: 1 } },
    ],
  },
  {
    title: "理想の未来に近いものは？",
    options: [
      { label: "年収を上げたい", scores: { career_agent: 2, money: 2 } },
      { label: "AIを使って仕事に活かしたい", scores: { ai_school: 3, growth: 1 } },
      { label: "副業で小さく収入を作りたい", scores: { side_business: 3, freedom: 1 } },
      { label: "安定しながらスキルを増やしたい", scores: { qualification: 3, stability: 2 } },
    ],
  },
  {
    title: "今の自分に必要だと感じるものは？",
    options: [
      { label: "外の市場価値を知ること", scores: { career_agent: 3 } },
      { label: "AIや新しいスキル", scores: { ai_school: 3, growth: 1 } },
      { label: "会社以外の選択肢", scores: { side_business: 3 } },
      { label: "選択肢を整理すること", scores: { roadmap: 3, lost: 1 } },
      { label: "資格や専門スキル", scores: { qualification: 3, stability: 1 } },
    ],
  },
  {
    title: "次に見てみたい情報は？",
    options: [
      { label: "転職するかどうかの判断材料", scores: { career_agent: 2 } },
      { label: "AIを仕事で使う方法", scores: { ai_school: 2 } },
      { label: "自分に合う副業", scores: { side_business: 2 } },
      { label: "キャリア相談や整理", scores: { roadmap: 2 } },
      { label: "将来に強い資格や講座", scores: { qualification: 2 } },
    ],
  },
];

const results: Record<ResultKey, Result> = {
  career_agent: {
    key: "career_agent",
    name: "市場価値アップタイプ",
    essence: "今の会社だけで自分を判断するのは少しもったいない人です。",
    oneLine: "まずは外の市場でどう見られるかを知ると、未来の選択肢が広がりやすくなります。",
    firstStep: "市場価値を知る",
    traits: ["慎重に判断したい", "収入や働き方を見直したい", "比較材料があると動きやすい"],
    strengths: ["現実的に考えられる", "自分の可能性を広げようとしている", "納得して選べる"],
    keywords: ["挑戦", "収入", "選択"],
    accent: "from-sky-400 to-blue-500",
  },
  ai_school: {
    key: "ai_school",
    name: "AI活用スタートタイプ",
    essence: "これからの仕事で使える武器を一つ持つと、前に進みやすい人です。",
    oneLine: "AIを学ぶことで、仕事・副業・転職の選択肢が少しずつ広がる可能性があります。",
    firstStep: "AIを学ぶ",
    traits: ["新しいことを学ぶ意欲がある", "効率化やスキルアップに関心がある", "未来に備えたい"],
    strengths: ["学ぶ意欲がある", "時代の変化に気づける", "小さく試せる"],
    keywords: ["学び", "成長", "未来"],
    accent: "from-violet-400 to-sky-400",
  },
  side_business: {
    key: "side_business",
    name: "副業チャレンジタイプ",
    essence: "会社だけに頼らず、安心できる未来を小さく育てたい人です。",
    oneLine: "まず自分に合う副業を知るだけでも、将来への不安は少し整理しやすくなります。",
    firstStep: "副業を知る",
    traits: ["会社以外の収入に関心がある", "無理なく始めたい", "自由度を少し増やしたい"],
    strengths: ["選択肢を増やそうとしている", "小さく挑戦できる", "生活を大切にできる"],
    keywords: ["自由", "安心", "収入"],
    accent: "from-emerald-400 to-teal-400",
  },
  roadmap: {
    key: "roadmap",
    name: "キャリア整理タイプ",
    essence: "迷っているのではなく、選択肢が多すぎるだけかもしれない人です。",
    oneLine: "今は急いで決めるより、転職・副業・学習の順番を整理することが大切です。",
    firstStep: "キャリアを整理する",
    traits: ["自分に合う道をちゃんと見つけたい", "情報を集めてから判断したい", "納得感を大切にしたい"],
    strengths: ["丁寧に考えられる", "自分の人生を大切にしている", "整理すれば行動できる"],
    keywords: ["整理", "納得", "選択"],
    accent: "from-violet-400 to-indigo-400",
  },
  qualification: {
    key: "qualification",
    name: "安定スキルアップタイプ",
    essence: "今の生活を守りながら、着実に未来の幅を広げたい人です。",
    oneLine: "資格や専門スキルを知ることで、安心感を保ちながら選択肢を増やしやすくなります。",
    firstStep: "安定スキルを身につける",
    traits: ["安定を大切にしたい", "無理なく準備したい", "長く使えるスキルに関心がある"],
    strengths: ["継続を大切にできる", "リスクを見ながら判断できる", "着実に準備できる"],
    keywords: ["安定", "学び", "準備"],
    accent: "from-blue-400 to-emerald-400",
  },
};

const resultKeys: ResultKey[] = ["career_agent", "ai_school", "side_business", "roadmap", "qualification"];

function calculateResult(answers: number[]) {
  const scores: Record<string, number> = {};

  answers.forEach((answer, questionIndex) => {
    const option = questions[questionIndex]?.options[answer];
    if (!option) return;
    Object.entries(option.scores).forEach(([key, value]) => {
      scores[key] = (scores[key] ?? 0) + (value ?? 0);
    });
  });

  const resultKey = resultKeys.reduce<ResultKey>((best, key) => ((scores[key] ?? 0) > (scores[best] ?? 0) ? key : best), "roadmap");
  return results[resultKey];
}

export default function Home() {
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const currentQuestion = answers.length;
  const complete = answers.length === questions.length && !analyzing;
  const result = useMemo(() => calculateResult(answers), [answers]);
  const roadmapPath = getRoadmapPathForResult(result.key);
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
                転職するべき？AIを学ぶべき？副業を始めるべき？
                <br />
                今の状況と理想の未来から、あなたに合う行動ルートを無料で診断します。
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
