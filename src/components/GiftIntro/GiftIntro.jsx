import { motion } from "framer-motion";
import "./gift-intro.css";

export default function GiftIntro() {
  return (
    <section className="gift-intro">
      <motion.p
        className="gift-text"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        viewport={{ once: true }}
      >
        E para tornar essa <strong>nova fase</strong> ainda mais especial, preparei uma{" "}
        <strong>lista de presentes</strong> com todo carinho. Mas lembre-se: o mais importante é ter{" "}
        <strong>você ao meu lado</strong> nesse momento tão importante. <br />
        Se sentir no coração, escolha algo que vai me ajudar a{" "}
        <strong>construir esse sonho</strong> 🥰
      </motion.p>
    </section>
  );
}

