import { Container } from "@/components/container"
import { FaShareAlt } from "react-icons/fa"
import { FavoriteCard } from "./components/favorite"
import Image from "next/image"
import userImg from "/public/user.png"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Meu perfil - Daly Games. Sua plataforma de jogos!",
  description: "Veja suas informações e jogos favoritos.",
}

export default function Profile() {
  return(
    <main className="w-full text-black">
      <Container>
        <section
          className="flex items-center justify-between mt-8 mb-6 flex-col relative gap-3 sm:flex-row"
        >
          <div className="w-full flex items-center gap-4 text-lg flex-col sm:flex-row justify-center sm:justify-normal">
            <Image
              className="rounded-full w-56 h-56 object-cover"
              src={userImg}
              alt="Imagem perfil de usuario"
            />
            <h1 className="font-bold text-2xl">Sujeito Programador</h1>
          </div>
          <div className="sm:absolute top-0 right-0 gap-3 flex items-center justify-center mt-2">
            <button className="bg-gray-700 px-4 py-3 rounded-lg text-white">
              Configurações
            </button>
            <button className="bg-gray-700 px-4 py-3 rounded-lg">
              <FaShareAlt size={24} color="#fff" />
            </button>
          </div>
        </section>
        <section className="flex flex-col gap-5 md:flex-row flex-wrap">
          <div className="flex-grow flex-wrap">
            <FavoriteCard />
          </div>
          <div className="flex-grow flex-wrap">
            <FavoriteCard />
          </div>
          <div className="flex-grow flex-wrap">
            <FavoriteCard />
          </div>
        </section>
      </Container>
    </main>
  )
}