import { BiRightArrowCircle } from 'react-icons/bi';
import { GameProps } from "@/utils/types/game";
import Link from 'next/link';
import Image from 'next/image';

interface GameCardProps {
  data: GameProps;
}


export function GameCard({data}: GameCardProps) {
  return (
    <Link href={`/game/${data.id}`}>
      <section className="w-full bg-slate-200 rounded-lg p-4 mb-5">
        <div className="relative w-full h-56 hover:scale-105 transition-all duration-300">
          <Image
            className="object-cover rounded-lg"
            src={data.image_url}
            alt={data.title}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 44vw, 33vw)"
            priority={true}
            quality={100}
            fill={true}
          />
        </div>
        <div className="flex justify-between items-center mt-4">
          <p className="font-bold text-sm px-2 text-black text-ellipsis truncate whitespace-nowrap overflow-hidden">{data.title}</p>
          <BiRightArrowCircle size={24} color="#000" />
        </div>
      </section>
    </Link>
  );
}
