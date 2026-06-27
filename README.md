# AI人生設計図

無料診断から「あなた専用ロードマップ」へつなぎ、ロードマップ内で自然に無料相談・無料診断を案内するNext.jsアプリです。

## 主要ページ

- `/` 無料診断
- `/roadmap/market-value` 市場価値アップタイプ
- `/roadmap/ai-skill` AI活用スタートタイプ
- `/roadmap/side-business` 副業チャレンジタイプ
- `/roadmap/career` キャリア整理タイプ
- `/roadmap/stability` 安定スキルアップタイプ

## 外部リンクURL設定

Vercelなどの公開先で、Environment Variablesに以下を入力してください。

```env
NEXT_PUBLIC_AFFILIATE_CAREER_AGENT_URL=
NEXT_PUBLIC_AFFILIATE_AI_SCHOOL_URL=
NEXT_PUBLIC_AFFILIATE_SIDE_BUSINESS_URL=
NEXT_PUBLIC_AFFILIATE_COACHING_URL=
NEXT_PUBLIC_AFFILIATE_QUALIFICATION_URL=
NEXT_PUBLIC_AFFILIATE_BOOKS_URL=
```

診断結果画面のCTAは外部URLへ直接飛ばず、必ず `/roadmap/[type]` に移動します。
外部リンクはロードマップ内の各STEPボタンだけに配置しています。

## クリック計測

現在は `lib/tracking.ts` の `trackAffiliateClick()` で `console.log` しています。
後でGA4などに差し替える場合は、この関数だけ変更してください。

## 開発

```bash
pnpm install
pnpm dev
pnpm build
```
