(() => {
  const input = document.getElementById("pnl-search-input");
  const results = document.getElementById("pnl-search-results");
  if (!input || !results) return;

  const normalize = (value) => String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const render = (items, query) => {
    results.innerHTML = "";
    if (!query.trim()) {
      const message = document.createElement("p");
      message.className = "pnl-search-message";
      message.textContent = "Saisissez un mot-clé pour lancer la recherche.";
      results.appendChild(message);
      return;
    }

    if (!items.length) {
      const message = document.createElement("p");
      message.className = "pnl-search-message";
      message.textContent = "Aucun résultat";
      results.appendChild(message);
      return;
    }

    const list = document.createElement("div");
    list.className = "card-grid two-cols";
    items.slice(0, 10).forEach((item) => {
      const article = document.createElement("article");
      article.className = "info-card";

      const category = document.createElement("p");
      category.className = "section-kicker";
      category.textContent = item.category || "Page";
      article.appendChild(category);

      const title = document.createElement("h3");
      const link = document.createElement("a");
      link.href = item.url;
      link.textContent = item.title || item.url;
      title.appendChild(link);
      article.appendChild(title);

      const description = document.createElement("p");
      description.textContent = item.description || "";
      article.appendChild(description);

      list.appendChild(article);
    });
    results.appendChild(list);
  };

  fetch("/assets/data/search-index.json")
    .then((response) => {
      if (!response.ok) throw new Error("Index indisponible");
      return response.json();
    })
    .then((index) => {
      const search = () => {
        const query = input.value;
        const terms = normalize(query).split(/\s+/).filter(Boolean);
        const matches = index.filter((item) => {
          const haystack = normalize([item.title, item.description, item.category].join(" "));
          return terms.every((term) => haystack.includes(term));
        });
        render(matches, query);
      };
      input.addEventListener("input", search);
      render([], "");
    })
    .catch(() => {
      results.innerHTML = "";
      const message = document.createElement("p");
      message.className = "pnl-search-message";
      message.textContent = "La recherche n’est pas disponible pour le moment.";
      results.appendChild(message);
    });
})();
