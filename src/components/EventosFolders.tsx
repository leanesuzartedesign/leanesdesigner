import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import "./EventosFolders.css";

interface Foto {
  src: string;
  width: number;
  height: number;
  /** Versão maior, usada no slide. */
  srcGrande: string;
  alt: string;
}

interface Evento {
  slug: string;
  nome: string;
  fotos: Foto[];
}

interface Props {
  eventos: Evento[];
}

const MOLA = { type: "spring" as const, stiffness: 300, damping: 30 };

/**
 * Cada pasta fechada mostra cartas de foto espiando atrás de um vidro fosco.
 * Ao clicar, abre um slide em tela cheia com todas as peças do evento:
 * setas, deslizar com o dedo/mouse, miniaturas embaixo e um botão de fechar.
 */
export default function EventosFolders({ eventos }: Props) {
  const [aberto, setAberto] = useState<string | null>(null);
  const [indice, setIndice] = useState(0);
  const [direcao, setDirecao] = useState(1);
  const gatilhoAnterior = useRef<HTMLElement | null>(null);

  const evento = eventos.find((e) => e.slug === aberto) ?? null;
  const total = evento?.fotos.length ?? 0;

  const abrir = (slug: string, el: HTMLElement) => {
    gatilhoAnterior.current = el;
    setIndice(0);
    setDirecao(1);
    setAberto(slug);
  };

  const fechar = useCallback(() => {
    setAberto(null);
    gatilhoAnterior.current?.focus();
  }, []);

  const irPara = useCallback(
    (novo: number, dir?: number) => {
      if (total === 0) return;
      const alvo = (novo + total) % total;
      setDirecao(dir ?? (novo >= indice ? 1 : -1));
      setIndice(alvo);
    },
    [total, indice],
  );

  useEffect(() => {
    if (!aberto) return;
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") fechar();
      else if (e.key === "ArrowRight") irPara(indice + 1, 1);
      else if (e.key === "ArrowLeft") irPara(indice - 1, -1);
    };
    document.addEventListener("keydown", aoTeclar);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", aoTeclar);
      document.body.style.overflow = overflow;
    };
  }, [aberto, indice, irPara, fechar]);

  const aoSoltar = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60 || info.velocity.x < -500) irPara(indice + 1, 1);
    else if (info.offset.x > 60 || info.velocity.x > 500) irPara(indice - 1, -1);
  };

  const foto = evento?.fotos[indice];

  return (
    <>
      <ul className="evt-lista">
        {eventos.map((ev) => (
          <li key={ev.slug} className="evt-item">
            <button
              type="button"
              className="evt-gatilho"
              aria-haspopup="dialog"
              onClick={(e) => abrir(ev.slug, e.currentTarget)}
            >
              {/* Pasta fechada: fundo cinza com aba, três cartas de foto
                  espiando por trás e um painel de vidro fosco na frente. */}
              <span className="evt-pasta" aria-hidden="true">
                <span className="evt-fundo" />
                {ev.fotos.slice(0, 3).map((f, i) => (
                  <img
                    key={f.src}
                    className={`evt-capa evt-capa-${i}`}
                    src={f.src}
                    alt=""
                    loading="lazy"
                    draggable={false}
                  />
                ))}
                <span className="evt-vidro">
                  <span className="evt-seta">
                    <svg viewBox="0 0 24 24" focusable="false">
                      <path
                        d="M7 17 17 7M9 7h8v8"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </span>
              </span>
              <span className="evt-nome">{ev.nome}</span>
              <span className="evt-pilula">
                {ev.fotos.length} {ev.fotos.length === 1 ? "peça" : "peças"}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {evento && foto && (
              <motion.div
                className="evt-slide"
                role="dialog"
                aria-modal="true"
                aria-label={evento.nome}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <header className="evt-slide-topo">
                  <div className="evt-slide-titulo">
                    <strong>{evento.nome}</strong>
                    <span>
                      {indice + 1} / {total}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="evt-slide-fechar"
                    aria-label="Fechar"
                    onClick={fechar}
                    autoFocus
                  >
                    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                      <path
                        d="M6 6l12 12M18 6 6 18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </header>

                <div className="evt-slide-palco" onClick={fechar}>
                  {total > 1 && (
                    <button
                      type="button"
                      className="evt-slide-seta evt-slide-seta-esq"
                      aria-label="Peça anterior"
                      onClick={(e) => {
                        e.stopPropagation();
                        irPara(indice - 1, -1);
                      }}
                    >
                      <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                        <path
                          d="M15 5l-7 7 7 7"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  )}

                  <AnimatePresence initial={false} custom={direcao} mode="popLayout">
                    <motion.img
                      key={foto.srcGrande}
                      src={foto.srcGrande}
                      alt={foto.alt}
                      className="evt-slide-img"
                      custom={direcao}
                      variants={{
                        entra: (d: number) => ({ opacity: 0, x: d * 60 }),
                        centro: { opacity: 1, x: 0 },
                        sai: (d: number) => ({ opacity: 0, x: d * -60 }),
                      }}
                      initial="entra"
                      animate="centro"
                      exit="sai"
                      transition={MOLA}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.5}
                      onDragEnd={aoSoltar}
                      onClick={(e) => e.stopPropagation()}
                      draggable={false}
                    />
                  </AnimatePresence>

                  {total > 1 && (
                    <button
                      type="button"
                      className="evt-slide-seta evt-slide-seta-dir"
                      aria-label="Próxima peça"
                      onClick={(e) => {
                        e.stopPropagation();
                        irPara(indice + 1, 1);
                      }}
                    >
                      <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                        <path
                          d="M9 5l7 7-7 7"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  )}
                </div>

                {total > 1 && (
                  <div className="evt-slide-minis" role="tablist">
                    {evento.fotos.map((f, i) => (
                      <button
                        key={f.src}
                        type="button"
                        role="tab"
                        aria-selected={i === indice}
                        aria-label={`Peça ${i + 1}`}
                        className="evt-mini"
                        onClick={() => irPara(i)}
                      >
                        <img src={f.src} alt="" draggable={false} />
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
