/**
 * validators.js — Validation des entrées (formulaire contact)
 * Utilisé en v0.9.0
 *
 * Chaque fonction retourne un booléen.
 * Les messages d'erreur sont gérés par le composant qui appelle ces fonctions.
 */

export const validators = {

  isEmail(value) {
    return typeof value === 'string'
      && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
  },

  isNotEmpty(value) {
    return typeof value === 'string' && value.trim().length > 0;
  },

  maxLength(value, max) {
    return typeof value === 'string' && value.length <= max;
  },

  minLength(value, min) {
    return typeof value === 'string' && value.trim().length >= min;
  },
};
