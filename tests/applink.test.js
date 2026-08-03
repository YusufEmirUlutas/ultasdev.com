/**
 * Detection + strategy tests for assets/applink.js.
 * Run with:  node --test tests/
 * No dependencies and no package.json — Node's built-in runner only.
 */
const test = require('node:test');
const assert = require('node:assert');
const AppLink = require('../assets/applink.js');

/* Real user-agent strings captured from the apps we care about. */
const UA = {
    tiktokIOS: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 musical_ly_2023005040 JsSdk/2.0 NetType/WIFI Channel/App Store ByteLocale/en ByteFullLocale/en Region/US BytedanceWebview/d8a21c6',
    tiktokAndroid: 'Mozilla/5.0 (Linux; Android 13; SM-G991B Build/TP1A.220624.014; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/119.0.0.0 Mobile Safari/537.36 trill_310405 JsSdk/1.0 NetType/WIFI Channel/googleplay AppName/musical_ly app_version/31.4.5 ByteLocale/en BytedanceWebview/d8a21c6',
    instagramIOS: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 329.0.0.41.93 (iPhone14,2; iOS 17_5; en_US; en; scale=3.00; 1170x2532; 574725665)',
    instagramAndroid: 'Mozilla/5.0 (Linux; Android 13; SM-G991B Build/TP1A.220624.014; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/119.0.0.0 Mobile Safari/537.36 Instagram 329.0.0.41.93 Android',
    threadsIOS: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Barcelona 329.0.0.41.93',
    facebookIOS: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 [FBAN/FBIOS;FBDV/iPhone14,2;FBMD/iPhone;FBSN/iOS;FBSV/17.5;FBSS/3;FBID/phone;FBLC/en_US;FBOP/5]',
    messengerIOS: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 [FBAN/MessengerForiOS;FBAV/435.0.0.23.108;FBDV/iPhone14,2;FBSN/iOS;FBSV/17.5]',
    facebookAndroid: 'Mozilla/5.0 (Linux; Android 13; SM-G991B Build/TP1A.220624.014; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/119.0.0.0 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/450.0.0.38.108;]',
    safariIOS: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1',
    chromeIOS: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/125.0.6422.80 Mobile/15E148 Safari/604.1',
    firefoxIOS: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/126.0 Mobile/15E148 Safari/605.1.15',
    chromeAndroid: 'Mozilla/5.0 (Linux; Android 13; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36',
    androidWebView: 'Mozilla/5.0 (Linux; Android 13; SM-G991B Build/TP1A.220624.014; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/119.0.0.0 Mobile Safari/537.36',
    macSafari: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15',
    windowsChrome: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
};

const DESKTOP_ENV = { platform: 'MacIntel', maxTouchPoints: 0, standalone: false };
const IPAD_ENV = { platform: 'MacIntel', maxTouchPoints: 5, standalone: false };
const PHONE_ENV = { platform: 'iPhone', maxTouchPoints: 5, standalone: false };

test('detectApp attributes each host app', () => {
    assert.strictEqual(AppLink.detectApp(UA.tiktokIOS), 'tiktok');
    assert.strictEqual(AppLink.detectApp(UA.tiktokAndroid), 'tiktok');
    assert.strictEqual(AppLink.detectApp(UA.instagramIOS), 'instagram');
    assert.strictEqual(AppLink.detectApp(UA.instagramAndroid), 'instagram');
    assert.strictEqual(AppLink.detectApp(UA.threadsIOS), 'threads');
    assert.strictEqual(AppLink.detectApp(UA.facebookIOS), 'facebook');
    assert.strictEqual(AppLink.detectApp(UA.messengerIOS), 'messenger');
    assert.strictEqual(AppLink.detectApp(UA.facebookAndroid), 'facebook');
});

test('detectApp returns null for real browsers', () => {
    for (const key of ['safariIOS', 'chromeIOS', 'firefoxIOS', 'chromeAndroid', 'macSafari', 'windowsChrome']) {
        assert.strictEqual(AppLink.detectApp(UA[key]), null, `${key} must not look like an in-app browser`);
    }
});

test('Threads is not mistaken for Instagram', () => {
    // Both use instagram://extbrowser, but the readout must stay accurate.
    assert.strictEqual(AppLink.detectApp(UA.threadsIOS), 'threads');
    assert.ok(AppLink.isInstagramInApp(UA.threadsIOS), 'Threads must match the Instagram family');
});

test('Messenger is not mistaken for Facebook', () => {
    assert.strictEqual(AppLink.detectApp(UA.messengerIOS), 'messenger');
    assert.ok(AppLink.isFacebookInApp(UA.messengerIOS), 'Messenger must match the Facebook family');
});

