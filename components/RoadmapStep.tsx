import type { RoadmapStep as RoadmapStepType } from "@/types/roadmap";

type RoadmapStepProps = {
  step: RoadmapStepType;
  index: number;
};

export function RoadmapStep({ step, index }: RoadmapStepProps) {
  return (
    <article className="soft-card rounded-[28px] p-5">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-sm font-black text-white">
          {index + 1}
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-700">STEP {index + 1}</p>
          <h2 className="mt-2 text-xl font-black leading-snug text-slate-950">{step.title}</h2>
          <p className="mt-4 text-base leading-8 text-slate-700">{step.body}</p>
        </div>
      </div>
    </article>
  );
}
