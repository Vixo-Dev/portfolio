import { useEffect, useState } from "react";

export function BinaryParticles() {
  const [particles, setParticles] = useState<{ id: number; left: number; delay: number; duration: number; text: string; size: number; opacity: number }[]>([]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 12 : 50; // Use significantly fewer particles on mobile

    // Generate particles on client side
    const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * -20, 
      duration: Math.random() * 20 + 20, 
      text: Math.random() > 0.5 ? "1" : "0",
      size: Math.random() * 4 + 8, // 8px to 12px (Small size)
      opacity: Math.random() * 0.15 + 0.05 // 0.05 to 0.20 (Very faint)
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute font-mono select-none animate-float-up text-primary"
          style={{
            left: `${p.left}%`,
            bottom: "-10%",
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.text}
        </div>
      ))}
    </div>
  );
}
