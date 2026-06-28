# AI人生設計図

10問の診断から、ユーザーに合う進め方を3つのロードマップへ案内するNext.jsアプリです。

## ローカル確認

```bash
pnpm install
pnpm dev
```

起動後、`http://localhost:3000` を開きます。

## ロードマップURL

- `/roadmap/stability`
- `/roadmap/workstyle`
- `/roadmap/organize`

## アフィリエイトURLの設定

VercelのEnvironment Variablesに以下を設定してください。

```bash
NEXT_PUBLIC_AFFILIATE_CAREER_AGENT_URL=https://px.a8.net/svt/ejp?a8mat=4B65SI+2MNYQI+5P1E+5YRHE
NEXT_PUBLIC_AFFILIATE_SIDE_BUSINESS_URL=https://px.a8.net/svt/ejp?a8mat=4B65SI+3I7XSQ+4V0U+ZRIB5
```

診断結果画面から外部URLへ直接遷移せず、ロードマップの最後にある1つのCTAだけが外部URLへ遷移します。
