import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import "./EventosFolders.css";

interface Foto {
  src: string;
  width: number;
  height: number;
  /** Versão maior, só carregada quando a pessoa abre a foto em destaque. */
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

const MOLA = { type: "spring" as const, stiffness: 300, damping: 24 };

/**
 * Cada pasta é um cartão com formato de pasta de verdade (aba + corpo);
 * ao clicar, abre com física de mola e as peças saem em leque, com um
 * puxador que fecha se arrastado pra baixo. Um segundo clique — numa
 * peça já aberta — mostra essa peça em destaque, grande, por cima de
 * tudo (é o "abrir a pasta, depois abrir a foto" pedido).
 */
export default function EventosFolders({ eventos }: Props) {
  const [aberta, setAberta] = useState<string | null>(null);
  const [fotoGrande, setFotoGrande] = useState<Foto | null>(null);

  useEffect(() => {
    if (!fotoGrande) return;
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFotoGrande(null);
    };
    document.addEventListener("keydown", aoTeclar);
    return () => document.removeEventListener("keydown", aoTeclar);
  }, [fotoGrande]);

  return (
    <>
      {/* Gradiente único, compartilhado por todas as pastas — dá o volume
          clarinho-em-cima/escuro-embaixo do ícone de referência. */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <linearGradient id="evt-gradiente-pasta" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#cf8058" />
            <stop offset="1" stopColor="#8a4526" />
          </linearGradient>
        </defs>
      </svg>

      <ul className="evt-lista">
        {eventos.map((evento) => {
          const estaAberta = aberta === evento.slug;
          const alterna = () => setAberta(estaAberta ? null : evento.slug);

          const fechaSeArrastouBastante = (
            _: MouseEvent | TouchEvent | PointerEvent,
            info: PanInfo,
          ) => {
            if (info.offset.y > 70) setAberta(null);
          };

          return (
            <li key={evento.slug} className="evt-item" data-aberta={estaAberta}>
              <button
                type="button"
                className="evt-gatilho"
                aria-expanded={estaAberta}
                onClick={alterna}
              >
                <motion.svg
                  className="evt-icone"
                  viewBox="0 0 100 75"
                  aria-hidden="true"
                  focusable="false"
                  animate={{ rotateX: estaAberta ? -10 : 0, y: estaAberta ? -2 : 0 }}
                  transition={MOLA}
                  style={{ transformOrigin: "50% 0%", transformPerspective: 400 }}
                >
                  {/* Um traçado só — aba e corpo são a mesma peça, sem
                      emenda nem espaço entre as duas partes. */}
                  <path
                    d="M 12,0 L 38,0 L 46,8 L 88,8 A 6,6 0 0 1 94,14 L 94,62 A 6,6 0 0 1 88,68 L 12,68 A 6,6 0 0 1 6,62 L 6,6 A 6,6 0 0 1 12,0 Z"
                    fill="url(#evt-gradiente-pasta)"
                  />
                </motion.svg>
                <span className="evt-conteudo">
                  <span className="evt-nome">{evento.nome}</span>
                  <span className="evt-contagem">
                    {evento.fotos.length}{" "}
                    {evento.fotos.length === 1 ? "peça" : "peças"}
                  </span>
                </span>
              </button>

              <AnimatePresence>
                {estaAberta && (
                  <motion.div
                    className="evt-painel"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <div className="evt-leque">
                      {evento.fotos.slice(0, 6).map((foto, i, arr) => {
                        const meio = (arr.length - 1) / 2;
                        const d = i - meio;
                        return (
                          <motion.img
                            key={foto.src}
                            src={foto.src}
                            alt={foto.alt}
                            width={foto.width}
                            height={foto.height}
                            className="evt-foto"
                            drag
                            dragElastic={0.4}
                            dragMomentum={false}
                            initial={{ opacity: 0, scale: 0.4, y: 30, rotate: 0 }}
                            animate={{
                              opacity: 1,
                              scale: 1,
                              x: d * 34,
                              y: -Math.abs(d) * 10,
                              rotate: d * 9,
                            }}
                            exit={{ opacity: 0, scale: 0.4, y: 30, rotate: 0 }}
                            transition={{ ...MOLA, delay: i * 0.045 }}
                            whileHover={{ scale: 1.06 }}
                            whileDrag={{ scale: 1.1, zIndex: 10 }}
                            onTap={() => setFotoGrande(foto)}
                          />
                        );
                      })}
                    </div>

                    <motion.div
                      className="evt-puxador"
                      drag="y"
                      dragConstraints={{ top: 0, bottom: 0 }}
                      dragElastic={{ top: 0, bottom: 0.6 }}
                      onDragEnd={fechaSeArrastouBastante}
                    >
                      <span className="evt-puxador-barra" aria-hidden="true" />
                      <span className="evt-dica">
                        Toque na imagem pra ampliar · arraste pra baixo pra
                        fechar
                      </span>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {fotoGrande && (
              <motion.div
                className="evt-lightbox"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setFotoGrande(null)}
              >
                <motion.div
                  className="evt-lightbox-cartao"
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.85, opacity: 0 }}
                  transition={MOLA}
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={fotoGrande.srcGrande}
                    alt={fotoGrande.alt}
                    className="evt-lightbox-img"
                  />
                  <button
                    type="button"
                    className="evt-lightbox-fechar"
                    aria-label="Fechar"
                    onClick={() => setFotoGrande(null)}
                  >
                    ×
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
