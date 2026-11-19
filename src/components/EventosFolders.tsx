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
 * Cada pasta fechada mostra cartas de foto espiando atrás de um vidro fosco;
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
                {/* Pasta fechada: fundo cinza com aba, três cartas de foto
                    espiando por trás e um painel de vidro fosco na frente. */}
                <span className="evt-pasta" aria-hidden="true">
                  <span className="evt-fundo" />
                  {evento.fotos.slice(0, 3).map((foto, i) => (
                    <img
                      key={foto.src}
                      className={`evt-capa evt-capa-${i}`}
                      src={foto.src}
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
                <span className="evt-nome">{evento.nome}</span>
                <span className="evt-pilula">
                  {evento.fotos.length}{" "}
                  {evento.fotos.length === 1 ? "peça" : "peças"}
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
                      {evento.fotos.map((foto, i, arr) => {
                        const meio = (arr.length - 1) / 2;
                        const d = i - meio;
                        // Com mais peças, cada uma abre um pouco menos de
                        // leque — senão as pontas saem rodadas demais e o
                        // espalhado fica maior que o cartão.
                        const escala = Math.min(1, 5 / arr.length);
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
                              x: d * 34 * escala,
                              y: -Math.abs(d) * 10 * escala,
                              rotate: d * 9 * escala,
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
