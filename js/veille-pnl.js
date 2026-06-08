(function () {
  const paths = {
    actualites: 'assets/data/actualites-pnl.json',
    evenements: 'assets/data/evenements-pnl.json',
    veille: 'assets/data/veille-littorale-pnl.json',
    journees: 'assets/data/journees-2026-pnl.json'
  };

  const formatDate = (value) => {
    const date = new Date(`${value}T00:00:00`);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  const safeText = (value) => String(value || '');

  const appendImage = (article, item) => {
    if (!item.image) return;
    const image = document.createElement('img');
    image.className = 'data-image';
    image.src = safeText(item.image);
    image.alt = `${safeText(item.titre)} — ONG Protégeons notre Littoral`;
    image.loading = 'lazy';
    image.width = 1200;
    image.height = 750;
    article.appendChild(image);
  };

  const makeCard = (item, options = {}) => {
    const article = document.createElement('article');
    article.className = options.compact ? 'data-item' : 'info-card data-card';

    if (options.showImage) {
      appendImage(article, item);
    }

    const meta = document.createElement('p');
    meta.className = 'data-meta';
    meta.textContent = options.meta || formatDate(item.date);
    article.appendChild(meta);

    const title = document.createElement('h3');
    title.textContent = safeText(item.titre);
    article.appendChild(title);

    if (item.organisateur) {
      const organizer = document.createElement('p');
      organizer.className = 'data-note';
      organizer.textContent = safeText(item.organisateur);
      article.appendChild(organizer);
    }

    const resume = document.createElement('p');
    resume.textContent = safeText(item.message_fort || item.resume || item.legende_courte);
    article.appendChild(resume);

    if (item.legende_courte && options.showCaption) {
      const caption = document.createElement('p');
      caption.textContent = safeText(item.legende_courte);
      article.appendChild(caption);
    }

    if (item.type === 'journee-sensibilisation') {
      const notice = document.createElement('p');
      notice.className = 'data-note';
      notice.textContent = 'Journée relayée par l’ONG à des fins de sensibilisation.';
      article.appendChild(notice);
    }

    const pageLink = item.programme_lie || item.page_liee;
    if (pageLink) {
      const link = document.createElement('a');
      link.className = 'text-link';
      link.href = pageLink;
      link.textContent = options.linkLabel || 'Voir la page liée';
      article.appendChild(link);
    }

    return article;
  };

  const setEmpty = (container, message) => {
    container.innerHTML = '';
    const card = document.createElement('article');
    card.className = container.classList.contains('compact') ? 'data-item' : 'info-card data-card';
    const text = document.createElement('p');
    text.textContent = message;
    card.appendChild(text);
    container.appendChild(card);
  };

  const renderCards = (selector, items, options = {}) => {
    document.querySelectorAll(selector).forEach((container) => {
      const list = items.slice(0, Number(container.dataset.limit || options.limit || items.length));
      const compact = container.classList.contains('compact');
      container.innerHTML = '';
      if (!list.length) {
        setEmpty(container, container.dataset.empty || options.empty || 'Aucun élément public à afficher pour le moment.');
        return;
      }
      list.forEach((item) => container.appendChild(makeCard(item, { ...options, compact })));
    });
  };

  const loadJson = (url) => fetch(url).then((response) => {
    if (!response.ok) throw new Error(`Chargement impossible : ${url}`);
    return response.json();
  });

  Promise.all([
    loadJson(paths.actualites).catch(() => []),
    loadJson(paths.evenements).catch(() => []),
    loadJson(paths.veille).catch(() => []),
    loadJson(paths.journees).catch(() => [])
  ]).then(([actualites, evenements, veille, journees]) => {
    const publishedNews = actualites.filter((item) => item.statut === 'publie');
    const awarenessDays = evenements.filter((item) => item.type === 'journee-sensibilisation');
    const ongEvents = evenements.filter((item) => item.organise_par_pnl === true && item.validation_presidentielle === true);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const sortedJournees = journees.slice().sort((a, b) => a.date.localeCompare(b.date));
    const upcomingJournees = sortedJournees.filter((item) => new Date(`${item.date}T00:00:00`) >= today);
    const nextJournees = upcomingJournees.length ? upcomingJournees : sortedJournees;

    renderCards('[data-pnl-actualites-home]', publishedNews, { limit: 1, linkLabel: 'Voir l’actualité' });
    renderCards('[data-pnl-actualites-list]', publishedNews, { linkLabel: 'Consulter la page liée' });
    renderCards('[data-pnl-evenements-home]', awarenessDays, {
      limit: 3,
      linkLabel: 'Voir la ressource liée'
    });
    renderCards('[data-pnl-journees-home]', nextJournees, {
      limit: 1,
      showImage: true,
      linkLabel: 'Voir le calendrier'
    });
    renderCards('[data-pnl-evenements-sensibilisation]', awarenessDays, {
      linkLabel: 'Voir la page liée'
    });
    renderCards('[data-pnl-journees-calendrier]', sortedJournees, {
      showImage: true,
      showCaption: true,
      linkLabel: 'Voir le programme associé'
    });
    renderCards('[data-pnl-journees-actualites]', sortedJournees, {
      showImage: true,
      linkLabel: 'Voir la page liée'
    });
    renderCards('[data-pnl-journees-mediatheque]', sortedJournees, {
      showImage: true,
      showCaption: true,
      linkLabel: 'Voir le programme associé'
    });
    renderCards('[data-pnl-evenements-ong]', ongEvents, {
      empty: 'Les activités propres de l’ONG seront publiées ici lorsqu’elles seront confirmées.'
    });
    renderCards('[data-pnl-veille-home]', veille, {
      limit: 2,
      empty: 'La veille publique sera alimentée avec des informations et ressources validées.'
    });
    renderCards('[data-pnl-veille-list]', veille, {
      empty: 'Aucune veille publique n’est publiée pour le moment. Les éléments seront ajoutés après validation éditoriale.'
    });
  });
})();
