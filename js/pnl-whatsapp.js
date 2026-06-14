/* Préparation terrain PNL — WhatsApp */
(function () {
  var WHATSAPP_URL = "https://wa.me/?text=Bonjour%20Prot%C3%A9geons%20notre%20Littoral";

  if (!WHATSAPP_URL || WHATSAPP_URL.indexOf("https://wa.me/?text=") !== 0) {
    return;
  }

  var link = document.createElement("a");
  link.href = WHATSAPP_URL;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.className = "pnl-whatsapp-float";
  link.setAttribute("aria-label", "Contacter Protégeons notre Littoral sur WhatsApp");
  link.textContent = "💬";

  document.body.appendChild(link);
})();
