import type { Roadmap } from "@/types/roadmap";
import { RoadmapStep } from "@/components/RoadmapStep";

type RoadmapTimelineProps = {
  roadmap: Roadmap;
};

export function RoadmapTimeline({ roadmap }: RoadmapTimelineProps) {
  return (
    <section className="mt-7">
      <div className="mb-4 flex justify-center">
        <div className="rounded-full bg-white px-5 py-3 text-sm font-black text-slate-700 shadow-sm">
          現在地
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 rounded-full bg-gradient-to-b from-sky-200 via-violet-200 to-emerald-200" />
        <div className="relative space-y-5">
          {roadmap.steps.map((step, index) => (
            <div key={step.title}>
              <div className="mb-5 flex justify-center">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border-4 border-white bg-sky-100 text-sky-700 shadow-sm">
                  ↓
                </div>
              </div>
              <RoadmapStep step={step} index={index} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex justify-center">
        <div className="flex h-9 w-9 items-center justify-center rounded-full border-4 border-white bg-emerald-100 text-emerald-700 shadow-sm">
          ↓
        </div>
      </div>
      <div className="mt-5 rounded-[28px] bg-slate-950 p-5 text-center text-white shadow-xl shadow-slate-300">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-200">最後の提案</p>
        <p className="mt-3 text-xl font-black">一人で考え続けるか。誰かと一緒に整理してみるか。</p>
      </div>
    </section>
  );
}
