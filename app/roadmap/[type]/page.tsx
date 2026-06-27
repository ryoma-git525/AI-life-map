import { notFound } from "next/navigation";
import { RoadmapEnding } from "@/components/RoadmapEnding";
import { RoadmapHero } from "@/components/RoadmapHero";
import { RoadmapStepCard } from "@/components/RoadmapStepCard";
import { roadmapTypes } from "@/data/roadmapTypes";
import { getRoadmapSteps, getRoadmapType } from "@/lib/roadmap";
import type { RoadmapType } from "@/types/roadmap";

type PageProps = {
  params: Promise<{
    type: string;
  }>;
};

export function generateStaticParams() {
  return Object.keys(roadmapTypes).map((type) => ({ type }));
}

export async function generateMetadata({ params }: PageProps) {
  const { type } = await params;
  const config = getRoadmapType(type);

  if (!config) {
    return {
      title: "ロードマップが見つかりません | AI人生設計図",
    };
  }

  return {
    title: `${config.resultName}のロードマップ | AI人生設計図`,
    description: "診断結果に合わせた、次の一歩を迷わないためのロードマップです。",
  };
}

export default async function RoadmapPage({ params }: PageProps) {
  const { type } = await params;
  const config = getRoadmapType(type);

  if (!config) notFound();

  const steps = getRoadmapSteps(config.type);

  return (
    <main className="min-h-screen px-4 py-5 text-ink sm:px-6">
      <div className="mx-auto w-full max-w-4xl">
        <header className="flex items-center justify-between py-2">
          <a href="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-to-br from-sky-400 to-violet-400 text-sm font-black text-white shadow-glow">
              AI
            </span>
            <span>
              <span className="block text-sm font-bold tracking-[0.08em] text-slate-900">AI人生設計図</span>
              <span className="block text-[11px] text-slate-500">Future Roadmap</span>
            </span>
          </a>
          <a href="/" className="rounded-full border border-sky-100 bg-white/80 px-3 py-2 text-xs font-black text-sky-700 shadow-sm">
            診断に戻る
          </a>
        </header>

        <div className="mt-5 space-y-6">
          <section className="rounded-[2rem] border border-white/80 bg-white/70 p-5 shadow-soft sm:p-8">
            <p className="text-xs font-black tracking-[0.18em] text-sky-700">診断結果から作成した行動プラン</p>
            <h1 className="mt-3 text-4xl font-black leading-tight text-slate-950 sm:text-6xl">あなた専用ロードマップ</h1>
            <p className="mt-5 text-sm font-bold leading-8 text-slate-700 sm:text-base">
              診断結果をもとに、
              <br />
              今のあなたにおすすめの行動を順番にまとめました。
              <br />
              全部やる必要はありません。
              <br />
              まずは一つだけ行動してみましょう。
            </p>
          </section>

          <RoadmapHero config={config} />

          <section className="rounded-[1.75rem] border border-violet-100 bg-gradient-to-br from-violet-50 via-white to-sky-50 p-5 shadow-soft sm:p-6">
            <p className="text-xs font-black tracking-[0.16em] text-violet-700">今回の診断結果から見ると</p>
            <p className="mt-4 whitespace-pre-line text-sm font-bold leading-8 text-slate-700">{config.diagnosisComment}</p>
          </section>

          <section className="rounded-[1.75rem] border border-sky-100 bg-white/85 p-5 shadow-soft sm:p-6">
            <p className="text-xs font-black tracking-[0.16em] text-sky-700">このページの役割</p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">この順番をおすすめする理由</h2>
            <p className="mt-4 text-sm font-bold leading-8 text-slate-700">
              このページは広告ページではありません。診断結果をもとに作成した「あなた専用の行動プラン」です。
              商品の紹介ではなく、次に何をすると良いかを中心に整理しています。
            </p>
            <p className="mt-4 text-sm font-bold leading-8 text-slate-700">{config.reason}</p>
          </section>

          <section id="roadmap" className="rounded-[2rem] border border-sky-100 bg-gradient-to-b from-white to-sky-50/60 p-4 shadow-glow sm:p-6">
            <div className="mb-5">
              <p className="text-xs font-black tracking-[0.16em] text-sky-700">YOUR NEXT ROUTE</p>
              <h2 className="mt-2 text-2xl font-black text-slate-950">あなた専用ロードマップ</h2>
            </div>

            <div className="relative space-y-5">
              <div className="absolute bottom-8 left-5 top-8 hidden w-px bg-gradient-to-b from-sky-200 via-violet-200 to-emerald-200 sm:block" />
              <div className="relative rounded-[1.5rem] border border-sky-100 bg-white p-4 text-center shadow-soft sm:ml-12">
                <p className="text-xs font-black tracking-[0.16em] text-sky-700">現在地</p>
                <p className="mt-1 text-sm font-bold text-slate-600">診断結果を受け取った今のあなた</p>
              </div>
              {steps.map((step) => (
                <div key={step.id} className="relative sm:pl-12">
                  <div className="mb-3 grid place-items-center text-2xl font-black text-sky-300 sm:hidden">↓</div>
                  <div className="absolute left-0 top-8 hidden h-10 w-10 place-items-center rounded-full bg-white text-sm font-black text-sky-700 shadow-soft ring-4 ring-sky-50 sm:grid">
                    {step.rank}
                  </div>
                  <RoadmapStepCard step={step} roadmapType={config.type as RoadmapType} />
                </div>
              ))}
              <div className="grid place-items-center text-2xl font-black text-emerald-300 sm:hidden">↓</div>
              <div className="relative rounded-[1.5rem] border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-5 text-center shadow-soft sm:ml-12">
                <p className="text-xs font-black tracking-[0.16em] text-emerald-700">未来</p>
                <p className="mt-1 text-base font-black text-slate-950">選択肢を知ったうえで、自分に合う一歩を選べる状態へ</p>
              </div>
            </div>
          </section>

          <RoadmapEnding />
        </div>
      </div>
    </main>
  );
}
