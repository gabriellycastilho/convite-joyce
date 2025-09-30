import { motion } from "framer-motion";
import "./local-date.css";

export default function LocalDate() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.25, when: "beforeChildren" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section id="local-date" className="local-date-container">
      <motion.div
        className="date"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"          
        viewport={{ once: true, amount: 0.3 }} 
      >
        <motion.p className="month" variants={itemVariants}>OUTUBRO</motion.p>

        <motion.h1 variants={itemVariants}>
          <motion.span className="day-of-week" variants={itemVariants}>DOM | </motion.span>

          <motion.span
            className="day"
            variants={itemVariants}
            animate={{ scale: [1, 1.1, 1], opacity: [1, 0.9, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            26
          </motion.span>

          <motion.span className="time" variants={itemVariants}> | 14:00</motion.span>
        </motion.h1>

        <motion.p className="year" variants={itemVariants}>2025</motion.p>
      </motion.div>

      <p className="location">
        Rua: Casemiro Davenis, 231, Jardim Zaira, Mauá - SP
      </p>

      {/* Botão para ver no mapa */}
      <motion.a
        href="https://www.google.com/maps/search/?api=1&query=Rua+Casemiro+Davenis,+231,+Jardim+Zaira,+Mauá+-+SP"
        target="_blank"
        rel="noopener noreferrer"
        className="map-button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Ver local no mapa
      </motion.a>
    </section>
  );
}



