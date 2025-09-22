import { motion } from "framer-motion";
import "./Hero.css"; 

export default function Hero() {
  return (
    <section className="hero">
      <div className="overlay" />
      <div className="hero-content">
        <h1 className="couple-names">Joyce & Alessandro</h1>
        <motion.p
          className="verse"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3, delay: 1 }}
        >
          “Acima de tudo, porém, revistam-se do amor, que é o elo perfeito.” <br/> Colossenses 3:14
        </motion.p>
      </div>
    </section>
  );
}
