# Direção Criativa — Portfólio Leane Suzarte

> Etapas 1 e 2 do [pipeline](../../pipeline.md). Base: [`brief.md`](brief.md).

## Conceito / ângulo

**"O trabalho fala. A página só sai da frente."**

O portfólio de um designer é julgado pelo próprio design da página — então a página não
compete com as peças. Ela é uma moldura: preto, branco, tipografia grande, muito ar. A cor
que aparece é a **cor dos cases** — o azul da G3, o âmbar da Axialumi, o turquesa do Mãe Lalu.
Cada trabalho é apresentado como um problema de negócio resolvido, não como uma arte bonita.

**Promessa em uma frase:** *design que faz sua empresa parecer do tamanho que ela é.*

## Tom

Editorial · confiante · sóbrio · direto · generoso em espaço.

Sem superlativo ("incrível", "apaixonada por design"). Frase curta. Primeira pessoa quando
falar de processo, terceira quando falar de resultado.

## Paleta

| Papel | Valor | Uso |
| ----- | ----- | --- |
| Fundo | `#FFFFFF` | Base de toda a página |
| Fundo alternado | `#F4F4F2` | Seções de respiro (processo, depoimentos) |
| Texto | `#141414` | Corpo e títulos |
| Texto secundário | `#6B6B6B` | Legendas, meta, tags |
| Linha | `#E4E4E1` | Réguas e bordas de 1px |
| Acento | `#B85C38` (terracota) | CTA primário, ponto do selo, detalhes |
| Ação | `#141414` sobre branco / invertido no hover | CTA secundário |
| Inversão | `#0E0E0E` fundo, `#FFFFFF` texto | Fold de contato (fecha a página em preto) |

**Contraste:** `#141414` sobre `#FFFFFF` = **17.1:1** (AAA). Secundário `#6B6B6B` sobre branco
= **5.4:1** (AA para texto normal, AAA para texto grande) — usado só em legenda/meta, nunca
em corpo longo. Invertido `#FFFFFF` sobre `#0E0E0E` = **19.3:1** (AAA).

Zero cor de marca inventada. As imagens dos cases são a cor da página.

## Sistema tipográfico

Uma família só, variável, self-hosted (`woff2`, `font-display: swap`, `preload`):
**Inter Variable** — grotesk neutra, ótimo em caixa alta com tracking, e não briga com a
tipografia das peças. (Satoshi, do Glow R, é licença paga; Inter entrega o mesmo registro.)

| Nível | Tamanho (fluido) | Peso | Tracking |
| ----- | ---------------- | ---- | -------- |
| Display (fold 1) | `clamp(3rem, 11vw, 9rem)` | 600 | `-0.03em` |
| Título de seção | `clamp(2rem, 5vw, 3.5rem)` | 600 | `-0.02em` |
| Título de case | `clamp(1.25rem, 2.5vw, 1.75rem)` | 600 | `-0.01em` |
| Corpo | `clamp(1rem, 1.05vw, 1.125rem)` | 400 | `0` |
| Meta / tag | `0.75rem` | 500 | `0.12em`, caixa alta |

Medida de leitura: máx. **68ch**. Escala tipográfica em `clamp()` — fluido de 320px a
ultrawide sem breakpoint de fonte.

## Motivo / assinatura

**A régua de 1px + o índice numerado.** Toda seção abre com uma linha horizontal de
`#E4E4E1` de borda a borda e um par `[ 01 ] NOME DA SEÇÃO` em caixa alta com tracking.
É o que dá o ar de dossiê editorial do Glow R sem precisar de uma linha de JavaScript.

Segundo motivo: **imagem em bleed**. Os cases não ficam em card com sombra — ocupam a
largura, com legenda pequena embaixo, do jeito que um livro de design apresenta obra.

## Anatomia de folds

> **Revisão de 04/08/2026.** A Leane cortou os números, os nomes das marcas e os textos
> de case: *"não quero um resumo sobre elas. Eu só quero mostrar as minhas criações."*
> A página deixou de narrar clientes e passou a ser **galeria**. O trabalho é agrupado por
> **tipo de criação**, não por cliente. Entraram a cortina de abertura e o retrato dela.

> **Revisão final de 04/08/2026.** A capa virou **clara** (mesmo branco da página, sem faixa
> nem divisão) com o **retrato recortado** por cima do nome gigante. Os posts viraram duas
> faixas em movimento automático. As seções de apresentações e relatórios viraram uma só,
> em slider paginado. Saiu o cabeçalho "Criações" e saiu o retrato solto do rodapé.

