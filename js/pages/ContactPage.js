/**
 * ContactPage.js — Page Contact (#/contact)
 *
 * v0.9.0 — Formulaire sécurisé (OWASP best-practices) :
 *   - Validation côté client via validators.js
 *   - Honeypot anti-bot (champ caché non visible par CSS)
 *   - Rate limiting JS : 30 s minimum entre deux envois
 *   - Envoi AJAX sans backend via FormSubmit
 *   - XSS : aucune donnée brute insérée via innerHTML
 *
 * Données sensibles : aucune clé/token dans le code.
 * L'adresse de réception est publique (contact professionnel).
 */

import { i18n }       from '../utils/i18n.js';
import { sanitize }   from '../utils/sanitize.js';
import { validators } from '../utils/validators.js';

// ── Configuration ─────────────────────────────────────────────
const FORM_SUBMIT_URL = 'https://formsubmit.co/ajax/bertino@hflexsys.com';
const RATE_LIMIT_MS   = 30_000;

// ── Icônes ────────────────────────────────────────────────────
const ICON_LOCATION = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"
  stroke="currentColor" stroke-width="1.8" aria-hidden="true">
  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
  <circle cx="12" cy="10" r="3"/>
</svg>`;

const ICON_EMAIL = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"
  stroke="currentColor" stroke-width="1.8" aria-hidden="true">
  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
  <polyline points="22,6 12,13 2,6"/>
</svg>`;

const ICON_PHONE = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"
  stroke="currentColor" stroke-width="1.8" aria-hidden="true">
  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.44 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.59a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
</svg>`;

const ICON_SEND = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none"
  stroke="currentColor" stroke-width="2" aria-hidden="true">
  <line x1="22" y1="2" x2="11" y2="13"/>
  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
</svg>`;

const ICON_SPINNER = `<svg class="contact-form__spinner" width="18" height="18"
  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
  <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
</svg>`;

const ICON_CHECK = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"
  stroke="currentColor" stroke-width="2" aria-hidden="true">
  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
  <polyline points="22 4 12 14.01 9 11.01"/>
</svg>`;

const ICON_GITHUB = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.79-.26.79-.57v-2c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.19.69.8.57C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
</svg>`;

const ICON_LINKEDIN = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
  <rect x="2" y="9" width="4" height="12"/>
  <circle cx="4" cy="4" r="2"/>
