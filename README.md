# AI人生設計図

無料診断から「あなた専用ロードマップ」へつなぎ、転職無料相談または副業スクールの無料相談・無料診断へ自然に案内するNext.jsアプリです。

## 主要ページ

- `/` 無料診断
- `/roadmap/market-value` 市場価値アップタイプ
- `/roadmap/ai-skill` 選択肢アップデートタイプ
- `/roadmap/side-business` 副業チャレンジタイプ
- `/roadmap/career` キャリア整理タイプ
- `/roadmap/stability` 安定スキルアップタイプ

## 外部リンクURL設定

Vercelなどの公開先で、Environment Variablesに以下を入力してください。

```env
NEXT_PUBLIC_AFFILIATE_CAREER_AGENT_URL=
NEXT_PUBLIC_AFFILIATE_SIDE_BUSINESS_URL=
```

診断結果画面のCTAは外部URLへ直接飛ばず、必ず `/roadmap/[type]` に移動します。
ロードマップのSTEP順は回答内容に応じて `plan` パラメータで並び替えます。
外部リンクはロードマップ内の「転職無料相談」と「副業スクール」のSTEPボタンだけに配置しています。
本・生成AI・情報整理などは、必要に応じてボタンなしSTEPとして表示します。

## クリック計測

現在は `lib/tracking.ts` の `trackAffiliateClick()` で `console.log` しています。
後でGA4などに差し替える場合は、この関数だけ変更してください。

## 開発

```bash
pnpm install
pnpm dev
pnpm build
```
