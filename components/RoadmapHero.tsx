import type { RoadmapTypeConfig } from "@/types/roadmap";

export function RoadmapHero({ config }: { config: RoadmapTypeConfig }) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-sky-100 bg-white p-5 shadow-glow sm:p-8">
      <div className={`absolute -right-20 -top-20 h-52 w-52 rounded-full bg-gradient-to-br ${config.accent} opacity-20 blur-2xl`} />
      <div className="relative">
        <p className="text-xs font-black tracking-[0.18em] text-sky-700">診断結果から作成</p>
        <p className="mt-4 text-sm font-bold text-slate-500">あなたは</p>
        <h1 className="mt-1 text-3xl font-black leading-tight text-slate-950 sm:text-5xl">{config.resultName}</h1>
        <p className="mt-1 text-sm font-bold text-slate-500">でした。</p>

        <p className="mt-5 text-sm font-bold leading-8 text-slate-700">
          今回の回答では、今すぐ大きく環境を変えるよりも、まず「{config.firstStep}」から始めるのがおすすめです。
          理由は、この後の選択肢が整理しやすくなるからです。
        </p>

        <div className="mt-5 rounded-3xl bg-gradient-to-br from-sky-50 to-violet-50 p-5">
          <p className="text-xs font-black tracking-[0.16em] text-sky-700">最初の一歩</p>
          <p className="mt-2 text-3xl font-black text-slate-950">{config.firstStep}</p>
        </div>

        <a
          href="#roadmap"
          className="mt-6 block rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-4 text-center text-base font-black text-white shadow-action transition hover:-translate-y-0.5"
        >
          ロードマップを見る
        </a>
      </div>
    </section>
  );
}
