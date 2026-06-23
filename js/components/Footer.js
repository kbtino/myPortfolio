/**
 * Footer.js — Pied de page
 * Implémenté en v0.3.0
 */

export const Footer = {
  render() {
    const el = document.getElementById('footer');
    if (!el) return;
    el.innerHTML = '<!-- Footer v0.3.0 -->';
  },
};
