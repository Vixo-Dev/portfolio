import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { cn } from "../lib/utils";

interface ProjectCardProps {
  id: string;
  title: string;
  role: string;
  date: string;
  description: string;
  tech: string[];
  imageUrl?: string | string[];
  githubUrl?: string;
  isMobileApp?: boolean;
}

export function ProjectCard({ id, title, role, date, description, tech, imageUrl, githubUrl, isMobileApp }: ProjectCardProps) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    if (Array.isArray(imageUrl) && imageUrl.length > 1) {
      const timer = setInterval(() => {
        setCurrentImgIndex((prev) => (prev + 1) % imageUrl.length);
      }, 3500);
      return () => clearInterval(timer);
    }
  }, [imageUrl]);
  return (
    <Link to={`/project/${id}`} className="block h-full">
      <motion.div 
        whileHover={{ scale: 1.01, y: -2 }}
        whileTap={{ scale: 0.99 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={cn(
          "group relative flex flex-col overflow-hidden rounded-xl border border-border bg-hero-bg/50 backdrop-blur-sm cursor-pointer h-full",
          "transition-colors duration-300 hover:border-primary/40 shadow-sm"
        )}
      >
        {/* macOS Header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-secondary/30 border-b border-border/50 relative z-20">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>

        {/* Glow effect behind the image on hover (softened) */}
        <div className="absolute -inset-2 bg-primary/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
        
        {/* Image Placeholder or Actual Image */}
        <div className="relative h-48 w-full overflow-hidden bg-muted/30 z-10 shrink-0">
          {Array.isArray(imageUrl) && imageUrl.length > 0 ? (
            <AnimatePresence mode="popLayout">
              <motion.img
                key={currentImgIndex}
                src={import.meta.env.BASE_URL + imageUrl[currentImgIndex]}
                alt={`${title} - image ${currentImgIndex + 1}`}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
                className={cn(
                  "absolute inset-0 h-full w-full group-hover:brightness-110",
                  isMobileApp ? "object-contain p-2 bg-secondary/10" : "object-cover"
                )}
              />
            </AnimatePresence>
          ) : typeof imageUrl === 'string' && imageUrl ? (
            <img 
              src={imageUrl.startsWith('http') ? imageUrl : import.meta.env.BASE_URL + imageUrl} 
              alt={title} 
              className={cn(
                "h-full w-full transition-transform duration-700 group-hover:scale-105 group-hover:brightness-110",
                isMobileApp ? "object-contain p-2 bg-secondary/10" : "object-cover"
              )} 
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-secondary/20 transition-colors duration-500 group-hover:bg-primary/5">
              <span className="text-muted-foreground/50 text-sm font-medium tracking-widest uppercase group-hover:text-primary/50 transition-colors">Imagen del proyecto</span>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-6 pt-2 z-10">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-semibold text-foreground tracking-tight transition-colors duration-300 group-hover:text-primary">{title}</h3>
                {githubUrl && (
                  <motion.a
                    href={githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    whileHover={{ scale: 1.05, filter: "drop-shadow(0 0 10px rgba(185,131,255,0.5))" }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#b983ff]/10 border border-[#b983ff]/30 text-[#b983ff] text-xs font-semibold uppercase tracking-wider transition-colors hover:bg-[#b983ff]/20 z-20 relative"
                  >
                    <FaGithub size={16} />
                    <span>Repo</span>
                  </motion.a>
                )}
              </div>
              <p className="text-primary text-sm font-medium">{role}</p>
            </div>
            <span className="text-xs text-muted-foreground shrink-0 mt-1">{date}</span>
          </div>
          
          <p className="mt-3 text-sm text-muted-foreground/80 leading-relaxed flex-1 transition-colors group-hover:text-muted-foreground">
            {description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {tech.map((t) => (
              <span key={t} className="rounded bg-secondary/50 px-2 py-1 text-[10px] uppercase tracking-wider text-secondary-foreground/70 border border-border/50 transition-colors group-hover:border-primary/20">
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
