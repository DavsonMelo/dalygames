'use client';

import { useState } from 'react';
import { FiEdit, FiCheck } from 'react-icons/fi';

export function FavoriteCard() {
  const [input, setInput] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [gameName, setGameName] = useState('');

  function handleButton() {
    setShowInput(!showInput);

    if (input !== '') {
      setGameName(input);
    }

    setInput('');
  }

  return (
    <div className="w-full bg-gray-900 p-4 h-44 text-white rounded-lg flex flex-col justify-between">
      {showInput ? (
        <div className="flex items-center justify-center gap-3">
          <input
            className="bg-white w-full rounded-md h-8 text-black px-2"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
          />
          <button className="cursor-pointer" onClick={handleButton}>
            <FiCheck size={24} color="#fff" />
          </button>
        </div>
      ) : (
        <button
          onClick={handleButton}
          className="self-start hover:scale-110 duration-200 transition-all cursor-pointer"
        >
          <FiEdit size={24} color="#fff" />
        </button>
      )}
      {gameName && (
        <div>
          <span className="text-white">Jogo Favorito:</span>
          <p className="font-bold text-white">{gameName}</p>
        </div>
      )}
      {!gameName && <p className="font-bold text-white">Adicionar jogo</p>}
    </div>
  );
}
