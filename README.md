# YUIT-site

株式会社YUIT コーポレートサイト

---

## 使用技術

- React
- TypeScript
- Vite
- Tailwind CSS
- Vercel
- Resend

---

## 開発環境構築

### パッケージインストール

```bash
npm install
```

---

## 開発サーバ起動

```bash
npm run dev
```

---

## 本番ビルド

```bash
npm run build
```

---

## 環境変数

`.env.local` を作成し、以下を設定してください。

```env
RESEND_API_KEY=
CONTACT_EMAIL=info@yuit-inc.jp
```

---

## デプロイ

Vercel に GitHub Repository を Import して Deploy。

---

## 問い合わせフォーム

問い合わせフォームは Resend を使用しています。

送信処理：
`api/contact.ts`

---

## 注意事項

- `.env` は Git 管理しないでください
- DNS設定時は既存MXレコードを削除しないでください