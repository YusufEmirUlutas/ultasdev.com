# AppLink — store links that survive in-app browsers

TikTok, Instagram, Facebook, Messenger and Threads render links in an embedded
webview that **cancels navigation to the app stores**. A plain
`<a href="https://apps.apple.com/...">` tap does nothing at all. That is the bug
this code exists to work around.

## Files

| Path | What it is |
|---|---|
| `assets/applink.js` | The whole system. No build step, no dependencies, injects its own CSS. |
| `tests/applink.test.js` | `node --test tests/applink.test.js` |
| `heightmax/index.html` | Three CTAs wired up with `data-applink` |
| `get/index.html` | `ultasdev.com/get/` — the bio link. `noindex`. |
| `get-debug/index.html` | `ultasdev.com/get-debug/` — diagnostics. `noindex`. |

## The core constraint

iOS honours a custom URL scheme **only when it is fired synchronously inside a
user gesture**. A scheme fired from a `setTimeout` or after an `await` is
silently dropped.

That rules out the obvious design of "fire an escape, wait 1.5s, then retry a
different one" — by the time the timer fires, the gesture is gone. So the
strategies are arranged as a **ladder that advances on taps, never on timers**:

1. The CTA tap fires rung 1, the best strategy for the detected app.
2. If no app switch is seen within 1.4s, the fallback sheet appears.
3. Every button on that sheet is a *fresh user gesture*, so each one is still
   allowed to fire the next rung.

Worst case is one extra tap on an on-theme sheet. Nothing dead-ends.

## Ladders

| Where | Order |
|---|---|
| Instagram / Threads, iOS | `instagram://extbrowser` → `x-safari-` → `itms-apps://` |
| Facebook / Messenger, iOS | `x-safari-` → `itms-apps://` |
| **TikTok, iOS** | `itms-apps://` → `x-safari-` |
| Any Android webview | `intent://` → `market://` → plain https |
| Real browsers | untouched — the `href` already works |

TikTok is the uncertain one. Instagram's `extbrowser` scheme and Facebook's
`x-safari-` are documented and known to work; **TikTok publishes no escape
scheme at all**, so its ladder is a best guess. Use `/get-debug/` to find out
what actually happens.

## Why the store URL must stay raw

`config.ios` must be the direct `apps.apple.com` URL, never a tracking link
that 301s to it. iOS opens the App Store *silently* only when it is handed a
direct URL; anything arriving through a redirect chain raises an
"Open this page in App Store?" prompt first. A test enforces this.

If you add AppsFlyer OneLink or Branch later, put the attribution URL in the
`CHANNELS` map in `get/index.html` under `track`. The page fires it as a
`keepalive` background beacon and still escapes using the raw store URL, so
attribution is matched probabilistically without costing the zero-prompt path.

## Changing the app or the store URLs

Edit the `config` block at the top of `assets/applink.js`:

```js
var config = {
    ios: 'https://apps.apple.com/us/app/<slug>/id<numeric-id>',
    android: 'https://play.google.com/store/apps/details?id=<package>',
    androidPackage: '<package>',
    ...
};
```

Per-link overrides are supported via `data-applink-ios` / `data-applink-android`
attributes, for when a page links to a different app than the site default.

## Adding a CTA to a new page

```html
<script src="/assets/applink.js"></script>
...
<a href="https://apps.apple.com/us/app/heightmax-grow-taller-app/id6753893362"
   data-applink rel="noopener">Download</a>
```

The `href` stays real, so crawlers, share sheets and JS-disabled visitors all
get a working link. Interception only happens inside in-app browsers.

`applink.js` also stamps `applink-ios` / `applink-android` / `applink-desktop`
and `applink-inapp` / `applink-browser` onto `<html>` before first paint, which
is how `heightmax/index.html` shows the App Store badge to iOS and the Google
Play button to Android. If you add such rules, put them **after** any other rule
that sets `display` on the same element — equal specificity means source order
decides.

## Diagnosing on a real phone

Open `ultasdev.com/get-debug/` inside the app you want to test. It shows the
user agent, every detection flag, the computed ladder, and a button per
strategy. Fire them one at a time and read the event log: `✓ APP SWITCHED`
means that strategy works in that app. "Copy diagnostics" exports the lot.

This is the only way to confirm TikTok's behaviour — it cannot be reproduced in
a desktop browser.
