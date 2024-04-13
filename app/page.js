import Image from "next/image";
import styles from "./page.module.css";
import Game from "./components/Game"

export default function Home() {
  return (
    <main className="home">
      <Game/>

    </main>
  );
}
