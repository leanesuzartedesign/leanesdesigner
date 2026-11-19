import type { ImageMetadata } from "astro";

/**
 * As imagens são lidas por `import.meta.glob` para não manter 50 imports à
 * mão. Os arquivos são numerados (01.png, 02.png…) na ordem correta de
 * exibição, então basta ordenar pelo nome.
 */
function pasta(
  modulos: Record<string, { default: ImageMetadata }>,
): ImageMetadata[] {
  return Object.entries(modulos)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, m]) => m.default);
}

export interface Video {
  src: string;
  poster: string;
  alt: string;
}

/** Um bloco de peças de uma mesma empresa — nunca mesclado com outro. */
export interface Bloco {
  slug: string;
  /** Descreve o setor, não a marca: a página mostra o trabalho. */
  descricao: string;
  pecas: ImageMetadata[];
}

const g3 = pasta(
  import.meta.glob<{ default: ImageMetadata }>("../assets/posts/g3/*.png", {
    eager: true,
  }),
);

const axialumi = pasta(
  import.meta.glob<{ default: ImageMetadata }>(
    "../assets/posts/axialumi/*.png",
    { eager: true },
  ),
);

const karine = pasta(
  import.meta.glob<{ default: ImageMetadata }>("../assets/posts/karine/*.png", {
    eager: true,
  }),
);

const nutriOrtomolecular = pasta(
  import.meta.glob<{ default: ImageMetadata }>(
    "../assets/posts/nutriortomolecular/*.png",
    { eager: true },
  ),
);

const danielaMoreno = pasta(
  import.meta.glob<{ default: ImageMetadata }>(
    "../assets/posts/danielamoreno/*.png",
    { eager: true },
  ),
);

const angela = pasta(
  import.meta.glob<{ default: ImageMetadata }>("../assets/docs/angela/*.png", {
    eager: true,
  }),
);

// 04 (Quadro de Beneficiários) e 09 (Sugestões) ficam de fora do portfólio —
// dados internos/institucionais que não devem aparecer publicamente.
const maelalu = pasta(
  import.meta.glob<{ default: ImageMetadata }>(
    [
      "../assets/docs/maelalu/*.png",
      "!../assets/docs/maelalu/04.png",
      "!../assets/docs/maelalu/09.png",
    ],
    { eager: true },
  ),
);

export const deck = pasta(
  import.meta.glob<{ default: ImageMetadata }>("../assets/deck/*.png", {
    eager: true,
  }),
);

/** Stories — peças verticais 9:16, em seção própria. */
export const stories: Bloco[] = [
  {
    slug: "engenharia",
    descricao: "Stories para empresa de engenharia",
    pecas: pasta(
      import.meta.glob<{ default: ImageMetadata }>(
        "../assets/stories/g3/*.png",
        { eager: true },
      ),
    ),
  },
];

/**
 * Posts — as duas faixas da vitrine. Cada faixa leva blocos inteiros de uma
 * empresa, na ordem: nada de intercalar peças de marcas diferentes.
 */
export const faixas: Bloco[][] = [
  [
    {
      slug: "nutricao-ortomolecular",
      descricao: "Peça de social media para nutrição ortomolecular",
      pecas: nutriOrtomolecular,
    },
    {
      slug: "engenharia",
      descricao: "Peça de social media para empresa de engenharia",
      pecas: g3,
    },
  ],
  [
    {
      slug: "juridico",
      descricao:
        "Peça de social media para marca pessoal na área jurídica",
      pecas: karine,
    },
    {
      slug: "iluminacao",
      descricao: "Peça de social media para marca de iluminação",
      pecas: axialumi,
    },
    {
      slug: "nutricao-ciclo-feminino",
      descricao:
        "Peça de social media para nutricionista especialista em ciclo feminino",
      pecas: danielaMoreno,
    },
  ],
];

/** Apresentações e relatórios institucionais — uma seção só, em slider. */
export const documentos: Bloco[] = [
  {
    slug: "nutricao",
    descricao: "Página de apresentação institucional na área de nutrição",
    pecas: angela,
  },
  {
    slug: "terceiro-setor",
    descricao:
      "Página de relatório institucional de organização do terceiro setor",
    pecas: maelalu,
  },
];

/**
 * Cinco vídeos, em leque. A ordem é posicional: os dois de menor destaque
 * ficam nas pontas (onde o leque os gira e encolhe) e o principal no centro.
 */
export const videos: Video[] = [
  { src: "/cases/video/escola-01.mp4", poster: "/cases/video/escola-01.jpg", alt: "Vídeo institucional para escola" },
  { src: "/cases/video/axialumi-lp.mp4", poster: "/cases/video/axialumi-lp.jpg", alt: "Vídeo de campanha para marca de iluminação" },
  { src: "/cases/video/axialumi-04.mp4", poster: "/cases/video/axialumi-04.jpg", alt: "Anúncio em vídeo para marca de iluminação" },
  { src: "/cases/video/g3-stories.mp4", poster: "/cases/video/g3-stories.jpg", alt: "Stories animado em motion design para empresa de engenharia" },
  { src: "/cases/video/axialumi-07.mp4", poster: "/cases/video/axialumi-07.jpg", alt: "Anúncio em vídeo para marca de iluminação" },
];

/** Uma "pasta" de identidade visual e material gráfico de evento. */
export interface Evento {
  slug: string;
  nome: string;
  pecas: ImageMetadata[];
}

// Cada pasta busca só na própria subpasta — enquanto ela estiver vazia (peças
// ainda não subiram pro repositório), o glob retorna um array vazio, e
// Eventos.astro filtra a pasta pra fora em vez de mostrá-la em branco.
const flimla = pasta(
  import.meta.glob<{ default: ImageMetadata }>(
    "../assets/eventos/flimla/*.{png,jpg,jpeg,webp}",
    { eager: true },
  ),
);

const literarte = pasta(
  import.meta.glob<{ default: ImageMetadata }>(
    "../assets/eventos/literarte/*.{png,jpg,jpeg,webp}",
    { eager: true },
  ),
);

const arraiaDoInstituto = pasta(
  import.meta.glob<{ default: ImageMetadata }>(
    "../assets/eventos/arraia-do-instituto/*.{png,jpg,jpeg,webp}",
    { eager: true },
  ),
);

const eTudoNosso = pasta(
  import.meta.glob<{ default: ImageMetadata }>(
    "../assets/eventos/e-tudo-nosso/*.{png,jpg,jpeg,webp}",
    { eager: true },
  ),
);

export const eventos: Evento[] = [
  { slug: "flimla", nome: "FLIMLÁ 2026", pecas: flimla },
  { slug: "literarte", nome: "Literarte Intercultural", pecas: literarte },
  {
    slug: "arraia-do-instituto",
    nome: "Arraiá do Instituto",
    pecas: arraiaDoInstituto,
  },
  { slug: "e-tudo-nosso", nome: "É Tudo Nosso", pecas: eTudoNosso },
];
