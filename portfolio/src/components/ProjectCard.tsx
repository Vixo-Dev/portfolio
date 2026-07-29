import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

interface ProjectCardProps {
  id: string;
  title: string;
  role: string;
  date: string;
  description: string;
  tech: string[];
  imageUrl?: string;
}

export function ProjectCard({ id, title, role, date, description, tech, imageUrl }: ProjectCardProps) {
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
          {imageUrl ? (
            <img src={imageUrl} alt={title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:brightness-110" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-secondary/20 transition-colors duration-500 group-hover:bg-primary/5">
              <span className="text-muted-foreground/50 text-sm font-medium tracking-widest uppercase group-hover:text-primary/50 transition-colors">Imagen del proyecto</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-hero-bg to-transparent" />
        </div>

        <div className="flex flex-1 flex-col p-6 pt-2 z-10">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <h3 className="text-lg font-semibold text-foreground tracking-tight transition-colors duration-300 group-hover:text-primary">{title}</h3>
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
