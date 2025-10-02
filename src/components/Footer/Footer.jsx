import { motion } from "framer-motion";
import "./footer.css";

export default function Footer() {
  const verseVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: "easeOut" } },
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut", delay: 0.5 } },
  };

  const instaVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1, delay: 1 } },
  };

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className="footer">
      <div className="overlay" />

      <div className="footer-content">
        <motion.p
          className="verse"
          variants={verseVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          Gênesis 2:24 – “Por isso, deixa o homem pai e mãe, e se une à sua mulher,
          tornando-se os dois uma só carne.”
        </motion.p>

        <motion.p
          className="message"
          variants={messageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          Te espero para grandes risadas nesse dia especial 🥰
        </motion.p>
      </div>

      <button className="back-to-top" onClick={scrollToTop}>↑</button>

      <div className="footer-bottom">
        <motion.a
          href="https://instagram.com/bygabiconvites"
          target="_blank"
          rel="noopener noreferrer"
          className="insta-link"
          variants={instaVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          faça o seu convite: @bygabiconvites
        </motion.a>
      </div>
    </footer>
  );
}