test('platform detection, including iPadOS masquerading as a Mac', () => {
    assert.strictEqual(AppLink.detectPlatform(UA.tiktokIOS, PHONE_ENV), 'ios');
    assert.strictEqual(AppLink.detectPlatform(UA.tiktokAndroid, {}), 'android');
    assert.strictEqual(AppLink.detectPlatform(UA.chromeAndroid, {}), 'android');
    assert.strictEqual(AppLink.detectPlatform(UA.macSafari, DESKTOP_ENV), 'desktop');
    assert.strictEqual(AppLink.detectPlatform(UA.windowsChrome, {}), 'desktop');
    assert.strictEqual(AppLink.detectPlatform(UA.macSafari, IPAD_ENV), 'ios');
});

test('isInAppBrowser is true for every social webview', () => {
    for (const key of ['tiktokIOS', 'tiktokAndroid', 'instagramIOS', 'instagramAndroid',
        'threadsIOS', 'facebookIOS', 'messengerIOS', 'facebookAndroid', 'androidWebView']) {
        assert.ok(AppLink.isInAppBrowser(UA[key], PHONE_ENV), `${key} should be detected as in-app`);
    }
});

test('isInAppBrowser is false for real browsers', () => {
    assert.ok(!AppLink.isInAppBrowser(UA.safariIOS, PHONE_ENV));
    assert.ok(!AppLink.isInAppBrowser(UA.chromeIOS, PHONE_ENV));
    assert.ok(!AppLink.isInAppBrowser(UA.firefoxIOS, PHONE_ENV));
    assert.ok(!AppLink.isInAppBrowser(UA.chromeAndroid, {}));
    assert.ok(!AppLink.isInAppBrowser(UA.macSafari, DESKTOP_ENV));
    assert.ok(!AppLink.isInAppBrowser(UA.windowsChrome, {}));
});

test('a home-screen PWA is not treated as an in-app browser', () => {
    const pwaUA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148';
    assert.ok(AppLink.isGenericWebView(pwaUA, PHONE_ENV), 'without the standalone flag it looks like a webview');
    assert.ok(!AppLink.isGenericWebView(pwaUA, { platform: 'iPhone', maxTouchPoints: 5, standalone: true }));
});

test('Instagram and Threads on iOS lead with the extbrowser escape', () => {
    const expected = ['ios-instagram-extbrowser', 'ios-safari-scheme', 'ios-itms-apps'];
    assert.deepStrictEqual(AppLink.ladder({ ua: UA.instagramIOS, env: PHONE_ENV }), expected);
    assert.deepStrictEqual(AppLink.ladder({ ua: UA.threadsIOS, env: PHONE_ENV }), expected);
});

test('TikTok on iOS fires nothing at all', () => {
    // TikTok blocks App Store destinations as policy for non-Business
    // accounts. Any attempt raises its "action cannot be completed" error,
    // which looks to the visitor like a broken site. Instructions only.
    assert.deepStrictEqual(AppLink.ladder({ ua: UA.tiktokIOS, env: PHONE_ENV }), []);
});

test('the untested relay strategy is exposed but on no default ladder', () => {
    assert.ok(AppLink.strategies.includes('ios-safari-relay'), 'must be firable from /get-debug/');
    assert.notStrictEqual(AppLink.strategyLabel('ios-safari-relay'), 'ios-safari-relay');
    for (const key of Object.keys(UA)) {
        for (const env of [PHONE_ENV, DESKTOP_ENV, IPAD_ENV, {}]) {
            assert.ok(
                !AppLink.ladder({ ua: UA[key], env }).includes('ios-safari-relay'),
                `${key}: unverified strategy must not ship on a default ladder`
            );
        }
    }
});

