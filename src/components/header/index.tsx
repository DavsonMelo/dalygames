import logoImg from '/public/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import { LiaGamepadSolid } from "react-icons/lia";

export function Header() {
  return (
    <header className="w-full h-28 bg-slate-100 text-black px-2">
      <div className="max-w-5xl mx-auto flex justify-center items-center h-28 sm:justify-between">
        <nav className="flex gap-4 justify-center items-center">
          <Link href="/">
            <Image
              className="w-full'"
              src={logoImg}
              alt="Logo do site Dalygames"
              quality={100}
              priority={true}
            />
          </Link>
          <Link href="/">Games</Link>
          <Link href="/profile">Perfil</Link>
        </nav>
        <div className="hidden sm:flex justify-center items-center">
          <Link href="/profile">
            <LiaGamepadSolid size={34} color="#475569" />
          </Link>
        </div>
      </div>
    </header>
  );
}
