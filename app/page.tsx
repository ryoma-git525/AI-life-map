"use client";

import { type MouseEvent, useEffect, useMemo, useRef, useState } from "react";

type PrimaryKey = "career_agent" | "ai_school" | "side_business" | "coaching" | "qualification" | "roadmap";
type ScoreKey =
  | PrimaryKey
  | "money"
  | "freedom"
  | "stability"
  | "anxiety"
  | "remote"
  | "passion"
  | "independence"
  | "growth"
  | "lost"
  | "vague_anxiety"
  | "income_low"
  | "income_mid"
  | "income_high"
  | "life"
  | "job_change"
  | "efficiency"
  | "ai_beginner"
  | "ai_light"
  | "ai_use";

type Option = {
  label: string;
  scores: Partial<Record<ScoreKey, number>>;
};

type Question = {
  title: string;
  options: Option[];
};

type ResultType = {
  id: string;
  routeKey: PrimaryKey;
  name: string;
  flavorName: string;
  badge: string;
  firstStep: string;
  copy: string;
  oneLine: string;
  recommendationReason: string;
  currentState: string[];
  future: string[];
  needs: string[];
  actions: string[];
  beforeFuture: string[];
  afterFuture: string[];
  futureStory: string[];
  similarSteps: string[];
  quickWins: string[];
  ctaBenefits: string[];
  aiMessage: string;
  hope: string;
  cta: string;
  accent: string;
};

const primaryKeys: PrimaryKey[] = ["career_agent", "ai_school", "side_business", "coaching", "qualification", "roadmap"];

const affiliateLinks: Record<PrimaryKey, string> = {
  career_agent: process.env.NEXT_PUBLIC_AFFILIATE_CAREER_AGENT_URL ?? "",
  ai_school: process.env.NEXT_PUBLIC_AFFILIATE_AI_SCHOOL_URL ?? "",
  side_business: process.env.NEXT_PUBLIC_AFFILIATE_SIDE_BUSINESS_URL ?? "",
  coaching: process.env.NEXT_PUBLIC_AFFILIATE_COACHING_URL ?? "",
  qualification: process.env.NEXT_PUBLIC_AFFILIATE_QUALIFICATION_URL ?? "",
  roadmap: process.env.NEXT_PUBLIC_AFFILIATE_ROADMAP_URL ?? process.env.NEXT_PUBLIC_AFFILIATE_COACHING_URL ?? "",
};

function getAffiliateUrl(key: PrimaryKey) {
  return affiliateLinks[key] || "#affiliate-url-not-set";
}

function isAffiliateConfigured(key: PrimaryKey) {
  return Boolean(affiliateLinks[key]);
}

const questions: Question[] = [
  {
    title: "今の生活で一番モヤモヤすることは？",
    options: [
      { label: "給料がなかなか増えない", scores: { money: 2, career_agent: 1 } },
      { label: "毎日疲れていて余裕がない", scores: { freedom: 2, coaching: 1 } },
      { label: "将来どうなるか不安", scores: { anxiety: 2, roadmap: 1 } },
      { label: "やりたいことがわからない", scores: { lost: 2, coaching: 1, roadmap: 1 } },
      { label: "人間関係や職場環境がしんどい", scores: { job_change: 2, career_agent: 2 } },
      { label: "特にないけど、このままでいいのか不安", scores: { vague_anxiety: 2, roadmap: 1 } },
    ],
  },
  {
    title: "今の年収に近いものは？",
    options: [
      { label: "〜300万円", scores: { income_low: 2, money: 2, career_agent: 1 } },
      { label: "301〜400万円", scores: { income_low: 1, money: 1, career_agent: 1 } },
      { label: "401〜500万円", scores: { income_mid: 1, stability: 1 } },
      { label: "501〜600万円", scores: { income_mid: 2, growth: 1 } },
      { label: "601〜800万円", scores: { income_high: 1, growth: 1 } },
      { label: "801万円以上", scores: { income_high: 2, independence: 1 } },
    ],
  },
  {
    title: "もし毎月プラス5万円増えたら、何に使いたい？",
    options: [
      { label: "貯金したい", scores: { stability: 2, qualification: 1 } },
      { label: "投資したい", scores: { growth: 1, money: 1 } },
      { label: "旅行や趣味に使いたい", scores: { freedom: 2 } },
      { label: "家族や恋人との時間に使いたい", scores: { life: 2, coaching: 1 } },
      { label: "副業や学習に使いたい", scores: { growth: 2, side_business: 1, ai_school: 1 } },
      { label: "生活費の不安を減らしたい", scores: { anxiety: 2, stability: 1, qualification: 1 } },
    ],
  },
  {
    title: "理想の働き方に一番近いものは？",
    options: [
      { label: "年収を上げたい", scores: { money: 2, career_agent: 2 } },
      { label: "フルリモートで働きたい", scores: { remote: 2, ai_school: 1 } },
      { label: "残業を減らしたい", scores: { freedom: 2, coaching: 1 } },
      { label: "安定した会社で働きたい", scores: { stability: 2, qualification: 1 } },
      { label: "好きなことで稼ぎたい", scores: { passion: 2, side_business: 1 } },
      { label: "会社に依存しない働き方をしたい", scores: { side_business: 2, independence: 2 } },
    ],
  },
  {
    title: "今の自分に一番足りないと思うものは？",
    options: [
      { label: "スキル", scores: { ai_school: 2, qualification: 1 } },
      { label: "自信", scores: { coaching: 2 } },
      { label: "情報", scores: { career_agent: 2, roadmap: 1 } },
      { label: "行動力", scores: { coaching: 2 } },
      { label: "時間", scores: { efficiency: 2, ai_school: 1 } },
      { label: "何が足りないかもわからない", scores: { roadmap: 2, coaching: 1 } },
    ],
  },
  {
    title: "AIについて、今の自分に近いものは？",
    options: [
      { label: "ほとんど使ったことがない", scores: { ai_beginner: 2, ai_school: 1 } },
      { label: "ChatGPTを少し触ったことがある", scores: { ai_light: 2, ai_school: 1 } },
      { label: "仕事でたまに使っている", scores: { ai_use: 2, growth: 1 } },
      { label: "AIを使って副業や仕事に活かしたい", scores: { ai_school: 2, side_business: 1 } },
      { label: "AIに仕事を奪われないか不安", scores: { anxiety: 2, ai_school: 1 } },
      { label: "AIを学ぶ必要性は感じている", scores: { ai_school: 2 } },
    ],
  },
  {
    title: "副業について、今の気持ちに近いものは？",
    options: [
      { label: "興味はあるけど何をすればいいかわからない", scores: { side_business: 2, roadmap: 1 } },
      { label: "すでに少しやっている", scores: { side_business: 2, growth: 1 } },
      { label: "月5万円くらい稼ぎたい", scores: { side_business: 2, money: 1 } },
      { label: "将来的には独立したい", scores: { independence: 2, side_business: 2 } },
      { label: "本業が忙しくて難しい", scores: { efficiency: 2, coaching: 1 } },
      { label: "あまり興味はない", scores: { career_agent: 1, qualification: 1 } },
    ],
  },
  {
    title: "転職について、今の気持ちに近いものは？",
    options: [
      { label: "すぐにでも転職したい", scores: { career_agent: 3 } },
      { label: "良い求人があれば考えたい", scores: { career_agent: 2 } },
      { label: "自分の市場価値だけ知りたい", scores: { career_agent: 2 } },
      { label: "今の会社に不満はあるが動けていない", scores: { coaching: 2, career_agent: 1 } },
      { label: "転職は怖い", scores: { coaching: 2, anxiety: 1 } },
      { label: "今は転職するつもりはない", scores: { ai_school: 1, qualification: 1 } },
    ],
  },
  {
    title: "3年後、どの未来が一番しっくりくる？",
    options: [
      { label: "年収が上がって、お金の不安が減っている", scores: { money: 2, career_agent: 2 } },
      { label: "場所に縛られず自由に働いている", scores: { remote: 2, ai_school: 1 } },
      { label: "副業収入があり、会社だけに依存していない", scores: { side_business: 2 } },
      { label: "AIや専門スキルを身につけて市場価値が上がっている", scores: { ai_school: 2, qualification: 1 } },
      { label: "今より穏やかに、無理なく働いている", scores: { freedom: 2, coaching: 1 } },
      { label: "自分に合う仕事で前向きに働いている", scores: { career_agent: 2, coaching: 1 } },
    ],
  },
  {
    title: "今、一番知りたいことは？",
    options: [
      { label: "自分の市場価値", scores: { career_agent: 2 } },
      { label: "年収を上げる方法", scores: { career_agent: 2, money: 1 } },
      { label: "AI時代に必要なスキル", scores: { ai_school: 2 } },
      { label: "副業で稼ぐ方法", scores: { side_business: 2 } },
      { label: "自分に向いている働き方", scores: { coaching: 2 } },
      { label: "何から始めればいいか", scores: { roadmap: 2 } },
    ],
  },
];

