# Indie Game Site Template

A small, fast landing site for solo game & app developers. Built to turn
**X (Twitter) traffic into TestFlight testers and App Store visits** — not a
generic portfolio.

[日本語のREADMEはこちら](README.ja.md)

- **One featured game** with a hero, "Join the Playtest" (TestFlight) button,
  optional gameplay video and three feature cards (images or looping clips)
- **Your other games** as cards with App Store buttons
- **English + Japanese** pages, auto-switch for Japanese browsers
- **X-ready share card** (OG image generated from your key visual)
- **Click tracking with UTM / X attribution** (Plausible, GA4 or Zaraz — optional)
- Privacy policy page that lists only the analytics you actually enabled
- Static output, free hosting on Cloudflare Pages. No database, no server.

Astro + TypeScript + plain CSS. The only client JS is a ~2 KB analytics helper,
a lazy video loader and a one-line language redirect.

## 1. Make your copy (5 min)

1. Click **Use this template → Create a new repository** on GitHub.
2. Clone it and run:

   ```bash
   npm install
   npm run dev        # http://localhost:4321
   ```

Node 22.18+ (see `.node-version`).

## 2. Fill in your info (15–30 min)

Everything you need to edit is in two files. Search for `TODO`.

| What | File |
| --- | --- |
| Studio name, logo text, developer bio, X / YouTube / Discord links, contact | `src/config/site.ts` |
| Games: names, taglines, status, order, TestFlight / App Store / video URLs, features | `src/config/games.ts` |
| Button labels and other UI text (EN / JP) | `src/i18n/ui.ts` |
| Colors and fonts | `src/styles/global.css` |

Rules:

- **A link set to `null` is not rendered.** No TestFlight URL → no playtest button.
  No App Store URL → "Store link coming soon".
- **Add a game** = append one object to `games`. `featured: true` puts it in the
  hero (exactly one game). `order` controls position.
