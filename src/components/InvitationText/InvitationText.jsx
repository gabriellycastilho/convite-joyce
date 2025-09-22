import { motion } from "framer-motion";
import "./invitation-text.css";

export default function InvitationText() {
  return (
    <section className="invitation-text">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
      >
        Com muito <strong>amor</strong> e <strong>alegria</strong>,  
        queremos compartilhar este <strong>momento especial</strong> com você.  
        Cada instante da nossa história é <strong>precioso</strong>,  
        e queremos celebrar rodeados de pessoas queridas.  

        <br /><br />
        <strong>Te convidamos para o nosso chá de cozinha,  
        a realizar-se em:</strong>
      </motion.p>
    </section>
  );
}

