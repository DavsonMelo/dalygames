import { GameProps } from "@/utils/types/game";
import { redirect } from "next/navigation";
import { Container } from "@/components/container";

import Image from "next/image";

interface DetailGameParams {
  id: string;
}
interface DetailGameProps {
  params: Promise<DetailGameParams>;
}

async function getData(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`
    );
    return res.json();
  } catch (err) {
    throw new Error('Failed to fetch data');
  }
}

export default async function Game({ params }: DetailGameProps) {
  const { id } = await params;
  const data: GameProps = await getData(id);
  if(!data) redirect("/")

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
      </Container>
    </main>
  );
}
