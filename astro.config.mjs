// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  // Defina o domínio de produção para gerar canonical/OG absolutos:
  // site: "https://seu-dominio.com",

  build: {
    // O padrão ("auto") joga a folha para fora do HTML quando ela passa de
    // ~4 kB — e uma folha externa bloqueia a renderização. Nesta página
    // (única, sem JS) inlinar sempre é mais rápido do que uma requisição a mais.
    inlineStylesheets: "always",
  },
});
