# quiz-app

一般常識クイズアプリ。

## 技術スタック

- HTML / CSS / JavaScript（バニラJS、フレームワークなし）

## プロジェクト構成

```
quiz-app/
├── index.html       # エントリーポイント
├── css/
│   └── style.css    # スタイルシート
├── js/
│   └── app.js       # アプリケーションロジック
└── data/
    └── questions.js # クイズ問題データ
```

## 開発ガイドライン

- 外部ライブラリは使用しない（バニラJS のみ）
- モバイル対応（レスポンシブデザイン）を前提とする
- ブラウザの標準 API のみ使用する

## コーディング規約

- インデントはスペース2文字
- 変数・関数名はキャメルケース（例: `quizScore`, `loadQuestion()`）
- CSSクラス名はケバブケース（例: `quiz-container`, `btn-next`）
- `var` は使用しない（`const` / `let` を使用）

## GitHubリポジトリ

https://github.com/YubaShoheiSamurai/quiz-app
