# AppLink — store links that survive in-app browsers

TikTok, Instagram, Facebook, Messenger and Threads render links in an embedded
webview that **blocks navigation to the app stores**. A plain
`<a href="https://apps.apple.com/...">` tap either does nothing or raises an
error. That is the bug this code exists to work around.

Two different causes hide behind that one symptom, and they need opposite fixes:

- **Meta apps** block it *technically*. A custom URL scheme escapes to Safari
  and the store opens. Fixable in code.
- **TikTok** blocks it *by policy*, for non-Business accounts. No scheme works.
  See the TikTok section below before changing anything there.

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
| **TikTok, iOS** | **nothing — instructions only** |
| Any Android webview | `intent://` → `market://` → plain https |
| Real browsers | untouched — the `href` already works |

## TikTok is a policy block, not a technical one

This is the important thing to understand before touching the TikTok path
again.

TikTok **deliberately blocks App Store links for non-Business accounts**. It has
done so since March 2023, and the block covers creator bios *and* link-in-bio
services like Linktree. The error it shows is
[literally "action cannot be completed"](https://techcrunch.com/2023/03/08/tiktok-begins-blocking-links-to-app-store-pages-from-creators-bios/).

Because TikTok inspects the *destination*, no URL scheme defeats it.
`itms-apps://`, `x-safari-https://apps.apple.com/…` and a plain `<a href>` all
produce the same error. Three separate attempts in this repo's history failed
this way before the cause was understood.

So the TikTok ladder is **empty on purpose**. Firing something that is
guaranteed to fail is worse than firing nothing: the visitor sees TikTok's error
and concludes the site is broken. Instead they get the two-step "tap ⋯ → Open in
browser" instructions immediately. Once they are in Safari, `/get/` redirects to
the store normally, because nothing is blocking it there.

**The only way to restore true one-tap on TikTok is a TikTok Business account**,
which is permitted to link to app store pages and gets a native "Download app"
button. That is a business decision, not a code change — Business accounts are
restricted to TikTok's Commercial Music Library and cannot use trending sounds.

### The relay idea, untested

`ios-safari-relay` escapes to Safari carrying `ultasdev.com/get/` instead of the
store URL, on the theory that TikTok only objects to Apple destinations. It is
**not on any ladder** and a test enforces that. It exists only as a button on
`/get-debug/`. Promote it to rung 1 for TikTok only if the diagnostics log
actually shows it switching apps on a real device.

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

This cannot be reproduced in a desktop browser. If you are testing the relay
hypothesis, the button to press is **"Open in Safari via ultasdev.com"** —
`✓ APP SWITCHED` in the log means it beats the policy block and should be
promoted to rung 1 for TikTok in `ladder()`.
