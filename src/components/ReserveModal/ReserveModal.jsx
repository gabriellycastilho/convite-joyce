import { motion, AnimatePresence } from "framer-motion";
import "./reserve-modal.css";

export default function ReserveModal({ isOpen, onClose, onConfirm, giftName, showThanks }) {
  if (!isOpen) return null;

  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <div className="modal-overlay">
      <motion.div
        className="modal-content"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <AnimatePresence mode="wait">
          {!showThanks ? (
            <motion.div
              key="confirm"
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.4 }}
            >
              <h3>Confirmação de presente</h3>
              <p>
                Tem certeza de que deseja escolher este presente? <br />
                <strong>{giftName}</strong> <br />
                Após confirmar, não será possível desfazer.
              </p>

              <div className="modal-actions">
                <button
                  className="confirm-btn"
                  onClick={() => {
                    if (onConfirm) onConfirm();
                  }}
                >
                  Confirmar
                </button>
                <button className="cancel-btn" onClick={onClose}>
                  Escolher outra opção
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="thanks"
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.4 }}
            >
              <h3>Presente reservado!</h3>
              <p>
                Muito obrigada! Você escolheu <strong>{giftName}</strong> 🎁. <br />
                Tire print para não esquecer ❤️ <br />
                Continue deslizando para ver o restante do convite.
              </p>
              <button className="confirm-btn" onClick={onClose}>
                Continuar
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}








