"use client";

import { trackAffiliateClick } from "@/lib/tracking";
import type { RankedRoadmapStep, RoadmapType } from "@/types/roadmap";

export function RoadmapStepCard({ step, roadmapType }: { step: RankedRoadmapStep; roadmapType: RoadmapType }) {
  return (
    <article className="relative rounded-[1.75rem] border border-slate-100 bg-white p-5 shadow-soft sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black tracking-[0.16em] text-sky-700">STEP {step.rank}</p>
          <h2 className="mt-1 text-2xl font-black text-slate-950">{step.title}</h2>
        </div>
        <span className="rounded-full bg-amber-50 px-3 py-2 text-xs font-black text-amber-600">{step.priority}</span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <InfoBadge label="所要時間" value={step.time} />
        <InfoBadge label="費用感" value={step.cost} />
      </div>

      <div className="mt-5 rounded-3xl border border-slate-100 bg-slate-50/70 p-4">
        <p className="text-xs font-black tracking-[0.14em] text-slate-500">目的</p>
        <p className="mt-2 text-base font-black leading-7 text-slate-950">{step.purpose}</p>
      </div>

      <p className="mt-5 text-sm font-bold leading-7 text-slate-700">{step.description}</p>

      <Section title="このSTEPをおすすめする理由" items={[step.reason]} />
      <Section title="このSTEPで分かること" items={step.benefits} />
      <Section title="こんな人におすすめ" items={step.recommendedFor} />

      <div className="mt-5 rounded-3xl bg-gradient-to-br from-sky-50 to-violet-50 p-4">
        <p className="text-xs font-black text-sky-700">診断結果から見たポイント</p>
        <p className="mt-2 text-sm font-bold leading-7 text-slate-700">{step.stepComment}</p>
      </div>

      <p className="mt-4 rounded-2xl border border-sky-100 bg-sky-50/70 p-4 text-xs font-bold leading-6 text-slate-600">
        ここから先は情報を見るだけでも大丈夫です。申し込みや相談をするかどうかは、内容を見てから判断できます。
      </p>

      <a
        href={step.url}
        target="_blank"
        rel="noopener noreferrer sponsored"
        onClick={() =>
          trackAffiliateClick({
            roadmapType,
            stepCategory: step.id,
            stepTitle: step.title,
            targetUrl: step.url,
          })
        }
        className="mt-5 block rounded-2xl bg-gradient-to-r from-emerald-400 to-sky-500 px-5 py-4 text-center text-sm font-black text-white shadow-action transition hover:-translate-y-0.5"
      >
        {step.cta}
      </a>
    </article>
  );
}

function InfoBadge({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-3">
      <p className="text-[11px] font-black text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-black text-slate-800">{value}</p>
    </div>
  );
}

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-5">
      <p className="text-sm font-black text-slate-950">{title}</p>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm font-bold leading-6 text-slate-600">
            <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-sky-100 text-[11px] font-black text-sky-700">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