const resultTypes: Record<PrimaryKey, ResultType> = {
  career_agent: {
    id: "type-a",
    routeKey: "career_agent",
    name: "市場価値アップタイプ",
    flavorName: "可能性を広げる開拓者タイプ",
    badge: "転職・市場価値ルート",
    firstStep: "まずは市場価値を知ること",
    copy:
      "今の職場だけで判断せず、外の市場価値を確認すると可能性が広がるタイプです。",
    oneLine: "今の会社だけで自分を判断するのは少しもったいないタイプです。",
    recommendationReason:
      "外の選択肢を知ることで、転職する・しないの判断がしやすくなり、今の仕事を続ける場合も納得感を持ちやすくなります。",
    currentState: ["今の評価や年収に少し物足りなさがある", "自分の市場価値を客観的に知りたい", "すぐ転職するかは慎重に判断したい"],
    future: ["自分に合う求人や職種がわかる", "年収アップの可能性を確認できる", "今の会社に残る場合も判断材料が増える"],
    needs: ["自分の市場価値を知る", "年収アップ事例を確認する", "気になる会社や職種を比較する"],
    actions: ["自分の市場価値を確認する", "年収アップ事例を見る", "気になる会社を比較する"],
    beforeFuture: ["今の会社の評価だけで可能性を判断しやすい", "求人や年収相場を調べても比較しにくい", "動くべきか残るべきか決めづらい"],
    afterFuture: ["自分に合う選択肢が見つかる", "年収や働き方の比較軸ができる", "行動するかどうかを落ち着いて判断できる"],
    futureStory: ["自分の適正年収がわかる", "求人を見る基準ができる", "転職するかどうかを落ち着いて判断できる", "今の会社に残る場合も納得感を持ちやすくなる"],
    similarSteps: ["市場価値を確認する", "年収アップ事例を見る", "気になる求人や会社を比較する"],
    quickWins: ["他社ではどんな評価なのか分かる", "年収アップの可能性を知れる", "今の会社に残る判断もしやすくなる"],
    ctaBenefits: ["あなたの市場価値", "年収アップ事例", "自分に合う求人"],
    aiMessage:
      "今回の回答からは、今の場所を大切にしながらも、もっと可能性を知りたい気持ちが伝わってきました。焦って転職を決める必要はありません。まず外の評価を知るだけでも、未来の見え方は少し変わります。",
    hope: "あなたには、まだ見えていない選択肢があります。",
    cta: "無料で市場価値を見てみる",
    accent: "from-sky-400 to-blue-500",
  },
  ai_school: {
    id: "type-b",
    routeKey: "ai_school",
    name: "AI活用スタートタイプ",
    flavorName: "未来の道具を試す探究者タイプ",
    badge: "AI学習ルート",
    firstStep: "まずはAIスキルを知ること",
    copy:
      "転職や副業の前に、AIスキルを身につけることで選択肢が増えるタイプです。",
    oneLine: "新しいスキルを味方につけると、未来の選択肢が一気に広がりやすいタイプです。",
    recommendationReason:
      "AIの使い方を知ると、今の仕事の効率化、転職時の強み、副業の入り口が同時に見えやすくなります。",
    currentState: ["将来への不安はある", "何を始めればいいか迷っている", "スキルを身につけたい気持ちがある"],
    future: ["AIを仕事で使える", "転職や副業の選択肢が増える", "収入アップの可能性が広がる"],
    needs: ["AIで何ができるかを知る", "仕事での活用例を確認する", "自分に合う学び方を選ぶ"],
    actions: ["AIで何ができるか知る", "仕事での活用例を見る", "無料講座を見る"],
    beforeFuture: ["何を学ぶべきか決めきれない", "AIに興味はあるが仕事への使い方が見えにくい", "情報収集だけで止まりやすい"],
    afterFuture: ["AIを日常業務に使うイメージが持てる", "学ぶ順番がわかる", "転職・副業にもつながるスキルの土台ができる"],
    futureStory: ["AIでできることが具体的にわかる", "日々の作業を効率化するヒントが見つかる", "転職や副業で使えるスキルの方向性が見える", "学ぶ順番が整理されて動き出しやすくなる"],
    similarSteps: ["AIで何ができるか知る", "仕事での活用例を見る", "無料講座や学習ルートを見る"],
    quickWins: ["AIを仕事で使えるようになる", "作業時間を短縮できる可能性がある", "転職・副業にも応用しやすくなる"],
    ctaBenefits: ["AIでできること", "仕事での活用例", "自分に合う学習ルート"],
    aiMessage:
      "今回の回答からは、これからの時代に合わせて自分をアップデートしたい気持ちが伝わってきました。完璧に学ぼうとしなくて大丈夫です。まず一つ、仕事で使えるAIの使い方を知るだけでも、未来の選択肢は増えていきます。",
    hope: "未来は、少し学ぶだけで見え方が変わることがあります。",
    cta: "AIを仕事で使う方法を見る",
    accent: "from-violet-400 to-sky-400",
  },
  side_business: {
    id: "type-c",
    routeKey: "side_business",
    name: "副業チャレンジタイプ",
    flavorName: "収入源を育てるチャレンジャータイプ",
    badge: "副業スタートルート",
    firstStep: "まずは自分に合う副業を知ること",
    copy:
      "会社以外の収入源を小さく作ることで、将来の不安を減らせるタイプです。",
    oneLine: "小さな収入源を育てることで、安心感を増やしやすいタイプです。",
    recommendationReason:
      "いきなり大きく始めるより、自分の生活リズムに合う副業を知ることで、無理なく最初の一歩を選びやすくなります。",
    currentState: ["会社だけに頼ることに少し不安がある", "副業に興味はあるが選び方に迷っている", "本業との両立も大事にしたい"],
    future: ["月1万円から副収入を目指せる", "自分に合う副業ジャンルが見つかる", "会社に依存しすぎない安心感が増える"],
    needs: ["自分に合う副業ジャンルを知る", "月3万円の事例を見る", "無料で始め方を確認する"],
    actions: ["自分に合う副業を知る", "月3万円の事例を見る", "無料で始め方を見る"],
    beforeFuture: ["副業に興味はあっても選び方で迷いやすい", "本業が忙しく、始めるタイミングを逃しやすい", "自分にできる副業が見つかりにくい"],
    afterFuture: ["小さく始められる副業がわかる", "本業と両立する進め方が見える", "会社以外の収入源を作る準備ができる"],
    futureStory: ["自分に合う副業ジャンルが見えてくる", "月3万円を目指す進め方のイメージが持てる", "本業と両立するペースを考えやすくなる", "会社以外の収入源を作る準備が始められる"],
    similarSteps: ["自分に合う副業を知る", "月3万円の事例を見る", "無料で始め方を見る"],
    quickWins: ["小さな収入源を考えられる", "お金の不安を減らせる可能性がある", "将来の選択肢を増やしやすくなる"],
    ctaBenefits: ["自分に合う副業ジャンル", "月3万円を目指す事例", "無料で始める流れ"],
    aiMessage:
      "今回の回答からは、今の生活を大切にしながら、少しずつ余白を作りたい気持ちが伝わってきました。副業は大きく始めなくても大丈夫です。自分に合う小さな一歩を知るだけでも、安心感は少しずつ育っていきます。",
    hope: "小さな一歩も、未来の選択肢を増やす立派な準備です。",
    cta: "自分に合う副業を見てみる",
    accent: "from-emerald-400 to-teal-400",
  },
  coaching: {
    id: "type-d",
    routeKey: "coaching",
    name: "働き方アップデートタイプ",
    flavorName: "未来の優先順位を整えるナビゲータータイプ",
    badge: "キャリア相談ルート",
    firstStep: "まずは働き方の優先順位を整理すること",
    copy:
      "今すぐ何かを始めるより、まずは自分の方向性を整理することが大切なタイプです。",
    oneLine: "選択肢が多いからこそ、自分に合う順番を見つけると前に進みやすいタイプです。",
    recommendationReason:
      "選択肢が多い時ほど、価値観や生活の優先順位を整理すると、自分に合うルートを選びやすくなります。",
    currentState: ["変えたい気持ちはあるが選択肢が多くて迷っている", "自分に合う働き方を言語化したい", "失敗しにくい順番で動きたい"],
    future: ["自分の優先順位がはっきりする", "転職・副業・学習の比較がしやすくなる", "納得感のある行動計画を作れる"],
    needs: ["今の不安を言葉にする", "理想の働き方を具体化する", "転職・副業・学習を比較する"],
    actions: ["働き方の優先順位を書き出す", "自分に合う選択肢を比較する", "キャリア相談で方向性を確認する"],
    beforeFuture: ["何から始めるべきかわからない", "情報収集だけで終わりやすい", "決めきれない状態が続きやすい"],
    afterFuture: ["行動の優先順位が決まる", "自分に合う選択肢を選びやすくなる", "相談するかどうかも落ち着いて判断できる"],
    futureStory: ["自分が大切にしたい働き方が言葉になる", "転職・AI・副業のどれから見るか決めやすくなる", "周りと比べずに判断しやすくなる", "次の一歩を小さく選べるようになる"],
    similarSteps: ["働き方の優先順位を整理する", "選択肢を比較する", "キャリア相談で方向性を確認する"],
    quickWins: ["行動の優先順位が決まる", "自分に合う選択肢が見つかりやすくなる", "迷いを一人で抱え込みにくくなる"],
    ctaBenefits: ["自分に合う働き方", "転職・副業・学習の比較", "今やるべき一歩"],
    aiMessage:
      "今回の回答からは、ちゃんと納得してから進みたい気持ちが伝わってきました。その慎重さは、自分の人生を大切に考えている証拠です。焦らず整理すれば、あなたに合う進み方はきっと見つかります。",
    hope: "迷っている今も、未来を選ぶための大事な途中です。",
    cta: "無料でキャリア相談してみる",
    accent: "from-violet-400 to-indigo-400",
  },
  roadmap: {
    id: "type-d",
    routeKey: "roadmap",
    name: "キャリア整理タイプ",
    flavorName: "未来マップを整えるプランナータイプ",
    badge: "総合ロードマップ",
    firstStep: "まずは選択肢の優先順位を決めること",
    copy:
      "今すぐ何かを始めるより、まずは自分の方向性を整理することが大切なタイプです。",
    oneLine: "いろいろ気になるからこそ、最初の一歩を決めると安心しやすいタイプです。",
    recommendationReason:
      "転職・AI・副業・資格のどれも気になる時は、最初に全体像を整理すると迷いが減り、次の一歩が決めやすくなります。",
    currentState: ["何から始めればいいか迷っている", "情報を集めても決めきれない", "自分に合う順番を知りたい"],
    future: ["選択肢を落ち着いて比較できる", "今やることと後で考えることを分けられる", "小さな一歩を決めやすくなる"],
    needs: ["今の悩みを分類する", "理想の生活を具体化する", "最初に見るべき選択肢を決める"],
    actions: ["気になる選択肢を書き出す", "優先順位を3つに絞る", "キャリア相談で整理してみる"],
    beforeFuture: ["選択肢が多く、比べる軸が見えにくい", "調べるほど迷いが増えやすい", "最初の一歩を後回しにしやすい"],
    afterFuture: ["今見るべき選択肢がはっきりする", "行動の順番を決めやすくなる", "将来への不安が少し軽くなる可能性がある"],
    futureStory: ["気になっている選択肢を整理できる", "自分に合う順番が見えてくる", "やることと今は保留でいいことを分けられる", "小さな一歩を選びやすくなる"],
    similarSteps: ["気になる選択肢を書き出す", "優先順位を決める", "相談しながら最初の一歩を確認する"],
    quickWins: ["選択肢が整理される", "最初に見るべき情報がわかる", "将来への不安が少し小さくなる可能性がある"],
    ctaBenefits: ["選択肢の整理", "自分に合う優先順位", "次に見るべきルート"],
    aiMessage:
      "今回の回答からは、ちゃんと自分に合う道を見つけたい気持ちが伝わってきました。まだ決めきれていない時間も、未来を選ぶための準備です。選択肢を整理するだけでも、未来は少し見えやすくなります。",
    hope: "未来は決まっていません。これから選べます。",
    cta: "無料でキャリア相談してみる",
    accent: "from-violet-400 to-indigo-400",
  },
  qualification: {
    id: "type-e",
    routeKey: "qualification",
    name: "安定スキルアップタイプ",
    flavorName: "着実に準備するビルダータイプ",
    badge: "資格・専門スキルルート",
    firstStep: "まずは将来に強いスキルを知ること",
    copy:
      "大きなリスクを取るより、資格や専門スキルで着実に選択肢を増やすタイプです。",
    oneLine: "無理に大きく変えるより、着実な準備で未来を広げやすいタイプです。",
    recommendationReason:
      "安定を大切にしながら準備したい場合は、今の仕事にも次の選択肢にもつながるスキルを選ぶと続けやすくなります。",
    currentState: ["生活の安定を大切にしたい", "無理なく将来の準備を進めたい", "学ぶなら仕事に活かせるものを選びたい"],
    future: ["専門スキルで安心感が増える", "今の仕事にも次の仕事にも活かせる", "半年から1年単位で市場価値を育てられる"],
    needs: ["仕事と相性の良い資格を知る", "無理なく学べる講座を比較する", "半年単位の学習計画を作る"],
    actions: ["仕事と相性の良い資格を知る", "学びやすい講座を比較する", "半年単位の学習計画を見る"],
    beforeFuture: ["将来のために何を学ぶべきか迷いやすい", "忙しさで学習が後回しになりやすい", "資格や講座の比較が難しい"],
    afterFuture: ["自分に合うスキル候補が見つかる", "無理のない学習ペースが見える", "安定感を保ちながら選択肢を増やせる"],
    futureStory: ["今の仕事と相性の良いスキルが見えてくる", "無理なく学べる講座を比較できる", "半年単位の準備計画を立てやすくなる", "安定を保ちながら選択肢を増やせる"],
    similarSteps: ["将来に強いスキルを知る", "学びやすい講座を比較する", "半年単位の学習計画を見る"],
    quickWins: ["自分に合うスキル候補がわかる", "今の仕事にも活かしやすくなる", "安心感を保ちながら準備できる"],
    ctaBenefits: ["将来に強いスキル", "自分に合う資格・講座", "無理のない学習計画"],
    aiMessage:
      "今回の回答からは、生活の安定を大切にしながら、未来のために準備したい気持ちが伝わってきました。急に環境を変えなくても大丈夫です。少しずつ学ぶことも、未来を広げる確かな一歩です。",
    hope: "今の不安は、準備の順番が見えると少しずつ小さくできます。",
    cta: "将来に強いスキルを見てみる",
    accent: "from-blue-400 to-emerald-400",
  },
};

