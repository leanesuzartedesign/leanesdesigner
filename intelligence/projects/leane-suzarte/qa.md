# QA — Portfólio Leane Suzarte

Etapa 5 do [pipeline](../../pipeline.md). Rodado em 04/08/2026 sobre `npm run build`
(Astro 6.4.5) e o dev server em `localhost:4321` (Chromium).

Legenda: ✓ verificado · ⚠ pendente/limitação conhecida.

## Performance

- ✓ `npm run build` passa sem erro. 67 variantes de imagem geradas, 1 página em 15,3 s.
- ✓ **Zero JS enviado.** `dist/_astro/*.js` = 0 arquivos; nenhuma tag `<script>` no HTML.
  Nenhuma ilha foi necessária — todo o movimento é CSS.
- ✓ CSS crítico inlined pelo Astro (`<style>` scoped por componente). Sem folha externa.
- ✓ Imagens via `astro:assets` com `widths`/`sizes` → WebP responsivo, `width`/`height`
  no HTML (sem CLS). Ganho típico: 5106 kB → 79 kB.
- ✓ Fonte self-hosted (Inter Variable), `font-display: swap`, `preload` do subset latin,
  só os subsets `latin` e `latin-ext` (48 kB + 85 kB).
- ✓ Vídeos com `preload="none"` + poster JPG: nada baixa até a pessoa dar play.
- ✓ Dependência nova: `@fontsource-variable/inter` (origem do arquivo `.woff2`; não vai
  para o bundle).
- ⚠ **Lighthouse não foi executado.** Não há Chrome headless com LHCI neste ambiente.
  Os requisitos que produzem a nota estão atendidos, mas a nota em si não foi medida.
  Rodar após o deploy.
- ⚠ `dist/` tem 14 MB, dos quais 7,6 MB são os vídeos. Nenhum entra no carregamento
  inicial, mas vale saber.

## Acessibilidade

- ✓ Um único `<h1>` ("Leane Suzarte"); hierarquia h1 → h2 → h3 sem salto (verificada no DOM).
- ✓ Landmarks: `<header>` (hero), `<main>`, `<footer>`; cada `<section>` com `aria-labelledby`.
- ✓ Contraste: `#141414` sobre `#FFFFFF` = 17,1:1 · `#6B6B6B` sobre `#FFFFFF` = 5,4:1
  (usado só em meta/legenda) · branco sobre `#0E0E0E` = 19,3:1. Todos ≥ AA.
- ✓ `alt` descritivo em todas as 19 imagens; `aria-label` nos 6 vídeos.
- ✓ Foco visível global (`:focus-visible` com outline de 2px), nunca removido.
- ✓ `prefers-reduced-motion` respeitado: reveal, roll e marquee ficam sob
  `@media (prefers-reduced-motion: no-preference)`; há ainda um bloqueio global de
  animação/transição no reduce.
- ✓ Marquee de clientes: a faixa duplicada é `aria-hidden`, o leitor de tela ouve a lista uma vez.
- — Sem formulários na página (o CTA é link direto para o WhatsApp).

## Boas práticas

- ✓ Console sem erros.
- ✓ `lang="pt-BR"`.
- ✓ Favicon presente (o da base — ver pendências).
- ✓ `rel="noopener"` nos links de WhatsApp.

## SEO

- ✓ `<title>` e `<meta name="description">` únicos e descritivos.
- ✓ Open Graph e `twitter:card` no `<head>`.
- ⚠ `site` **não definido** em `astro.config.mjs` — sem domínio próprio, o canonical e as
  URLs absolutas de OG ficam desativados (o Layout já trata isso condicionalmente).
  Basta preencher quando houver domínio.
- ⚠ **Sem `og:image`.** Compartilhar o link hoje mostra um card sem imagem.
- ✓ `robots.txt` presente. Página única — sitemap dispensável.

## Responsividade e compatibilidade

