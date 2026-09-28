/**
 * SanBernarda Universal Attribution Widget
 * Identidade Visual Oficial: SanBernarda UAU 2026
 * Arquitetura: 100% Shadow DOM Isolado (Gatilho + Popover + Dossiê Modal)
 * Camadas de Embelezamento: Dot-Grid Blueprint, SVGs Vetoriais, Shimmer Metálico, Status Dot Neon, Micro-interações 120Hz
 * (c) 2026 SanBernarda Estúdio de IA — Todos os direitos reservados.
 */

(function () {
  'use strict';

  if (window.__SANBERNARDA_BADGE_INITIALIZED__) return;
  window.__SANBERNARDA_BADGE_INITIALIZED__ = true;

  const OFFICIAL_WHATSAPP = '5518996554253';

  function resolveDefaultLogo() {
    try {
      const currentScript = document.currentScript || Array.from(document.querySelectorAll('script')).find(s => s.src && s.src.includes('sanbernarda-badge.js'));
      if (currentScript && currentScript.src) {
        const url = new URL(currentScript.src);
        return new URL('logo-sanbernarda-claro.webp', url).href;
      }
    } catch (e) {}
    return 'https://sanbernarda.com/widgets/logo-sanbernarda-claro.webp';
  }

  // 1. Injeção global das fontes oficiais no <head> da página hospedeira
  if (!document.getElementById('sb-global-fonts')) {
    const p1 = document.createElement('link');
    p1.rel = 'preconnect';
    p1.href = 'https://fonts.googleapis.com';
    document.head.appendChild(p1);

    const p2 = document.createElement('link');
    p2.rel = 'preconnect';
    p2.href = 'https://fonts.gstatic.com';
    p2.crossOrigin = 'anonymous';
    document.head.appendChild(p2);

    const fontLink = document.createElement('link');
    fontLink.id = 'sb-global-fonts';
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Squada+One&display=swap';
    document.head.appendChild(fontLink);
  }

  // =========================================================================
  // ESTILOS DO GATILHO & POPOVER 1 (DENTRO DO SHADOW DOM DO <sanbernarda-badge>)
  // =========================================================================
  const badgeCSS = `
    @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Squada+One&display=swap');

    :host {
      --sb-orange: #FF5F00;
      --sb-orange-light: rgba(255, 95, 0, 0.08);
      --sb-ink: #12121F;
      --sb-border: #DDD9EA;
      --sb-border-soft: #ECEAF4;

      display: inline-block;
      vertical-align: middle;
      font-family: "Space Mono", monospace, -apple-system, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      box-sizing: border-box;
      position: relative;
    }

    *, *::before, *::after {
      box-sizing: inherit;
      margin: 0;
      padding: 0;
    }

    /* GATILHO VISÍVEL / BADGE */
    .sb-trigger {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 11.5px;
      color: inherit;
      text-decoration: none;
      background: transparent;
      border: 1px solid transparent;
      cursor: pointer;
      transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
      user-select: none;
      line-height: 1.4;
    }

    .sb-trigger:hover, .sb-trigger:focus-visible {
      background: rgba(255, 95, 0, 0.08);
      border-color: rgba(255, 95, 0, 0.3);
      box-shadow: 0 2px 10px rgba(255, 95, 0, 0.12);
      outline: none;
    }

    .sb-label {
      opacity: 0.8;
      font-size: 11px;
      font-family: "Space Mono", monospace;
    }

    .sb-brand {
      font-family: "Squada One", Impact, "Arial Black", sans-serif;
      font-size: 16.5px;
      letter-spacing: 0.04em;
      color: currentColor;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      text-transform: uppercase;
      line-height: 1;
    }

    .sb-sparkle {
      color: var(--sb-orange);
      font-size: 11px;
      display: inline-block;
      animation: sb-pulse 2.2s infinite ease-in-out;
    }

    @keyframes sb-pulse {
      0%, 100% { transform: scale(1); opacity: 0.85; }
      50% { transform: scale(1.35); opacity: 1; filter: drop-shadow(0 0 6px rgba(255, 95, 0, 0.8)); }
    }

    /* POPOVER 1 (MICRO-CARD DE PRÉVIA COM CAMADAS DE EMBELEZAMENTO) */
    .sb-popover {
      position: absolute;
      bottom: calc(100% + 14px);
      left: 50%;
      transform: translateX(-50%) translateY(8px) scale(0.96);
      width: 340px;
      max-width: 92vw;
      background: #FFFFFF;
      border: 1.5px solid var(--sb-border);
      border-top: 3px solid var(--sb-orange);
      border-radius: 12px;
      padding: 16px 18px;
      color: var(--sb-ink);
      box-shadow: 0 24px 48px -12px rgba(18, 18, 31, 0.22), 0 0 0 1px rgba(255, 95, 0, 0.06);
      opacity: 0;
      pointer-events: none;
      visibility: hidden;
      transition: opacity 0.24s cubic-bezier(0.16, 1, 0.3, 1),
                  transform 0.24s cubic-bezier(0.16, 1, 0.3, 1),
                  visibility 0.24s;
      z-index: 999999;
      text-align: left;
    }

    .sb-popover.sb-active {
      opacity: 1;
      pointer-events: auto;
      visibility: visible;
      transform: translateX(-50%) translateY(0) scale(1);
    }

    .sb-popover::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border-width: 8px;
      border-style: solid;
      border-color: #FFFFFF transparent transparent transparent;
      filter: drop-shadow(0 3px 2px rgba(18, 18, 31, 0.08));
    }

    /* CABEÇALHO DO POPOVER COM DOT-GRID E LOGO */
    .sb-popover-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--sb-border-soft);
      margin-bottom: 12px;
      background-image: radial-gradient(#E2E0EC 1.2px, transparent 1.2px);
      background-size: 10px 10px;
      border-radius: 6px;
      padding: 6px 8px 12px 6px;
    }

    .sb-logo-img {
      height: 40px;
      width: auto;
      max-width: 180px;
      object-fit: contain;
      display: block;
      filter: drop-shadow(0 1px 2px rgba(18, 18, 31, 0.06));
    }

    /* STATUS PILL (ONLINE EDGE) */
    .sb-status-pill {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      background: rgba(37, 211, 102, 0.1);
      border: 1px solid rgba(37, 211, 102, 0.25);
      border-radius: 999px;
      padding: 3px 7px;
      font-size: 8.5px;
      font-weight: 700;
      color: #15803d;
      letter-spacing: 0.06em;
      white-space: nowrap;
    }

    .sb-status-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #22c55e;
      box-shadow: 0 0 6px #22c55e;
      animation: sb-ping-dot 1.8s infinite ease-in-out;
    }

    @keyframes sb-ping-dot {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.5; transform: scale(1.3); }
    }

    .sb-popover-kicker {
      font-family: "Space Mono", monospace;
      font-size: 8.5px;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--sb-orange);
      font-weight: 700;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    /* LISTA DE HIGHLIGHTS COM MICRO-CARDS */
    .sb-highlights {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 7px;
      margin-bottom: 14px;
    }

    .sb-highlight-item {
      font-size: 10.5px;
      font-family: "Space Mono", monospace;
      color: #334155;
      line-height: 1.45;
      display: flex;
      align-items: center;
      gap: 8px;
      background: #F9F8FD;
      border: 1px solid #ECEAF4;
      border-radius: 6px;
      padding: 6px 9px;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .sb-highlight-item:hover {
      background: #FFFFFF;
      border-color: rgba(255, 95, 0, 0.3);
      box-shadow: 0 2px 8px rgba(18, 18, 31, 0.05);
      transform: translateX(2px);
    }

    .sb-icon-box {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      border-radius: 4px;
      background: rgba(255, 95, 0, 0.1);
      color: var(--sb-orange);
      flex-shrink: 0;
    }

    .sb-icon-box svg {
      width: 12px;
      height: 12px;
    }

    .sb-highlight-item strong {
      color: var(--sb-ink);
      font-weight: 700;
    }

    /* AÇÕES DO POPOVER COM SHIMMER */
    .sb-popover-actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding-top: 12px;
      border-top: 1px solid var(--sb-border-soft);
    }

    .sb-btn-cta {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      background: #25D366;
      color: #ffffff;
      font-family: "Space Mono", monospace;
      font-size: 10px;
      font-weight: 700;
      text-decoration: none;
      padding: 7px 12px;
      border-radius: 6px;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      flex: 1;
      text-align: center;
      position: relative;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
    }

    .sb-btn-cta::after {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 50%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
      transform: skewX(-20deg);
      animation: sb-shimmer 3.5s infinite;
    }

    @keyframes sb-shimmer {
      0% { left: -100%; }
      30%, 100% { left: 200%; }
    }

    .sb-btn-cta:hover {
      background: #20ba5a;
      transform: translateY(-1px);
      box-shadow: 0 6px 16px rgba(37, 211, 102, 0.4);
    }

    .sb-btn-more {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      background: #F5F5FA;
      border: 1px solid var(--sb-border);
      color: var(--sb-ink);
      font-family: "Space Mono", monospace;
      font-size: 10px;
      font-weight: 700;
      padding: 6.5px 10px;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      white-space: nowrap;
    }

    .sb-btn-more:hover {
      background: #ffffff;
      border-color: var(--sb-orange);
      color: var(--sb-orange);
      box-shadow: 0 2px 8px rgba(255, 95, 0, 0.15);
      transform: translateY(-1px);
    }
  `;

  // =========================================================================
  // ESTILOS DO DOSSIÊ MODAL (100% ISOLADO NO SHADOW DOM DO <sanbernarda-modal>)
  // =========================================================================
  const modalCSS = `
    @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Squada+One&display=swap');

    :host {
      --sb-orange: #FF5F00;
      --sb-ink: #12121F;
      --sb-border: #E2E0EC;
      --sb-border-soft: #ECEAF4;

      position: fixed;
      inset: 0;
      width: 100vw;
      height: 100vh;
      z-index: 2147483647;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      background: rgba(18, 18, 31, 0.76);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      opacity: 0;
      pointer-events: none;
      visibility: hidden;
      transition: opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1),
                  visibility 0.25s;
      box-sizing: border-box;
      font-family: "Space Mono", monospace, -apple-system, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    *, *::before, *::after {
      box-sizing: inherit;
      margin: 0;
      padding: 0;
    }

    :host(.sb-modal-open) {
      opacity: 1;
      pointer-events: auto;
      visibility: visible;
    }

    .sb-modal-dialog {
      background: #FFFFFF;
      border: 1px solid #E2E0EC;
      border-radius: 18px;
      width: 100%;
      max-width: 630px;
      max-height: 90vh;
      overflow-y: auto;
      color: #12121F;
      box-shadow: 0 35px 90px -15px rgba(18, 18, 31, 0.38), 0 0 0 1px rgba(255, 95, 0, 0.1);
      transform: scale(0.96) translateY(14px);
      transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
      text-align: left;
      display: flex;
      flex-direction: column;
      font-family: "Space Mono", monospace, -apple-system, sans-serif;
    }

    :host(.sb-modal-open) .sb-modal-dialog {
      transform: scale(1) translateY(0);
    }

    /* BARRA SUPERIOR / CABEÇALHO COM PADRÃO BLUEPRINT DOT-GRID */
    .sb-modal-topbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 24px;
      background-color: #FAFAFD;
      background-image: radial-gradient(#DDD9EA 1.2px, transparent 1.2px);
      background-size: 12px 12px;
      border-bottom: 1px solid #EBE8F3;
      position: sticky;
      top: 0;
      z-index: 10;
    }

    .sb-modal-brand-area {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .sb-modal-logo-img {
      height: 48px;
      width: auto;
      max-width: 260px;
      object-fit: contain;
      display: block;
      filter: drop-shadow(0 1px 2px rgba(18, 18, 31, 0.08));
    }

    /* TAG COM EFEITO SHIMMER */
    .sb-modal-badge-tag {
      background: rgba(255, 95, 0, 0.08);
      color: #FF5F00;
      border: 1px solid rgba(255, 95, 0, 0.25);
      border-radius: 6px;
      padding: 4px 9px;
      font-family: "Space Mono", monospace;
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      position: relative;
      overflow: hidden;
    }

    .sb-modal-badge-tag::after {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 50%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 95, 0, 0.25), transparent);
      animation: sb-shimmer 4s infinite;
    }

    .sb-modal-close-btn {
      background: #FFFFFF;
      border: 1px solid #DDD9EA;
      color: #64748b;
      width: 34px;
      height: 34px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 15px;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: 0 1px 3px rgba(18, 18, 31, 0.06);
    }

    .sb-modal-close-btn:hover {
      background: #fee2e2;
      border-color: #fca5a5;
      color: #b91c1c;
      transform: rotate(90deg) scale(1.05);
    }

    /* CONTEÚDO EDITORIAL DO DOSSIÊ */
    .sb-modal-main {
      padding: 24px 28px;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .sb-headline-wrap {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .sb-modal-kicker {
      font-family: "Space Mono", monospace;
      font-size: 9.5px;
      font-weight: 700;
      letter-spacing: 0.20em;
      text-transform: uppercase;
      color: #FF5F00;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .sb-modal-headline {
      font-family: "Squada One", Impact, "Arial Black", sans-serif;
      font-size: 27px;
      line-height: 1.15;
      color: #12121F;
      text-transform: uppercase;
      letter-spacing: 0.02em;
    }

    .sb-modal-headline span {
      color: #FF5F00;
    }

    .sb-modal-lead {
      font-family: "Space Mono", monospace;
      font-size: 11.5px;
      color: #475569;
      line-height: 1.6;
    }

    /* BARRA DE MÉTRICAS DE IMPACTO COM CARDS ELEVADOS 120Hz */
    .sb-metrics-container {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      background: #F8F7FC;
      border: 1.5px solid #E5E2F0;
      border-radius: 14px;
      padding: 12px;
    }

    .sb-metric-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 3px;
      background: #FFFFFF;
      border: 1px solid #ECEAF4;
      border-radius: 10px;
      padding: 14px 10px;
      text-align: center;
      box-shadow: 0 2px 6px rgba(18, 18, 31, 0.03);
      transition: transform 0.24s cubic-bezier(0.16, 1, 0.3, 1),
                  box-shadow 0.24s cubic-bezier(0.16, 1, 0.3, 1),
                  border-color 0.24s;
      cursor: default;
    }

    .sb-metric-box:hover {
      transform: translateY(-3px) scale(1.02);
      border-color: rgba(255, 95, 0, 0.4);
      box-shadow: 0 10px 24px -4px rgba(255, 95, 0, 0.16);
    }

    .sb-metric-val {
      font-family: "Squada One", Impact, "Arial Black", sans-serif;
      font-size: 32px;
      line-height: 1;
      color: #FF5F00;
      letter-spacing: -0.01em;
    }

    .sb-metric-name {
      font-family: "Space Mono", monospace;
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #12121F;
      margin-top: 3px;
    }

    .sb-metric-detail {
      font-size: 9.5px;
      color: #64748b;
      font-family: "Space Mono", monospace;
    }

    /* LISTA DE AUTORIDADE / PILARES COM CARDS ELEVADOS E SVGS */
    .sb-pillars-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .sb-pillar-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      font-size: 11px;
      line-height: 1.55;
      color: #334155;
      font-family: "Space Mono", monospace;
      background: #FAFAFD;
      border: 1px solid #EBE8F3;
      border-radius: 10px;
      padding: 12px 14px;
      transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .sb-pillar-item:hover {
      background: #FFFFFF;
      border-color: rgba(255, 95, 0, 0.3);
      box-shadow: 0 4px 14px rgba(18, 18, 31, 0.06);
      transform: translateX(3px);
    }

    .sb-pillar-icon-wrap {
      width: 28px;
      height: 28px;
      border-radius: 6px;
      background: rgba(255, 95, 0, 0.1);
      border: 1px solid rgba(255, 95, 0, 0.25);
      color: #FF5F00;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      margin-top: 1px;
    }

    .sb-pillar-icon-wrap svg {
      width: 15px;
      height: 15px;
    }

    .sb-pillar-item strong {
      color: #12121F;
      font-weight: 700;
    }

    /* FOOTER / AÇÃO FINAL */
    .sb-modal-footer {
      background: #FAFAFD;
      border-top: 1px solid #EBE8F3;
      padding: 16px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
      flex-wrap: wrap;
    }

    .sb-footer-info {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .sb-footer-author {
      font-family: "Space Mono", monospace;
      font-size: 10.5px;
      font-weight: 700;
      color: #12121F;
    }

    .sb-footer-sub {
      font-family: "Space Mono", monospace;
      font-size: 9.5px;
      color: #64748b;
    }

    .sb-footer-actions {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .sb-btn-whatsapp-action {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #25D366;
      color: #FFFFFF;
      font-family: "Space Mono", monospace;
      font-size: 11.5px;
      font-weight: 700;
      text-decoration: none;
      padding: 10px 18px;
      border-radius: 8px;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: 0 4px 14px rgba(37, 211, 102, 0.35);
      position: relative;
      overflow: hidden;
    }

    .sb-btn-whatsapp-action::after {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 50%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.35), transparent);
      animation: sb-shimmer 3.5s infinite;
    }

    .sb-btn-whatsapp-action:hover {
      background: #20ba5a;
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(37, 211, 102, 0.45);
    }

    .sb-btn-site-link {
      color: #64748b;
      font-family: "Space Mono", monospace;
      font-size: 10.5px;
      text-decoration: none;
      padding: 6px 8px;
      transition: color 0.2s;
    }

    .sb-btn-site-link:hover {
      color: #FF5F00;
    }
  `;

  // =========================================================================
  // WEB COMPONENT: <sanbernarda-modal> (100% SHADOW DOM ISOLADO NO BODY)
  // =========================================================================
  class SanBernardaModal extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
      const sourceSite = this.getAttribute('data-source') || window.location.hostname || 'cliente';
      const whatsappNumber = this.getAttribute('data-whatsapp') || OFFICIAL_WHATSAPP;
      const logoUrl = this.getAttribute('data-logo') || resolveDefaultLogo();

      const leadMsg = encodeURIComponent(
        `Olá Fernando! Vi o dossiê de performance da SanBernarda no site (${sourceSite}) e gostaria de avaliar um novo projeto de alto impacto.`
      );
      const waLink = `https://wa.me/${whatsappNumber}?text=${leadMsg}`;

      this.shadowRoot.innerHTML = `
        <style>${modalCSS}</style>

        <div class="sb-modal-dialog" role="dialog" aria-modal="true">
          <!-- CABEÇALHO BLUEPRINT COM LOGO E TAG SHIMMER -->
          <div class="sb-modal-topbar">
            <div class="sb-modal-brand-area">
              <img src="${logoUrl}" alt="SanBernarda" class="sb-modal-logo-img" />
              <span class="sb-modal-badge-tag">
                <span class="sb-sparkle">✦</span> DOSSIÊ TÉCNICO
              </span>
            </div>
            <button type="button" class="sb-modal-close-btn" aria-label="Fechar modal">✕</button>
          </div>

          <!-- CONTEÚDO PRINCIPAL -->
          <div class="sb-modal-main">
            <div class="sb-headline-wrap">
              <div class="sb-modal-kicker">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
                ENGENHARIA WEB & ARQUITETURA DE BORDA
              </div>
              <h2 class="sb-modal-headline">
                Sistemas web de ultra-alta velocidade que <span>convertem clientes</span>.
              </h2>
              <p class="sb-modal-lead">
                Empresas líderes não podem depender de sites lentos em WordPress ou modelos genéricos. Na SanBernarda, projetamos plataformas de alto valor na borda global da Cloudflare.
              </p>
            </div>

            <!-- MÉTRICAS DE IMPACTO COM INTERAÇÃO 120HZ -->
            <div class="sb-metrics-container">
              <div class="sb-metric-box">
                <span class="sb-metric-val">100/100</span>
                <span class="sb-metric-name">Google Vitals</span>
                <span class="sb-metric-detail">Rank Máximo</span>
              </div>
              <div class="sb-metric-box">
                <span class="sb-metric-val">0 ms</span>
                <span class="sb-metric-name">Latência Edge</span>
                <span class="sb-metric-detail">Borda Global</span>
              </div>
              <div class="sb-metric-box">
                <span class="sb-metric-val">3x +</span>
                <span class="sb-metric-name">Conversão</span>
                <span class="sb-metric-detail">Alto Ticket</span>
              </div>
            </div>

            <!-- PILARES DE AUTORIDADE COM MICRO-CARDS E ÍCONES SVG -->
            <ul class="sb-pillars-list">
              <li class="sb-pillar-item">
                <div class="sb-pillar-icon-wrap">
                  <!-- Ícone Globo / Servidor Edge -->
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                </div>
                <span><strong>Borda Global Serverless:</strong> Distribuído em mais de 300 datacenters mundiais via Cloudflare Workers. 100% imune a quedas de servidor.</span>
              </li>
              <li class="sb-pillar-item">
                <div class="sb-pillar-icon-wrap">
                  <!-- Ícone Diamante / Design de Precisão -->
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M6 3h12l4 6-10 12L2 9z"></path>
                    <path d="M11 3v6"></path>
                    <path d="M13 3v6"></path>
                  </svg>
                </div>
                <span><strong>Design de Elite Sob Medida:</strong> Identidade visual proprietária e transições a 120Hz sem dependência de templates amadores.</span>
              </li>
              <li class="sb-pillar-item">
                <div class="sb-pillar-icon-wrap">
                  <!-- Ícone Microchip IA / Cognição -->
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                    <rect x="9" y="9" width="6" height="6"></rect>
                    <line x1="9" y1="1" x2="9" y2="4"></line>
                    <line x1="15" y1="1" x2="15" y2="4"></line>
                    <line x1="9" y1="20" x2="9" y2="23"></line>
                    <line x1="15" y1="20" x2="15" y2="23"></line>
                    <line x1="20" y1="9" x2="23" y2="9"></line>
                    <line x1="20" y1="14" x2="23" y2="14"></line>
                    <line x1="1" y1="9" x2="4" y2="9"></line>
                    <line x1="1" y1="14" x2="4" y2="14"></line>
                  </svg>
                </div>
                <span><strong>Inteligência Artificial Integrada:</strong> Automações cognitivas e subagentes inteligentes de atendimento 24/7.</span>
              </li>
            </ul>
          </div>

          <!-- FOOTER DE CONVERSÃO -->
          <div class="sb-modal-footer">
            <div class="sb-footer-info">
              <span class="sb-footer-author">Atendimento Direto com Arquiteto</span>
              <span class="sb-footer-sub">Diagnóstico de engenharia e conversão</span>
            </div>
            <div class="sb-footer-actions">
              <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="sb-btn-whatsapp-action">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                Falar no WhatsApp &rarr;
              </a>
              <a href="https://sanbernarda.com" target="_blank" rel="noopener noreferrer" class="sb-btn-site-link">sanbernarda.com ↗</a>
            </div>
          </div>
        </div>
      `;

      this.initEvents();
    }

    initEvents() {
      const closeBtn = this.shadowRoot.querySelector('.sb-modal-close-btn');
      closeBtn.addEventListener('click', () => this.close());

      this.addEventListener('click', (e) => {
        if (e.target === this) this.close();
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.classList.contains('sb-modal-open')) {
          this.close();
        }
      });
    }

    open() {
      this.classList.add('sb-modal-open');
      document.body.style.overflow = 'hidden';
    }

    close() {
      this.classList.remove('sb-modal-open');
      document.body.style.overflow = '';
    }
  }

  if (!customElements.get('sanbernarda-modal')) {
    customElements.define('sanbernarda-modal', SanBernardaModal);
  }

  // =========================================================================
  // WEB COMPONENT: <sanbernarda-badge> (SELO VISÍVEL + POPOVER HOVER)
  // =========================================================================
  class SanBernardaBadge extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.closeTimeout = null;
    }

    connectedCallback() {
      const customText = this.getAttribute('data-text') || 'Criado por: Sanb';
      const sourceSite = this.getAttribute('data-source') || window.location.hostname || 'cliente';
      const whatsappNumber = this.getAttribute('data-whatsapp') || OFFICIAL_WHATSAPP;
      const logoUrl = this.getAttribute('data-logo') || resolveDefaultLogo();

      const leadMsgPreview = encodeURIComponent(
        `Olá Fernando! Estava navegando no site (${sourceSite}) e gostaria de entender como funciona o desenvolvimento de alta performance da SanBernarda.`
      );
      const waLinkPreview = `https://wa.me/${whatsappNumber}?text=${leadMsgPreview}`;

      const labelPart = customText.split(':')[0] || 'Criado por';
      const brandPart = customText.split(':')[1] ? customText.split(':')[1].trim() : 'Sanb';

      this.shadowRoot.innerHTML = `
        <style>${badgeCSS}</style>

        <!-- GATILHO VISÍVEL / BADGE -->
        <a class="sb-trigger" href="https://sanbernarda.com" target="_blank" rel="noopener noreferrer" aria-label="Criado por SanBernarda">
          <span class="sb-label">${labelPart}:</span>
          <span class="sb-brand">
            ${brandPart} <span class="sb-sparkle">✦</span>
          </span>
        </a>

        <!-- POPOVER 1: MICRO-CARD DE PRÉVIA -->
        <div class="sb-popover" role="dialog" aria-modal="false">
          <div class="sb-popover-header">
            <img src="${logoUrl}" alt="SanBernarda" class="sb-logo-img" />
            <span class="sb-status-pill">
              <span class="sb-status-dot"></span> EDGE ATIVO
            </span>
          </div>

          <div class="sb-popover-kicker">
            <span>⚡</span> ESTÚDIO DE IA & ALTA PERFORMANCE
          </div>

          <ul class="sb-highlights">
            <li class="sb-highlight-item">
              <span class="sb-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
              </span>
              <span><strong>Velocidade 100/100:</strong> Borda global (0ms latência).</span>
            </li>
            <li class="sb-highlight-item">
              <span class="sb-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M6 3h12l4 6-10 12L2 9z"></path>
                </svg>
              </span>
              <span><strong>Design Exclusivo:</strong> Arquitetura de elite proprietária.</span>
            </li>
            <li class="sb-highlight-item">
              <span class="sb-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                  <rect x="9" y="9" width="6" height="6"></rect>
                  <line x1="9" y1="1" x2="9" y2="4"></line>
                  <line x1="15" y1="1" x2="15" y2="4"></line>
                  <line x1="20" y1="9" x2="23" y2="9"></line>
                </svg>
              </span>
              <span><strong>Automação com IA:</strong> Subagentes inteligentes 24/7.</span>
            </li>
          </ul>

          <div class="sb-popover-actions">
            <a href="${waLinkPreview}" target="_blank" rel="noopener noreferrer" class="sb-btn-cta">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              WhatsApp
            </a>
            <button type="button" class="sb-btn-more">Saiba mais ↗</button>
          </div>
        </div>
      `;

      this.initEvents(sourceSite, whatsappNumber, logoUrl);
    }

    initEvents(sourceSite, whatsappNumber, logoUrl) {
      const trigger = this.shadowRoot.querySelector('.sb-trigger');
      const popover = this.shadowRoot.querySelector('.sb-popover');
      const btnMore = this.shadowRoot.querySelector('.sb-btn-more');

      const showPopover = () => {
        clearTimeout(this.closeTimeout);
        popover.classList.add('sb-active');
      };

      const hidePopover = () => {
        this.closeTimeout = setTimeout(() => {
          popover.classList.remove('sb-active');
        }, 280);
      };

      trigger.addEventListener('mouseenter', showPopover);
      trigger.addEventListener('mouseleave', hidePopover);

      popover.addEventListener('mouseenter', () => clearTimeout(this.closeTimeout));
      popover.addEventListener('mouseleave', hidePopover);

      trigger.addEventListener('click', (e) => {
        if (!popover.classList.contains('sb-active')) {
          e.preventDefault();
          showPopover();
        }
      });

      // Abre o Modal com Shadow DOM 100% isolado montado no body
      btnMore.addEventListener('click', (e) => {
        e.preventDefault();
        popover.classList.remove('sb-active');

        let modal = document.querySelector('sanbernarda-modal');
        if (!modal) {
          modal = document.createElement('sanbernarda-modal');
          modal.setAttribute('data-source', sourceSite);
          modal.setAttribute('data-whatsapp', whatsappNumber);
          modal.setAttribute('data-logo', logoUrl);
          document.body.appendChild(modal);
        }
        modal.open();
      });
    }
  }

  if (!customElements.get('sanbernarda-badge')) {
    customElements.define('sanbernarda-badge', SanBernardaBadge);
  }

  document.addEventListener('DOMContentLoaded', () => {
    const containers = document.querySelectorAll('[data-sanbernarda-widget], [data-sb-widget]');
    containers.forEach((el) => {
      if (!el.querySelector('sanbernarda-badge')) {
        const badge = document.createElement('sanbernarda-badge');
        if (el.dataset.source) badge.setAttribute('data-source', el.dataset.source);
        if (el.dataset.whatsapp) badge.setAttribute('data-whatsapp', el.dataset.whatsapp);
        if (el.dataset.text) badge.setAttribute('data-text', el.dataset.text);
        if (el.dataset.logo) badge.setAttribute('data-logo', el.dataset.logo);
        el.appendChild(badge);
      }
    });
  });
})();
