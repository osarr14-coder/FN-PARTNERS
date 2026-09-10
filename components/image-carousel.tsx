"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const SLIDES = [
  {
    src: "/images/carousel/hero-view.jpg",
    alt: "Vue panoramique de Casablanca au coucher du soleil, symbole de l'ancrage marocain du cabinet",
  },
  {
    src: "/images/carousel/audit-meeting.jpg",
    alt: "Équipe de conseil analysant des données financières et une cartographie de missions en Afrique",
  },
  {
    src: "/images/carousel/conseil-meeting.jpg",
    alt: "Réunion de conseil stratégique avec vue sur la baie de Casablanca",
  },
  {
    src: "/images/carousel/digital-network.jpg",
    alt: "Représentation d'un réseau d'expertise reliant le Maroc et l'Afrique de l'Ouest",
    // Les lueurs cuivrées de cette image tranchent avec l'identité violette
    // du site — un léger voile de la teinte accent la ramène dans la gamme.
    tint: true,
  },
];

export function ImageCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 5000);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section
      className="relative h-[320px] w-full overflow-hidden sm:h-[440px] lg:h-[560px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image src={slide.src} alt={slide.alt} fill priority={i === 0} sizes="100vw" className="object-cover" />
          {slide.tint && <div className="absolute inset-0 bg-ink-900/25 mix-blend-multiply" aria-hidden="true" />}
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/50 via-transparent to-transparent" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-6 flex justify-center gap-2">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Aller à l'image ${i + 1}`}
            aria-current={i === index}
            className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/75"}`}
          />
        ))}
      </div>
    </section>
  );
}
