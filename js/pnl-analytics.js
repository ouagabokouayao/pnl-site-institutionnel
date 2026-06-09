/* Google Analytics 4 — PNL juin 2026 */
(function () {
  var GA4_ID = "G-MQ2STNC5VN";

  if (!GA4_ID || !/^G-[A-Z0-9]+$/.test(GA4_ID)) {
    return;
  }

  if (window.__PNL_GA4_LOADED__) {
    return;
  }
  window.__PNL_GA4_LOADED__ = true;

  var script = document.createElement("script");
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA4_ID);
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  window.gtag = gtag;

  gtag("js", new Date());
  gtag("config", GA4_ID);
})();
