import { GameProps } from '@/utils/types/game';
import { redirect } from 'next/navigation';
import { Container } from '@/components/container';
import { Label } from './components/label';
import { GameCard } from '@/components/GameCard';
import { Metadata } from 'next';
import Image from 'next/image';

// Definir o tipo dos parâmetros da rota
interface GameParams {
  id: string;
}

// Definir a interface para os props da função generateMetadata e do componente
interface GamePropsParams {
  params: Promise<GameParams>;
}

// Função generateMetadata para gerar metadados dinâmicos
export async function generateMetadata({
  params,
}: GamePropsParams): Promise<Metadata> {
  // Aguardar a resolução da Promise de params
  const { id } = await params;

  try {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`,
      { next: { revalidate: 60 } }
    );
    const game: GameProps = await response.json();

    return {
      title: game?.title ? `${game.title} - DalyGames` : 'Jogo - DalyGames',
      description: game?.description ? game.description.slice(0, 150) + '...' : 'Detalhes do jogo na DalyGames',
      openGraph: {
        title: game?.title || 'Jogo - DalyGames',
        description: game?.description || 'Detalhes do jogo na DalyGames',
        images: game?.image_url ? [{ url: game.image_url }] : [],
      },
      robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
          index: true,
          follow: true,
          noimageindex: true,
        }
      }
    };
  } catch (err) {
    return {
      title: 'DalyGames - Descubra jogos incríveis para se divertir',
      description: 'Detalhes do jogo não encontrados',
    };
  }
}

async function getData(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`,
      { next: { revalidate: 60 } }
    );
    return res.json();
  } catch (err) {
    throw new Error('Failed to fetch data');
  }
}

async function getGameSorted() {
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game_day`,
      { cache: 'no-store' }
    );
    return res.json();
  } catch (err) {
    throw new Error('Failed to fetch data');
  }
}

export default async function Game({ params }: GamePropsParams) {
  const { id } = await params;
  const data: GameProps = await getData(id);
  const sortedGame: GameProps = await getGameSorted();

  if (!data) redirect('/');

  return (
    <main className="w-full text-black">
      <div className="bg-black h-80 sm:h-96 w-full relative">
        <Image
          className="object-cover w-full h-80 sm:h-96 opacity-80"
          src={data.image_url}
          alt={data.title}
          priority={true}
          fill={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={100}
        />
      </div>
      <Container>
        <h1 className="font-bold text-xl my-4">{data.title}</h1>
        <p>{data.description}</p>

        <h2 className="font-bold text-lg mt-2">Plataformas</h2>
        <div className="flex gap-2 flex-wrap">
          {data.platforms.map((item) => (
            <Label name={item} key={item} />
          ))}
        </div>

        <h2 className="font-bold text-lg mt-2">Categorias</h2>
        <div className="flex gap-2 flex-wrap">
          {data.categories.map((item) => (
            <Label name={item} key={item} />
          ))}
        </div>
        <p className="mt-7 mb-2">
          <strong>Data de lançamento</strong> {data.release}
        </p>
        <h2 className="font-bold text-lg mt-7 mb-2">Jogo recomendado:</h2>
        <div className="flex">
          <div className="flex-grow">
            <GameCard data={sortedGame} />
          </div>
        </div>
      </Container>
    </main>
  );
}