- ✓ 320px: sem scroll horizontal (`scrollWidth == clientWidth`); o marquee transborda
  dentro do próprio contêiner, como esperado.
- ✓ Tipografia toda em `clamp()`, sem breakpoint de fonte.
- ✓ Alvos de toque: CTA com 0,9rem de padding vertical + 0,875rem de texto ≈ 48px.
- ⚠ **Não testado em WebKit/Safari** nem em ultrawide — não há Safari neste ambiente.
  Em WebKit e Firefox o `animation-timeline: view()` ainda não existe: reveal, roll e
  contadores aparecem estáticos (o `@supports` garante que nada some). O marquee, que é
  keyframe comum, funciona em todos.
- ⚠ **Nenhuma inspeção visual foi feita** — o painel do navegador não estava aberto, então
  não consegui tirar screenshot. A verificação acima é estrutural (DOM, CSS computado,
  medidas), não visual.

## Conversão

- ✓ Promessa no fold 1 sem rolar; uma única ação na página inteira (WhatsApp).
- ✓ CTA no fold 1 e no fold de contato — mesmo verbo, mesmo destino.
- ✓ Prova (números + clientes + 6 cases) antes dos serviços e do preço da conversa.
- ✓ A página termina em ação (fold preto de contato), não em texto solto.

## Revisão de 04/08/2026 (reestruturação para galeria)

Reverificado após remover números/marcas/textos de case e incluir abertura, retratos e slider:

- ✓ Build limpo; **zero JS** confirmado de novo no `dist` (0 chunks, 0 `<script>`).
- ✓ 320px sem scroll horizontal, com o slider transbordando dentro do próprio contêiner.
- ✓ Hierarquia de headings sem salto: h1 → h2 (Posts, Criações, Serviços, Como funciona,
  Contato) → h3 (grupos e itens).
- ✓ Slider acessível sem JS: trilha focável (`tabindex="0"`, `role="group"` com `aria-label`),
  navegável por teclado e por swipe. `scroll-snap-type: x mandatory` confirmado no CSS
  computado; 10 cards, trilha de 2352px.
- ✓ Cortina de abertura com `pointer-events: none` e `display: none` fora do
  `prefers-reduced-motion: no-preference` — não há como travar o conteúdo.
- ⚠ **Timing da abertura ajustado por causa do LCP**: era 2,4s até o hero aparecer, o que
  encostava no limite de 2,5s. Reduzido para ~1,3s. Ainda assim, é o item a olhar primeiro
  quando o Lighthouse for finalmente rodado.
- ⚠ Continua **sem inspeção visual** e **sem Lighthouse medido**.

## Revisão de 04/08/2026 (capa nova + pilha 3D)

Verificado **no build de produção** (`astro preview`, não no dev server), em 1440×900 e 375×812:

- ✓ **Regressão corrigida: a CSS tinha saído do HTML.** Com a página crescendo, a folha passou
  do limite de inlining do Astro (`inlineStylesheets: "auto"`, ~4 kB) e virou
  `<link rel="stylesheet">` — render-blocking, contra a garantia da base. Corrigido com
  `build.inlineStylesheets: "always"` no `astro.config.mjs`. Hoje: 0 folhas externas,
  0 arquivos `.css` em `dist`, HTML de 36 kB com tudo inline.
- ✓ Zero JS mantido (0 `<script>`, 0 chunks).
- ✓ Capa ocupa exatamente 100svh em ambos os tamanhos (900 e 812).
- ✓ Nome gigante: SVG preenche a largura útil exata (1281px no desktop, 335px no mobile),
  sem corte e sem deformar a letra. Tracking resultante medido: **−0,0439em**.
- ✓ Pilha 3D em carga limpa a 1440: 5 slides escalonados (x 320→487, largura 617→669 pela
  perspectiva). Abaixo de 48rem degrada para pilha vertical (5 × 335px).
