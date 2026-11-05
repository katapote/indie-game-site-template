/**
 * Brand, developer profile and social links.
 * Set a link's `url` to null (or remove the entry) to hide it everywhere.
 */
import type { Localized, TrackEvent } from './types';

export interface SocialLink {
  id: string;
  label: string;
  url: string | null;
  event?: TrackEvent;
  /** Show the icon in the header too (keep this to 1–2 links on mobile). */
  inHeader?: boolean;
}

export const site = {
  // TODO: your studio / developer name (used in <title>, footer, privacy policy).
  name: 'My Indie Games',
  /** Header logo: a 1–2 character mark plus a two-part wordmark (second part is drawn lighter). */
  brand: { mark: 'M', wordmark: 'MY INDIE', wordmarkThin: ' GAMES' },
  /** Heading of the "other games" section. */
  worksHeading: { en: 'More games', ja: 'その他の作品' } satisfies Localized,
  /** Text on the 404 page. */
  notFoundBody: {
    en: 'This page could not be found. It may have moved.',
    ja: 'ページが移動したか、削除された可能性があります。',
  } satisfies Localized,
  defaultTitle: {
    en: 'My Indie Games — My Game & other indie apps',
    ja: 'My Indie Games — My Game と個人開発アプリ',
  } satisfies Localized,
  description: {
    en: 'Indie games and apps by a solo developer. Join the My Game playtest on TestFlight.',
    ja: '個人開発者のゲームとアプリ。「My Game」のプレイテスト参加者をTestFlightで募集中。',
  } satisfies Localized,
  /** Path under /public. Regenerate from game art with `npm run og`. */
  ogImage: '/og/og-default.png',
  // TODO: your X handle (used for the X card). Set to null if you don't use X.
  xHandle: '@your_x_handle' as string | null,
  /** Shown in footer only when set. e.g. 'mailto:you@example.com' or a form URL. */
  contactUrl: null as string | null,
  /** Optional footer link (e.g. your press kit, or credit to this template). null hides it.
   *  Example: { url: 'https://github.com/katapote/indie-game-site-template', label: { en: 'Site template', ja: 'サイトのテンプレート' } } */
  footerLink: null as { url: string; label: Localized } | null,
  developer: {
    name: { en: 'Your Name', ja: 'あなたの名前' } satisfies Localized,
    bio: {
      en: 'Solo indie developer making small games and apps.',
      ja: '小さなゲームとアプリをひとりで開発しています。',
    } satisfies Localized,
  },
};

export const socials: SocialLink[] = [
  {
    id: 'x',
    label: 'X',
    // TODO: your X profile URL (or null to hide)
    url: 'https://x.com/your_x_handle',
    event: 'click_x_profile',
    inHeader: true,
  },
  { id: 'youtube', label: 'YouTube', url: null },
  { id: 'discord', label: 'Discord', url: null },
];

export const activeSocials = socials.filter(
  (s): s is SocialLink & { url: string } => typeof s.url === 'string' && s.url.length > 0,
);
