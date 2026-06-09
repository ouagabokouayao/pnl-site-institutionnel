/* Préparation terrain PNL — WhatsApp désactivé sans numéro officiel */
(function () {
  var WHATSAPP_NUMBER = "";

  if (!WHATSAPP_NUMBER || !/^[0-9]{8,15}$/.test(WHATSAPP_NUMBER)) {
    return;
  }

  var link = document.createElement("a");
  link.href = "https://wa.me/" + WHATSAPP_NUMBER;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.className = "pnl-whatsapp-float";
  link.setAttribute("aria-label", "Contacter Protégeons notre Littoral sur WhatsApp");
  link.textContent = "💬";

  document.body.appendChild(link);
})();