const routeLabels: Record<PrimaryKey, string> = {
  career_agent: "市場価値を見る",
  ai_school: "AIを学ぶ",
  side_business: "副業を知る",
  coaching: "働き方を相談する",
  qualification: "資格・専門スキルを知る",
  roadmap: "方向性を整理する",
};

const rankMarks = ["第一候補", "第二候補", "第三候補"];

const analysisMessages = [
  "回答内容を分析しています",
  "あなたの価値観を整理しています",
  "未来ロードマップを作成しています",
  "おすすめルートを生成しています",
  "あなたらしい特徴を抽出しています",
];

function calculateScores(answers: number[]) {
  const scores: Record<string, number> = {};

  answers.forEach((optionIndex, questionIndex) => {
    const option = questions[questionIndex]?.options[optionIndex];
    if (!option) return;

    Object.entries(option.scores).forEach(([key, value]) => {
      scores[key] = (scores[key] ?? 0) + value;
    });
  });

  if ((scores.stability ?? 0) >= 4) {
    scores.qualification = (scores.qualification ?? 0) + 2;
  }

  if ((scores.anxiety ?? 0) >= 4 && (scores.roadmap ?? 0) > 0) {
    scores.coaching = (scores.coaching ?? 0) + 1;
  }

  return scores;
}

