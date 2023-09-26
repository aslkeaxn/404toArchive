// ==UserScript==
// @name         404toArchive
// @namespace    https://github.com/aslkeaxn/404toArchive
// @version      0.1
// @description  Redirects from a 404 page to an archive backup when possible
// @author       aslkeaxn
// @match        *://*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  async function main() {
    const url = location.href;
    const res1 = await fetch(url, { method: "HEAD" });

    if (res1.status !== 404) return;

    const encodedUrl = encodeURI(url);
    const archiveUrl = `https://archive.org/wayback/available?url=${encodedUrl}`;
    const res2 = await fetch(archiveUrl);
    const json = await res2.json();
    const closestSnapshot = json.archived_snapshots.closest;

    if (!closestSnapshot || !closestSnapshot.available) return;

    window.location.replace(closestSnapshot.url);
  }

  main().catch(console.error);
})();
