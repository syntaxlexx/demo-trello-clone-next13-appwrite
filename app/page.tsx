import Board from "@/components/Board";
import Header from "@/components/Header";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      {/* heeader */}
      <Header></Header>
      {/* board */}
      <Board></Board>
    </main>
  );
}