| # | Seção | Função | Componente |
| - | ----- | ------ | ---------- |
| 0 | **Abertura** | Cortina preta com o nome, que sobe e revela a capa. | `Intro.astro` |
| 1 | **Capa** | Tela cheia, fundo branco. Retrato **ao centro**, texto nas duas laterais, nome gigante na base. | `Hero.astro` |
| 2 | **Posts** | Duas faixas correndo sozinhas em sentidos opostos, 27 posts (sem stories). | `Vitrine.astro` |
| 3 | **Stories** | As 6 peças 9:16, em grade própria. | `Stories.astro` |
| 4 | **Apresentação comercial** | Coluna em arco que sobe em loop, com os 8 slides em ordem. | `Deck.astro` |
| 5 | **Apresentações e relatórios** | Slider paginado: 4 peças por vez, setas para avançar. | `Documentos.astro` |
| 6 | **Vídeo e movimento** | Coverflow: 4 vídeos, o do centro de frente, os laterais girados. | `Videos.astro` |
| 7 | **Serviços** | Traduz o trabalho em coisas contratáveis. Lista tipográfica, sem ícone. | `Servicos.astro` |
| 8 | **Como funciona** | Mata a objeção de processo/prazo em 3 passos. | `Processo.astro` |
| 9 | **Contato** | Fold preto. CTA único, sem número repetido. | `Contato.astro` |
| — | **Rodapé** | Nome e ano. | `Footer.astro` |

### Revisão de 04/08/2026 — terceira rodada

- **Capa** reorganizada conforme a referência: retrato **centralizado**, texto distribuído à
  esquerda (selo + manchete) e à direita (bio + botões). Dois CTAs: o primário
  **"Veja meus trabalhos"** em terracota, que desce para a seção de posts (`#posts`), e o
  secundário para WhatsApp.
- **Acento terracota `#B85C38`**, escolhido por contraste: 4,54:1 com texto branco (AA) e o
  mesmo como texto sobre branco. Terracotas mais claros (`#E2725B` = 3,09:1) reprovariam.
> **Apresentação comercial — versão final (04/08/2026).** Depois de cinco montagens
> (pilha 3D → arco estático → carrossel em arco → colunas verticais → anel 3D), a
> referência que fechou foi o **"Carousel 02" do frameblox kit**: um **anel 3D**. As 8
> páginas ficam nas faces de um cilindro e o anel gira sozinho; a da frente aparece em
> tamanho real e as laterais se fecham em perspectiva.
>
> Geometria: `preserve-3d` + perspectiva de 1200px (medida na referência), cada página em
> `rotateY(i × 45°) translateZ(R)`. O raio vem da trigonometria do polígono —
> para N faces de largura L sem se atravessarem, `R = (L/2) / tan(180°/N)`, que com 8
> páginas dá `L × 1,2071`. O anel recua o próprio raio (`translateZ(-R)`): sem isso a face
> da frente fica em z = +R e a perspectiva a amplia quase o dobro, estourando a seção.
> Na referência o giro é feito por JavaScript; aqui é um `@keyframes` de `rotateY(-360deg)`.
> `backface-visibility: hidden` impede que as páginas do fundo apareçam espelhadas.

- **Apresentação comercial** (versão descartada): a pilha 3D saiu. Depois foi a animação do pin —
  coluna em arco que **sobe continuamente em loop**, com os 8 slides em ordem. O
  deslocamento lateral de cada slide segue um seno do índice; como o seno é periódico no
  tamanho do conjunto, a segunda cópia continua a curva exatamente onde a primeira parou, e
  o loop não tem emenda.
- **Vídeos** em coverflow (`animation-timeline: view(x)`): o card gira para dentro ao
  entrar, fica reto e opaco no centro, gira para o outro lado ao sair.
- **Ritmo vertical** reduzido: `--section-y` de `clamp(4.5rem, 11vw, 9rem)` para
  `clamp(2.75rem, 6vw, 5rem)` — quase metade. "Apresentações e relatórios" ainda encosta na
  "Apresentação comercial" com um respiro menor, porque são o mesmo assunto.
- **Ordem das peças corrigida.** Os arquivos estavam sendo copiados em ordem alfabética
  (`1, 10, 11, 2, 3…`), o que bagunçava o relatório institucional. Agora a cópia é numérica
  (`ls -v`) e os arquivos de destino são numerados na ordem certa.
- Saiu o número de WhatsApp escrito no rodapé de contato: o botão já faz isso.

### Regras de exibição das peças

- **Nunca mesclar empresas.** Cada faixa e cada página do slider leva blocos inteiros de uma
  mesma empresa, na ordem. A faixa 1 é engenharia (18 peças); a faixa 2 é iluminação (9) e
  jurídico (6).
