import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import yingyong from "../../pictures/Yingyong.png";
import KhaoLung from "../../pictures/KhaoLung.png";
import Namtok from "../../pictures/Namtok.png";
import bangtaoBeach from "../../pictures/bangtaoBeach.png";
import watArun from "../../pictures/watArun.png";
import watRongKhun from "../../pictures/watRongKhun.png";
import SearchLogo from "../../icons/search.png";

const squareData = [
  { id: 1, src: yingyong },
  { id: 2, src: Namtok },
  { id: 3, src: KhaoLung },
  { id: 4, src: watArun },
  { id: 5, src: bangtaoBeach },
  { id: 6, src: watRongKhun },
];

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

const generateSquares = () => {
  return shuffle([...squareData]).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.2, type: "spring" }}
      className="w-full h-full rounded-lg overflow-hidden shadow-md"
    >
      <img src={sq.src} alt="place" className="w-full h-full object-cover" />
    </motion.div>
  ));
};

const AlbumGrid = () => {
  const [squares, setSquares] = useState(generateSquares());
  const timeoutRef = useRef(null);

  useEffect(() => {
    shuffleSquares();
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());
    timeoutRef.current = setTimeout(shuffleSquares, 4000);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
      {squares}
    </div>
  );
};

function Album() {
  return (
    <div className="max-w-[80%] mx-auto mt-20">
      {/* Header */}
      <div className="flex gap-2 items-center">
        <p className="text-xl font-bold">Album</p>
      </div>

      {/* Animated Album Grid */}
      <AlbumGrid />
    </div>
  );
}

export default Album;
