/* Préparation terrain PNL — Partage social */
(function () {
  document.querySelectorAll(".pnl-share").forEach(function (block) {
    var url = block.getAttribute("data-share-url") || window.location.href;
    var title = block.getAttribute("data-share-title") || document.title;
    block.querySelectorAll("a").forEach(function (link) {
      if (link.href.indexOf("twitter.com/intent/tweet") !== -1 && link.href.indexOf("text=") === -1) {
        link.href += "&text=" + encodeURIComponent(title);
      }
      if (link.href.indexOf("wa.me/?text=") !== -1 && link.href.endsWith("text=")) {
        link.href += encodeURIComponent(url);
      }
    });
  });
})();
