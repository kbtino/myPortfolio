/**
 * Navbar.js — Barre de navigation principale
 * Implémentée en v0.3.0
 */

export const Navbar = {
  render() {
    const el = document.getElementById('navbar');
    if (!el) return;
    el.innerHTML = '<nav class="navbar"><!-- v0.3.0 --></nav>';
  },
};
