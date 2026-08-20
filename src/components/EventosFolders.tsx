import { useState } from "react";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import "./EventosFolders.css";

interface Foto {
  src: string;
  width: number;
  height: number;
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
 * Cada pasta é um cartão fechado (ícone + nome); ao abrir, um painel some
 * por cima com as peças saindo em leque, com física de mola de verdade
 * (Framer Motion) — e um "puxador" que, arrastado pra baixo, fecha a
 * pasta de novo, como fechar a aba de uma pasta física.
 */
export default function EventosFolders({ eventos }: Props) {
  const [aberta, setAberta] = useState<string | null>(null);

  return (
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
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
                animate={{ rotateX: estaAberta ? -20 : 0, y: estaAberta ? 2 : 0 }}
                transition={MOLA}
                style={{ transformPerspective: 200 }}
              >
                <path
                  d="M3 6.5A1.5 1.5 0 0 1 4.5 5h4.379a1.5 1.5 0 0 1 1.06.44l1.122 1.12a1.5 1.5 0 0 0 1.06.44H19.5A1.5 1.5 0 0 1 21 8.5v9A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.4}
                  strokeLinejoin="round"
                />
              </motion.svg>
              <span className="evt-nome">{evento.nome}</span>
              <span className="evt-contagem">
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
                          whileDrag={{ scale: 1.08, zIndex: 10 }}
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
                    <span className="evt-dica">Arraste pra baixo pra fechar</span>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
