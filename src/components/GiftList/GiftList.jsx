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
      .from("lista_de-presentes")
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  if (loading) return <p className="loading">Carregando...</p>;

  return (
    <section id="gift-list-section" className="gift-page">
      <div className="gift-container">
        <h2 className="gift-title">Lista de Presentes</h2>

        {gifts.length === 0 ? (
          <p className="gift-empty">Todos os presentes já foram reservados 💝</p>
        ) : (
          <motion.ul
            className="gift-list"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {gifts.map((gift, index) => (
              <motion.li
                key={gift.id}
                className="gift-item"
                custom={index}
                variants={itemVariants}
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
          </motion.ul>
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
        showThanks={showThanks} 
      />
    </section>
  );
}