test('the relay points at our own domain, never the store', () => {
    // The whole point: the navigation TikTok inspects must not be apps.apple.com.
    assert.ok(!/apple\.com/.test(AppLink.config.relay), 'relay must not target Apple');
    assert.match(AppLink.config.relay, /^https:\/\/ultasdev\.com\//);
});

test('Facebook and Messenger on iOS lead with the Safari scheme', () => {
    const expected = ['ios-safari-scheme', 'ios-itms-apps'];
    assert.deepStrictEqual(AppLink.ladder({ ua: UA.facebookIOS, env: PHONE_ENV }), expected);
    assert.deepStrictEqual(AppLink.ladder({ ua: UA.messengerIOS, env: PHONE_ENV }), expected);
});

test('every Android webview gets the intent ladder', () => {
    const expected = ['android-intent', 'android-market', 'android-direct'];
    for (const key of ['tiktokAndroid', 'instagramAndroid', 'facebookAndroid', 'androidWebView']) {
        assert.deepStrictEqual(AppLink.ladder({ ua: UA[key], env: {} }), expected, key);
    }
});

test('real browsers are never intercepted', () => {
    assert.deepStrictEqual(AppLink.ladder({ ua: UA.safariIOS, env: PHONE_ENV }), ['ios-direct']);
    assert.deepStrictEqual(AppLink.ladder({ ua: UA.chromeIOS, env: PHONE_ENV }), ['ios-direct']);
    assert.deepStrictEqual(AppLink.ladder({ ua: UA.chromeAndroid, env: {} }), ['android-direct']);
    assert.deepStrictEqual(AppLink.ladder({ ua: UA.macSafari, env: DESKTOP_ENV }), ['desktop-direct']);
});

test('every strategy a ladder can produce has an executor and a label', () => {
    const seen = new Set();
    for (const key of Object.keys(UA)) {
        for (const env of [PHONE_ENV, DESKTOP_ENV, IPAD_ENV, {}]) {
            AppLink.ladder({ ua: UA[key], env }).forEach((id) => seen.add(id));
        }
    }
    assert.ok(seen.size > 0);
    for (const id of seen) {
        assert.ok(AppLink.strategies.includes(id), `${id} has no executor`);
        assert.notStrictEqual(AppLink.strategyLabel(id), id, `${id} has no human label`);
    }
});

test('route(): desktop goes to the landing page, never the store', () => {
    for (const [key, env] of [['macSafari', DESKTOP_ENV], ['windowsChrome', {}]]) {
        const decision = AppLink.route({ ua: UA[key], env });
        assert.strictEqual(decision.mode, 'replace', key);
        assert.strictEqual(decision.target, 'desktop', key);
    }
});

test('route(): every Android visitor is redirected straight to Play', () => {
    for (const key of ['tiktokAndroid', 'instagramAndroid', 'facebookAndroid', 'chromeAndroid']) {
        const decision = AppLink.route({ ua: UA[key], env: {} });
        assert.strictEqual(decision.mode, 'replace', key);
        assert.strictEqual(decision.target, 'android', key);
    }
});

test('route(): Instagram and Threads escape without needing a gesture', () => {
    for (const key of ['instagramIOS', 'threadsIOS']) {
        const decision = AppLink.route({ ua: UA[key], env: PHONE_ENV });
        assert.strictEqual(decision.mode, 'escape', key);
        assert.strictEqual(decision.strategy, 'ios-instagram-extbrowser', key);
    }
});

test('route(): TikTok on iOS shows instructions and fires nothing', () => {
    const decision = AppLink.route({ ua: UA.tiktokIOS, env: PHONE_ENV });
    assert.strictEqual(decision.mode, 'manual');
    assert.strictEqual(decision.strategy, undefined, 'must not attempt a blocked navigation');
});

test('route(): other iOS webviews still try the App Store scheme', () => {
    for (const key of ['facebookIOS', 'messengerIOS']) {
        const decision = AppLink.route({ ua: UA[key], env: PHONE_ENV });
        assert.strictEqual(decision.mode, 'escape', key);
        assert.strictEqual(decision.strategy, 'ios-itms-apps', key);
    }
});

test('route(): a real iOS browser is redirected to the store directly', () => {
    for (const key of ['safariIOS', 'chromeIOS', 'firefoxIOS']) {
        const decision = AppLink.route({ ua: UA[key], env: PHONE_ENV });
        assert.strictEqual(decision.mode, 'replace', key);
        assert.strictEqual(decision.target, 'ios', key);
    }
});

test('route(): every decision is actionable', () => {
    const targets = ['desktop', 'ios', 'android'];
    for (const key of Object.keys(UA)) {
        for (const env of [PHONE_ENV, DESKTOP_ENV, IPAD_ENV, {}]) {
            const decision = AppLink.route({ ua: UA[key], env });
            if (decision.mode === 'replace') {
                assert.ok(targets.includes(decision.target), `${key}: bad target ${decision.target}`);
            } else if (decision.mode === 'escape') {
                assert.ok(AppLink.strategies.includes(decision.strategy), `${key}: bad strategy`);
            } else if (decision.mode === 'manual') {
                assert.ok(AppLink.manualHint(decision.app).length > 0, `${key}: no instructions`);
            } else {
                assert.fail(`${key}: unknown mode ${decision.mode}`);
            }
        }
    }
});

test('the iOS store URL is a raw canonical link, not a redirector', () => {
    // iOS only opens the App Store silently for a direct apps.apple.com URL;
    // anything that 301s first triggers the "Open this page in App Store?" prompt.
    assert.match(AppLink.config.ios, /^https:\/\/apps\.apple\.com\/[a-z]{2}\/app\/[^/]+\/id\d+$/);
    assert.match(AppLink.config.android, /^https:\/\/play\.google\.com\/store\/apps\/details\?id=[\w.]+$/);
    assert.ok(AppLink.config.android.endsWith(AppLink.config.androidPackage));
});

test('manual hints are tailored per app and always non-empty', () => {
    assert.match(AppLink.manualHint('tiktok'), /Open in browser/i);
    assert.match(AppLink.manualHint('instagram'), /external browser/i);
    assert.ok(AppLink.manualHint(null).length > 0);
    assert.ok(AppLink.manualHint('something-new').length > 0);
});
