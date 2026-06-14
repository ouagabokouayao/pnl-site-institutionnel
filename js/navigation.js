const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const navItems = Array.from(document.querySelectorAll('.site-nav .nav-item'));
const submenuToggles = Array.from(document.querySelectorAll('.nav-submenu-toggle'));
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

const closeSubmenus = (exceptItem) => {
  navItems.forEach((item) => {
    if (item === exceptItem) return;
    item.classList.remove('is-open');
    const toggle = item.querySelector('.nav-submenu-toggle');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  });
};

const setItemOpen = (item, isOpen) => {
  item.classList.toggle('is-open', isOpen);
  const toggle = item.querySelector('.nav-submenu-toggle');
  if (toggle) toggle.setAttribute('aria-expanded', String(isOpen));
};

if (menuToggle && siteNav) {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    if (!isOpen) closeSubmenus();
  });
}

submenuToggles.forEach((toggle) => {
  toggle.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    const item = toggle.closest('.nav-item');
    if (!item) return;
    const shouldOpen = !item.classList.contains('is-open');
    closeSubmenus(item);
    setItemOpen(item, shouldOpen);
  });
});

navItems.forEach((item) => {
  item.addEventListener('mouseenter', () => {
    if (window.matchMedia('(min-width: 921px)').matches) {
      closeSubmenus(item);
      setItemOpen(item, true);
    }
  });

  item.addEventListener('mouseleave', () => {
    if (window.matchMedia('(min-width: 921px)').matches) {
      setItemOpen(item, false);
    }
  });

  item.addEventListener('focusin', () => {
    if (window.matchMedia('(min-width: 921px)').matches) {
      closeSubmenus(item);
      setItemOpen(item, true);
    }
  });
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.site-header')) {
    closeSubmenus();
    if (siteNav && menuToggle && siteNav.classList.contains('is-open')) {
      siteNav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  closeSubmenus();
  if (siteNav && menuToggle && siteNav.classList.contains('is-open')) {
    siteNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.focus();
  }
});

document.querySelectorAll('.site-nav a').forEach((link) => {
  const href = (link.getAttribute('href') || '').replace(/^\//, '');
  if (href === currentPage) {
    link.setAttribute('aria-current', 'page');
    const item = link.closest('.nav-item');
    if (item) item.classList.add('is-current');
  }
});
