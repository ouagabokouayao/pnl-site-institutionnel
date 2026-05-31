const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

if (menuToggle && siteNav) {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.addEventListener('click', () => {
    siteNav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(siteNav.classList.contains('is-open')));
  });
}

const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.site-nav a').forEach((link) => {
  if (link.getAttribute('href') === currentPage) {
    link.setAttribute('aria-current', 'page');
  }
});