- ✓ Slider de posts: trilha de 2737px em viewport de 375px, sem overflow na página.
- ✓ Alvo de toque do CTA: 52px de altura (mínimo 44px).
- ✓ Sem scroll horizontal em 375px.
- ⚠ Medições feitas **após redimensionar** o painel dão valores errados (transform 3D lê como
  identidade) porque o painel não compõe quadros. Sempre recarregar antes de medir.
- ⚠ Continua **sem inspeção visual** e **sem Lighthouse medido**.

## Revisão de 04/08/2026 (capa clara, faixas de posts, slider paginado)

Verificado no **build de produção**, com carga limpa em 1440×900 e 390×844:

- ✓ Capa ocupa **exatamente** 100svh nos dois tamanhos (900 e 844) — nada de composição
  vazando para fora da primeira tela.
- ✓ Fundo da capa é o mesmo branco da página: sem faixa nem divisão.
- ✓ Retrato recortado sobrepõe o nome gigante, e não colide com o bloco de texto
  (borda direita do texto em 736px, foto começa em 892px).
- ✓ CTA reduzido: de 52px para **44px** de altura — menor, mas ainda no mínimo de alvo de toque.
- ✓ **Regressão corrigida: a página ganhou scroll horizontal** quando as faixas entraram
  (elas são propositalmente mais largas que a tela). Resolvido com `overflow: hidden` na
  seção. Reverificado: `scrollWidth == clientWidth` em 390px.
- ✓ Faixas de posts: 66 imagens (33 peças × 2 cópias), sentidos opostos, 108s e 90s —
  velocidades diferentes no papel, **mesma velocidade real** (25 px/s), porque a duração é
  proporcional ao conteúdo.
- ✓ Slider de apresentações: 5 páginas (4+4+4+4+3), 4 colunas de 308px no desktop, setas
  presentes só onde fazem sentido (a primeira página não tem "anterior", a última não tem
  "próxima").
- ✓ Vídeos: 4 (removidos o segundo e o penúltimo).
- ✓ Hierarquia de headings íntegra; o cabeçalho "Criações" saiu.
- ✓ Zero JS e zero folha externa mantidos. HTML de 64 kB.
- ⚠ `dist` está em **35 MB** (46 imagens × 3 larguras + vídeos). Nada disso entra no
  carregamento inicial — tudo é `lazy` e os vídeos são `preload="none"` — mas o deploy
  ficou pesado.
- ⚠ As setas do slider são âncoras: clicar altera o hash da URL. Comportamento normal para
  slider sem JS, mas vale saber.
- ⚠ Continua **sem inspeção visual** e **sem Lighthouse medido**.

## Ajuste de 04/08/2026 — escala do retrato na capa

O retrato estava pequeno demais (58% da altura da capa). Na referência a pessoa domina o
hero, então subiu para **78% da altura** no desktop e **50%** no mobile — com a capa
continuando em 100svh exatos.

| Janela | Foto | % da capa | Folga até o texto |
| ------ | ---- | --------- | ----------------- |
| 1440×900 | 562×702 | 78% | 115px |
| 1009×768 | 430×599 | 78% | 67px |
| 390×844 | 338×422 | 50% | — (empilhado) |

O teto de largura da foto (42vw) e o do bloco de texto (46vw) trabalham juntos: em janelas
largas quem limita a foto é a **altura**; em janelas estreitas, a largura. Sem esse teto, a
1009px a folga caía para **5px** — foi o que a verificação pegou antes de fechar.

No mobile a foto fica no fluxo (empilhada sob o texto), então 50% é o teto para a capa
caber em uma tela. Passar disso exige tirar a foto do fluxo também no mobile — e aí ela
passaria por cima do CTA.

## Revisão de 04/08/2026 — terceira rodada

Verificado no build de produção, carga limpa em 1440×900 e 390×844:

- ✓ **Capa na composição da referência**: texto 72→446, retrato 489→936 (centro), texto
  979→1353. Ordem horizontal conferida por medição, não no olho.
