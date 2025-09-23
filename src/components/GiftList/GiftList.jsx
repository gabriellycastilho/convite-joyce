import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { motion } from "framer-motion";
import ReserveModal from "../ReserveModal/ReserveModal";
import "./gift-list.css";

export default function GiftList() {
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGift, setSelectedGift] = useState(null);
  const [showThanks, setShowThanks] = useState(false); 

  useEffect(() => {
    fetchGifts();
  }, []);

  async function fetchGifts() {
    setLoading(true);
    const { data, error } = await supabase
      .from("lista_de_presentes")
      .select("*")
      .eq("reservado", false);

    if (error) {
      console.error("Erro ao buscar presentes:", error.message);
    } else {
      setGifts(data);
    }
    setLoading(false);
  }

  // Abre o modal
  function handleOpenModal(gift) {
    setSelectedGift(gift);
    setShowThanks(false); // reseta a tela de agradecimento
    setIsModalOpen(true);
  }

  // Confirma a reserva
  async function reserveGift() {
    if (!selectedGift) return;

    const { error } = await supabase
      .from("lista_de_presentes")
      .update({ reservado: true })
      .eq("id", selectedGift.id);

    if (error) {
      console.error("Erro ao reservar presente:", error.message);
      alert("Erro ao reservar presente.");
    } else {
      // remove o presente da lista
      setGifts((prev) => prev.filter((gift) => gift.id !== selectedGift.id));
      // mostra mensagem de agradecimento no modal
      setShowThanks(true);
    }
  }

  const listVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 },
    }),
  };

  if (loading) return <p className="loading">Carregando...</p>;

  return (
    <div className="gift-page">
      <div className="gift-container">
        <h2 className="gift-title">Lista de Presentes</h2>

        {gifts.length === 0 ? (
          <p className="gift-empty">Todos os presentes já foram reservados 💝</p>
        ) : (
          <ul className="gift-list">
            {gifts.map((gift, index) => (
              <motion.li
                key={gift.id}
                className="gift-item"
                custom={index}
                initial="hidden"
                animate="visible"
                variants={listVariants}
              >
                <span className="gift-name">{gift.nome}</span>
                <button
                  className="gift-button"
                  onClick={() => handleOpenModal(gift)}
                >
                  Reservar
                </button>
              </motion.li>
            ))}
          </ul>
        )}
      </div>

      {/* Modal */}
      <ReserveModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedGift(null);
        }}
        onConfirm={reserveGift}
        giftName={selectedGift?.nome}
        showThanks={showThanks} // prop para mostrar mensagem de agradecimento
      />
    </div>
  );
}









