// ==UserScript==
// @name         Project G4H
// @namespace    http://tampermonkey.net/
// @version      1.5
// @description  Mem-bypass segala iklan, pop-up, timer, shortlink dan masih banyak lagi!
// @author       @g4hmx0
// @run-at       document-end
// @match        *://*/*
// @grant        none
// @icon         https://i.ibb.co.com/V03s1cWw/Project-G4-H-Logo-modified.png
// @downloadURL  https://raw.githubusercontent.com/RavensVenix/Project-G4H/refs/heads/main/userscript.js
// @updateURL    https://raw.githubusercontent.com/RavensVenix/Project-G4H/refs/heads/main/userscript.js
// ==/UserScript==

(function() {
    'use strict';

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function handleElement(matchUrl, selector, action, options = {}) {
        if (matchUrl && !window.location.href.match(matchUrl)) return;

        const { mode = "once", position = "after", text = "", delay = 1000 } = options;

        const observer = new MutationObserver(async () => {
            const el = document.querySelector(selector);
            if (!el) return;

            if (action === "delete") {
                el.remove();
                if (mode === "once") observer.disconnect();
            }

            if (action === "waitDelete") {
                await sleep(delay);
                if (document.contains(el)) el.remove();
                if (mode === "once") observer.disconnect();
            }

            if (action === "addText") {
                const p = document.createElement("p");
                p.textContent = text;
                p.style.cssText = "text-align:center; font-weight:bold; color:red;";

                if (position === "before") {
                    el.insertAdjacentElement("beforebegin", p);
                } else {
                    el.insertAdjacentElement("afterend", p);
                }

                if (mode === "once") observer.disconnect();
            }
        });

        observer.observe(document.documentElement, { childList: true, subtree: true });
    }

    function clickElement(matchUrl, selector, options = {}) {
        if (matchUrl && !window.location.href.match(matchUrl)) return;

        const { mode = "once", delay = 1000 } = options;

        const observer = new MutationObserver(async () => {
            const el = document.querySelector(selector);
            if (!el) return;

            await sleep(delay);
            if (document.contains(el)) el.click();

            if (mode === "once") observer.disconnect();
        });

        observer.observe(document.documentElement, { childList: true, subtree: true });
    }

    function ytmAntiAutoPause() {
        clickElement(/music.youtube.com/, 'div[class="yt-spec-touch-feedback-shape__fill"]');
    }

    function bypassPling() {
        if (window.location.href.match(/pling\.com/)) {
            const textEl = document.querySelector("#textLink");
            if (textEl) {
                const url = textEl.textContent.trim();
                if (url.startsWith("http")) {
                    window.location.href = url;
                }
            }
        }
    }

    function bypassLinkvertise() {
        clickElement(/linkvertise\.com/, 'button[class="action-box__cta-button lv-lib-button--primary lv-lib-button--lg lv-lib-button--rounded"]', { mode: "once", delay: 1000 });
    }

    function isSafelinku() {
        if (document.querySelector('img[src*="safelinku.b-cdn.net/image/Frame 25.webp"]')) {
            return true;
        }
        if (window.location.hostname === "sfl.gl") {
            return true;
        }
        return false;
    }

    function handleSafelinku() {
        if (!isSafelinku()) return;

        handleElement(null, "#adblock-warning", "waitDelete", {
            mode: "once",
            delay: 3000
        });

        handleElement(null, 'h1.text-2xl.font-bold.text-center', "addText", {
            mode: "once",
            position: "before",
            text: "🔥 Telegram: @g4hmx0"
        });

        handleElement(null, 'svg[width="166"]', "addText", {
            mode: "once",
            position: "before",
            text: "🔥 Telegram: @g4hmx0"
        });

        clickElement(null, "#first_open_button_page_1", { mode: "once", delay: 1000 });
        clickElement(null, "#second_open_button_page_1", { mode: "once", delay: 1000 });
        clickElement(null, "#first_open_button_page_2", { mode: "once", delay: 1000 });
        clickElement(null, "#go_to_link_button", { mode: "once", delay: 1000 });
        clickElement(null, 'button[class*="w-fit bg-[#1A56DB]"]', { mode: "once", delay: 1000 });
    }


    // PLING
    if (window.location.href.match(/pling\.com/)) {
        handleElement(/pling\.com/, 'h1[class="empty-title"]', "addText", {
            mode: "once",
            position: "before",
            text: "🔥 Redirecting..."
        });
        bypassPling();
    }


    // YOUTUBE MUSIC
    if (window.location.href.match(/music\.youtube\.com/)) {
        ytmAntiAutoPause();
    }

    // LINKVERTISE
    if (window.location.href.match(/linkvertise\.com/)) {
        bypassLinkvertise();
    }


    // ANOBOY
    handleElement(/anoboy\./, ".sidebar", "delete", { mode: "once" });
    handleElement(/anoboy\./, "#ad_bawah", "delete", { mode: "once" });
    handleElement(/anoboy\./, "#judi", "delete", { mode: "always" });
    handleElement(/anoboy\./, "#judi2", "delete", { mode: "always" });
    handleElement(/anoboy\./, "#coloma", "delete", { mode: "always" });
    handleElement(/anoboy\./, "#ad_box", "delete", { mode: "always" });
    handleElement(/anoboy\./, "#navigasi", "delete", { mode: "once" });
    handleElement(/anoboy\./, 'div[style="overflow: hidden;max-height: 200px;"]', "delete", { mode: "once" });
    handleElement(/anoboy\./, "p[style*='text-align: center;']", "addText", {
        mode: "once",
        position: "before",
        text: "🔥 Telegram: @g4hmx0"
    });


    // KURAMANIME
    handleElement(/kuramanime\./, "#floatingFooterBannerSection", "delete", { mode: "always" });
    handleElement(/kuramanime\./, "#headerBannerSection", "delete", { mode: "always" });
    handleElement(/kuramanime\./, "#aboveListBannerSection", "delete", { mode: "always" });
    handleElement(/kuramanime\./, "#abovePlayerBannerSection", "delete", { mode: "always" });
    handleElement(/kuramanime\./, "#aboveDownloadBannerSection", "delete", { mode: "always" });
    handleElement(/kuramanime\./, 'section[class="hero"]', "addText", {
        mode: "once",
        position: "before",
        text: "🔥 Telegram: @g4hmx0"
    });
    handleElement(/kuramanime\./, 'section[class="hero"]', "addText", {
        mode: "once",
        position: "after",
        text: "🔥 Telegram: @g4hmx0"
    });


    // SAFELINKU
    handleSafelinku();
})();