- Text fields are `{ en, ja }`; `ja` falls back to `en` when omitted.
- Use short App Store URLs: `https://apps.apple.com/app/id1234567890`
  (opens the visitor's own country store).
- Event names must start with `click_` (e.g. `click_mygame_testflight`).

## 3. Add images and clips

Put images in `src/assets/games/<game-id>/` and reference them in `games.ts` by the
path relative to `src/assets/games/`. Astro converts them to AVIF/WebP at several
sizes. Missing files show a placeholder, so you can launch before your art is ready.

| File | Used for | Recommended |
| --- | --- | --- |
| `my-game/key-visual.png` | Hero image and share card | 16:9, 1600×900+ (title screen works great) |
| `my-game/feature-1.png` … `feature-3.png` | Feature cards | 16:9 gameplay screenshots |
| `<game-id>/icon.png` | Icons | square, 512+ (crop from your App Store page) |

**Looping clips (optional).** For a feature card, add `video: '/media/my-game/feature-1.mp4'`
and put the file in `public/media/my-game/`. The image becomes its poster. Clips load
only when on screen and are skipped for visitors with "Reduce motion". Keep them
short (5–10 s), muted, 960×540, ~1 MB:

```bash
ffmpeg -i recording.mov -vf "crop=ih*16/9:ih,scale=960:540,fps=30,format=yuv420p" \
  -an -c:v libx264 -crf 26 -preset slow -movflags +faststart feature-1.mp4
```

If you replace a clip later, give it a new file name (e.g. `feature-1-v2.mp4`) so
visitors' browsers don't show the cached old one.

**Share card.** After adding the key visual, run `npm run og` and commit
`public/og/og-default.png`. It also renders the favicons from `public/favicon.svg`.

## 4. Publish on Cloudflare Pages (free, 10 min)

1. Cloudflare dashboard → Workers & Pages → Create → **Pages** (use "Continue to
   Pages" if you land on Workers) → Connect to Git → pick your repository.
2. Build settings:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: leave empty
3. Environment variables:
   - `SITE_URL` = your final URL, e.g. `https://my-games.pages.dev` (**required** —
     used for canonical URLs, the share card and the sitemap). Match the project name.
   - `NODE_VERSION` = `22.23.4`
4. Save and Deploy. Every push to `main` redeploys automatically.

Any static host works (`npm run build` → upload `dist/`); `public/_headers` is
Cloudflare/Netlify syntax.

## 5. Link it from X

Put this in your X profile's website field (replace the domain):

```
https://my-games.pages.dev/?utm_source=x&utm_medium=social&utm_campaign=profile
```

For individual posts use `utm_campaign=post_<topic>`. The site remembers where the
visitor came from and attaches it to every click event.

Share the plain URL in a post and X shows the share card. Check it with
<https://www.opengraph.xyz/>.

## 6. Measure (recommended)

The funnel you want to see: **visits from X → playtest button clicks → testers
joined**.

1. **Visits:** in the Pages project, turn on Web Analytics (free). Then set
   `PUBLIC_CF_WEB_ANALYTICS=1` so the privacy policy mentions it.
2. **Clicks:** pick an event provider below.
3. **Testers joined:** App Store Connect → TestFlight → your public link.

A click is not a join — the site cannot see whether someone accepted the TestFlight
invite. Compare the two numbers.

### Event providers (set by env vars)

Cloudflare Web Analytics alone only gives page views, referrers and countries —
**it cannot record custom click events or UTM breakdowns.** Pick one event
provider:

| `PUBLIC_ANALYTICS_PROVIDER` | Notes |
| --- | --- |
| `plausible` (recommended) | Cookieless, custom events + props + UTM reports out of the box; paid (or self-host). Set `PUBLIC_PLAUSIBLE_DOMAIN`; in Plausible add goals for the event names above and the custom props `traffic_source`, `location`. |
| `zaraz` | Free tier, Cloudflare-native. Requires the site on a custom domain proxied by Cloudflare (not `*.pages.dev`). Enable Zaraz for the zone and add a tool (e.g. GA4) with triggers on the event names. No script needed in the code. |
| `ga4` | Free; set `PUBLIC_GA4_ID`. Uses cookies — consider a consent banner if you target the EU/UK. |
| `none` (default) | Events are only recorded locally (`window.kgEvents`) for verification. |

Page views via Cloudflare Web Analytics: either enable it in the Pages project
(Metrics → Web Analytics; Cloudflare injects the beacon) and set
`PUBLIC_CF_WEB_ANALYTICS=1`, or set `PUBLIC_CF_BEACON_TOKEN` to load the beacon
manually. These flags also drive which services the Privacy Policy lists, so keep
them accurate.

None of these values are secrets (they all end up in public HTML), but keep them in
environment variables, not in code. See `.env.example`.


### Events

| Event | Fired when |
| --- | --- |
| `page_view` | page load (once per path per tab session) |
| `click_*_testflight`, `click_*_appstore`, `click_*_gameplay` | the buttons, using the `event` names you set in `games.ts` (`location` = hero / features / works) |
| `click_x_profile` | any X link (`location` = header / about / footer) |
| `language_switch` | EN/JP switch (`from`, `to`) |

Every event carries `lang`, `path`, `traffic_source` and any `utm_*` from the landing
URL. `traffic_source` is `x_profile` for the profile link above, `x` for other X
traffic, otherwise the `utm_source`, the referring host or `direct`. Each click event
is counted at most once per tab session. No names, emails or IPs are collected.

### Verifying events

Open any page with `?kg_debug=1` (persists for the tab) and watch the console:

```
[kg-analytics] sent click_mygame_testflight {traffic_source: "x_profile", location: "hero", …} provider=plausible
[kg-analytics] skipped (duplicate) click_mygame_testflight …
```

`window.kgEvents` holds every event with `sent: true|false`. With a provider
enabled, also check its realtime view (Plausible dashboard / GA4 DebugView).

## Languages

- `/` = English (default), `/ja/` = Japanese. Both are static pages with
  `hreflang` alternates and their own canonical URL.
- On the **first** visit to `/`, a browser whose primary language is Japanese is
  redirected to `/ja/` (query string kept, so UTMs survive). Once the visitor uses
  the EN/JP switch, that choice (localStorage `kg_lang`) always wins.

## Structure

```
.
├── astro.config.mjs        # site URL, sitemap (+hreflang)
├── public/                 # favicon, OG image, _headers
├── scripts/make-og.mjs     # OG image + icon generator (sharp)
└── src/
    ├── config/             # ← edit content here (games.ts, site.ts)
    ├── i18n/ui.ts          # EN/JP strings + helpers
    ├── components/         # Header, Hero, Features, Works, GameCard, About, Footer, Media, PrivacyPage…
    ├── layouts/Base.astro  # <head>: SEO, OGP, Twitter, hreflang, analytics loaders
    ├── pages/              # /, /ja/, /privacy/, /ja/privacy/, 404, robots.txt
    ├── scripts/analytics.ts
    └── styles/global.css
```

## License

MIT — see [LICENSE](LICENSE). Use it for anything, commercial included. A link back
is appreciated but not required.
