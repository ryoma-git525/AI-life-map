"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { calculateScores, getDiagnosisResult, questions } from "@/lib/diagnosis";

const loadingMessages = [
  "回答内容を整理しています...",
  "今の状態に合う順番を確認しています...",
  "進みやすいロードマップを作成しています...",
  "最初の一歩を見つけています...",
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const progress = Math.round((answers.length / questions.length) * 100);
  const question = questions[current];

  const result = useMemo(() => {
    if (!showResult) return null;
    return getDiagnosisResult(calculateScores(answers));
  }, [answers, showResult]);

  const handleAnswer = (answerIndex: number) => {
    if (selected !== null || isLoading) return;
    setSelected(answerIndex);

    window.setTimeout(() => {
      const nextAnswers = [...answers, answerIndex];
      setAnswers(nextAnswers);
      setSelected(null);

      if (current < questions.length - 1) {
        setCurrent((value) => value + 1);
        return;
      }

      setIsLoading(true);
      window.setTimeout(() => {
        setIsLoading(false);
        setShowResult(true);
      }, 1900);
    }, 360);
  };

  const restart = () => {
    setCurrent(0);
    setAnswers([]);
    setSelected(null);
    setIsLoading(false);
    setShowResult(false);
  };

  if (isLoading) {
    return (
      <main className="min-h-screen px-5 py-8">
        <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-xl items-center">
          <div className="soft-card w-full rounded-[28px] p-8 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-sky-400 to-violet-400">
              <div className="h-3 w-3 rounded-full bg-white pulse-dot" />
            </div>
            <p className="text-sm font-bold text-sky-700">診断が完了しました</p>
            <h1 className="mt-3 text-2xl font-black tracking-normal text-slate-900">
              あなたに合う進め方を整理しています
            </h1>
            <div className="mt-6 space-y-3 text-sm font-semibold text-slate-600">
              {loadingMessages.map((message, index) => (
                <p key={message} className="float-in" style={{ animationDelay: `${index * 160}ms` }}>
                  {message}
                </p>
              ))}
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (result) {
    return (
      <main className="min-h-screen px-5 py-8">
        <section className="mx-auto max-w-xl">
          <div className="soft-card float-in rounded-[28px] p-7">
            <p className="text-sm font-bold text-sky-700">診断結果</p>
            <h1 className="mt-3 text-3xl font-black leading-tight text-slate-950">
              今のあなたに必要なのは、
              <br />
              順番を整理することです。
            </h1>
            <div className="mt-6 rounded-3xl bg-gradient-to-br from-sky-50 to-violet-50 p-5">
              <p className="text-sm font-bold text-slate-500">あなたは</p>
              <p className="mt-2 text-2xl font-black text-slate-950">{result.resultName}</p>
              <p className="mt-2 text-sm font-bold text-slate-500">でした。</p>
            </div>
            <p className="mt-6 text-base leading-8 text-slate-700">{result.summary}</p>
            <div className="mt-6 rounded-3xl border border-emerald-100 bg-emerald-50 p-5">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">最初の一歩</p>
              <p className="mt-2 text-xl font-black text-slate-950">{result.firstStep}</p>
            </div>
            <Link
              href={`/roadmap/${result.roadmapType}?cta=${result.ctaType}`}
              className="mt-7 flex min-h-14 items-center justify-center rounded-2xl bg-slate-950 px-5 text-center text-base font-black text-white shadow-xl shadow-slate-300 transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              あなたに合った進め方を見る
            </Link>
            <button
              type="button"
              onClick={restart}
              className="mt-4 w-full rounded-2xl px-4 py-3 text-sm font-bold text-slate-500"
            >
              もう一度診断する
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-5 py-6">
      <section className="mx-auto max-w-xl pb-10 pt-2">
        <div className="mb-7">
          <p className="text-sm font-black text-sky-700">AI人生設計図</p>
          <h1 className="mt-3 text-4xl font-black leading-tight text-slate-950">
            あなたに合う
            <br />
            “未来の選択肢”がわかる
          </h1>
          <p className="mt-5 text-base leading-8 text-slate-700">
            転職するべきか。今の仕事を続けるべきか。収入を増やすなら何から始めるべきか。
            10問の回答から、今のあなたが進みやすい順番を整理します。
          </p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold text-slate-600">
            <span className="rounded-full bg-white px-3 py-2 shadow-sm">約2分</span>
            <span className="rounded-full bg-white px-3 py-2 shadow-sm">登録不要</span>
            <span className="rounded-full bg-white px-3 py-2 shadow-sm">すべて選択式</span>
          </div>
        </div>

        <div className="soft-card rounded-[28px] p-5">
          <div className="mb-5">
            <div className="mb-3 flex items-center justify-between text-xs font-black text-slate-500">
              <span>
                QUESTION {current + 1}/{questions.length}
              </span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-sky-400 via-violet-400 to-emerald-400 transition-all duration-300"
                style={{ width: `${Math.max(progress, 6)}%` }}
              />
            </div>
          </div>

          <div key={question.id} className="float-in">
            <h2 className="text-2xl font-black leading-snug text-slate-950">{question.title}</h2>
            <p className="mt-2 text-sm font-medium leading-7 text-slate-600">{question.lead}</p>
            <div className="mt-6 space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => handleAnswer(index)}
                  className={`answer-card flex w-full items-start gap-3 rounded-3xl border border-slate-200 bg-white p-4 text-left ${
                    selected === index ? "selected" : ""
                  }`}
                >
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sm font-black text-sky-700">
                    {selected === index ? "✓" : index + 1}
                  </span>
                  <span>
                    <span className="block text-base font-black leading-7 text-slate-900">{option.label}</span>
                    <span className="mt-1 block text-sm font-medium leading-6 text-slate-500">{option.helper}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <section className="mt-8">
          <h2 className="text-lg font-black text-slate-950">こんな悩みありませんか？</h2>
          <div className="mt-4 grid gap-3">
            {[
              "転職するべきかわからない",
              "副業に興味はあるけど、何から始めればいいかわからない",
              "今のままでいいのか少し不安",
              "収入を上げたい",
              "何が自分に向いているかわからない",
            ].map((item) => (
              <div key={item} className="rounded-2xl bg-white/80 px-4 py-3 text-sm font-bold text-slate-700 shadow-sm">
                □ {item}
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm font-bold text-slate-500">どれか一つでも当てはまる人向けです。</p>
        </section>
      </section>
    </main>
  );
}
