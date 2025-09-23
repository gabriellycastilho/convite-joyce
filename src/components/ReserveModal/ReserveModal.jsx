import { motion } from "framer-motion";

export default function ReserveModal({ isOpen, onClose, onConfirm, giftName, showThanks }) {
  if (!isOpen) return null;

  // Função para rolar para a seção final do convite
  function scrollToFinalSection() {
    const finalSection = document.getElementById("finalizacao-convite");
    if (finalSection) {
      finalSection.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div className="modal-overlay">
      <motion.div
        className="modal-content"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {!showThanks ? (
          <>
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
                  if (onConfirm) onConfirm(); // reserva o presente
                }}
              >
                Confirmar
              </button>
              <button className="cancel-btn" onClick={onClose}>
                Escolher outra opção
              </button>
            </div>
          </>
        ) : (
          <>
            <h3>Presente reservado!</h3>
            <p>
              Muito obrigada! Você escolheu <strong>{giftName}</strong> 🎁. <br />
              Tire print para não esquecer ❤️ <br />
              Clique em Continuar para continuar vendo o convite.
            </p>
            <button
              className="confirm-btn"
              onClick={() => {
                onClose(); // fecha o modal
                scrollToFinalSection(); // rola para a finalização do convite
              }}
            >
              Continuar
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
}






