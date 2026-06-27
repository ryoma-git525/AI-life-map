# AI人生設計図

スマホファーストの未来ロードマップ診断アプリです。

## 公開URLにする方法

おすすめは Vercel への公開です。

1. このプロジェクトを GitHub にアップロードする
2. Vercel で `Add New Project` からこのリポジトリを選ぶ
3. Framework Preset は `Next.js` のままで進める
4. 必要なアフィリエイトURLを Environment Variables に入力する
5. `Deploy` を押す

公開後は Vercel が `https://xxxx.vercel.app` のようなURLを発行します。
独自ドメインを使う場合は、Vercel の `Domains` から追加できます。

## アフィリエイトURLの入力欄

Vercel の `Settings` → `Environment Variables` に、以下の名前でURLを入力します。

| 変数名 | 使われる場所 |
| --- | --- |
| `NEXT_PUBLIC_AFFILIATE_CAREER_AGENT_URL` | 市場価値アップタイプ |
| `NEXT_PUBLIC_AFFILIATE_AI_SCHOOL_URL` | AI活用スタートタイプ |
| `NEXT_PUBLIC_AFFILIATE_SIDE_BUSINESS_URL` | 副業チャレンジタイプ |
| `NEXT_PUBLIC_AFFILIATE_COACHING_URL` | 働き方アップデートタイプ |
| `NEXT_PUBLIC_AFFILIATE_QUALIFICATION_URL` | 安定スキルアップタイプ |
| `NEXT_PUBLIC_AFFILIATE_ROADMAP_URL` | キャリア整理タイプ |

`NEXT_PUBLIC_AFFILIATE_ROADMAP_URL` が未入力の場合は、`NEXT_PUBLIC_AFFILIATE_COACHING_URL` が使われます。

URLを変更したら、Vercel で再デプロイすると公開ページに反映されます。

## ローカルでURLを試す方法

`.env.example` を `.env.local` にコピーして、各URLを入力します。

```bash
cp .env.example .env.local
```

その後、開発サーバーを起動します。

```bash
pnpm dev
```

未設定のURLがある状態でCTAを押すと、リンク先未設定の案内が表示されます。

## 開発コマンド

```bash
pnpm install
pnpm dev
pnpm build
pnpm start
```