- **Marquee**: duas cópias da faixa, a segunda `aria-hidden` e com `alt=""`, animação de
  −50%. A duração é proporcional à quantidade de peças, para as duas faixas correrem na
  mesma velocidade (25 px/s medidos). `:hover` pausa. Em `prefers-reduced-motion`, a faixa
  vira um slider arrastável.
- **Slider paginado com setas sem JS**: cada página ocupa 100% da largura e tem
  `scroll-snap`; as setas são âncoras (`href="#doc-x"`) para a página vizinha. Como só a
  página atual está visível, as setas visíveis são sempre as dela.

### A capa clara

Fundo branco — o mesmo da página, para não criar faixa. O recorte fica **na frente** do nome
gigante (mesma célula de grade, `z-index` acima). No desktop a foto sai do fluxo
(`position: absolute`, ancorada à direita e pela base): se ficasse no fluxo, empurraria o
nome para fora da primeira tela, e a composição inteira em uma tela é o ponto da referência.
O tamanho da foto é dado em `svh`, não em `vw` — é a altura da janela que decide se a
composição cabe.

### Duas referências novas (04/08/2026)

**Capa** — `framebloxpages.framer.website/landing/02`: hero escuro em tela cheia, retrato,
selo "disponível para trabalho", manchete, botão em pílula e o nome gigante atravessando a
base. No template a pessoa está recortada e o nome passa por trás dela; o retrato da Leane
tem fundo cinza de estúdio, então a fusão é feita por **degradê** — a foto se dissolve no
preto e o nome fica na frente. Para o efeito exato, seria preciso um recorte com fundo
transparente (pendência).

O nome gigante é **SVG com `textLength`**, não texto CSS: preenche a largura exata em
qualquer viewport, sem depender das métricas da fonte que estiver carregada. `lengthAdjust`
é `"spacing"` (ajusta entreletra, **nunca deforma a letra**) e o corpo é 157 em caixa de
1000 unidades — maior que a caixa de propósito, para o ajuste *apertar* o tracking.
Medido no build: −0,044em, o mesmo registro da referência.

**Apresentação comercial** — pin de pitch deck "Noteform": slides flutuando em ângulo,
empilhados em diagonal. Reproduzido com `perspective` + `rotateX/rotateZ` e um deslocamento
por slide via `--i`. No hover o slide sai da pilha e se endireita; a pilha inteira se
endireita conforme sobe na tela (`animation-timeline: view()`). Abaixo de 48rem vira uma
pilha vertical simples — ângulo em tela estreita só atrapalha a leitura.

Removidos nesta revisão: `Numeros.astro` (prova em números), `Clientes.astro` (marquee com
os nomes das marcas) e `Case.astro` (o card com problema/solução por cliente).
Os nomes dos clientes saíram de todo texto da página — quando aparecem, é dentro da própria
peça, porque a arte é assim. Nos `alt` das imagens o trabalho é descrito pelo setor
("empresa de engenharia", "marca de iluminação"), não pela marca.

### Movimento

Tudo em CSS, sem uma linha de JavaScript:

- **Cortina de abertura** — `@keyframes` no load. Encurtada para ~1,3s no total: cortina
  longa atrasa o LCP, e o orçamento para nota 100 é 2,5s.
- **Entrada do hero** — nome subindo atrás de máscara, resto em fade, coordenado com a cortina.
- **Reveal em cascata** — `animation-timeline: view()`, dirigido por scroll.
- **Slider de posts** — `overflow-x: auto` + `scroll-snap-type: x mandatory`. Arrasta no
  touch, rola no trackpad, é focável por teclado.
- **Hover nas peças** — `transform: scale(1.03)`.

Tudo sob `prefers-reduced-motion: no-preference`. A cortina, em especial, tem
`display: none` por padrão e só existe quando o navegador permite movimento — assim ela
nunca fica presa na frente do conteúdo sem JS para removê-la.

**Uma única ação primária:** *entrar em contato*. Ela aparece no fold 1 e no fold 7 — o
mesmo link, o mesmo verbo. Nada mais na página é clicável para fora.

## Garantias técnicas mantidas

- Zero JS. Tudo que o Glow R faz com script (contador, reveal, marquee) aqui é CSS ou
  simplesmente não existe. Se houver movimento, é `@media (prefers-reduced-motion)`-safe.
- `<style>` scoped por componente → Astro inlina o CSS crítico.
- Imagens via `astro:assets` com `width`/`height`, `loading="lazy"` fora do fold 1,
  `fetchpriority="high"` na primeira.
- Semântica: um `<h1>`, `<section>` com `aria-labelledby`, `<figure>/<figcaption>` nos cases.
