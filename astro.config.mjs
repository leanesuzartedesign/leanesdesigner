// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  // Ativa canonical e URLs absolutas de Open Graph (o link que aparece
  // quando a página é compartilhada no WhatsApp/Instagram).
  site: "https://www.leanesuzarte.com.br",

  build: {
    // O padrão ("auto") joga a folha para fora do HTML quando ela passa de
    // ~4 kB — e uma folha externa bloqueia a renderização. Nesta página
    // (única, sem JS) inlinar sempre é mais rápido do que uma requisição a mais.
    inlineStylesheets: "always",
  },
});
