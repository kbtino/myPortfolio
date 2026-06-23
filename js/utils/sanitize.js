/**
 * sanitize.js — Protection XSS
 *
 * Échappe les caractères HTML dangereux dans toute string utilisateur
 * avant insertion dans le DOM via innerHTML.
 *
 * Règle : ne jamais injecter du contenu utilisateur brut dans innerHTML.
 * Toujours passer par sanitize() ou utiliser textContent/innerText.
 */

const ESCAPE_MAP = {
  '&':  '&amp;',
  '<':  '&lt;',
  '>':  '&gt;',
  '"':  '&quot;',
  "'":  '&#x27;',
  '/':  '&#x2F;',
};

export function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[&<>"'/]/g, char => ESCAPE_MAP[char]);
}
