/**
 * All titles shown on the site live here.
 * To add a new game: append an object to `games` — no component changes needed.
 *
 * Images: drop files into src/assets/games/<id>/ and reference them by path
 * relative to src/assets/games/. Missing files render as a labeled placeholder.
 * URLs: keep `null` until the real link exists; null links are not rendered.
 */
import type { Game } from './types';

export const games: Game[] = [
  {
    // The featured game fills the hero, the features section and the OG image.
    id: 'my-game',
    featured: true,
    order: 1,
    status: 'playtest', // 'playtest' | 'available' | 'coming-soon'
    title: { en: 'My Game', ja: 'マイゲーム' },
    tagline: {
      en: 'A one-line pitch for your game.',
      ja: 'ゲームを一言で表すキャッチコピー。',
    },
    catchcopy: {
      en: 'Short, punchy line. Say what the player does.',
      ja: '短く、プレイヤーが何をするかを伝える一文。',
    },
    description: {
      en: 'One or two sentences on what makes your game different.',
      ja: 'このゲームならではの面白さを1〜2文で。',
    },
    keyVisual: 'my-game/key-visual.png', // 16:9 recommended
    keyVisualAlt: { en: 'My Game key visual', ja: 'マイゲームのキービジュアル' },
    icon: 'my-game/icon.png', // square
    // TODO: your TestFlight public link. Set url to null to hide the playtest button.
    testFlight: {
      url: 'https://testflight.apple.com/join/XXXXXXXX',
      event: 'click_mygame_testflight',
    },
    // Set to a YouTube (or other) URL to show the "Watch Gameplay" button.
    gameplayVideo: { url: null, event: 'click_mygame_gameplay' },
    features: [
      {
        title: { en: 'Feature one', ja: '特徴その1' },
        body: { en: 'What the player can do.', ja: 'プレイヤーができること。' },
        image: 'my-game/feature-1.png',
        imageAlt: { en: 'Feature one screenshot', ja: '特徴その1の画面' },
        // Optional looping clip: put an .mp4 in public/media/ and reference it here.
        // video: '/media/my-game/feature-1.mp4',
      },
      {
        title: { en: 'Feature two', ja: '特徴その2' },
        body: { en: 'Why it feels different.', ja: 'ほかのゲームとの違い。' },
        image: 'my-game/feature-2.png',
        imageAlt: { en: 'Feature two screenshot', ja: '特徴その2の画面' },
      },
      {
        title: { en: 'Feature three', ja: '特徴その3' },
        body: { en: 'What keeps players coming back.', ja: '何度も遊びたくなる理由。' },
        image: 'my-game/feature-3.png',
        imageAlt: { en: 'Feature three screenshot', ja: '特徴その3の画面' },
      },
    ],
  },
  {
    id: 'second-game',
    order: 2,
    status: 'available',
    title: { en: 'Second Game', ja: 'セカンドゲーム' },
    tagline: { en: 'Your App Store subtitle works well here.', ja: 'App Storeのサブタイトルがそのまま使えます。' },
    icon: 'second-game/icon.png',
    // TODO: e.g. https://apps.apple.com/app/id1234567890 (null shows "Store link coming soon")
    appStore: { url: null, event: 'click_secondgame_appstore' },
  },
  {
    id: 'third-game',
    order: 3,
    status: 'coming-soon',
    title: { en: 'Third Game', ja: 'サードゲーム' },
    tagline: { en: 'Something new is on the way.', ja: '新作を開発中。' },
    icon: 'third-game/icon.png',
  },
];

export const sortedGames = [...games].sort((a, b) => a.order - b.order);
export const featuredGame = sortedGames.find((g) => g.featured) ?? sortedGames[0]!;
export const otherGames = sortedGames.filter((g) => g !== featuredGame);