function getRankedRoutes(scores: Record<string, number>) {
  return primaryKeys
    .map((key) => ({ key, score: scores[key] ?? 0 }))
    .sort((a, b) => b.score - a.score || primaryKeys.indexOf(a.key) - primaryKeys.indexOf(b.key));
}

function getAnswerReasons(scores: Record<string, number>, result: ResultType) {
  const reasons: string[] = [];

  if ((scores.anxiety ?? 0) >= 2 || (scores.vague_anxiety ?? 0) >= 2) {
    reasons.push("将来への不安を感じている");
  }
  if ((scores.lost ?? 0) >= 2 || (scores.roadmap ?? 0) >= 2) {
    reasons.push("何から始めればいいか迷っている");
  }
  if ((scores.money ?? 0) >= 2 || (scores.income_low ?? 0) >= 1) {
    reasons.push("収入や市場価値を見直したい気持ちがある");
  }
  if ((scores.remote ?? 0) >= 2 || (scores.freedom ?? 0) >= 2) {
    reasons.push("働き方の自由度を上げたい");
  }
  if ((scores.growth ?? 0) >= 2 || (scores.ai_school ?? 0) >= 2 || (scores.qualification ?? 0) >= 2) {
    reasons.push("スキルを身につけて選択肢を増やしたい");
  }
  if ((scores.side_business ?? 0) >= 2 || (scores.independence ?? 0) >= 2) {
    reasons.push("会社以外の収入源にも関心がある");
  }
  if ((scores.stability ?? 0) >= 2) {
    reasons.push("安定感を保ちながら準備したい");
  }

  const uniqueReasons = Array.from(new Set(reasons)).slice(0, 3);
  return uniqueReasons.length > 0 ? uniqueReasons : result.currentState;
}

function getPersonalityTraits(scores: Record<string, number>, result: ResultType) {
  const traits: string[] = [];

  if ((scores.coaching ?? 0) >= 2 || (scores.stability ?? 0) >= 2) {
    traits.push("慎重に判断したいタイプ");
  }
  if ((scores.ai_school ?? 0) >= 2 || (scores.growth ?? 0) >= 2 || (scores.qualification ?? 0) >= 2) {
    traits.push("新しいことを学ぶ意欲がある");
  }
  if ((scores.career_agent ?? 0) >= 2 || (scores.side_business ?? 0) >= 2 || (scores.remote ?? 0) >= 2) {
    traits.push("選択肢を広げたい気持ちがある");
  }
  if ((scores.roadmap ?? 0) >= 2 || (scores.lost ?? 0) >= 2) {
    traits.push("自分に合う道をちゃんと見つけたい");
  }
  if ((scores.life ?? 0) >= 2 || (scores.freedom ?? 0) >= 2) {
    traits.push("働き方と暮らしのバランスを大切にしたい");
  }
  if ((scores.independence ?? 0) >= 2 || (scores.side_business ?? 0) >= 3) {
    traits.push("自分で未来を作っていきたい気持ちがある");
  }

  return Array.from(new Set(traits)).slice(0, 4).concat(result.currentState).slice(0, 4);
}

function getStrengths(scores: Record<string, number>) {
  const strengths: string[] = [];

  if ((scores.coaching ?? 0) >= 2 || (scores.stability ?? 0) >= 2) {
    strengths.push("慎重に考えられる");
    strengths.push("納得して行動するタイプ");
  }
  if ((scores.ai_school ?? 0) >= 2 || (scores.growth ?? 0) >= 2) {
    strengths.push("学ぶ意欲がある");
  }
  if ((scores.roadmap ?? 0) >= 1 || (scores.vague_anxiety ?? 0) >= 1 || (scores.lost ?? 0) >= 1) {
    strengths.push("変わりたい気持ちがある");
  }
  if ((scores.career_agent ?? 0) >= 2 || (scores.side_business ?? 0) >= 2 || (scores.remote ?? 0) >= 1) {
    strengths.push("視野を広げようとしている");
  }
  if ((scores.ai_beginner ?? 0) >= 1 || (scores.ai_light ?? 0) >= 1 || (scores.ai_use ?? 0) >= 1) {
    strengths.push("新しいことへの抵抗が少ない");
  }
  if ((scores.stability ?? 0) >= 2 || (scores.life ?? 0) >= 2) {
    strengths.push("責任感がある");
  }

  const fallback = ["自分の未来をちゃんと考えられる", "小さく動き出す準備ができている", "選択肢を広げようとしている"];
  return Array.from(new Set(strengths.concat(fallback))).slice(0, 4);
}

function getInterestWords(scores: Record<string, number>) {
  const interests: string[] = [];

  if ((scores.money ?? 0) >= 2 || (scores.income_low ?? 0) >= 1) interests.push("収入");
  if ((scores.freedom ?? 0) >= 2 || (scores.remote ?? 0) >= 1) interests.push("働き方");
  if ((scores.ai_school ?? 0) >= 2) interests.push("AIスキル");
  if ((scores.side_business ?? 0) >= 2) interests.push("副業");
  if ((scores.stability ?? 0) >= 2 || (scores.qualification ?? 0) >= 2) interests.push("安定");
  if ((scores.roadmap ?? 0) >= 2 || (scores.coaching ?? 0) >= 2) interests.push("方向性");

  return interests.slice(0, 2);
}

