import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { motion } from "framer-motion";
import "./gift-list.css";

export default function GiftList() {
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  async function reserveGift(id) {
    const { error } = await supabase
      .from("lista_de_presentes")
      .update({ reservado: true })
      .eq("id", id);

    if (error) {
      console.error("Erro ao reservar presente:", error.message);
      alert("Erro ao reservar presente.");
    } else {
      setGifts((prev) => prev.filter((gift) => gift.id !== id));
      alert("Presente reservado com sucesso!");
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
                  onClick={() => reserveGift(gift.id)}
                >
                  Reservar
                </button>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}





