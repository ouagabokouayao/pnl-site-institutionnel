/* Préparation terrain PNL — GA4 non actif sans identifiant officiel */
(function () {
  var GA4_ID = "";

  if (!GA4_ID || !/^G-[A-Z0-9]+$/.test(GA4_ID)) {
    return;
  }

  var script = document.createElement("script");
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA4_ID);
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  window.gtag = gtag;

  gtag("js", new Date());
  gtag("config", GA4_ID, {
    anonymize_ip: true
  });
})();
