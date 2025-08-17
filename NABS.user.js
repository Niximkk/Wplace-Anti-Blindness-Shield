// ==UserScript==
// @name         Nix's Anti Blindness Shield
// @namespace    https://github.com/Niximkk
// @version      1.0.1
// @description  Replaces the Basemap of the Wplace map
// @author       Nix
// @match        https://wplace.live/*
// @grant        none
// @icon         https://em-content.zobj.net/source/google/428/last-quarter-moon-face_1f31c.png
// @license      GPL-3.0
// @updateURL    https://raw.githubusercontent.com/Niximkk/Wplace-Anti-Blindness-Shield/main/NABS.user.js
// @downloadURL  https://raw.githubusercontent.com/Niximkk/Wplace-Anti-Blindness-Shield/main/NABS.user.js
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    /* Hi, if you want to modify the basemap to a custom one, change this Variable */
      /* Oie, se quiser trocar o basemap pra um customizado, troca essa Variavel */
             /* Below are some examples - Abaixo deixarei alguns exemplos */

    // Default - https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json
    // Void friendly (grey) - https://geoserveis.icgc.cat/contextmaps/icgc_mapa_base_fosc.json

    const basemapJson = "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";


    /* ---  Dont mess with this part tho  --- */

    const originalFetch = window.fetch;

    window.fetch = async function(input, init) {
        const url = input instanceof Request ? input.url : input;

        if (url === "https://maps.wplace.live/styles/liberty") {
            try {
                const darkStyleResponse = await originalFetch(basemapJson);
                const darkStyleData = await darkStyleResponse.json();

                console.log(`🌙 Changed the basemap to ${basemapJson}.`);

                return new Response(JSON.stringify(darkStyleData), {
                    status: 200,
                    statusText: "OK",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
            } catch (error) {
                console.error("❌ Something went wrong with the basemap:", error);
                return originalFetch.apply(this, arguments);
            }
        }

        return originalFetch.apply(this, arguments);
    };

    console.log("🔧 Userscript loaded - Dark Mode Map active");
})();