function getFutureKeywords(scores: Record<string, number>, result: ResultType) {
  const keywords: string[] = [];

  if ((scores.ai_school ?? 0) >= 2 || (scores.growth ?? 0) >= 2) keywords.push("学び");
  if ((scores.money ?? 0) >= 2 || (scores.career_agent ?? 0) >= 2) keywords.push("収入");
  if ((scores.freedom ?? 0) >= 2 || (scores.remote ?? 0) >= 1) keywords.push("自由");
  if ((scores.stability ?? 0) >= 2 || (scores.qualification ?? 0) >= 2) keywords.push("安心");
  if ((scores.side_business ?? 0) >= 2 || (scores.independence ?? 0) >= 2) keywords.push("挑戦");
  if ((scores.coaching ?? 0) >= 2 || (scores.roadmap ?? 0) >= 2) keywords.push("働き方");

  const defaults: Record<PrimaryKey, string[]> = {
    career_agent: ["挑戦", "収入", "選択"],
    ai_school: ["学び", "成長", "可能性"],
    side_business: ["挑戦", "安心", "自由"],
    coaching: ["整理", "納得", "働き方"],
    roadmap: ["整理", "選択", "安心"],
    qualification: ["安心", "学び", "成長"],
  };

  return Array.from(new Set(keywords.concat(defaults[result.routeKey]))).slice(0, 3);
}

function getPotentialMessage(key: PrimaryKey) {
  const messages: Record<PrimaryKey, string> = {
    career_agent:
      "あなたは、自分の可能性をちゃんと確かめたい人です。今まで立ち止まっていた時間は、納得できる材料をちゃんと探していた時間です。",
    ai_school:
      "あなたは、未来に必要なものを感じ取れる人です。新しいことをいきなり完璧に始めるより、小さく試して納得しながら進む方が力を出しやすいタイプです。",
    side_business:
      "あなたは、今の生活を守りながら安心できる未来を作りたい人です。大きな変化よりも、自分に合う小さな一歩を見つけた時に、ちゃんと動ける力があります。",
    coaching:
      "あなたは、ちゃんと納得して選びたい人です。今まで動けなかった時間にも、自分に合う選択肢を丁寧に探していた意味があります。",
    roadmap:
      "あなたは、自分に合う道をちゃんと見つけたい人です。選択肢が多すぎる時は、迷うのも自然です。順番が見えると、気持ちは少し軽くなります。",
    qualification:
      "あなたは、大切なものを守りながら未来の準備をしたい人です。焦って変えるより、着実に積み上げる方が、あなたらしい安心につながります。",
  };

  return messages[key];
}

function getAiTitle(key: PrimaryKey) {
  const titles: Record<PrimaryKey, string> = {
    career_agent: "可能性を広げられる人",
    ai_school: "未来を学びに変えられる人",
    side_business: "安心を育てる人",
    coaching: "慎重に未来を選べる人",
    roadmap: "小さな一歩を積み重ねられる人",
    qualification: "着実に未来を整える人",
  };

  return titles[key];
}

function getCommonFeatures(key: PrimaryKey) {
  const features: Record<PrimaryKey, string[]> = {
    career_agent: ["今の評価だけで決めきれない", "情報を集めてから判断したい", "納得すると行動が早い"],
    ai_school: ["新しいスキルが気になっている", "学ぶなら仕事に活かしたい", "まず具体例を見たい"],
    side_business: ["副業に興味はあるが選び方で迷う", "本業との両立を大切にしたい", "小さく始める方が安心できる"],
    coaching: ["情報を集めすぎて決められない", "失敗したくない気持ちが強い", "納得すると一気に行動できる"],
    roadmap: ["選択肢が多くて迷いやすい", "最初の一歩を決めるまで時間をかける", "整理されると前に進みやすい"],
    qualification: ["安定を大切にしながら準備したい", "学ぶなら確実に役立つものを選びたい", "コツコツ積み上げるのが得意"],
  };

  return features[key];
}

function getCommonFirstStep(key: PrimaryKey) {
  const steps: Record<PrimaryKey, string> = {
    career_agent: "市場価値診断を見る人が多いです。",
    ai_school: "AIの活用例を見て、学び始める人が多いです。",
    side_business: "自分に合う副業の選び方を見る人が多いです。",
    coaching: "キャリア相談で方向性を整理する人が多いです。",
    roadmap: "選択肢を比較して、優先順位を決める人が多いです。",
    qualification: "将来に強いスキルや資格を調べる人が多いです。",
  };

  return steps[key];
}

function getEssence(result: ResultType) {
  const essence: Record<PrimaryKey, string> = {
    career_agent: "今の会社だけで自分を決めず、外の可能性も確かめたい人です。",
    ai_school: "新しいスキルを味方にして、未来の選択肢を増やしたい人です。",
    side_business: "会社だけに頼らず、安心できる未来を少しずつ作りたい人です。",
    coaching: "焦って決めるより、自分に合う働き方を丁寧に見つけたい人です。",
    roadmap: "たくさんの選択肢の中から、自分に合う順番を見つけたい人です。",
    qualification: "安定を大切にしながら、未来に向けて着実に準備したい人です。",
  };

  return essence[result.routeKey];
}

function getEndingMessage() {
  return ["未来は", "「才能」", "ではなく", "「選択」", "で変わります。", "今日の2分が", "半年後のあなたを作ります。"];
}

function getRouteReason(key: PrimaryKey, score: number) {
  const reasons: Record<PrimaryKey, string> = {
    career_agent: `最初に市場価値を見ることで、今後の判断がしやすくなる可能性があります。`,
    ai_school: `AI活用を知ると、仕事・転職・副業に応用しやすくなります。`,
    side_business: `副業を知ることで、小さな安心材料を作りやすくなります。`,
    coaching: `働き方の優先順位を整理すると、迷いを減らしやすくなります。`,
    qualification: `資格や専門スキルは、無理なく選択肢を増やしやすいルートです。`,
    roadmap: `全体像を整理すると、最初の一歩を決めやすくなります。`,
  };

  return reasons[key];
}

