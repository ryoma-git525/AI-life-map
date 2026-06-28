"use client";

import type { FinalCta, Roadmap } from "@/types/roadmap";
import { trackAffiliateClick } from "@/lib/tracking";

type RoadmapFinalCTAProps = {
  roadmap: Roadmap;
  finalCta: FinalCta;
};

export function RoadmapFinalCTA({ roadmap, finalCta }: RoadmapFinalCTAProps) {
  return (
    <section className="mt-8 soft-card rounded-[30px] p-6 sm:p-8">
      <p className="text-sm font-black text-sky-700">ここまで約3分、お疲れさまでした。</p>
      <h2 className="mt-3 text-2xl font-black leading-tight text-slate-950">
        この先は「あなたの場合」を考えるステップです。
      </h2>
      <div className="mt-5 space-y-4 text-base leading-8 text-slate-700">
        <p>ここまで読んできた内容は、今のあなたに合いやすい順番を整理したものです。</p>
        <p>ただ、実際には働き方、収入、生活リズム、得意なことによって、合う進め方は少しずつ変わります。</p>
        <p>あとは、一人で考え続けるか。誰かと一緒に整理してみるか。</p>
      </div>

      <div className="mt-6 rounded-3xl bg-gradient-to-br from-sky-50 to-violet-50 p-5">
        <p className="text-sm font-black text-slate-500">次に見るなら</p>
        <p className="mt-3 text-lg font-black leading-8 text-slate-950">{finalCta.note}</p>
      </div>

      <a
        href={finalCta.url}
        target="_blank"
        rel="sponsored noopener noreferrer"
        onClick={() =>
          trackAffiliateClick({
            roadmapType: roadmap.type,
            ctaType: finalCta.type,
            targetUrl: finalCta.url,
          })
        }
        className="mt-6 flex min-h-14 items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-500 to-sky-500 px-5 text-center text-base font-black text-white shadow-xl shadow-emerald-200 transition hover:-translate-y-0.5"
      >
        {finalCta.button}
      </a>

      <p className="mt-4 text-center text-xs font-bold leading-6 text-slate-500">
        情報を見るだけでも大丈夫です。申し込みや相談をするかどうかは、内容を見てから判断できます。
      </p>
    </section>
  );
}
