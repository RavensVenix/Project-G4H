// ==UserScript==
// @name         Project G4H
// @namespace    http://tampermonkey.net/
// @version      3.9
// @description  Mem-bypass segala iklan, pop-up, timer, shortlink dan masih banyak lagi!
// @author       @g4hmx0
// @run-at       document-end
// @match        *://*/*
// @grant        GM_setClipboard
// @grant        GM_xmlhttpRequest
// @icon         https://i.ibb.co.com/V03s1cWw/Project-G4-H-Logo-modified.png
// @downloadURL  https://raw.githubusercontent.com/RavensVenix/Project-G4H/main/userscript.js
// @updateURL    https://raw.githubusercontent.com/RavensVenix/Project-G4H/refs/heads/main/meta.js
// ==/UserScript==
// ========== EH TYTYD DONATE NAPA ANJINK =========
// PROJECT SIH PROJECT TAPI KAN GW JUGA BUTUH DUID :'v
// BTW, JANGAN LUPA JOIN @g4hmx0 DI TELEGRAM YAAA!!!
// KALAU MAU BELIIN KOPI BOLEH PAK LANGSUNG KE SAWERIA WKKWWKKW
// Saweria: saweria.co/ywunyun
// THANKS YAA!! <3
// ================================================

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


    function setCSS(sitePattern, selector, property, value, { mode = "once", interval = 1000 } = {}) {
        if (sitePattern && !window.location.href.match(sitePattern)) {
            return false;
        }

        function apply() {
            const elements = document.querySelectorAll(selector);
            if (!elements.length) return false;

            elements.forEach(el => {
                el.style[property] = value;
            });

            return true;
        }

        if (mode === "once") {
            return apply();
        } else if (mode === "always") {
            apply();
            const timer = setInterval(apply, interval);
            return () => clearInterval(timer);
        }
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


    function checkJWP(selector, { delay = 0, interval = 1000, timeout = 20000 } = {}) {
        const start = Date.now();

        const checker = setInterval(() => {
            const videoCheck = document.querySelector("video.jw-video");

            if (videoCheck) {
                clearInterval(checker);
                clickJWP(selector, { delay, interval });
            } else if (Date.now() - start >= timeout) {
                clearInterval(checker);
            }
        }, 500);
    }


    function clickJWP(selector, { delay = 0, interval = 1000 } = {}) {
        function triggerClick(el) {
            if (!el) return false;

            setTimeout(() => {
                el.click();

                ["mouseover", "mousedown", "mouseup", "click"].forEach(type => {
                    try {
                        el.dispatchEvent(new MouseEvent(type, {
                            bubbles: true,
                            cancelable: true
                        }));
                    } catch {}
                });

                ["keydown", "keyup"].forEach(type => {
                    try {
                        el.dispatchEvent(new KeyboardEvent(type, {
                            bubbles: true,
                            cancelable: true,
                            key: "Enter",
                            code: "Enter",
                            keyCode: 13,
                            which: 13
                        }));
                    } catch {}
                });
            }, delay);

            return true;
        }

        const observer = new MutationObserver(() => {
            const el = document.querySelector(selector);
            if (el) triggerClick(el);
        });

        observer.observe(document.body, { childList: true, subtree: true });

        setInterval(() => {
            const el = document.querySelector(selector);
            if (el) triggerClick(el);
        }, interval);
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
        if (document.querySelector('img[src*="safelinku.b-cdn.net/image/Frame 25.webp"]')) return true;
        if (window.location.hostname === "sfl.gl") return true;
        return false;
    }


    function detectRateLimitSFL() {
        const rateObserver = new MutationObserver(async () => {
            const rateEl = document.querySelector('h2.text-gray-600');
            if (rateEl && rateEl.textContent.includes("rate limited")) {
                await sleep(6000);
                window.location.reload();
                rateObserver.disconnect();
            }
        });
        rateObserver.observe(document.documentElement, { childList: true, subtree: true });
    }


    function handleSafelinku() {
        if (!isSafelinku()) return;

        handleElement(null, "#adblock-warning", "waitDelete", {
            mode: "once",
            delay: 3000
        });

        handleElement(null, "#adblock_warning", "waitDelete", {
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

        clickElement(null, "a.cursor-pointer", { mode: "always", delay: 2000 });
        clickElement(null, "#first_open_button_page_1", { mode: "once", delay: 2000 });
        clickElement(null, "#second_open_button_page_1", { mode: "once", delay: 2000 });
        clickElement(null, "#first_open_button_page_2", { mode: "once", delay: 2000 });
        clickElement(null, "#go_to_link_button", { mode: "once", delay: 500 });
        clickElement(null, 'button[class*="w-fit bg-[#1A56DB]"]', { mode: "once", delay: 1000 });
    }


    function keygenaa() {
        function req(url, method = "GET", data = null) {
            return new Promise((resolve, reject) => {
                GM_xmlhttpRequest({
                    method,
                    url,
                    data,
                    redirect: "manual",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                        "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7"
                    },
                    onload: res => resolve(res),
                    onerror: err => reject(err)
                });
            });
        }

        async function generateArrow() {
            try {
                const res1 = await req("https://arrowmodz.xyz/gen-key/", "POST", "server=2");
                console.log(res1);
                const loc1 = res1.responseHeaders.match(/location:\s*(.*)/i);
                if (!loc1) return null;

                const res2 = await req(loc1[1].trim());
                const loc2 = res2.responseHeaders.match(/location:\s*(.*)/i);
                console.log(loc2);
                if (!loc2) return null;

                const finalUrl = decodeURIComponent(loc2[1].trim().split("url=").pop());
                console.log(finalUrl);
                const finalRes = await req(finalUrl);

                const match = finalRes.responseText.match(/id="key"[^>]*value="([^"]+)"/);
                return match ? match[1] : null;
            } catch (e) {
                console.error("generateArrow error:", e);
                return null;
            }
        }

        const baseURL = window.location.origin;
        const style = document.createElement('style');
        style.textContent = `.gen-btn {
            background: linear-gradient(135deg, #2bb8e9, #0077cc);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 10px;
            font-weight: bold;
            font-size: 15px;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            transition: 0.3s;
            z-index: 9999;
        }
        .gen-btn:hover {
            background: linear-gradient(135deg, #1aa8d9, #0066bb);
            transform: scale(1.05);
        }
        .gen-modal {
            position: fixed;
            top: 0; left: 0;
            width: 100vw; height: 100vh;
            background: rgba(0,0,0,0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        }
        .gen-content {
            background: #fff;
            padding: 20px 30px;
            border-radius: 12px;
            max-width: 90%;
            box-shadow: 0 0 25px rgba(0,0,0,0.3);
            text-align: center;
            font-family: sans-serif;
        }
        .gen-content h2 {
            color: #2bb8e9;
            margin-bottom: 10px;
        }
        .gen-key {
            font-family: monospace;
            background: #f0f0f0;
            padding: 10px;
            border-radius: 6px;
            margin: 15px 0;
            color: #333;
            font-size: 16px;
        }
        .gen-actions button {
            padding: 10px 18px;
            border: none;
            border-radius: 8px;
            margin: 5px;
            cursor: pointer;
            font-weight: bold;
        }
        .gen-copy {
            background-color: #2bb8e9;
            color: white;
        }
        .gen-close {
            background-color: #ccc;
            color: black;
        }`;

        document.head.appendChild(style);

        const btn = document.createElement('button');
        btn.textContent = '🚀 Gen It!';
        btn.className = 'gen-btn';
        btn.style.position = 'fixed';
        btn.style.bottom = '30px';
        btn.style.right = '30px';

        document.body.appendChild(btn);

        btn.addEventListener('click', async () => {
            try {
                if (baseURL == "https://arrowmodz.xyz") {
                    const ewe = await generateArrow();
                    return showKeyModal(ewe);
                }
                let res;
                const token = await getSessionToken();
                if (!token) return alert('Token gada cuy, coba refresh :v');

                const params = "game=MLBB&token=" + token;
                const encoded = btoa(params);
                if (baseURL == "https://web.aachann.my.id") {
                    res = await fetch(`${baseURL}/Get-key/genkey.php?data=${encoded}`);
                } else if (baseURL == "http://cimodkun.my.id") {
                    res = await fetch(`${baseURL}/genkey/genkey.php?data=${encoded}`);
                } else if (baseURL == "https://aamod.site") {
                    res = await fetch(`${baseURL}/genkey/genkey.php?data=${encoded}`);
                }
                const html = await res.text();
                const keyMatch = html.match(/<p id="gameKey"[^>]*>(.*?)<\/p>/);
                const key = keyMatch ? keyMatch[1] : null;

                if (!key) return alert('Limit Bang, ganti VPN gih 🙏');

                showKeyModal(key);
            } catch (e) {
                alert('Ada yang error Bang, coba cek console...');
                console.error(e);
            }
        });

        async function getSessionToken() {
            let res;
            if (baseURL == "https://web.aachann.my.id") {
                res = await fetch(`${baseURL}/Get-key`);
            } else {
                res = await fetch(`${baseURL}/genkey/`);
            }
            const text = await res.text();
            const match = text.match(/const sessionToken\s*=\s*"([a-f0-9]{32})"/i);
            return match ? match[1] : null;
        }

        function showKeyModal(key) {
            const modal = document.createElement('div');
            modal.className = 'gen-modal';
            modal.innerHTML = `
        <div class="gen-content">
            <h2>Kunci Berhasil 🔑</h2>
            <div class="gen-key">${key}</div>
            <div class="gen-actions">
                <button class="gen-copy">Copy</button>
                <button class="gen-close">Close</button>
            </div>
        </div>`;
            document.body.appendChild(modal);
            modal.querySelector('.gen-copy').onclick = () => {
                GM_setClipboard(key);
                alert('Key disalin!');
            };
            modal.querySelector('.gen-close').onclick = () => {
                modal.remove();
            };
        }
    }


    function manageLocalStorage(action, websiteRegex, key, value) {
        'use strict';

        if (websiteRegex) {
            const regex = new RegExp(websiteRegex, 'i');
            if (!regex.test(window.location.href)) {
                return false;
            }
        }

        try {
            switch (action.toLowerCase()) {
                case 'add':
                case 'set':
                    if (!key) {
                        return false;
                    }

                    const stringValue = typeof value !== 'string' ? JSON.stringify(value) : value;
                    localStorage.setItem(key, stringValue);
                    return true;

                case 'get':
                    if (!key) {
                        return null;
                    }

                    const getValue = localStorage.getItem(key);
                    console.log(`[LocalStorage Manager] Get ${key} = ${getValue}`);
                    return getValue;

                case 'delete':
                case 'remove':
                    if (!key) {
                        return false;
                    }

                    localStorage.removeItem(key);
                    console.log(`[LocalStorage Manager] Deleted ${key}`);
                    return true;

                case 'clear':
                case 'reset':
                    localStorage.clear();
                    return true;

                case 'list':
                case 'show':
                    console.log('[LocalStorage Manager] All localStorage items:');
                    for (let i = 0; i < localStorage.length; i++) {
                        const key = localStorage.key(i);
                        const value = localStorage.getItem(key);
                        console.log(`  ${key}: ${value}`);
                    }
                    return Object.keys(localStorage);

                case 'exists':
                case 'check':
                    if (!key) {
                        return false;
                    }

                    const exists = localStorage.getItem(key) !== null;
                    console.log(`[LocalStorage Manager] ${key} exists: ${exists}`);
                    return exists;

                default:
                    console.error('[LocalStorage Manager] Action tidak valid:', action);
                    console.log('Actions: add/set, get, delete/remove, clear/reset, list/show, exists/check');
                    return false;
            }

        } catch (error) {
            console.error('[LocalStorage Manager] Error:', error.message);
            return false;
        }
    }


    function addLocStore(websiteRegex, key, value) {
        return manageLocalStorage('add', websiteRegex, key, value);
    }


    function deleteLocStore(websiteRegex, key) {
        return manageLocalStorage('delete', websiteRegex, key, null);
    }


    function clearLocStore(websiteRegex) {
        return manageLocalStorage('clear', null, null, websiteRegex);
    }


    function getListLocStore(websiteRegex) {
        return manageLocalStorage('list', null, null, websiteRegex);
    }


    function removeScript(websiteRegex, scriptPattern, options = {}) {
        const config = {
            removeExisting: true,
            blockNew: true,
            monitorInterval: 1000,
            logRemoval: false,
            ...options
        };

        if (websiteRegex) {
            const regex = new RegExp(websiteRegex, 'i');
            if (!regex.test(window.location.href)) {
                return false;
            }
        }

        function removeMatchingScripts() {
            let removedCount = 0;

            const scripts = document.querySelectorAll('script');

            scripts.forEach(script => {
                let shouldRemove = false;
                const scriptContent = script.innerHTML || script.textContent || '';
                const scriptSrc = script.src || '';
                const scriptType = script.type || '';
                const scriptId = script.id || '';
                const scriptClass = script.className || '';

                const combinedText = `${scriptContent} ${scriptSrc} ${scriptType} ${scriptId} ${scriptClass}`;

                if (scriptPattern) {
                    const patternRegex = new RegExp(scriptPattern, 'gi');
                    if (patternRegex.test(combinedText)) {
                        shouldRemove = true;
                    }
                }

                if (shouldRemove) {
                    if (config.logRemoval) {
                        console.log('[Script Remover] Removing script:', {
                            type: scriptType,
                            src: scriptSrc,
                            id: scriptId,
                            class: scriptClass,
                            contentPreview: scriptContent.substring(0, 100) + '...'
                        });
                    }

                    script.remove();
                    removedCount++;
                }
            });

            return removedCount;
        }

        if (config.removeExisting) {
            const initialRemoved = removeMatchingScripts();
            if (config.logRemoval && initialRemoved > 0) {
                console.log(`[Script Remover] Removed ${initialRemoved} existing scripts`);
            }
        }

        if (config.blockNew) {
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    mutation.addedNodes.forEach(function(node) {
                        if (node.nodeType === 1 && node.tagName === 'SCRIPT') {
                            const scriptContent = node.innerHTML || node.textContent || '';
                            const scriptSrc = node.src || '';
                            const scriptType = node.type || '';
                            const combinedText = `${scriptContent} ${scriptSrc} ${scriptType}`;

                            if (scriptPattern) {
                                const patternRegex = new RegExp(scriptPattern, 'gi');
                                if (patternRegex.test(combinedText)) {
                                    if (config.logRemoval) {
                                        console.log('[Script Remover] Blocked new script:', node.src || 'inline');
                                    }
                                    node.remove();
                                }
                            }
                        }
                    });
                });
            });

            observer.observe(document, {
                childList: true,
                subtree: true
            });

            if (config.monitorInterval > 0) {
                setInterval(() => {
                    removeMatchingScripts();
                }, config.monitorInterval);
            }
        }

        if (config.logRemoval) {
            console.log('[Script Remover] Function activated with pattern:', scriptPattern);
        }

        return true;
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
    detectRateLimitSFL();
    handleSafelinku();


    // OTAKUDESU
    handleElement(/otakudesu\./, "#iklanbawah", "delete", { mode: "once" });
    handleElement(/otakudesu\./, ".iklan", "delete", { mode: "always" });
    handleElement(/otakudesu\./, ".iklanpost", "delete", { mode: "once" });
    clickElement(/otakudesu\./, 'div[id="close-button2"]', { mode: "once", delay: 50 });
    handleElement(/otakudesu\./, '.infoupdate', "addText", {
        mode: "once",
        position: "before",
        text: "🔥 Telegram: @g4hmx0"
    });
    handleElement(/otakudesu\./, '#venkonten', "addText", {
        mode: "once",
        position: "before",
        text: "🔥 Telegram: @g4hmx0"
    });


    // KEYGEN AA & CIMOD
    if (window.location.href.match('aachann') || window.location.href.match('aamod') || window.location.href.match('cimodkun') || window.location.href.match('arrowmodz')) {
        keygenaa();
    }


    // LAYAROTAKU.CLOUD
    handleElement(/layarotaku\./, ".kln", "delete", { mode: "always" });
    handleElement(/layarotaku\./, 'div[class="blox mlb iDd0s-4dgu4rd"', "delete", { mode: "always" });
    handleElement(/layarotaku\./, "#kqtdta2woo", "delete", { mode: "once" });
    handleElement(/layarotaku\./, ".gu2xdath7", "delete", { mode: "once" });
    handleElement(/layarotaku\./, '.announ', "addText", {
        mode: "once",
        position: "before",
        text: "🔥 Telegram: @g4hmx0"
    });


    // MOENIME.COM
    handleElement(/moenime\./, "#floatads1", "delete", { mode: "always" });
    handleElement(/moenime\./, '#site-logo', "addText", {
        mode: "once",
        position: "after",
        text: "🔥 Telegram: @g4hmx0"
    });


    // DRAMASERIAL.ID
    handleElement(/dramaserial\./, ".idmuvi-topbanner", "delete", { mode: "always" });
    handleElement(/dramaserial\./, "#custom_html-2", "delete", { mode: "always" });
    handleElement(/dramaserial\./, ".idmuvi-topplayer", "delete", { mode: "always" });
    handleElement(/dramaserial\./, ".idmuvi-afterplayer", "delete", { mode: "always" });
    clickElement(/dramaserial\./, 'button[class="mfp-close"]', { mode: "always", delay: 0 });
    clickElement(/dramaserial\./, 'button[onclick="parentNode.remove()"]', { mode: "always", delay: 0 });
    checkJWP('div.jw-skip.jw-reset.jw-skippable', { delay: 0, interval: 500 });
    handleElement(/dramaserial\./, '.container', "addText", {
        mode: "once",
        position: "after",
        text: "🔥 Telegram: @g4hmx0"
    });


    // KOMIKU || komiku.org
    handleElement(/komiku\./, '#Trending_Komik', "addText", {
        mode: "once",
        position: "after",
        text: "🔥 Telegram: @g4hmx0"
    });
    handleElement(/komiku\./, '.cv', "addText", {
        mode: "once",
        position: "after",
        text: "🔥 Telegram: @g4hmx0"
    });
    setCSS(/komiku\./, "body", "background", "grey", { mode: "always" });
    setCSS(/komiku\./, "nav", "background", "grey", { mode: "always" });
    setCSS(/komiku\./, ".hd2", "background", "grey", { mode: "always" });
    setCSS(/komiku\./, "#Navbawah", "background", "grey", { mode: "always" });
    setCSS(/komiku\./, "section.mirip", "background", "grey", { mode: "always" });
    addLocStore(/komiku\./, "is_subscribed", "true");


    // MANGAPLUS
    handleElement(/mangaplus\./, '.Updates-module_header_2qZIk', "addText", {
        mode: "once",
        position: "after",
        text: "🔥 Telegram: @g4hmx0"
    });
    handleElement(/mangaplus\./, '.TitleDetailHeader-module_right1_1o9Bj', "addText", {
        mode: "once",
        position: "after",
        text: "🔥 Telegram: @g4hmx0"
    });
    handleElement(/mangaplus\./, ".TitleDetail-module_sub_3Gl_e", "delete", { mode: "always" });
    handleElement(/mangaplus\./, ".Updates-module_topAd_2rtgG", "delete", { mode: "always" });


    // KOMIKINDO
    handleElement(/komikindo\./, '.home', "addText", {
        mode: "once",
        position: "before",
        text: "🔥 Telegram: @g4hmx0"
    });
    handleElement(/komikindo\./, '.infoanime', "addText", {
        mode: "once",
        position: "after",
        text: "🔥 Telegram: @g4hmx0"
    });
    handleElement(/komikindo\./, ".gulai_asam_manis", "delete", { mode: 'always' });
    removeScript(/komikindo\./, '(ads-iframe|rn_ad_native|adsystem|doubleclick|googlesyndication|amazon-adsystem)');


    // MANHWA INDO
    handleElement(/manhwaindo\./, ".ads-wrapper", "delete", { mode: "always" });
    handleElement(/manhwaindo\./, "#kln-block", "delete", { mode: "always" });
    handleElement(/manhwaindo\./, ".kln", "delete", { mode: "always" });
    clickElement(/manhwaindo\./, 'span[id="close-teaser"]', { mode: "always", delay: 0 });
    handleElement(/manhwaindo\./, 'div[style="position: relative; margin: auto; clear: both;"]', "delete", { mode: "always" });
    handleElement(/manhwaindo\./, '.slider-wrapper', "addText", {
        mode: "once",
        position: "before",
        text: "🔥 Telegram: @g4hmx0"
    });
    handleElement(/manhwaindo\./, '.info-desc', "addText", {
        mode: "once",
        position: "before",
        text: "🔥 Telegram: @g4hmx0"
    });
    handleElement(/manhwaindo\./, '.allc', "addText", {
        mode: "once",
        position: "after",
        text: "🔥 Telegram: @g4hmx0"
    });


    // SOFTKOMIK
    handleElement(/softkomik\./, '.header', "addText", {
        mode: "once",
        position: "after",
        text: "🔥 Telegram: @g4hmx0"
    });
    handleElement(/softkomik\./, 'script[src="https://excavatenearbywand.com/aas/r45d/vki/2076916/tghr.js"]', "delete", { mode: "always" });
    handleElement(/softkomik\./, "#dl-banner-300x250", "delete", { mode: "always" });
    handleElement(/softkomik\./, "#dl-banner-728x90", "delete", { mode: "always" });


    // LK21
    if (document.title.match("LayarKaca21") || document.title.match("LK21")) {
        handleElement(null, '.breadcrumbs', "addText", {
            mode: "once",
            position: "before",
            text: "🔥 Telegram: @g4hmx0"
        });
        handleElement(null, '.deskripsi-homepage', "addText", {
            mode: "once",
            position: "after",
            text: "🔥 Telegram: @g4hmx0"
        });
        clickElement(null, 'button[onclick="parentNode.parentNode.parentNode.remove()"]', { mode: "always", delay: 0 });
        handleElement(null, '#floating_banner_top1', "delete", { mode: "always" });
        handleElement(null, 'a[rel="nofollow noopener"]', "delete", { mode: "always" });
    }
})();
