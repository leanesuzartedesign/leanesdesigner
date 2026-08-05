# Briefing — Portfólio Leane Suzarte

> Etapa 0 do [pipeline](../../pipeline.md). Campos marcados como *(suposição)* precisam de
> confirmação da Leane.

## Oferta

- **O que é:** portfólio de design da marca pessoal **Leane Suzarte**.
- **Ação desejada:** ⭑ **entrar em contato** — ação única e primária da página.
- **Preço/modelo:** não exibido na página *(suposição: orçamento sob consulta)*.
- **Diferencial:** design que resolve comunicação de negócio — identidade aplicada em peças
  que a empresa realmente usa (social, apresentação comercial, relatório institucional),
  não peça bonita solta.

## Público

- ⭑ **Para quem:** empresas e profissionais que precisam contratar design.
  Pelos cases: engenharia/indústria (G3 Polaris), iluminação/varejo (Axialumi), advocacia
  (Karine Rocha), nutrição (Angela), automotivo B2B (AutoTrendz), terceiro setor
  (Instituto Mãe Lalu).
- **Dor principal:** comunicação visual sem consistência — cada peça parece de uma empresa
  diferente, e o material não sustenta o nível do serviço que a empresa vende.
- **Objeções:** "vai entender meu setor?", "quanto custa?", "em quanto tempo fica pronto?",
  "vou ter que explicar tudo do zero?".
- **Nível de consciência:** consciente do problema, comparando fornecedores.

## Marca e tom

- **Nome:** Leane Suzarte. Logo: **pendente de envio**.
- **Tom:** editorial, confiante, sóbrio, direto, com respiro *(suposição)*.
- **Referência:** template Webflow **Glow R** — agência editorial monocromática.
  O que aproveitar: grid de trabalhos com tags, tipografia grotesk em caixa alta com
  letter-spacing, números grandes como prova, muito branco, contraste preto/branco puro.
  O que **não** copiar: animações pesadas, contadores em JS, marquee infinito.
- **Anti-referência:** portfólio "template Behance" genérico; carrossel de logos sem contexto;
  fundo escuro com neon.

## Prova

- **Depoimentos:** existem — **texto e autoria pendentes de envio**.
- **Logos de clientes:** G3 Polaris, Axialumi, AutoTrendz, Instituto Mãe Lalu,
  Karine Rocha, Angela (nutricionista) — **arquivos de logo pendentes**.
- **Números:** 6 cases entregues nesta seleção. Outros números pendentes.

## Conteúdo e ativos

Pasta `imagens/` (fora do build — será movida para `src/assets/`):

| Case | Tipo de peça | Arquivos |
| ---- | ------------ | -------- |
| **G3 Polaris** | Social media (feed, carrossel, stories) — engenharia | 12 PNG + 1 MP4 |
| **Axialumi** | Social media (feed) — iluminação | 9 PNG + 5 MP4 (~160 MB) |
| **Karine Rocha** | Social media (feed, carrossel) — advocacia/inclusão | 6 PNG |
| **AutoTrendz** | Apresentação comercial | 8 PNG |
| **Angela** | Apresentação pessoal/nutrição | 8 PNG |
| **Instituto Mãe Lalu** | Relatório institucional | 11 PNG |

**Alerta técnico:** PNGs de 1–8 MB em até 4500×5625 px e 160 MB de vídeo. Os PNGs entram via
`astro:assets` (conversão automática para AVIF/WebP no build). Os **vídeos ficam de fora da v1**
— 160 MB inviabiliza Lighthouse 100. Se entrarem, precisam de compressão e `preload="none"`.

## Restrições

- **Idioma:** pt-BR.
- **Domínio:** **não tem.** Vai para o subdomínio do Vercel; `site` fica comentado no
  `astro.config.mjs` até existir domínio.
- **Contato:** ⭑ **WhatsApp (71) 99941-0336** → `wa.me/5571999410336`, com mensagem
  pré-preenchida. Sem formulário: zero fricção e zero JS.
  E-mail secundário no rodapé de contato: `leanesuzartedesign@gmail.com`.
- **SEO:** keyword-alvo pendente. Provisório: "designer gráfico para empresas".
- **Prazo:** não informado.

## Decisões fechadas com a Leane (04/08/2026)

- **Sem logo.** A marca é o nome — o que sustenta a direção tipográfica da página.
- **Vídeos sem áudio.** Faixa de som removida na compressão.
- **Serviços:** identidade visual · design de posts · peças institucionais on e offline ·
  edição de vídeo.
- **IA como serviço:** sim, mas vendida pelo resultado, não pela ferramenta — "cenas sob
  medida para a sua marca, sem produção física". A prova está no case Axialumi, onde as
  imagens e vídeos foram gerados por IA sob direção da Leane. Não se anuncia "feito com IA"
  como argumento principal: para o comprador B2B isso é objeção, não benefício.
- **Referência aprovada:** template Webflow *Glow R*, **com os motions**. Reproduzidos em
  CSS puro (`animation-timeline: view()`), não em JS.
