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

const angela = pasta(
  import.meta.glob<{ default: ImageMetadata }>("../assets/docs/angela/*.png", {
    eager: true,
  }),
);

const maelalu = pasta(
  import.meta.glob<{ default: ImageMetadata }>("../assets/docs/maelalu/*.png", {
    eager: true,
  }),
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
      slug: "engenharia",
      descricao: "Peça de social media para empresa de engenharia",
      pecas: g3,
    },
  ],
  [
    {
      slug: "iluminacao",
      descricao: "Peça de social media para marca de iluminação",
      pecas: axialumi,
    },
    {
      slug: "juridico",
      descricao:
        "Peça de social media para marca pessoal na área jurídica",
      pecas: karine,
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
  { src: "/cases/video/axialumi-02.mp4", poster: "/cases/video/axialumi-02.jpg", alt: "Reels apresentando linha de luminárias" },
  { src: "/cases/video/axialumi-lp.mp4", poster: "/cases/video/axialumi-lp.jpg", alt: "Vídeo de campanha para marca de iluminação" },
  { src: "/cases/video/axialumi-04.mp4", poster: "/cases/video/axialumi-04.jpg", alt: "Anúncio em vídeo para marca de iluminação" },
  { src: "/cases/video/g3-stories.mp4", poster: "/cases/video/g3-stories.jpg", alt: "Stories animado em motion design para empresa de engenharia" },
  { src: "/cases/video/axialumi-07.mp4", poster: "/cases/video/axialumi-07.jpg", alt: "Anúncio em vídeo para marca de iluminação" },
];