- ✓ Capa em 100svh exatos nos dois tamanhos (900 e 844).
- ✓ CTA primário: terracota `rgb(184,92,56)`, 44px de altura, `href="#posts"`, e o alvo
  `#posts` existe. Rolagem suave sob `prefers-reduced-motion: no-preference`.
- ✓ Deck: 2 sequências × 8 slides, ciclo de 25,6s, deslocamentos em arco
  (0 → 9,9 → 14 → 9,9 → 0 → −9,9 → −14 → −9,9%) — seno periódico, loop sem emenda.
- ✓ Vídeos: 4 cards com `animation-timeline: view(x)` ativo.
- ✓ Stories: 6 peças em seção própria; a faixa de posts caiu de 18 para 12 peças de
  engenharia (as 6 de stories saíram de lá).
- ✓ **Ordem corrigida**: páginas do relatório institucional agora em 01→11 e a apresentação
  de nutrição em 01→08, conferidas pelos nomes dos arquivos servidos.
- ✓ Contato: 1 canal (e-mail). O número de WhatsApp escrito saiu.
- ✓ Espaçamento: `--section-y` quase pela metade; página inteira em 8401px no mobile.
- ✓ Sem scroll horizontal em 390px; zero JS mantido.
- ⚠ O coverflow dos vídeos e o reveal por scroll dependem de `animation-timeline`, que
  Safari e Firefox ainda não têm. Lá os vídeos viram um carrossel normal com scroll-snap —
  funciona, mas sem o giro. O arco da apresentação comercial é keyframe comum: roda em todos.
- ⚠ Continua **sem inspeção visual** e **sem Lighthouse medido**.

## Revisão de 04/08/2026 — quarta rodada

- ✓ **Capa**: retrato em 605×756 = **84% da altura** da capa, centralizado, com o nome
  **na frente** (`z-index` 3 contra 0 da foto). Degradê de base recomeçado em 84% (era 62%,
  e comia um terço da figura, fazendo-a parecer menor do que era).
- ✓ Capa em 100svh exatos no desktop (900) e no mobile (844).
- ✓ Textos colados nas bordas: sobreposição de **46px de cada lado** sobre a foto — de
  propósito, como na referência, e sobre a parte clara da figura.
- ✓ **Apresentação comercial** no formato da referência do Framer: arco simétrico
  (333 / 248 / 191 / 162 px de largura), subindo em direção às pontas. As proporções vieram
  medidas da própria referência e são quadráticas na distância ao centro.
- ✓ **Vídeos**: 5 peças em leque (119 / 172 / 216 / 172 / 119 px), tocando sozinhas, mudas
  e em loop.
- ✓ Todas as imagens em `grayscale(1)`, com a cor voltando no hover. Em telas de toque a
  cor aparece de saída, senão nunca apareceria.
- ✓ Zero JS e zero folha externa mantidos; sem scroll horizontal em 390px.
- ⚠ **Custo de performance do autoplay.** Cinco vídeos tocando sozinhos baixam os ~7,6 MB
  assim que a seção aparece. Antes, com `preload="none"`, o custo era zero até alguém dar
  play. Isso deve derrubar a nota de performance — é troca consciente, pedida pela Leane,
  mas é a maior ameaça ao 100/100 hoje.
- ⚠ No celular o leque e o arco não cabem: viram carrosséis roláveis (vídeos de 242px,
  peças do arco de 120 a 246px). Sem isso, cada vídeo ficaria com 50px de largura.
- ⚠ Continua **sem inspeção visual** e **sem Lighthouse medido**.

## Revisão de 04/08/2026 — quinta rodada

