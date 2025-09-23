import Hero from "./components/hero/Hero.jsx";
import InvitationText from "./components/InvitationText/InvitationText.jsx";
import LocalDate from "./components/LocalDate/LocalDate.jsx";
import GiftList from "./components/GiftList/GiftList.jsx";
import "./App.css";

export default function App() {
  return (
    <div>
      <Hero />
      <InvitationText />
      <LocalDate />
      <GiftList />
    </div>
  );
}


