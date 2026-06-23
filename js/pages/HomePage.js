/**
 * HomePage.js — Page d'accueil (#/)
 * Implémentée en v0.4.0
 */

export const HomePage = {
  render(container) {
    container.innerHTML = `
      <section class="page page--home">
        <p class="page__placeholder">Accueil — v0.4.0</p>
      </section>
    `;
  },
};