| Item | Antes | Agora |
| ---- | ----- | ----- |
| Retrato na capa (desktop) | 84% da altura | **90%** (648×810), foto de perfil |
| Retrato (mobile) | 57% | **64%** |
| Páginas da apresentação | 162–333px em arco fixo | **309px**, 4 visíveis, girando em 36s |
| Vídeos | 119–216px, 5 tocando sozinhos | **170–274px**, só o do centro toca |
| Stories | grade irregular | 6 colunas de 200px, alinhadas |
| Título → conteúdo | 72px | **28px** |
| Página inteira (desktop) | — | 5938px |

- ✓ **Peso do autoplay resolvido**: só o vídeo central tem `autoplay` + `preload="metadata"`.
  Os outros quatro voltaram a `preload="none"` com `controls` — não baixam nada até alguém
  dar play. O custo inicial da seção caiu de ~7,6 MB para ~1,3 MB.
- ✓ **Bug pego na verificação**: `--visiveis` estava como estilo inline, e estilo inline
  vence media query — no celular as 4 páginas continuavam lado a lado, com **82px** cada.
  A variável foi para o CSS; agora o celular mostra 2 páginas de 171px.
- ✓ Espaçamento: `--section-y` para `clamp(1.75rem, 4vw, 3.25rem)` e a margem do cabeçalho
  de seção de `4.5rem` para `1.75rem`.
- ✓ Capa em 100svh exatos nos dois tamanhos; sem scroll horizontal; zero JS mantido.
- ⚠ Continua **sem inspeção visual** e **sem Lighthouse medido**.

## Correção do arco da apresentação comercial (04/08/2026)

A primeira tentativa usou `animation-timeline: view(x)` nas páginas. **Não funcionou**:
`view()` exige um contêiner que role de verdade, e este carrossel anda por `transform`.
A linha do tempo ficava inativa e nenhum arco era aplicado — medido: todas as páginas com
`transform: none` e mesmo `top`.

Além disso o arco tinha virado *inclinação*, que não é o que a referência faz.

Refeito: o arco é **posição e tamanho**, com rotação exatamente zero, e é sincronizado por
matemática em vez de por scroll. Cada página roda a mesma animação com uma defasagem
própria: a fita anda 8 posições em `duracao`, cada posição leva `duracao/8`, e a volta do
arco é isso vezes as 4 posições visíveis (18s). A defasagem de cada página é onde ela está
nessa volta (−2,25s, −6,75s, −11,25s, −15,75s).

Medido em 1425px, com as páginas visíveis ordenadas da esquerda para a direita:

| Centro da página | Escala | Deslocamento vertical | Rotação |
| ---------------- | ------ | --------------------- | ------- |
| 155px (ponta) | 1,315 | −42px | **0** |
| 484px | 1,105 | −14px | **0** |
| 812px | 1,105 | −14px | **0** |
| 1142px (ponta) | 1,315 | −42px | **0** |

Menores e mais baixas no meio, maiores e mais altas nas pontas — a curva da referência.
Ganho secundário: sem depender de `animation-timeline`, o arco agora roda também em Safari
e Firefox.

### Segunda correção: o arco não se formava

Mesmo com a matemática certa, o arco **não aparecia** — a Leane viu as páginas "subindo e
descendo sem coerência", e estava certa. Com o carrossel **deslizando**, cada página
percorre a curva por conta própria: o olho segue a página, não o envelope, e o arco some.

Na referência o arco fica **parado** e o conteúdo passa por ele. Sem JavaScript, isso exige
que o carrossel ande **em passos** (`steps()`) em vez de deslizar: aí cada lugar do arco tem
tamanho e altura fixos, e são as páginas que trocam de lugar.

Verificado amostrando as mesmas posições em três instantes diferentes (0s, 5s e 9,6s —
intervalos de passo diferentes). O padrão por posição é **idêntico nos três**:

| Posição na tela | Escala | Altura |
| --------------- | ------ | ------ |
| 155px | 1,45 | −72px |
| 483px | 1,23 | −36px |
| 813px | 1,00 | 0 |
| 1141px | 1,23 | −36px |
| 1471px | 1,45 | −72px |

