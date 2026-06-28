import Link from "next/link";
import { notFound } from "next/navigation";
import { finalCtas, roadmaps } from "@/data/roadmaps";
import { RoadmapFinalCTA } from "@/components/RoadmapFinalCTA";
import { RoadmapHero } from "@/components/RoadmapHero";
import { RoadmapTimeline } from "@/components/RoadmapTimeline";
import type { CtaType, RoadmapType } from "@/types/roadmap";

type RoadmapPageProps = {
  params: Promise<{
    type: string;
  }>;
  searchParams: Promise<{
    cta?: string;
  }>;
};

const roadmapTypes = Object.keys(roadmaps) as RoadmapType[];

export function generateStaticParams() {
  return roadmapTypes.map((type) => ({ type }));
}

function isRoadmapType(type: string): type is RoadmapType {
  return roadmapTypes.includes(type as RoadmapType);
}

function isCtaType(type: string | undefined): type is CtaType {
  return type === "career_agent" || type === "side_business";
}

export default async function RoadmapPage({ params, searchParams }: RoadmapPageProps) {
  const { type } = await params;
  const { cta } = await searchParams;

  if (!isRoadmapType(type)) {
    notFound();
  }

  const roadmap = roadmaps[type];
  const finalCta = finalCtas[isCtaType(cta) ? cta : roadmap.defaultCtaType];

  return (
    <main className="min-h-screen px-5 py-6">
      <div className="mx-auto max-w-2xl pb-12">
        <Link href="/" className="mb-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-600 shadow-sm">
          ← 診断に戻る
        </Link>
        <RoadmapHero roadmap={roadmap} />

        <section className="mt-7 rounded-[28px] bg-white/78 p-5 shadow-sm">
          <p className="text-sm font-black text-slate-950">このページの見方</p>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            診断結果をもとに、今のあなたが考えやすい順番で並べています。
            途中で何かを決める必要はありません。まずは、上から順番に読んでみてください。
          </p>
        </section>

        <RoadmapTimeline roadmap={roadmap} />
        <RoadmapFinalCTA roadmap={roadmap} finalCta={finalCta} />

        <section className="mt-8 rounded-[30px] bg-slate-950 px-6 py-8 text-center text-white">
          <p className="text-2xl font-black leading-relaxed">
            未来は、
            <br />
            一気に変える必要はありません。
          </p>
          <p className="mt-4 text-sm font-medium leading-7 text-slate-300">
            今日見る情報が一つ増えるだけでも、半年後の選択肢は少し変わるかもしれません。
          </p>
        </section>
      </div>
    </main>
  );
}