</svg>`;

// ── Données de contact ────────────────────────────────────────
const CONTACT_INFO = [
  { icon: ICON_LOCATION, labelKey: 'contact.info_location', value: 'Lomé, Togo',           href: null },
  { icon: ICON_EMAIL,    labelKey: 'contact.info_email',    value: 'bertino@hflexsys.com', href: 'mailto:bertino@hflexsys.com' },
  { icon: ICON_PHONE,    labelKey: 'contact.info_phone',    value: '+228 98 53 23 93',     href: 'tel:+22898532393' },
];

const SOCIAL_LINKS = [
  { icon: ICON_GITHUB,   label: 'GitHub',   href: 'https://github.com/bertin-anlovi' },
  { icon: ICON_LINKEDIN, label: 'LinkedIn', href: 'https://www.linkedin.com/in/bertin-anlovi' },
];

// ── Règles de validation par champ ────────────────────────────
const FIELD_RULES = {
  name: [
    { test: v => validators.isNotEmpty(v),    fr: 'Ce champ est requis.',      en: 'This field is required.'    },
    { test: v => validators.minLength(v, 2),  fr: 'Minimum 2 caractères.',     en: 'Minimum 2 characters.'      },
    { test: v => validators.maxLength(v, 100),fr: 'Maximum 100 caractères.',   en: 'Maximum 100 characters.'    },
  ],
  email: [
    { test: v => validators.isNotEmpty(v),    fr: 'Ce champ est requis.',      en: 'This field is required.'    },
    { test: v => validators.isEmail(v),       fr: 'Adresse e-mail invalide.',  en: 'Invalid email address.'     },
  ],
  subject: [
    { test: v => validators.isNotEmpty(v),    fr: 'Ce champ est requis.',      en: 'This field is required.'    },
    { test: v => validators.minLength(v, 3),  fr: 'Minimum 3 caractères.',     en: 'Minimum 3 characters.'      },
    { test: v => validators.maxLength(v, 150),fr: 'Maximum 150 caractères.',   en: 'Maximum 150 characters.'    },
  ],
  message: [
    { test: v => validators.isNotEmpty(v),    fr: 'Ce champ est requis.',      en: 'This field is required.'    },
    { test: v => validators.minLength(v, 10), fr: 'Minimum 10 caractères.',    en: 'Minimum 10 characters.'     },
    { test: v => validators.maxLength(v, 2000),fr:'Maximum 2000 caractères.',  en: 'Maximum 2000 characters.'   },
  ],
};

// ── Helpers ───────────────────────────────────────────────────
function buildInfoList() {
  return CONTACT_INFO.map(({ icon, labelKey, value, href }) => {
    const val = sanitize(value);
    const link = href
      ? `<a href="${href}" class="contact-info__value contact-info__value--link">${val}</a>`
      : `<span class="contact-info__value">${val}</span>`;
    return `
      <li class="contact-info__item">
        <span class="contact-info__item-icon">${icon}</span>
        <div class="contact-info__item-body">
          <span class="contact-info__item-label" data-i18n="${labelKey}">${i18n.t(labelKey)}</span>
          ${link}
        </div>
      </li>`;
  }).join('');
}

function buildSocials() {
  return SOCIAL_LINKS.map(({ icon, label, href }) => `
    <a href="${href}" class="contact-info__social"
       target="_blank" rel="noopener noreferrer"
       aria-label="${sanitize(label)}">
      ${icon}
      <span>${sanitize(label)}</span>
    </a>`).join('');
}

function buildFormField({ id, name, type = 'text', labelKey, placeholderKey, required = true }) {
  const el = type === 'textarea'
    ? `<textarea class="contact-form__input contact-form__textarea"
           id="${id}" name="${name}" rows="5"
           placeholder="${i18n.t(placeholderKey)}"
           ${required ? 'required' : ''}
           aria-required="${required}"
           aria-describedby="${id}-error"></textarea>`
    : `<input class="contact-form__input"
           id="${id}" name="${name}" type="${type}"
           placeholder="${i18n.t(placeholderKey)}"
           ${required ? 'required' : ''}
           aria-required="${required}"
           aria-describedby="${id}-error"
           ${type === 'email' ? 'autocomplete="email"' : ''}
           ${name === 'name' ? 'autocomplete="name"' : ''}>`;

  return `
    <div class="contact-form__field">
      <label class="contact-form__label" for="${id}"
             data-i18n="${labelKey}">${i18n.t(labelKey)}</label>
      ${el}
      <span class="contact-form__error" id="${id}-error" role="alert" aria-live="polite"></span>
    </div>`;
}

// ── Page ──────────────────────────────────────────────────────
export const ContactPage = {
  _lastSubmit: 0,

  render(container) {
    const lang = i18n.getLang();

    container.innerHTML = `
      <div class="page contact-page">

        <header class="section-header animate-fade-up" style="--delay:0ms">
          <h2 class="section-title" data-i18n="contact.title">${i18n.t('contact.title')}</h2>
          <p class="section-subtitle" data-i18n="contact.subtitle">${i18n.t('contact.subtitle')}</p>
        </header>

        <div class="contact-page__grid animate-fade-up" style="--delay:100ms">

          <!-- ── Colonne gauche : infos ── -->
          <aside class="contact-info">
            <p class="contact-info__intro" data-i18n="contact.intro">${i18n.t('contact.intro')}</p>

            <ul class="contact-info__list" aria-label="Coordonnées">
              ${buildInfoList()}
            </ul>

            <div class="contact-info__socials" aria-label="Réseaux sociaux">
              ${buildSocials()}
            </div>

            <div class="contact-info__available">
              <span class="contact-info__available-dot" aria-hidden="true"></span>
              <span data-i18n="contact.available">${i18n.t('contact.available')}</span>
            </div>
          </aside>

          <!-- ── Colonne droite : formulaire ── -->
          <div class="contact-form-wrapper">
            <form class="contact-form" id="contact-form" novalidate aria-label="Formulaire de contact">

              <!-- Honeypot anti-bot : caché des utilisateurs, visible des bots -->
              <div class="contact-form__honeypot" aria-hidden="true">
                <label>Do not fill this field</label>
                <input type="text" name="_honey" tabindex="-1" autocomplete="off">
              </div>

              ${buildFormField({
                id: 'cf-name', name: 'name', type: 'text',
                labelKey: 'contact.name', placeholderKey: 'contact.name_placeholder',
              })}
              ${buildFormField({
                id: 'cf-email', name: 'email', type: 'email',
                labelKey: 'contact.email', placeholderKey: 'contact.email_placeholder',
              })}
              ${buildFormField({
                id: 'cf-subject', name: 'subject', type: 'text',
                labelKey: 'contact.subject', placeholderKey: 'contact.subject_placeholder',
              })}
              ${buildFormField({
                id: 'cf-message', name: 'message', type: 'textarea',
                labelKey: 'contact.message', placeholderKey: 'contact.message_placeholder',
              })}

              <div class="contact-form__actions">
                <button class="btn btn--primary btn--lg contact-form__submit"
                        type="submit" id="cf-submit">
                  ${ICON_SEND}
                  <span data-i18n="contact.send">${i18n.t('contact.send')}</span>
                </button>
              </div>

              <div class="contact-form__status" id="cf-status"
                   role="alert" aria-live="polite" hidden></div>

            </form>
          </div>

        </div>
      </div>`;

    this._bindForm(container, lang);
  },

  // ── Bind du formulaire ─────────────────────────────────────
  _bindForm(container, lang) {
    const form = container.querySelector('#contact-form');
    if (!form) return;

    const fieldNames = ['name', 'email', 'subject', 'message'];

    fieldNames.forEach(name => {
      const input = form.querySelector(`[name="${name}"]`);
      const error = form.querySelector(`#cf-${name}-error`);
      if (!input || !error) return;

      input.addEventListener('blur', () => {
        const msg = this._validate(input.value, FIELD_RULES[name], lang);
        this._setFieldState(input, error, msg);
      });

      input.addEventListener('input', () => {
        if (input.classList.contains('invalid')) {
          const msg = this._validate(input.value, FIELD_RULES[name], lang);
          if (!msg) this._setFieldState(input, error, null);
        }
      });
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      await this._handleSubmit(form, fieldNames, lang);
    });
  },

  // ── Soumission ─────────────────────────────────────────────
  async _handleSubmit(form, fieldNames, lang) {
    // Honeypot : si rempli → bot → abandon silencieux
    const honey = form.querySelector('[name="_honey"]');
    if (honey?.value) return;

    // Rate limiting
    const now = Date.now();
    if (now - this._lastSubmit < RATE_LIMIT_MS) {
      this._showStatus(form, i18n.t('contact.error_rate'), 'error');
      return;
    }

    // Validation complète
    let firstInvalid = null;
    let hasError     = false;

    fieldNames.forEach(name => {
      const input = form.querySelector(`[name="${name}"]`);
      const error = form.querySelector(`#cf-${name}-error`);
      if (!input || !error) return;

      const msg = this._validate(input.value, FIELD_RULES[name], lang);
      this._setFieldState(input, error, msg);

      if (msg) {
        hasError = true;
        if (!firstInvalid) firstInvalid = input;
      }
    });

    if (hasError) {
      firstInvalid?.focus();
      return;
    }

    // Collecte des données (trim, pas de sanitize → on envoie le texte brut)
    const data = {};
    fieldNames.forEach(name => {
      data[name] = form.querySelector(`[name="${name}"]`).value.trim();
    });

    // Envoi
    this._setLoading(form, true, lang);
    try {
      const res = await fetch(FORM_SUBMIT_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body:    JSON.stringify({
          ...data,
          _subject:  `Portfolio Contact: ${data.subject}`,
          _captcha:  'false',
        }),
      });

      if (res.ok) {
        this._lastSubmit = now;
        this._showStatus(form, i18n.t('contact.success'), 'success');
        form.reset();
        form.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));
      } else {
        throw new Error(`HTTP ${res.status}`);
      }
    } catch {
      this._showStatus(form, i18n.t('contact.error'), 'error');
    } finally {
      this._setLoading(form, false, lang);
    }
  },

  // ── Helpers internes ───────────────────────────────────────
  _validate(value, rules, lang) {
    for (const rule of rules) {
      if (!rule.test(value)) return rule[lang] ?? rule.fr;
    }
    return null;
  },

  _setFieldState(input, error, message) {
    if (message) {
      input.classList.add('invalid');
      error.textContent = message;
    } else {
      input.classList.remove('invalid');
      error.textContent = '';
    }
  },

  _setLoading(form, loading, lang) {
    const btn = form.querySelector('#cf-submit');
    if (!btn) return;
    btn.disabled = loading;
    btn.innerHTML = loading
      ? `${ICON_SPINNER} <span>${i18n.t('contact.sending')}</span>`
      : `${ICON_SEND} <span data-i18n="contact.send">${i18n.t('contact.send')}</span>`;
  },

  _showStatus(form, message, type) {
    const el = form.querySelector('#cf-status');
    if (!el) return;
    el.className = `contact-form__status contact-form__status--${type}`;
    el.innerHTML = type === 'success'
      ? `${ICON_CHECK} <span>${sanitize(message)}</span>`
      : `<span>${sanitize(message)}</span>`;
    el.hidden = false;
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    if (type === 'success') setTimeout(() => { el.hidden = true; }, 8000);
  },
};
