// ==UserScript==
// @name         Project G4H
// @namespace    http://tampermonkey.net/
// @version      3.5
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

})();
