import "./confirm-presence.css";

export default function ConfirmPresence() {
  const phoneNumber = "+5511920043864";
  const message = encodeURIComponent(
    "Eu confirmo minha presença no chá de cozinha da Joyce que acontecerá em 26/10/2025 às 14:00. Meu nome é: "
  );

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <section className="confirm-presence">
      <p className="intro-text">
        E pra finalizar... ✨<br />
        Confirme sua presença e venha celebrar esse dia especial com a gente!
      </p>
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="confirm-button"
      >
        Confirmar presença
      </a>
    </section>
  );
}
