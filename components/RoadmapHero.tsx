import type { Roadmap } from "@/types/roadmap";

type RoadmapHeroProps = {
  roadmap: Roadmap;
};

export function RoadmapHero({ roadmap }: RoadmapHeroProps) {
  return (
    <section className="soft-card overflow-hidden rounded-[30px]">
      <div className={`h-2 bg-gradient-to-r ${roadmap.accent}`} />
      <div className="p-6 sm:p-8">
        <p className="text-sm font-black text-sky-700">あなたに合った進め方</p>
        <h1 className="mt-3 text-3xl font-black leading-tight text-slate-950 sm:text-4xl">
          診断結果をもとに、
          <br />
          今のあなたが進みやすい順番をまとめました。
        </h1>
        <p className="mt-5 text-base leading-8 text-slate-700">
          全部を一気にやる必要はありません。まずは一つずつ整理していきましょう。
        </p>

        <div className="mt-7 rounded-3xl bg-gradient-to-br from-sky-50 via-white to-violet-50 p-5">
          <p className="text-sm font-bold text-slate-500">あなたは</p>
          <p className="mt-2 text-2xl font-black text-slate-950">{roadmap.resultName}</p>
          <p className="mt-2 text-sm font-bold text-slate-500">でした。</p>
          <p className="mt-5 text-base leading-8 text-slate-700">{roadmap.tendency}</p>
        </div>

        <div className="mt-5 rounded-3xl border border-emerald-100 bg-emerald-50 p-5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">最初の一歩</p>
          <p className="mt-2 text-xl font-black leading-snug text-slate-950">{roadmap.steps[0].title}</p>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            今回の回答内容から見ると、まずここから始めると、この後の選択肢が整理しやすくなります。
          </p>
        </div>
      </div>
    </section>
  );
}
