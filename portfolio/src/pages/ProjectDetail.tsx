import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { Button } from "../components/ui/button";
import { projects } from "../data/projects";
import { ArrowLeft, ExternalLink } from "lucide-react";

export function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-hero-bg flex flex-col items-center justify-center text-foreground font-sora">
        <h1 className="text-4xl font-bold mb-4">Proyecto no encontrado</h1>
        <Link to="/">
          <Button variant="heroOutline">Volver al inicio</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-hero-bg min-h-screen font-sora selection:bg-primary/30 selection:text-primary-foreground relative pb-20">
      {/* Background elegant pattern */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      <div className="fixed top-0 left-0 right-0 h-[300px] pointer-events-none z-0 bg-gradient-to-b from-primary/10 to-transparent opacity-30 blur-3xl"></div>

      <nav className="fixed top-0 left-0 right-0 z-50 px-8 lg:px-16 py-5 bg-hero-bg/70 backdrop-blur-md border-b border-white/5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft size={20} />
          <span className="text-sm font-semibold uppercase tracking-widest">Volver</span>
        </Link>
        <div className="text-foreground text-lg font-semibold tracking-tight">
          DAVID <span className="text-primary">VG</span>
        </div>
      </nav>

      <main className="relative z-10 w-full max-w-4xl mx-auto px-6 md:px-10 pt-32 mt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6 flex flex-wrap gap-3">
            {project.tech.map((t) => (
              <span key={t} className="rounded bg-secondary/30 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-secondary-foreground border border-border/50">
                {t}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 tracking-tight leading-tight">
            {project.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 mb-12 border-b border-border/50 pb-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Rol</p>
              <p className="text-primary font-medium">{project.role}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Fecha</p>
              <p className="text-foreground font-medium">{project.date}</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Acerca del Proyecto</h2>
            <p className="text-muted-foreground leading-relaxed text-lg mb-10">
              {project.description}
            </p>
          </div>

          <div className="mt-12 p-8 rounded-2xl bg-secondary/10 border border-white/5 flex flex-col md:flex-row gap-6 items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">¿Querés ver el código?</h3>
              <p className="text-muted-foreground text-sm">Explorá el repositorio completo en GitHub.</p>
            </div>
            
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer">
                <Button variant="hero" className="flex items-center gap-2 px-8 py-6">
                  <ExternalLink size={20} />
                  Ver en GitHub
                </Button>
              </a>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