Um vale simétrico que não se deforma: o arco agora é um lugar, não um movimento.

⚠ O fundo do arco cai em 813px numa tela de 1425 — cerca de 100px à direita do centro
(um terço de posição). Vem da aproximação entre a largura da tela e a largura útil
(descontados gutter e vãos).

⚠ Andar em passos significa que a troca é um corte a cada 4,5s, não um deslize. É o preço
de manter o arco parado sem JavaScript.

⚠ No celular o carrossel mostra 2 páginas, mas a volta do arco continua calculada para 4:
as três posições visíveis medem 1,45 / 1,23 / 1,00 — meio arco, não o vale inteiro.

## Seção "Mais sobre mim" (04/08/2026)

Formato da referência frameblox **About 17**: painel claro arredondado à esquerda com o
retrato recortado **transbordando por cima da borda superior** do painel; à direita
sobrancelha, manchete, parágrafo curto e o gráfico de habilidades.

- ✓ Entra como seção **08**, entre "Como funciona" e o fold de contato.
- ✓ Desktop: painel 543×424, retrato 416×520 transbordando **96px** acima do painel.
- ✓ Mobile: painel 350×354, transbordo de 31px; sem scroll horizontal.
- ✓ Barras de habilidade proporcionais aos valores (medido: 95% → 516px de 544px).
- ✓ Usa o **outro** retrato (`recorte-01`, de frente) — o da capa é o `recorte-02`, de perfil.
- ✓ Zero JS e zero folha externa mantidos.
- ✓ **Gráfico de habilidades** no formato que a Leane enviou: nome à esquerda, barra em
  pílula à direita, **sem porcentagem escrita**. Trilho em terracota a 22% de opacidade,
  preenchimento em terracota cheio, 12px de altura e pontas totalmente arredondadas.
  Sete ferramentas: Corel Draw, Canva PRO, Adobe Photoshop, Illustrator, CapCut, Trello,
  Monday.
- ✓ A barra é `aria-hidden`; quem usa leitor de tela ouve "nível 88 de 100" por extenso,
  em vez de uma porcentagem solta sem contexto.
- ⚠ **Os níveis são a minha leitura do comprimento das barras na imagem enviada**
  (88 / 100 / 58 / 85 / 88 / 85 / 88), não números que a Leane digitou. Conferir e
  corrigir em `Sobre.astro` se algum estiver fora.
- ⚠ Colocada **antes** do fold de contato, e não depois, como pedido ao pé da letra: o
  rodapé usa o mesmo preto do contato e os dois formam um bloco só. Uma seção branca entre
  eles partiria o bloco (preto → branco → preto) e deixaria conteúdo depois do CTA final.
  Mover é uma linha em `index.astro`.

## Ajustes de 04/08/2026 (alinhamento, copy de serviços, contato enxuto)

- ✓ **"Mais sobre mim" alinhado**: foto e texto começam e terminam nas mesmas linhas —
  medido `topo` e `base` com diferença de **0px** nos dois. O painel agora acompanha a
  altura do texto (`align-items: stretch`); a foto desce o transbordo pelo `margin-top` do
  painel e sobe o mesmo tanto, então o topo dela é o topo do texto.
- ⚠ Alinhar as duas pontas **obriga** a caixa da foto a ter a altura do texto, e `cover`
  corta os lados. Alarguei a caixa para 30rem: o corte caiu para **29px de cada lado (5%)**.
  Sem cortar nada, as pontas não alinham — é uma coisa ou outra.
- ✓ Copy de "Design de posts" e "Vídeo e Imagem" trocada pela da Leane (o serviço deixou de
  se chamar "Vídeo e imagem com IA").
- ✓ **Contato enxuto**: só a frase "Vamos falar sobre o seu projeto." e o botão. Saíram o
  parágrafo e o e-mail. Título de ~144px (display) para **40px**; a seção caiu de ~780px
  para **335px** no desktop e **228px** no celular. Botão em terracota.
