/**
 * AboutPage.js — Page À propos (#/about)
 * Implémentée en v0.5.0
 */

export const AboutPage = {
  render(container) {
    container.innerHTML = `
      <section class="page page--about">
        <p class="page__placeholder">À propos — v0.5.0</p>
      </section>
    `;
  },
};
