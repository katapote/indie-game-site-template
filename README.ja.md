# 個人開発者向けゲーム紹介サイト テンプレート

個人でゲームやアプリを作っている人のための、小さくて速い紹介サイトです。
ただのポートフォリオではなく、**X（Twitter）から来た人を、TestFlightのテスターやApp Storeのダウンロードにつなげる**ことを目的に作っています。

[English README](README.md)

- **メインのゲーム1本**：大きな画像、「プレイテストに参加」ボタン（TestFlight）、プレイ動画ボタン（任意）、特徴カード3枚（画像またはループ動画）
- **ほかの作品**：App Storeボタン付きのカードで一覧表示
- **日本語と英語**のページ。日本語のブラウザで開くと自動で日本語ページへ
- **Xでリンクを貼ったときのカード画像**を、キービジュアルから自動生成
- **ボタンのクリック数を計測**（任意。Plausible / GA4 / Zaraz に対応。Xのどこから来たかも分かる）
- 使っている計測サービスだけを自動で載せるプライバシーポリシーページ
- サーバーもデータベースも不要。Cloudflare Pagesで無料公開できます

## 1. 自分用にコピーする（5分）

1. GitHubのこのページで **Use this template → Create a new repository** を押します。
2. 手元で動かす場合は、コピーしたリポジトリで次を実行します（GitHubとCloudflareだけで完結させるなら不要です）。

   ```bash
   npm install
   npm run dev        # http://localhost:4321
   ```

## 2. 自分の情報に書き換える（15〜30分）

書き換えるのは主に2つのファイルです。ファイル内の `TODO` を探してください。GitHubの画面上（鉛筆マーク）でも編集できます。

| 何を | ファイル |
| --- | --- |
| サイト名、ロゴの文字、自己紹介、X・YouTube・Discordのリンク、連絡先 | `src/config/site.ts` |
| ゲーム：名前、紹介文、状態、並び順、TestFlight・App Store・動画のURL、特徴 | `src/config/games.ts` |
| ボタンの文言など（日本語・英語） | `src/i18n/ui.ts` |
| 色やフォント | `src/styles/global.css` |

ルール：

- **URLを `null` にすると、そのボタンは表示されません。** TestFlightのURLがなければ参加ボタンは出ず、App StoreのURLがなければ「ストアリンク準備中」と表示されます。
- **ゲームを増やす**ときは、`games` に1つ書き足すだけです。`featured: true` にしたゲームがトップに大きく出ます（1つだけ）。`order` が並び順です。
- 文章は `{ en: '英語', ja: '日本語' }` の形で書きます。`ja` を省くと英語が使われます。
- App StoreのURLは短い形 `https://apps.apple.com/app/id1234567890` がおすすめです（見た人の国のストアが開きます）。
- 計測用のイベント名は `click_` で始めてください（例：`click_mygame_testflight`）。

## 3. 画像と動画を入れる

画像は `src/assets/games/<ゲームのid>/` に置き、`games.ts` に `src/assets/games/` からの場所を書きます。サイズ調整や軽量化は自動で行われます。画像がまだなくても「画像準備中」と表示されるので、先に公開しても大丈夫です。

| ファイル | 使われる場所 | おすすめ |
| --- | --- | --- |
| `my-game/key-visual.png` | トップの大きな画像、Xのカード画像 | 16:9。タイトル画面がおすすめ |
| `my-game/feature-1.png` 〜 `feature-3.png` | 特徴カード | 16:9のプレイ画面 |
| `<ゲームのid>/icon.png` | アイコン | 正方形。App Storeのページのスクショから切り抜けばOK |

**ループ動画（任意）**：特徴カードに `video: '/media/my-game/feature-1.mp4'` を書き、`public/media/my-game/` に動画を置きます。画像は動画の読み込み前に表示されます。画面に映ったときだけ読み込み、「視差効果を減らす」設定の人には再生しません。5〜10秒・音なし・960×540・1MB前後がおすすめです（変換コマンドは英語版READMEを参照）。動画を差し替えるときは、ファイル名も変えてください（例：`feature-1-v2.mp4`）。前に見た人のブラウザに古い動画が残るのを防げます。

**Xのカード画像**：キービジュアルを入れたら `npm run og` を実行し、できた `public/og/og-default.png` をコミットします。

## 4. Cloudflare Pagesで公開する（無料・10分）

1. Cloudflareのダッシュボード → Workers & Pages → Create → **Pages** を選びます（Workersの画面になったら「Continue to Pages」）→ Connect to Git → コピーしたリポジトリを選択。
2. ビルド設定：
   - Framework preset：**Astro**
   - Build command：`npm run build`
   - Build output directory：`dist`
   - Root directory：空欄のまま
3. 環境変数（Environment variables）：
   - `SITE_URL` = 公開URL（例：`https://my-games.pages.dev`）**必須**。Project nameと合わせてください。
   - `NODE_VERSION` = `22.23.4`
4. 「Save and Deploy」を押します。以後は `main` を更新するたびに自動で公開し直されます。

## 5. Xのプロフィールに載せる

Xのプロフィールの「ウェブサイト」欄に、次のURLを入れます（ドメインは自分のものに）。

```
https://my-games.pages.dev/?utm_source=x&utm_medium=social&utm_campaign=profile
```

末尾が「Xのプロフィールから来た」という目印になります。投稿に貼るときは `utm_campaign=post_話題名` のようにすると、投稿ごとに分けて数えられます。

## 6. 計測する（おすすめ）

見たいのは「**Xから来た人数 → 参加ボタンを押した人数 → 実際にテスターになった人数**」の流れです。

1. **来た人数**：CloudflareのPagesプロジェクトで Web Analytics をオンにします（無料）。そのあと環境変数 `PUBLIC_CF_WEB_ANALYTICS=1` を追加すると、プライバシーポリシーにも自動で載ります。
2. **ボタンのクリック数**：Plausible（有料・Cookieなし・見やすい）か GA4（無料）を選び、英語版READMEの「Event providers」の手順で設定します。
3. **テスターになった人数**：App Store Connect → TestFlight → 公開リンクの画面で確認できます。

ボタンを押した人数と、実際に参加した人数は別物です（サイトからはTestFlightで参加したかどうかは見えません）。2つを見比べてください。

## ライセンス

MITライセンスです（[LICENSE](LICENSE)）。商用利用も含めて自由に使えます。クレジット表記は任意ですが、載せてもらえると嬉しいです。
