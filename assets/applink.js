/*!
 * AppLink — one-click store escape for social in-app browsers.
 *
 * Instagram, Facebook, Messenger, Threads and TikTok all render pages in an
 * embedded WKWebView / Android WebView that cancels navigation to the app
 * stores. A plain <a href="https://apps.apple.com/..."> tap does nothing.
 *
 * The escape is a custom URL scheme the host app hands to the OS. iOS only
 * honours those when they are fired SYNCHRONOUSLY inside a user gesture — a
 * scheme fired from a setTimeout or after an await is silently dropped. So the
 * strategies here are arranged as a ladder that advances on taps, never on
 * timers: the first tap fires the best strategy for the detected app, and if no
 * app switch is observed the fallback sheet appears, where every button is a
 * fresh gesture and therefore still allowed to fire the next rung.
 *
 * Usage:  <a href="https://apps.apple.com/..." data-applink>...</a>
 * The href stays real, so crawlers and normal browsers are untouched; the
 * interception only happens inside in-app browsers.
 */
(function (root, factory) {
    'use strict';
    var api = factory();
    if (typeof module === 'object' && module.exports) {
        module.exports = api;
    } else {
        root.AppLink = api;
    }
    if (typeof document !== 'undefined') {
        api.init();
    }
})(typeof self !== 'undefined' ? self : this, function () {
    'use strict';

    /* ── Configuration ──────────────────────────────────────────────────── */

    var config = {
        // Raw canonical store URL. Must NOT be a tracking link that 301s: iOS
        // shows an "Open this page in App Store?" prompt for anything reached
        // through a redirect chain, and opens silently only for a direct URL.
        ios: 'https://apps.apple.com/us/app/heightmax-grow-taller-app/id6753893362',
        android: 'https://play.google.com/store/apps/details?id=com.uza.apple',
        androidPackage: 'com.uza.apple',
        desktop: 'https://apps.apple.com/us/app/heightmax-grow-taller-app/id6753893362',
        // How long to wait for an app switch before showing the fallback sheet.
        switchTimeout: 1400
    };

    function configure(next) {
        if (!next) return config;
        for (var key in next) {
            if (Object.prototype.hasOwnProperty.call(next, key)) config[key] = next[key];
        }
        return config;
    }

    /* ── Environment ────────────────────────────────────────────────────── */

    function uaOf(input) {
        if (typeof input === 'string') return input;
        if (typeof navigator === 'undefined') return '';
        return navigator.userAgent || '';
    }

    function defaultEnv() {
        if (typeof navigator === 'undefined') {
            return { platform: '', maxTouchPoints: 0, standalone: false };
        }
        return {
            platform: navigator.platform || '',
            maxTouchPoints: navigator.maxTouchPoints || 0,
            standalone: navigator.standalone === true
        };
    }

    function envOf(input) {
        if (!input) return defaultEnv();
        return {
            platform: input.platform || '',
            maxTouchPoints: input.maxTouchPoints || 0,
            standalone: input.standalone === true
        };
    }

    /* ── UA helpers (pure functions of a UA string, so they are testable) ── */

    function isIOS(ua, env) {
        ua = uaOf(ua);
        env = envOf(env);
        if (/\b(iPhone|iPad|iPod)\b/.test(ua)) return true;
        // iPadOS 13+ masquerades as desktop Safari on a Macintosh.
        return env.platform === 'MacIntel' && env.maxTouchPoints > 1;
    }

    function isAndroid(ua) {
        return /Android/i.test(uaOf(ua));
    }

    function isInstagramInApp(ua) {
        ua = uaOf(ua);
        // "Barcelona" is the Threads app, which uses the same escape scheme.
        return /\bInstagram\b/i.test(ua) || /\bBarcelona\b/i.test(ua);
    }

    function isFacebookInApp(ua) {
        ua = uaOf(ua);
        return /\b(FBAN|FBAV|FB_IAB|FBIOS|FB4A|FBDV|FBMD)\b/.test(ua) ||
            /Messenger/i.test(ua);
    }

    function isTikTokInApp(ua) {
        ua = uaOf(ua);
        return /BytedanceWebview/i.test(ua) ||
            /musical_ly/i.test(ua) ||
            /\btrill\b/i.test(ua) ||
            /\baweme\b/i.test(ua) ||
            /ByteFullLocale/i.test(ua) ||
            /ByteLocale/i.test(ua) ||
            /\bTikTok\b/i.test(ua);
    }

    /**
     * Which host app is rendering us, or null for a real browser.
     * Order matters: Threads UAs also contain "Instagram", and Messenger UAs
     * also contain the FBAN/FBAV tokens, so the specific case is checked first.
     */
    function detectApp(ua) {
        ua = uaOf(ua);
        if (/\bBarcelona\b/i.test(ua)) return 'threads';
        if (/\bInstagram\b/i.test(ua)) return 'instagram';
        if (/Messenger/i.test(ua)) return 'messenger';
        if (/\b(FBAN|FBAV|FB_IAB|FBIOS|FB4A|FBDV|FBMD)\b/.test(ua)) return 'facebook';
        if (isTikTokInApp(ua)) return 'tiktok';
        if (/Snapchat/i.test(ua)) return 'snapchat';
        if (/\bTwitter\b/i.test(ua)) return 'twitter';
        if (/LinkedInApp/i.test(ua)) return 'linkedin';
        if (/(MicroMessenger|WeChat)/i.test(ua)) return 'wechat';
        if (/\bLine\//.test(ua)) return 'line';
        if (/Pinterest/i.test(ua)) return 'pinterest';
        return null;
    }

    /** An embedded webview we could not attribute to a known app. */
    function isGenericWebView(ua, env) {
        ua = uaOf(ua);
        env = envOf(env);
        if (isAndroid(ua) && /;\s*wv\b/.test(ua)) return true;
        if (isIOS(ua, env)) {
            // Home-screen PWAs also lack the Safari token but are not in-app.
            if (env.standalone) return false;
            if (/(CriOS|FxiOS|EdgiOS|OPiOS|DuckDuckGo|Brave)/.test(ua)) return false;
            if (/AppleWebKit/.test(ua) && !/Safari\//.test(ua)) return true;
        }
        return false;
    }

    function isInAppBrowser(ua, env) {
        return detectApp(ua) !== null || isGenericWebView(ua, env);
    }

    function detectPlatform(ua, env) {
        if (isIOS(ua, env)) return 'ios';
        if (isAndroid(ua)) return 'android';
        return 'desktop';
    }

    /** App id when known, else 'webview' for an unattributed one, else 'browser'. */
    function detectChannel(ua, env) {
        var app = detectApp(ua);
        if (app) return app;
        return isGenericWebView(ua, env) ? 'webview' : 'browser';
    }

    /* ── Strategy ladder ────────────────────────────────────────────────── */

    /**
     * Ordered strategy ids to try for a given environment. Rung 0 runs on the
     * original tap; the rest are offered as buttons in the fallback sheet so
     * each one gets its own user gesture.
     */
    function ladder(opts) {
        opts = opts || {};
        var ua = uaOf(opts.ua);
        var env = envOf(opts.env);
        var plat = opts.platform || detectPlatform(ua, env);
        var app = typeof opts.app !== 'undefined' ? opts.app : detectApp(ua);
        var inApp = typeof opts.inApp === 'boolean' ? opts.inApp : isInAppBrowser(ua, env);

        if (plat === 'ios') {
            if (!inApp) return ['ios-direct'];
            if (app === 'instagram' || app === 'threads') {
                // Documented to work from page load AND from click handlers.
                return ['ios-instagram-extbrowser', 'ios-safari-scheme', 'ios-itms-apps'];
            }
            if (app === 'tiktok') {
                // TikTok publishes no escape scheme. itms-apps goes straight to
                // the App Store app with no prompt when the host allows it;
                // the Safari hop is the backup.
                return ['ios-itms-apps', 'ios-safari-scheme'];
            }
            return ['ios-safari-scheme', 'ios-itms-apps'];
        }

        if (plat === 'android') {
            if (!inApp) return ['android-direct'];
            return ['android-intent', 'android-market', 'android-direct'];
        }

        return ['desktop-direct'];
    }

    /**
     * What a bio-link landing page should do for this visitor. Lives here
     * rather than inline in the page so it is unit-testable.
     *   { mode: 'replace', target: 'desktop' | 'ios' | 'android' }
     *   { mode: 'escape',  strategy: <strategy id> }
     */
    function route(opts) {
        opts = opts || {};
        var ua = uaOf(opts.ua);
        var env = envOf(opts.env);
        var plat = detectPlatform(ua, env);
        var app = detectApp(ua);
        var base = { platform: plat, app: app };

        // Android webviews follow server redirects and intent:// fine, and
        // desktop has nothing to escape from.
        if (plat === 'desktop') { base.mode = 'replace'; base.target = 'desktop'; return base; }
        if (plat === 'android') { base.mode = 'replace'; base.target = 'android'; return base; }

        // The only escape documented to work without a user gesture.
        if (app === 'instagram' || app === 'threads') {
            base.mode = 'escape';
            base.strategy = 'ios-instagram-extbrowser';
            return base;
        }

        // TikTok and friends publish no gesture-free escape. Trying the direct
        // App Store scheme costs nothing if the host drops it, and the page
        // stays behind as the fallback.
        if (isInAppBrowser(ua, env)) {
            base.mode = 'escape';
            base.strategy = 'ios-itms-apps';
            return base;
        }

        base.mode = 'replace';
        base.target = 'ios';
        return base;
    }

    var LABELS = {
        'ios-instagram-extbrowser': 'Open in Safari',
        'ios-safari-scheme': 'Open in Safari',
        'ios-itms-apps': 'Open the App Store app',
        'ios-direct': 'Open the App Store',
        'android-intent': 'Open Google Play',
        'android-market': 'Open the Play Store app',
        'android-direct': 'Open Google Play',
        'desktop-direct': 'Open the App Store'
    };

    function strategyLabel(id) {
        return LABELS[id] || id;
    }

    function itmsFrom(httpsUrl) {
        return String(httpsUrl).replace(/^https?:\/\//, 'itms-apps://');
    }

    /**
     * Each executor must be safe to call synchronously inside a click handler.
     * Returns false only when we KNOW the attempt was refused — that lets the
     * caller move to the next rung while still inside the same gesture.
     */
    var EXEC = {
        'ios-instagram-extbrowser': function (cfg) {
            window.location.href = 'instagram://extbrowser/?url=' + encodeURIComponent(cfg.ios);
            return true;
        },
        'ios-safari-scheme': function (cfg) {
            var win = null;
            try {
                win = window.open('x-safari-' + cfg.ios, '_blank');
            } catch (err) {
                return false;
            }
            return win !== null && typeof win !== 'undefined';
        },
        'ios-itms-apps': function (cfg) {
            window.location.href = itmsFrom(cfg.ios);
            return true;
        },
        'ios-direct': function (cfg) {
            window.location.href = cfg.ios;
            return true;
        },
        'android-intent': function (cfg) {
            window.location.href = 'intent://details?id=' + cfg.androidPackage +
                '#Intent;scheme=market;package=com.android.vending;S.browser_fallback_url=' +
                encodeURIComponent(cfg.android) + ';end';
            return true;
        },
        'android-market': function (cfg) {
            window.location.href = 'market://details?id=' + cfg.androidPackage;
            return true;
        },
        'android-direct': function (cfg) {
            window.location.href = cfg.android;
            return true;
        },
        'desktop-direct': function (cfg) {
            window.location.href = cfg.desktop || cfg.ios;
            return true;
        }
    };

    function fire(id, cfg) {
        var exec = EXEC[id];
        if (!exec) return false;
        try {
            return exec(cfg || config) !== false;
        } catch (err) {
            return false;
        }
    }

    /** The plain https URL for this platform — used for copy-link and hrefs. */
    function storeUrl(ua, env) {
        var plat = detectPlatform(ua, env);
        if (plat === 'android') return config.android;
        if (plat === 'ios') return config.ios;
        return config.desktop || config.ios;
    }

    var HINTS = {
        tiktok: 'Tap ⋯ at the top right, then "Open in browser".',
        instagram: 'Tap ⋯ at the top right, then "Open in external browser".',
        threads: 'Tap ⋯ at the top right, then "Open in external browser".',
        facebook: 'Tap ⋯ at the top right, then "Open in browser".',
        messenger: 'Tap ⋯ at the top right, then "Open in browser".'
    };

    function manualHint(app) {
        return HINTS[app] || 'Open this page in Safari or Chrome, then tap the button again.';
    }

    /* ── App-switch detection ───────────────────────────────────────────── */

    /**
     * Resolve when the OS hands control to another app, or call onTimeout.
     * Returns a cancel function.
     */
    function watchForSwitch(ms, onTimeout) {
        if (typeof document === 'undefined') return function () {};
        var settled = false;
        var timer = null;

        function cleanup() {
            if (timer) clearTimeout(timer);
            document.removeEventListener('visibilitychange', onVisibility);
            window.removeEventListener('pagehide', onSwitched);
            window.removeEventListener('blur', onSwitched);
        }

        function onSwitched() {
            if (settled) return;
            settled = true;
            cleanup();
        }

        function onVisibility() {
            if (document.hidden) onSwitched();
        }

        document.addEventListener('visibilitychange', onVisibility);
        window.addEventListener('pagehide', onSwitched);
        window.addEventListener('blur', onSwitched);

        timer = setTimeout(function () {
            if (settled) return;
            settled = true;
            cleanup();
            if (onTimeout) onTimeout();
        }, ms);

        return function () {
            if (settled) return;
            settled = true;
            cleanup();
        };
    }

    /* ── Fallback sheet ─────────────────────────────────────────────────── */

    var STYLE_ID = 'applink-style';
    var CSS = [
        '.applink-backdrop{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:flex-end;',
        'justify-content:center;background:rgba(0,0,0,.72);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);',
        'opacity:0;transition:opacity .22s ease;padding:0}',
        '.applink-backdrop.is-open{opacity:1}',
        '.applink-sheet{width:100%;max-width:460px;background:var(--surface,#0E0E0E);color:var(--white,#fff);',
        'border:1px solid var(--border,rgba(255,255,255,.08));border-bottom:0;border-radius:20px 20px 0 0;',
        'padding:22px 20px calc(24px + env(safe-area-inset-bottom,0px));',
        'font-family:var(--font-main,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif);',
        'transform:translateY(18px);transition:transform .22s ease;box-shadow:0 -18px 50px rgba(0,0,0,.6)}',
        '.applink-backdrop.is-open .applink-sheet{transform:translateY(0)}',
        '@media(min-width:520px){.applink-backdrop{align-items:center}',
        '.applink-sheet{border-radius:20px;border-bottom:1px solid var(--border,rgba(255,255,255,.08));',
        'padding-bottom:24px}}',
        '.applink-grip{width:38px;height:4px;border-radius:4px;background:rgba(255,255,255,.18);',
        'margin:0 auto 16px}',
        '.applink-title{font-size:1.05rem;font-weight:700;margin:0 0 6px;line-height:1.3;',
        'font-family:var(--font-head,inherit)}',
        '.applink-status{font-size:.85rem;line-height:1.5;color:var(--gray-3,#999);margin:0 0 16px}',
        '.applink-btn{display:block;width:100%;border:0;cursor:pointer;text-align:center;',
        'font:inherit;font-size:.95rem;font-weight:600;padding:14px 16px;border-radius:12px;margin-bottom:9px;',
        'background:var(--red,#9B111E);color:#fff;-webkit-tap-highlight-color:transparent}',
        '.applink-btn:active{opacity:.85}',
        '.applink-btn--ghost{background:var(--surface3,#242424);color:var(--gray-1,#F5F5F5)}',
        '.applink-hint{font-size:.8rem;line-height:1.55;color:var(--gray-3,#999);margin:14px 0 0;text-align:center}',
        '.applink-hint b{color:var(--gray-1,#F5F5F5);font-weight:600}',
        '.applink-close{display:block;width:100%;background:none;border:0;color:var(--gray-4,#555);',
        'font:inherit;font-size:.8rem;padding:12px 0 0;cursor:pointer}'
    ].join('');

    function injectStyle() {
        if (document.getElementById(STYLE_ID)) return;
        var el = document.createElement('style');
        el.id = STYLE_ID;
        el.appendChild(document.createTextNode(CSS));
        (document.head || document.documentElement).appendChild(el);
    }

    var openSheet = null;

    function closeSheet() {
        if (!openSheet) return;
        var node = openSheet;
        openSheet = null;
        node.classList.remove('is-open');
        document.removeEventListener('keydown', onSheetKey);
        setTimeout(function () {
            if (node.parentNode) node.parentNode.removeChild(node);
        }, 240);
    }

    function onSheetKey(event) {
        if (event.key === 'Escape') closeSheet();
    }

    function copyToClipboard(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            return navigator.clipboard.writeText(text).then(function () { return true; },
                function () { return legacyCopy(text); });
        }
        return Promise.resolve(legacyCopy(text));
    }

    function legacyCopy(text) {
        try {
            var field = document.createElement('textarea');
            field.value = text;
            field.setAttribute('readonly', '');
            field.style.position = 'fixed';
            field.style.top = '-1000px';
            document.body.appendChild(field);
            field.select();
            field.setSelectionRange(0, text.length);
            var ok = document.execCommand('copy');
            document.body.removeChild(field);
            return ok;
        } catch (err) {
            return false;
        }
    }

    /**
     * Show the fallback. Every button here is a fresh user gesture, which is
     * the whole reason the remaining rungs are still usable at this point.
     */
    function showFallback(opts) {
        if (typeof document === 'undefined') return;
        opts = opts || {};
        var cfg = opts.config || config;
        var chain = opts.chain || ladder();
        var index = typeof opts.index === 'number' ? opts.index : 0;
        var app = typeof opts.app !== 'undefined' ? opts.app : detectApp();
        var link = opts.url || storeUrl();

        injectStyle();
        closeSheet();

        var backdrop = document.createElement('div');
        backdrop.className = 'applink-backdrop';
        backdrop.setAttribute('role', 'dialog');
        backdrop.setAttribute('aria-modal', 'true');
        backdrop.setAttribute('aria-label', 'Open the app store');

        var sheet = document.createElement('div');
        sheet.className = 'applink-sheet';

        var grip = document.createElement('div');
        grip.className = 'applink-grip';
        sheet.appendChild(grip);

        var title = document.createElement('p');
        title.className = 'applink-title';
        title.textContent = 'One more tap to open the store';
        sheet.appendChild(title);

        var status = document.createElement('p');
        status.className = 'applink-status';
        status.textContent = app
            ? 'This in-app browser blocked the store link. Pick one of these instead:'
            : 'Your browser blocked the store link. Pick one of these instead:';
        sheet.appendChild(status);

        var remaining = chain.slice(index);
        var cursor = index;

        function addStrategyButton(id) {
            var button = document.createElement('button');
            button.type = 'button';
            button.className = 'applink-btn';
            button.textContent = strategyLabel(id);
            button.addEventListener('click', function () {
                status.textContent = 'Opening…';
                var ok = fire(id, cfg);
                cursor += 1;
                if (!ok) {
                    status.textContent = 'That one was blocked. Try the next option.';
                    return;
                }
                watchForSwitch(cfg.switchTimeout, function () {
                    status.textContent = cursor < chain.length
                        ? 'Still here. Try the next option below.'
                        : manualHint(app);
                });
            });
            sheet.appendChild(button);
        }

        for (var i = 0; i < remaining.length; i++) addStrategyButton(remaining[i]);

        var copyButton = document.createElement('button');
        copyButton.type = 'button';
        copyButton.className = 'applink-btn applink-btn--ghost';
        copyButton.textContent = 'Copy the store link';
        copyButton.addEventListener('click', function () {
            copyToClipboard(link).then(function (ok) {
                copyButton.textContent = ok ? 'Copied — paste it in Safari' : 'Copy failed — long-press to select';
            });
        });
        sheet.appendChild(copyButton);

        var hint = document.createElement('p');
        hint.className = 'applink-hint';
        hint.textContent = manualHint(app);
        sheet.appendChild(hint);

        var close = document.createElement('button');
        close.type = 'button';
        close.className = 'applink-close';
        close.textContent = 'Not now';
        close.addEventListener('click', closeSheet);
        sheet.appendChild(close);

        backdrop.appendChild(sheet);
        backdrop.addEventListener('click', function (event) {
            if (event.target === backdrop) closeSheet();
        });

        document.body.appendChild(backdrop);
        document.addEventListener('keydown', onSheetKey);
        openSheet = backdrop;
        // Force a reflow so the transition runs.
        void backdrop.offsetWidth;
        backdrop.classList.add('is-open');
    }

    /* ── Entry point ────────────────────────────────────────────────────── */

    /**
     * Run the ladder. MUST be called synchronously from a user gesture on iOS.
     */
    function go(opts) {
        opts = opts || {};
        var cfg = opts.config || config;
        var chain = opts.chain || ladder(opts);
        var app = typeof opts.app !== 'undefined' ? opts.app : detectApp();
        var index = 0;
        var fired = false;

        for (; index < chain.length; index++) {
            if (fire(chain[index], cfg)) {
                fired = true;
                index += 1;
                break;
            }
        }

        if (!fired) {
            showFallback({ config: cfg, chain: chain, index: index, app: app, url: opts.url });
            return;
        }

        watchForSwitch(cfg.switchTimeout, function () {
            showFallback({ config: cfg, chain: chain, index: index, app: app, url: opts.url });
        });
    }

    /* ── DOM wiring ─────────────────────────────────────────────────────── */

    function configForElement(el) {
        var local = {
            ios: el.getAttribute('data-applink-ios') || config.ios,
            android: el.getAttribute('data-applink-android') || config.android,
            androidPackage: el.getAttribute('data-applink-package') || config.androidPackage,
            desktop: el.getAttribute('data-applink-desktop') || config.desktop,
            switchTimeout: config.switchTimeout
        };
        return local;
    }

    function bind(el) {
        if (!el || el.getAttribute('data-applink-bound') === '1') return;
        el.setAttribute('data-applink-bound', '1');

        var cfg = configForElement(el);
        var plat = detectPlatform();

        // Keep the real href honest for the current platform, so the link still
        // works with JS disabled and reads correctly in a share sheet.
        if (el.tagName === 'A') {
            if (plat === 'android') el.setAttribute('href', cfg.android);
            else if (plat === 'ios') el.setAttribute('href', cfg.ios);
        }

        el.addEventListener('click', function (event) {
            if (!isInAppBrowser()) return; // a real browser handles this fine
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.button === 1) return;
            event.preventDefault();
            go({ config: cfg, url: plat === 'android' ? cfg.android : cfg.ios });
        });
    }

    function markDocument() {
        if (typeof document === 'undefined') return;
        var el = document.documentElement;
        var plat = detectPlatform();
        var channel = detectChannel();
        el.classList.add('applink-' + plat);
        el.classList.add('applink-channel-' + channel);
        if (isInAppBrowser()) el.classList.add('applink-inapp');
        else el.classList.add('applink-browser');
    }

    function scan(scope) {
        var nodes = (scope || document).querySelectorAll('[data-applink]');
        for (var i = 0; i < nodes.length; i++) bind(nodes[i]);
    }

    var inited = false;

    function init() {
        if (inited || typeof document === 'undefined') return;
        inited = true;
        markDocument();
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function () { scan(); });
        } else {
            scan();
        }
    }

    /* ── Public API ─────────────────────────────────────────────────────── */

    return {
        config: config,
        configure: configure,
        isIOS: isIOS,
        isAndroid: isAndroid,
        isInstagramInApp: isInstagramInApp,
        isFacebookInApp: isFacebookInApp,
        isTikTokInApp: isTikTokInApp,
        isGenericWebView: isGenericWebView,
        isInAppBrowser: isInAppBrowser,
        detectApp: detectApp,
        detectPlatform: detectPlatform,
        detectChannel: detectChannel,
        ladder: ladder,
        route: route,
        strategies: Object.keys(EXEC),
        strategyLabel: strategyLabel,
        manualHint: manualHint,
        storeUrl: storeUrl,
        fire: fire,
        go: go,
        showFallback: showFallback,
        closeFallback: closeSheet,
        watchForSwitch: watchForSwitch,
        copy: copyToClipboard,
        bind: bind,
        scan: scan,
        init: init
    };
});
