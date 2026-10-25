# Akshita Deo — Portfolio

An OS-style portfolio: a Windows 11-style desktop on screens 768px and wider, and an Android (Material You) home screen below that.

## Editing content

All content lives in `src/lib/data.ts`. Derived values such as experience length, organisation count and the current role are computed in `src/lib/portfolio.ts`, so never type them by hand. A field set to `null` (for example `resume`) is hidden in the UI.

- Profile photo: `public/me.jpg`. After replacing it, regenerate `src/app/icon.png` and `apple-icon.png`.
- Paper images: add files under `public/` and list them in `publicationsData[].images`.
- Android colours come from `profileData.themeSeed`.

## Develop

```bash
npm install
npm run dev
```

Keyboard: `Ctrl+K` / `⌘K` search · `Alt+W` close · `Alt+M` minimize · ``Alt+` `` cycle windows.

## Deploy

Deploy on Vercel and set `NEXT_PUBLIC_SITE_URL` to the production domain; it drives canonical URLs, Open Graph, `robots.txt` and the sitemap. `npm run build` must pass before every push.

Wallpapers are from Unsplash, used under the Unsplash licence.