export default function Home() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAdvancing, setIsAdvancing] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const isComplete = answers.length === questions.length;

  const scores = useMemo(() => calculateScores(answers), [answers]);
  const rankedRoutes = useMemo(() => getRankedRoutes(scores), [scores]);
  const result = resultTypes[rankedRoutes[0]?.key ?? "roadmap"];
  const answerReasons = useMemo(() => getAnswerReasons(scores, result), [scores, result]);
  const personalityTraits = useMemo(() => getPersonalityTraits(scores, result), [scores, result]);
  const strengths = useMemo(() => getStrengths(scores), [scores]);
  const interestWords = useMemo(() => getInterestWords(scores), [scores]);
  const futureKeywords = useMemo(() => getFutureKeywords(scores, result), [scores, result]);
  const endingLines = useMemo(() => getEndingMessage(), []);
  const shareCardRef = useRef<HTMLDivElement>(null);
  const resultAffiliateUrl = getAffiliateUrl(result.routeKey);
  const resultAffiliateConfigured = isAffiliateConfigured(result.routeKey);
  const progress = isComplete ? 100 : Math.round((answers.length / questions.length) * 100);
  const currentAnswer = answers[currentQuestion];
  const [analysisIndex, setAnalysisIndex] = useState(0);
  const analysisMessage = analysisMessages[analysisIndex];

  useEffect(() => {
    if (!isAnalyzing) return;

    const timer = window.setInterval(() => {
      setAnalysisIndex((index) => (index + 1) % analysisMessages.length);
    }, 420);

    return () => window.clearInterval(timer);
  }, [isAnalyzing]);

  function selectAnswer(optionIndex: number) {
    if (isAdvancing) return;

    setSelectedOption(optionIndex);
    setIsAdvancing(true);

    window.setTimeout(() => {
      const nextAnswers = [...answers];
      nextAnswers[currentQuestion] = optionIndex;
      const normalized = nextAnswers.slice(0, currentQuestion + 1);
      setAnswers(normalized);
      setSelectedOption(null);
      setIsAdvancing(false);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setAnalysisIndex(Math.floor(Math.random() * analysisMessages.length));
        setIsAnalyzing(true);
        window.setTimeout(() => {
          setIsAnalyzing(false);
        }, 1700);
      }
    }, 260);
  }

  function goBack() {
    if (isAdvancing || isAnalyzing) return;
    setCurrentQuestion(Math.max(0, currentQuestion - 1));
  }

  function restart() {
    setStarted(false);
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedOption(null);
    setIsAdvancing(false);
    setIsAnalyzing(false);
  }

  function downloadShareCard() {
    const strengthLines = strengths.slice(0, 3);
    const keywordLines = futureKeywords;
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080" viewBox="0 0 1080 1080">
        <defs>
          <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#f0f9ff"/>
            <stop offset="52%" stop-color="#ffffff"/>
            <stop offset="100%" stop-color="#f5f3ff"/>
          </linearGradient>
        </defs>
        <rect width="1080" height="1080" rx="64" fill="url(#bg)"/>
        <rect x="70" y="70" width="940" height="940" rx="48" fill="white" stroke="#dbeafe" stroke-width="4"/>
        <text x="110" y="150" fill="#0369a1" font-size="34" font-weight="700" font-family="Arial, sans-serif">AI人生設計図</text>
        <text x="110" y="265" fill="#0f172a" font-size="46" font-weight="700" font-family="Arial, sans-serif">あなたは</text>
        <text x="110" y="345" fill="#0f172a" font-size="70" font-weight="900" font-family="Arial, sans-serif">${result.name}</text>
        <text x="110" y="425" fill="#475569" font-size="32" font-weight="700" font-family="Arial, sans-serif">でした。</text>
        <text x="110" y="520" fill="#0f172a" font-size="36" font-weight="900" font-family="Arial, sans-serif">あなたの強み</text>
        ${strengthLines
          .map((strength, index) => `<text x="120" y="${590 + index * 54}" fill="#334155" font-size="34" font-weight="700" font-family="Arial, sans-serif">✓ ${strength}</text>`)
          .join("")}
        <text x="110" y="785" fill="#0f172a" font-size="36" font-weight="900" font-family="Arial, sans-serif">未来キーワード</text>
        ${keywordLines
          .map((keyword, index) => `<rect x="${110 + index * 230}" y="830" width="190" height="74" rx="37" fill="#e0f2fe"/><text x="${205 + index * 230}" y="878" text-anchor="middle" fill="#075985" font-size="34" font-weight="900" font-family="Arial, sans-serif">${keyword}</text>`)
          .join("")}
        <text x="110" y="970" fill="#64748b" font-size="30" font-weight="700" font-family="Arial, sans-serif">#AI人生設計図</text>
      </svg>`;
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ai-life-roadmap.svg";
    link.click();
    URL.revokeObjectURL(url);
  }

  function handleAffiliateClick(event: MouseEvent<HTMLAnchorElement>, configured: boolean) {
    if (configured) return;

    event.preventDefault();
    window.alert("リンク先URLがまだ設定されていません。公開前にアフィリエイトURLを設定してください。");
  }

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-5 text-ink sm:px-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),transparent)]" />
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
          <section className="flex flex-1 flex-col justify-center gap-8 pb-8 pt-10 md:grid md:grid-cols-[1.05fr_0.95fr] md:items-center md:py-12">
            <div>
              <div className="mb-5 inline-flex rounded-full border border-sky-100 bg-white/80 px-3 py-1 text-xs font-bold text-sky-700 shadow-sm">
                2分で完了 / 登録不要 / すべて選択式
              </div>
              <h1 className="text-4xl font-black leading-tight text-slate-950 sm:text-6xl">
                あなたに合う
                <span className="mt-1 block bg-gradient-to-r from-sky-600 via-blue-600 to-violet-600 bg-clip-text text-transparent">
                  “未来の選択肢”がわかる
                </span>
              </h1>
              <p className="mt-6 max-w-xl whitespace-pre-line text-base leading-8 text-slate-600 sm:text-lg">
                {`転職するべき？
AIを学ぶべき？
副業を始めるべき？
何から動けばいいかわからないあなたへ。

今の状況と理想の未来から、あなたに合う行動ルートを無料で診断します。`}
              </p>
              <button
                type="button"
                onClick={() => setStarted(true)}
                className="mt-8 w-full rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-4 text-base font-black text-white shadow-action transition hover:translate-y-[-1px] active:translate-y-0 sm:w-auto"
              >
                無料で診断をはじめる
              </button>
              <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs font-bold text-slate-600">
                {["2分で完了", "登録不要", "選択式"].map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-100 bg-white/80 px-2 py-3 shadow-sm">
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <p className="mb-3 text-xs font-bold text-slate-500">実際にわかるタイプ例</p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    ["AI活用スタートタイプ", "AIを仕事で使う方法が見える"],
                    ["市場価値アップタイプ", "外の可能性を確認できる"],
                    ["副業チャレンジタイプ", "小さな収入源の作り方が見える"],
                  ].map(([title, text]) => (
                    <div key={title} className="rounded-2xl border border-slate-100 bg-white/90 p-4 shadow-sm">
                      <p className="text-sm font-black text-slate-900">{title}</p>
                      <p className="mt-2 text-xs leading-5 text-slate-500">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 rounded-[1.5rem] border border-slate-100 bg-white/90 p-4 shadow-sm">
                <h2 className="text-base font-black text-slate-950">こんな悩みありませんか？</h2>
                <div className="mt-4 grid gap-2 text-sm font-bold text-slate-700 sm:grid-cols-2">
                  {[
                    "転職するべきかわからない",
                    "AIが気になるけど何から始めればいいかわからない",
                    "副業に興味はある",
                    "今のままでいいのか少し不安",
                    "収入を上げたい",
                    "何が自分に向いているかわからない",
                  ].map((worry) => (
                    <div key={worry} className="flex gap-2 rounded-2xl bg-sky-50/70 px-3 py-2">
                      <span className="text-sky-600">□</span>
                      <span>{worry}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-sm font-bold leading-6 text-slate-600">どれか一つでも当てはまる人向けです。まずは自分に合うルートを知るところから始められます。</p>
              </div>
            </div>

            <div className="glass rounded-[2rem] p-5">
              <div className="rounded-[1.5rem] border border-sky-100 bg-gradient-to-br from-white to-sky-50 p-4">
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-sm font-bold text-slate-800">診断でわかること</p>
                  <p className="rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-700">Preview</p>
                </div>
                <div className="space-y-4">
                  {[
                    ["今の状況", "何に不安を感じているか"],
                    ["合う選択肢", "転職 / AI / 副業 / 相談 / 資格"],
                    ["次の一歩", "無理なく始める行動ルート"],
                  ].map(([label, value], index) => (
                    <div key={label} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-sky-400 to-violet-400 text-sm font-black text-white">
                          {index + 1}
                        </div>
                        {index < 2 ? <div className="h-10 w-px bg-sky-200" /> : null}
                      </div>
                      <div className="pb-2">
                        <p className="text-xs font-bold text-sky-700">{label}</p>
                        <p className="font-bold text-slate-800">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ) : isComplete && isAnalyzing ? (
          <section className="flex flex-1 flex-col justify-center py-8">
            <div className="glass mx-auto w-full max-w-xl rounded-[2rem] p-8 text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-gradient-to-br from-sky-400 to-violet-400 text-lg font-black text-white shadow-glow">
                AI
              </div>
              <p className="mt-6 text-sm font-bold text-sky-700">{analysisMessage}...</p>
              <h2 className="mt-3 text-2xl font-black leading-tight text-slate-950 sm:text-4xl">
                あなた専用の未来ロードマップを作成中...
              </h2>
              <div className="mt-7 h-2 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-2/3 animate-roadmap rounded-full bg-gradient-to-r from-sky-400 via-action to-violet-400" />
              </div>
            </div>
          </section>
        ) : isComplete ? (
          <section className="pb-8 pt-6">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-bold text-sky-700">AIによる未来コンパス</p>
              <button type="button" onClick={restart} className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 shadow-sm">
                もう一度診断
              </button>
            </div>

            <div className="glass rounded-[2rem] p-5 sm:p-7">
              <div className="mb-5 inline-flex rounded-full border border-sky-100 bg-sky-50 px-3 py-1 text-xs font-bold text-sky-700">
                AIによる未来コンパス
              </div>
              <h2 className="text-2xl font-black text-slate-950 sm:text-4xl">あなた専用の未来ロードマップ</h2>
              <div className="mt-4 rounded-[1.5rem] bg-gradient-to-br from-sky-50 via-white to-violet-50 p-5 sm:p-7">
                <p className="text-3xl font-black leading-tight text-slate-950 sm:text-5xl">
                  今の回答を見る限り、焦って人生を大きく変える必要はありません。
                </p>
                <p className="mt-5 whitespace-pre-line text-base font-bold leading-8 text-slate-700">
                  {`今のあなたに必要なのは、もっと頑張ることではなく、順番を整理することです。

迷いの正体は、選択肢が多すぎることかもしれません。`}
                </p>
              </div>

              <div className="mt-5 rounded-[1.5rem] border border-sky-100 bg-white p-5 shadow-sm">
                <p className="text-sm font-bold text-slate-500">あなたの本質</p>
                <p className="mt-2 text-2xl font-black leading-9 text-slate-950">{getEssence(result)}</p>
                <p className="mt-4 text-sm font-bold leading-7 text-slate-600">
                  その結果、AIは補足として「{result.name}」と判断しました。
                </p>
                <div className="mt-5 rounded-2xl bg-white/85 p-4 shadow-sm">
                  <p className="text-xs font-black text-sky-700">一言でいうと</p>
                  <p className="mt-2 text-lg font-black leading-8 text-slate-900">「{result.oneLine}」</p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <InfoPanel title="あなたらしい特徴" items={personalityTraits} />
                <InfoPanel title="AIが感じたあなたの強み" items={strengths} />
              </div>

              <div className="mt-6 rounded-[1.5rem] border border-violet-100 bg-gradient-to-br from-white to-violet-50 p-5 shadow-sm">
                <h3 className="text-lg font-black text-slate-950">AIが気付いたあなたの可能性</h3>
                <p className="mt-3 text-base font-bold leading-8 text-slate-700">{getPotentialMessage(result.routeKey)}</p>
                <div className="mt-5 rounded-2xl bg-white/85 p-4 shadow-sm">
                  <p className="text-base font-black leading-8 text-slate-900">
                    今まで前に進めなかった時間にも、ちゃんと意味があります。
                  </p>
                  <p className="mt-2 text-base font-black leading-8 text-slate-900">
                    自分に合う選択肢を、ちゃんと探していたからです。
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-[1.5rem] border border-sky-100 bg-white p-5 text-center shadow-sm">
                <p className="text-sm font-bold text-slate-500">AIから見たあなたを一言で表すと</p>
                <p className="mt-3 text-3xl font-black leading-tight text-slate-950">『{getAiTitle(result.routeKey)}』</p>
              </div>

              <div className="mt-6 rounded-[1.5rem] border border-sky-100 bg-white p-5 shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.12em] text-sky-700">最初に見るべき選択肢</p>
                <p className="mt-2 text-2xl font-black text-slate-950">{result.firstStep}</p>
                <p className="mt-3 text-sm font-bold leading-7 text-slate-600">{result.recommendationReason}</p>
              </div>

              <div className="mt-6 rounded-[1.5rem] border border-slate-100 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-black text-slate-950">あなたがこのタイプになった理由</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">今回の回答では、次の傾向が多く見られました。</p>
                <ul className="mt-4 space-y-2">
                  {answerReasons.map((reason) => (
                    <li key={reason} className="flex gap-2 text-sm font-bold leading-6 text-slate-700">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700">✓</span>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm font-bold leading-7 text-slate-700">
                  そのため、まずは「{result.firstStep}」から始めると、今後の選択肢を整理しやすくなる可能性があります。
                </p>
              </div>

              <div className="mt-6 rounded-[1.5rem] border border-violet-100 bg-gradient-to-br from-white to-violet-50 p-5 shadow-sm">
                <h3 className="text-lg font-black text-slate-950">半年後のあなた（イメージ）</h3>
                <p className="mt-3 text-sm font-bold leading-7 text-slate-600">もし「{result.firstStep}」から始めると...</p>
                <ul className="mt-4 space-y-2">
                  {result.futureStory.map((story) => (
                    <li key={story} className="flex gap-2 text-sm font-bold leading-6 text-slate-700">
                      <span className="mt-1 h-5 w-5 shrink-0 rounded-full bg-violet-100 text-center text-xs leading-5 text-violet-700">✓</span>
                      <span>{story}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm font-black leading-7 text-slate-700">
                  半年後には「こんな選択肢もあったんだ」と、今日より少し未来を楽しみに感じられるかもしれません。
                </p>
                <p className="mt-4 text-xs leading-5 text-slate-500">※診断内容に基づく参考イメージです。</p>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <InfoPanel title="このタイプの人によくある特徴" items={getCommonFeatures(result.routeKey)} />
                <div className="rounded-[1.5rem] border border-slate-100 bg-white p-4 shadow-sm">
                  <h3 className="mb-3 text-sm font-black text-slate-900">このタイプの人が選ぶことが多い最初の一歩</h3>
                  <p className="text-sm font-bold leading-7 text-slate-700">{getCommonFirstStep(result.routeKey)}</p>
                  <p className="mt-3 text-xs leading-5 text-slate-500">※診断タイプの参考例です。実際の統計ではなく、よくある進め方のイメージです。</p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <InfoPanel title="あなたと似たタイプの人のよくある進め方" items={result.similarSteps} ordered />
                <InfoPanel title="最初の一歩で見えてくる小さな成功イメージ" items={result.quickWins} />
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <InfoPanel title="今のあなた" items={result.currentState} />
                <InfoPanel title="目指せる未来" items={result.future} />
                <InfoPanel title="未来の選択肢を増やすために" items={result.needs} />
                <InfoPanel title="おすすめアクション" items={result.actions} ordered />
              </div>

              <div className="mt-6 rounded-[1.5rem] border border-slate-100 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-black text-slate-950">半年後のあなた</h3>
                <div className="mt-4 grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
                  <InfoPanel title="何もしなかった場合" items={result.beforeFuture} />
                  <div className="grid h-10 w-10 place-items-center justify-self-center rounded-full bg-sky-100 text-lg font-black text-sky-700">→</div>
                  <InfoPanel title="今日小さく始めた場合" items={result.afterFuture} />
                </div>
              </div>

              <div className="mt-7 rounded-[1.5rem] border border-sky-100 bg-sky-50/80 p-4">
                <p className="text-sm font-bold leading-7 text-slate-700">
                  あなたの場合は、まずこの選択肢から見るのがおすすめです。情報を見るだけでも今後の選択肢が整理しやすくなります。相談するかどうかは、見てから判断できます。
                </p>
              </div>
              <div className="mt-4 rounded-[1.5rem] border border-slate-100 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-black text-slate-950">こんな人がこのルートを選んでいます</h3>
                <p className="mt-2 text-xs font-bold text-slate-500">※診断タイプの参考例です。</p>
                <div className="mt-4">
                  <InfoPanel title="よくある進め方" items={result.similarSteps} ordered />
                </div>
              </div>
              <div className="mt-4">
                <InfoPanel title="このページを見ると分かること" items={result.ctaBenefits} />
              </div>
              <a
                href={resultAffiliateUrl}
                onClick={(event) => handleAffiliateClick(event, resultAffiliateConfigured)}
                target={resultAffiliateConfigured ? "_blank" : undefined}
                rel={resultAffiliateConfigured ? "noopener noreferrer sponsored" : undefined}
                className="mt-4 block rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-4 text-center text-base font-black text-white shadow-action transition hover:translate-y-[-1px] active:translate-y-0"
              >
                最初の一歩を見てみる
              </a>

              <div className="mt-6">
                <p className="mb-3 text-lg font-black text-slate-950">あなたへのおすすめ順位</p>
                <div className="grid gap-3">
                  {rankedRoutes.slice(0, 3).map((route, index) => (
                    <a
                      key={route.key}
                      href={getAffiliateUrl(route.key)}
                      onClick={(event) => handleAffiliateClick(event, isAffiliateConfigured(route.key))}
                      target={isAffiliateConfigured(route.key) ? "_blank" : undefined}
                      rel={isAffiliateConfigured(route.key) ? "noopener noreferrer sponsored" : undefined}
                      className="rounded-2xl border border-slate-100 bg-white p-4 text-sm text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200"
                    >
                      <span className="text-xs font-black text-sky-700">{rankMarks[index]}</span>
                      <span className="ml-2 text-amber-400">★★★★★</span>
                      <span className="mt-1 block text-lg font-black text-slate-950">{routeLabels[route.key]}</span>
                      <span className="mt-1 block font-bold text-slate-700">{resultTypes[route.key].name}</span>
                      <span className="mt-3 block text-xs font-black text-slate-500">おすすめ理由</span>
                      <span className="mt-1 block text-sm leading-6 text-slate-500">
                        今の回答では{interestWords.length > 0 ? `「${interestWords.join("」「")}」` : "未来の選択肢"}への関心が見られました。{getRouteReason(route.key, route.score)}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-[1.5rem] border border-sky-100 bg-gradient-to-br from-sky-50 to-white p-5 shadow-sm">
                <h3 className="text-lg font-black text-slate-950">あなたの未来キーワード</h3>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {futureKeywords.map((keyword) => (
                    <div key={keyword} className="rounded-2xl bg-white px-3 py-5 text-center text-lg font-black text-sky-700 shadow-sm">
                      {keyword}
                    </div>
                  ))}
                </div>
              </div>

              <div ref={shareCardRef} className="mt-6 rounded-[2rem] border border-slate-100 bg-white p-5 shadow-glow">
                <p className="text-xs font-black text-sky-700">SNSカード</p>
                <p className="mt-3 text-sm font-bold text-slate-500">あなたは</p>
                <p className="mt-1 text-2xl font-black text-slate-950">「{result.name}」</p>
                <p className="text-sm font-bold text-slate-500">でした。</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <InfoPanel title="あなたの強み" items={strengths.slice(0, 3)} />
                  <InfoPanel title="未来キーワード" items={futureKeywords} />
                </div>
                <p className="mt-4 text-sm font-black text-sky-700">#AI人生設計図</p>
                <button
                  type="button"
                  onClick={downloadShareCard}
                  className="mt-4 w-full rounded-2xl border border-sky-200 bg-sky-50 px-5 py-3 text-sm font-black text-sky-700 transition hover:bg-sky-100"
                >
                  画像として保存する
                </button>
              </div>

              <div className="mt-6 rounded-[1.5rem] border border-violet-100 bg-gradient-to-br from-violet-50 via-white to-sky-50 p-5 shadow-sm">
                <h3 className="text-lg font-black text-slate-950">AIからの手紙</h3>
                <p className="mt-3 whitespace-pre-line text-sm font-bold leading-8 text-slate-700">
                  {`最後に一つだけ。

今回の回答を見ていて思ったことがあります。

あなたは、ちゃんと未来について考えている人です。
だからこそ、すぐに決めきれないこともあります。

${result.aiMessage}

今日、この診断を受けたことも立派な一歩です。
未来は、今日どんな一歩を選ぶかで少しずつ変わります。

応援しています。`}
                </p>
              </div>

              <div className="mt-6 rounded-[2rem] bg-slate-950 p-6 text-center shadow-glow">
                <div className="mx-auto mb-5 h-px w-3/4 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                {endingLines.map((line) => (
                  <p key={line} className="text-xl font-black leading-9 text-white">
                    {line}
                  </p>
                ))}
                <p className="mt-5 text-base font-bold leading-8 text-sky-100">「{result.hope}」</p>
                <div className="mx-auto mt-5 h-px w-3/4 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
              </div>
              <a
                href={resultAffiliateUrl}
                onClick={(event) => handleAffiliateClick(event, resultAffiliateConfigured)}
                target={resultAffiliateConfigured ? "_blank" : undefined}
                rel={resultAffiliateConfigured ? "noopener noreferrer sponsored" : undefined}
                className="mt-5 block rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-4 text-center text-base font-black text-white shadow-action transition hover:translate-y-[-1px] active:translate-y-0"
              >
                あなたの未来を少し見てみる
              </a>
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
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-sky-700">Question</p>
              <h2 className="text-2xl font-black leading-tight text-slate-950 sm:text-4xl">{questions[currentQuestion].title}</h2>
              <div className="mt-6 grid gap-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() => selectAnswer(index)}
                    disabled={isAdvancing}
                    className={`w-full rounded-2xl border p-4 text-left text-sm font-bold leading-6 transition duration-200 active:scale-[0.99] disabled:cursor-wait sm:text-base ${
                      selectedOption === index || currentAnswer === index
                        ? "scale-[1.015] border-sky-300 bg-sky-50 text-sky-700 shadow-glow"
                        : "border-slate-100 bg-white text-slate-700 shadow-sm hover:border-sky-200 hover:bg-sky-50"
                    }`}
                  >
                    <span className="mr-3 inline-grid h-6 w-6 place-items-center rounded-full bg-sky-50 text-xs text-sky-500">
                      {selectedOption === index ? "✓" : String(index + 1).padStart(2, "0")}
                    </span>
                    {option.label}
                  </button>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between">
                <button
                  type="button"
                  onClick={goBack}
                  disabled={currentQuestion === 0}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 shadow-sm disabled:cursor-not-allowed disabled:opacity-35"
                >
                  戻る
                </button>
                <p className="text-xs text-slate-500">選ぶと次へ進みます</p>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function InfoPanel({ title, items, ordered = false }: { title: string; items: string[]; ordered?: boolean }) {
  const List = ordered ? "ol" : "ul";

  return (
    <div className="rounded-[1.5rem] border border-slate-100 bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-sm font-black text-slate-900">{title}</h3>
      <List className="space-y-2 text-sm leading-6 text-slate-700">
        {items.map((item, index) => (
          <li key={item} className="flex gap-2">
            <span
              className={`grid shrink-0 place-items-center ${
                ordered
                  ? "mt-0.5 h-6 w-6 rounded-full bg-sky-100 text-xs font-black text-sky-700"
                  : "mt-2 h-2 w-2 rounded-full bg-action"
              }`}
            >
              {ordered ? index + 1 : null}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </List>
    </div>
  );
}