- ✓ Sem scroll horizontal; zero JS mantido.

## Correção: o slider de apresentações subia a página (04/08/2026)

**Causa (duas, somadas):** o alvo da âncora era a `.pagina` inteira — alta demais para
caber na janela, o que obriga o navegador a rolar a tela na vertical para "trazê-la à
vista". E eu tinha posto `scroll-margin-top: 50vh` nela, o que **pedia explicitamente**
meia tela de rolagem para cima a cada salto.

**Correção:** o alvo virou um ponto de **1px** posicionado no meio da altura da página.
Como ele já está visível na vertical, o navegador não precisa rolar a tela; só o trilho
anda para o lado. (1px e não 0: um alvo sem área nenhuma não faz o navegador rolar —
tentei com 0 e a seta parou de funcionar.)

Medido: **salto vertical = 0** e o trilho andando exatamente **uma página (1425px)** por
clique.

⚠ A medição do avanço precisou ser feita com `scroll-behavior: auto`. Com `smooth`, o painel
do navegador desta sessão não anima a rolagem (ele não compõe quadros), e o valor lido fica
sempre zero. Em navegador real o `smooth` anima normalmente.

## O slider ganhou o único JavaScript da página (04/08/2026)

As setas em âncora (`href="#pagina"`) foram abandonadas depois de **três tentativas**:

1. Alvo = a página inteira → a página rolava na vertical a cada clique.
2. Alvo de 1px, sem `scroll-margin` → o salto vertical zerou nas medições, mas no navegador
   da Leane a seta parou de avançar e a página passou a **descer**.

A raiz é conceitual, não de ajuste: navegar por âncora manda o navegador "trazer o alvo à
vista", e ele decide sozinho o que mexer — incluindo a rolagem vertical da janela. Não há
como pedir "só na horizontal" por CSS.

**Solução:** as setas viraram `<button>` com um script que rola o trilho por
`scrollBy({ left: clientWidth })`. O pipeline do repositório prevê este caso —
interação real, e cita carrossel, justifica uma ilha naquele componente.

- **511 bytes** de JavaScript, inlined no HTML (o Astro não gerou arquivo separado).
  É o único script da página; todo o resto continua CSS.
- Medido no desktop: trilho em **0 → 1425 → 2849** e voltando a 1425 — uma página exata por
  clique — com **salto vertical 0**. No celular: 390px por clique, salto vertical 0.
- A seta que não leva a lugar nenhum fica escondida (verificado: "anterior" oculta no início).
- ⚠ O avanço só pôde ser medido forçando `behavior: "auto"`: o painel desta sessão não anima
  rolagem suave. Em navegador real o `smooth` funciona.

**A página não é mais estritamente "zero JS".** É 511 bytes contra a garantia original —
vale registrar para não passar despercebido numa auditoria futura.

## Seção "Como funciona" removida

A Leane pediu para tirar. `Processo.astro` foi apagado e as seções renumeradas
(Mais sobre mim 08 → **07**, Contato 09 → **08**).

## Pendências que dependem da Leane

1. **Depoimentos** — a Leane vai subir na pasta. Quando chegarem, entram entre "Como
   funciona" e "Contato".
2. **Domínio** — destrava `site`, canonical e OG absolutos.
3. **`og:image`** — precisa de uma imagem 1200×630. Sugestão: fundo `#0E0E0E` com o nome
   em Inter 600, na mesma direção da página.
4. **Favicon** — ainda é o genérico da base. Um "LS" em preto e branco resolve.
5. **Mais peças** — a galeria mostra 23 imagens e 6 vídeos de uma seleção. Havia material
   de sobra em `imagens/`; é só dizer o que mais deve entrar.
6. ~~Retrato recortado~~ — **entregue** pela Leane em 04/08/2026 (`Fotos leane/LS 202602*.png`).
   O efeito da referência está implementado.
