import { Container } from '@/components/container';
import { GameProps } from '@/utils/types/game';
import { BsArrowRightSquare } from 'react-icons/bs';

import Link from 'next/link';
import Image from 'next/image';

async function getDalyGame(): Promise<GameProps> {
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game_day`, {next: {revalidate: 320}}
    );
    return res.json();
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
}

export default async function Home() {
  const dalygame: GameProps = await getDalyGame();
  return (
    <main className="w-full">
      <Container>
        <h1 className="text-center font-bold text-xl mt-8 mb-5">
          Separamos um jogo exclusivo pra você
        </h1>
        <Link href={`/game/${dalygame.id}`}>
          <section className="w-full bg-black rounded-lg">
            <div className="w-full max-h-96 h-96 relative">
              <div className="absolute z-20 bottom-0 p-3 flex justify-center items-center gap-3">
                <p className="font-bold text-xl text-white">{dalygame.title}</p>
                <BsArrowRightSquare size={24} color="#fff" />
              </div>
              <Image
                className="max-h-96 object-cover rounded-lg opacity-50 hover:opacity-100 transition-all duration-300"
                src={dalygame.image_url}
                alt={dalygame.title}
                priority={true}
                quality={100}
                fill={true}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 44vw, 33vw)"
              />
            </div>
          </section>
        </Link>
      </Container>
    </main>
  );
}
