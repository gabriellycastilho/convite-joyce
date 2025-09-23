import { motion } from "framer-motion";
import "./Hero.css";

export default function Hero() {
  const nameContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const nameVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section className="hero">
      <div className="overlay" />
      <div className="hero-content">
        <motion.div
          className="couple-names"
          variants={nameContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.span className="bride" variants={nameVariant}>
            Chá de cozinha
          </motion.span>
          <motion.span className="ampersand" variants={nameVariant}>
            da
          </motion.span>
          <motion.span className="groom" variants={nameVariant}>
            Joyce
          </motion.span>
        </motion.div>

        <motion.p
          className="verse"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 1, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          “Acima de tudo, porém, revistam-se do amor, que é o elo perfeito.” <br /> Colossenses 3:14
        </motion.p>
      </div>
    </section>
  );
}





