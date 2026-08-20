// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

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

  vite: {
    build: {
      // Terser ofusca mais que o esbuild padrão: encurta nomes de variáveis e
      // funções, remove comentários e console.log do bundle de produção —
      // dificulta reaproveitar o JS só olhando o código entregue ao navegador.
      minify: "terser",
      terserOptions: {
        compress: { drop_console: true },
        mangle: true,
        format: { comments: false },
      },
    },
  },

  integrations: [react()],
});