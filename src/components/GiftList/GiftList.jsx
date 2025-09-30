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
      .select("*");

    if (error) {
      console.error("Erro ao buscar presentes:", error.message);
    } else {
      setGifts(data);
    }
    setLoading(false);
  }

  function handleOpenModal(gift) {
    setSelectedGift(gift);
    setShowThanks(false);
    setIsModalOpen(true);
  }

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
      setGifts((prev) => prev.filter((gift) => gift.id !== selectedGift.id));
      setShowThanks(true);
    }
  }

  const availableCount = gifts.filter((g) => !g.reservado).length;

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  if (loading) return <p className="loading">Carregando...</p>;

  return (
    <section id="gift-list-section" className="gift-page">
      <div className="gift-container">
        {/* título com efeito fade + slide de cima */}
        <motion.h2
          className="gift-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Lista de Presentes
        </motion.h2>

        {/* resumo com fade + blur */}
        <motion.p
          className="gift-summary"
          initial={{ opacity: 0, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Presentes disponíveis: <strong>{availableCount}</strong> <br />
          <em>
            Assim que você reserva um presente, ele some da lista para evitar
            duplicados. Mas fique à vontade para escolher o que quiser, vou amar
            de qualquer jeito 🥰 Só uma observação: a preferência de cor é{" "}
            <strong style={{ color: "black" }}>preto</strong>. Ah, e se você
            tentar reservar e der erro, pode ser que outra pessoa esteja
            reservando no mesmo momento — é só escolher outro item ✨
          </em>
        </motion.p>

        {availableCount === 0 ? (
          <motion.p
            className="gift-empty"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Todos os presentes já foram reservados 💝
          </motion.p>
        ) : (
          <motion.ul
            className="gift-list"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {gifts.map(
              (gift, index) =>
                !gift.reservado && (
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
                )
            )}
          </motion.ul>
        )}
      </div>

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













