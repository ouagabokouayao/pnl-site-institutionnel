/* Préparation terrain PNL — Partage social */
(function () {
  var WHATSAPP_URL = "https://wa.me/?text=";
  document.querySelectorAll(".pnl-share").forEach(function (block) {
    var url = block.getAttribute("data-share-url") || window.location.href;
    var title = block.getAttribute("data-share-title") || document.title;
    var text = block.getAttribute("data-share-text") || title;
    var shareText = text + " " + url;

    block.querySelectorAll("a").forEach(function (link) {
      if (link.href.indexOf("twitter.com/intent/tweet") !== -1 && link.href.indexOf("text=") === -1) {
        link.href += "&text=" + encodeURIComponent(title);
      }
      if (link.href.indexOf("wa.me/?text=") !== -1) {
        link.href = WHATSAPP_URL + encodeURIComponent(shareText);
      }
    });

    block.querySelectorAll("button[data-share-channel]").forEach(function (button) {
      button.addEventListener("click", function () {
        var channel = button.getAttribute("data-share-channel");
        var target = "";

        if (channel === "facebook") {
          target = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url);
        } else if (channel === "linkedin") {
          target = "https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(url);
        } else if (channel === "x") {
          target = "https://twitter.com/intent/tweet?url=" + encodeURIComponent(url) + "&text=" + encodeURIComponent(text);
        } else if (channel === "whatsapp") {
          target = WHATSAPP_URL + encodeURIComponent(shareText);
        } else if (channel === "copy" && navigator.clipboard) {
          navigator.clipboard.writeText(url);
          button.textContent = "Lien copié";
          window.setTimeout(function () {
            button.textContent = "Copier le lien";
          }, 1800);
          return;
        }

        if (target) {
          window.open(target, "_blank", "noopener,noreferrer");
        }
      });
    });
  });
})();
