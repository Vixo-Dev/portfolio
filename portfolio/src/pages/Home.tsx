import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Button } from "../components/ui/button";
import { ProjectCard } from "../components/ProjectCard";
import { BinaryParticles } from "../components/BinaryParticles";
import { projects } from "../data/projects";
import { Typewriter } from "../components/Typewriter";
import { ParticleCube } from "../components/ParticleCube";
import { certifications } from "../data/certifications";
import { FaJava, FaPython, FaPhp, FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJsSquare, FaDatabase, FaCodeBranch, FaCloud, FaLinkedin, FaGithub, FaEnvelope, FaServer } from "react-icons/fa";
import { SiKotlin, SiSpringboot, SiMysql, SiPostgresql } from "react-icons/si";

export function Home() {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // Check on mount
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const skills = [
    { name: 'Java', color: '#e76f00', icon: FaJava },
    { name: 'Python', color: '#3776ab', icon: FaPython },
    { name: 'PHP', color: '#777bb4', icon: FaPhp },
    { name: 'Kotlin', color: '#7f52ff', icon: SiKotlin },
    { name: 'Spring Boot', color: '#6db33f', icon: SiSpringboot },
    { name: 'React.js', color: '#61dafb', icon: FaReact },
    { name: 'Node.js', color: '#339933', icon: FaNodeJs },
    { name: 'HTML5', color: '#e34f26', icon: FaHtml5 },
    { name: 'CSS3', color: '#1572b6', icon: FaCss3Alt },
    { name: 'JavaScript', color: '#f7df1e', icon: FaJsSquare },
    { name: 'MySQL', color: '#4479a1', icon: SiMysql },
    { name: 'PostgreSQL', color: '#336791', icon: SiPostgresql },
    { name: 'Oracle Cloud', color: '#f80000', icon: FaCloud },
    { name: 'Pinecone', color: '#ffffff', icon: FaDatabase },
    { name: 'Spec Driven Dev', color: '#00ff00', icon: FaCodeBranch }
  ];

  const softSkills = [
    { title: "Autodidacta", desc: "Capacidad comprobada para aprender nuevas tecnologías y frameworks de forma independiente y rápida." },
    { title: "Proactivo", desc: "Tomo la iniciativa para identificar problemas, proponer soluciones arquitectónicas y mejorar procesos." },
    { title: "Trabajo en Equipo", desc: "Colaboración efectiva, comunicación clara y apoyo constante a otros desarrolladores del equipo." },
    { title: "Honesto", desc: "Transparencia en la estimación de tiempos, reporte de blockers y manejo de expectativas del cliente." }
  ];

  const skillCategories = [
    {
      title: "Backend",
      CategoryIcon: FaServer,
      color: "#8b5cf6",
      skills: [
        { name: 'Node.js', color: '#339933', icon: FaNodeJs },
        { name: 'Java', color: '#e76f00', icon: FaJava },
        { name: 'Spring Boot', color: '#6db33f', icon: SiSpringboot },
        { name: 'Python', color: '#3776ab', icon: FaPython },
        { name: 'PHP', color: '#777bb4', icon: FaPhp },
        { name: 'Kotlin', color: '#7f52ff', icon: SiKotlin },
      ]
    },
    {
      title: "Frontend",
      CategoryIcon: FaReact,
      color: "#61dafb",
      skills: [
        { name: 'React.js', color: '#61dafb', icon: FaReact },
        { name: 'JavaScript', color: '#f7df1e', icon: FaJsSquare },
        { name: 'HTML5', color: '#e34f26', icon: FaHtml5 },
        { name: 'CSS3', color: '#1572b6', icon: FaCss3Alt },
      ]
    },
    {
      title: "Bases de Datos & Cloud",
      CategoryIcon: FaDatabase,
      color: "#4479a1",
      skills: [
        { name: 'MySQL', color: '#4479a1', icon: SiMysql },
        { name: 'PostgreSQL', color: '#336791', icon: SiPostgresql },
        { name: 'Pinecone', color: '#ffffff', icon: FaDatabase },
        { name: 'Oracle Cloud', color: '#f80000', icon: FaCloud },
      ]
    },
    {
      title: "Herramientas",
      CategoryIcon: FaCodeBranch,
      color: "#00ff00",
      skills: [
        { name: 'Spec Driven Dev', color: '#00ff00', icon: FaCodeBranch }
      ]
    }
  ];

  const renderSkillCard = (category: typeof skillCategories[0], catIndex: number) => {
    const CatIcon = category.CategoryIcon;
    return (
      <motion.div
        key={`${category.title}-${isMobile}`}
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: isMobile }}
        transition={{ duration: 0.5, delay: catIndex * 0.1 }}
        className="w-full max-w-md p-6 md:p-8 rounded-3xl bg-secondary/10 border border-white/5 transition-all duration-500 group relative z-10 bg-clip-padding backdrop-filter backdrop-blur-md"
        style={{ boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)' }}
      >
        <div className="flex items-center gap-4 mb-6 border-b border-white/5 pb-4">
          <div className="p-3 rounded-xl bg-secondary/40 text-primary border border-primary/20 shadow-sm group-hover:shadow-neon transition-all duration-500" style={{ color: category.color, borderColor: `${category.color}40` }}>
            <CatIcon size={24} className="group-hover:scale-110 transition-transform duration-300" />
          </div>
          <h3 className="text-xl font-bold tracking-widest uppercase text-foreground/90 group-hover:text-white transition-colors duration-300">{category.title}</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          {category.skills.map((skill) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={`${skill.name}-${isMobile}`}
                whileHover={{ 
                  scale: 1.1, 
                  y: -5,
                  boxShadow: `0 10px 30px -10px ${skill.color}` 
                }}
                transition={{ 
                  type: "spring",
                  stiffness: 300
                }}
                className="px-4 py-2.5 rounded-xl bg-secondary/30 border border-white/10 font-medium flex items-center gap-2.5 cursor-pointer relative overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 hover:opacity-10 transition-opacity duration-300" style={{ backgroundColor: skill.color }} />
                <Icon style={{ color: skill.color }} size={18} />
                <span className="text-foreground/90 text-sm tracking-wide transition-colors">{skill.name}</span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="bg-hero-bg min-h-screen font-sora selection:bg-primary/30 selection:text-primary-foreground relative overflow-x-hidden">
      {/* Background elegant pattern */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      <div className="fixed top-0 left-0 right-0 h-[500px] pointer-events-none z-0 bg-gradient-to-b from-primary/10 to-transparent opacity-30 blur-3xl"></div>

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 lg:px-16 py-5 bg-hero-bg/70 backdrop-blur-md border-b border-white/5">
        <div className="text-foreground text-xl font-semibold tracking-tight">
          DAVID <span className="text-primary">VG</span>
        </div>
        <div className="hidden md:flex gap-8">
          {["Sobre Mí", "Proyectos", "Habilidades", "Certificaciones", "Contacto"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(" ", "-")}`}
              className="text-sm text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest"
            >
              {link}
            </a>
          ))}
        </div>
        <div>
          <a href="/cv.pdf" target="_blank">
            <Button variant="navCta" size="lg" className="hidden md:inline-flex px-6">
              Descargar CV
            </Button>
          </a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center bg-transparent overflow-hidden" id="sobre-mí">
        <BinaryParticles />
        
        {/* Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 pb-10 md:pb-16 pt-16 md:pt-32 flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Side: Text Content */}
          <div className="w-full md:w-1/2 flex flex-col">
            <h1 
              className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.05] tracking-[-0.05em] text-foreground mb-2 md:mb-4 uppercase opacity-0 animate-fade-up inline-block"
              style={{ animationDelay: "0.2s" }}
            >
              DAVID <span className="text-primary text-neon animate-glitch inline-block">VALENZUELA</span>
            </h1>
            
            <p 
              className="text-foreground/90 text-[clamp(1.125rem,2.5vw,1.875rem)] font-medium mb-3 md:mb-6 h-[1.2em] flex items-center"
            >
              <Typewriter texts={["Desarrollador Full Stack.", "Hello World", "Bonjour le monde"]} startDelay={500} delay={60} />
            </p>

            <p 
              className="text-muted-foreground text-[clamp(0.875rem,1.5vw,1.15rem)] font-light mb-6 md:mb-10 max-w-xl opacity-0 animate-fade-up"
              style={{ animationDelay: "0.5s" }}
            >
              Desarrollador autodidacta y responsable, con sólida ética de trabajo. Destaco por mi proactividad para resolver problemas y mi capacidad de colaborar en equipo, tomando la iniciativa para mejorar procesos y contribuir al éxito de los proyectos.
            </p>

            <div 
              className="flex flex-wrap gap-4 font-bold opacity-0 animate-fade-up"
              style={{ animationDelay: "0.65s" }}
            >
              <a href="mailto:davidvg1511@gmail.com">
                <Button variant="hero" className="px-6 py-3 md:px-8 md:py-6 text-sm md:text-base">
                  Contactar
                </Button>
              </a>
              <a href="#proyectos">
                <Button variant="heroOutline" className="px-6 py-3 md:px-8 md:py-6 text-sm md:text-base border-transparent hover:border-primary/50">
                  Mis Proyectos
                </Button>
              </a>
            </div>

            <p 
              className="text-muted-foreground/60 text-xs font-light mt-6 md:mt-8 opacity-0 animate-fade-up uppercase tracking-widest"
              style={{ animationDelay: "0.8s" }}
            >
              TSU Desarrollo De Software · Morelos, México.
            </p>
          </div>

          {/* Right Side: Animated GIF (Hidden on Mobile) */}
          <div 
            className="hidden md:flex md:w-1/2 justify-center md:justify-end opacity-0 animate-fade-up mt-10 md:mt-0"
            style={{ animationDelay: "1s" }}
          >
            <div className="w-full max-w-[600px] aspect-square flex justify-center items-center">
              <ParticleCube />
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="proyectos" className="relative py-24 px-6 md:px-16 z-20 border-t border-white/5 bg-background/50">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground uppercase mb-4">Experiencia <span className="text-primary text-neon">& Proyectos</span></h2>
            <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">
              Sistemas desarrollados con enfoque en escalabilidad, seguridad y buenas prácticas de ingeniería.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <ProjectCard 
                  id={project.id}
                  title={project.title}
                  role={project.role}
                  date={project.date}
                  description={project.description}
                  tech={project.tech}
                  imageUrl={project.imageUrl}
                />
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16 flex justify-center"
          >
            <a href="https://github.com/Vixo-Dev" target="_blank" rel="noreferrer">
              <Button variant="heroOutline" className="px-8 py-6 text-sm font-semibold uppercase tracking-widest border-border hover:border-primary/50 transition-colors">
                Ver todos los proyectos
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="habilidades" className="relative py-24 px-6 md:px-16 z-20 border-t border-white/5 bg-background/50">
        <div className="max-w-5xl mx-auto">
          {/* Competencias Técnicas (Full Width) */}
          <div className="mb-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: isMobile }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground uppercase mb-4">
                Competencias <span className="text-primary text-neon">Técnicas</span>
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl mx-auto">
                Dominio de múltiples lenguajes y frameworks tanto para el lado del servidor como del cliente, complementado con bases de datos relacionales y herramientas Cloud.
              </p>
            </motion.div>

            <div className="w-full relative z-10">
              <style>{`
                @keyframes flow-dash {
                  to { stroke-dashoffset: -40; }
                }
                .flowing-line {
                  stroke-dasharray: 10 15;
                  animation: flow-dash 1.5s linear infinite;
                }
              `}</style>

              {/* Desktop Vertical N8N Zigzag Layout */}
              <div className="hidden md:flex flex-col items-center w-full relative z-10 py-10">
                {skillCategories.map((category, catIndex) => {
                  const isEven = catIndex % 2 === 0;
                  
                  return (
                    <React.Fragment key={`${category.title}-${isMobile}-desktop`}>
                      <div className={`w-full max-w-lg relative z-10 ${isEven ? '-translate-x-16' : 'translate-x-16'}`}>
                        {renderSkillCard(category, catIndex)}
                      </div>

                      {/* Connecting Workflow Line */}
                      {catIndex < skillCategories.length - 1 && (
                        <div className="w-full flex justify-center items-center -my-4 relative z-0 pointer-events-none opacity-50">
                          <svg className="w-48 h-40" viewBox="0 0 100 100" preserveAspectRatio="none">
                            {isEven ? (
                              <path d="M 20,0 C 20,50 80,50 80,100" fill="none" stroke={category.color} strokeWidth="3" className="flowing-line" />
                            ) : (
                              <path d="M 80,0 C 80,50 20,50 20,100" fill="none" stroke={category.color} strokeWidth="3" className="flowing-line" />
                            )}
                          </svg>
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Mobile Flat Layout (Tag Cloud) */}
              <div className="md:hidden flex flex-wrap justify-center gap-4 relative z-10">
                {skills.map((skill, i) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div
                      key={`${skill.name}-${isMobile}-mobile`}
                      initial={{ opacity: 0, scale: 0.5, y: 20 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: isMobile }}
                      whileHover={{ 
                        scale: 1.1, 
                        y: -5,
                        boxShadow: `0 10px 30px -10px ${skill.color}` 
                      }}
                      transition={{ 
                        duration: 0.4, 
                        delay: i * 0.05,
                        type: "spring",
                        stiffness: 300
                      }}
                      className="px-5 py-3 rounded-xl bg-secondary/20 border border-white/5 font-medium flex items-center gap-2 cursor-pointer relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" style={{ backgroundColor: skill.color }} />
                      <Icon style={{ color: skill.color }} size={18} className="transition-transform group-hover:scale-110" />
                      <span className="text-foreground/90 text-sm tracking-wide group-hover:text-white transition-colors">{skill.name}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Perfil Profesional */}
          <div className="border-t border-white/5 pt-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="text-2xl md:text-3xl font-bold tracking-tight text-foreground uppercase mb-10 text-center md:text-left"
            >
              Perfil <span className="text-primary text-neon">Profesional</span>
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
              {/* Cat GIF Section */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6 }}
                className="md:col-span-2 flex justify-center md:justify-start"
              >
                <div className="relative group rounded-2xl overflow-hidden shadow-neon border border-primary/20 w-full max-w-sm">
                  <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-500"></div>
                  <img 
                    src="https://media.giphy.com/media/3oKIPnAiaMCws8nOsE/giphy.gif" 
                    alt="Cat Hacker Animation" 
                    className="w-full aspect-square object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-90" 
                  />
                </div>
              </motion.div>

              {/* Soft Skills List */}
              <ul className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {softSkills.map((soft, i) => (
                  <motion.li 
                    key={i} 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex flex-col gap-3 p-6 rounded-2xl bg-secondary/10 border border-white/5 hover:border-primary/20 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 shadow-neon" />
                      <h3 className="text-foreground font-semibold uppercase tracking-wider text-sm">{soft.title}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{soft.desc}</p>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS SECTION */}
      <section id="certificaciones" className="relative py-24 px-6 md:px-16 z-20 border-t border-white/5 bg-background">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground uppercase mb-4">
              <span className="text-primary text-neon">Certificaciones</span>
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl mx-auto">
              Acreditaciones y formación continua para mantener un alto nivel de especialización técnica.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => {
              const CertIcon = cert.icon;
              return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative p-6 rounded-2xl bg-secondary/10 border border-white/5 hover:border-primary/40 transition-colors duration-500 overflow-hidden flex flex-col h-full"
              >
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 rounded-xl bg-secondary/40 text-primary border border-primary/20 shadow-sm group-hover:shadow-neon group-hover:border-primary/50 transition-all duration-500">
                      <CertIcon size={24} className="group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">{cert.date}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-foreground mb-3 leading-snug group-hover:text-primary transition-colors duration-300">
                    {cert.title}
                  </h3>
                  
                  <p className="text-muted-foreground/80 text-sm leading-relaxed mb-8 flex-grow">
                    {cert.description}
                  </p>
                  
                  <div className="mt-auto border-t border-white/5 pt-5">
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span className="truncate pr-2">{cert.instructor}</span>
                      <span className="shrink-0 font-medium">{cert.hours} hrs</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )})}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contacto" className="relative py-24 md:py-32 px-6 md:px-16 z-20 border-t border-white/5 bg-background overflow-hidden">
        {/* Glow Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: isMobile }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground uppercase mb-4">
              Ponte en <span className="text-primary text-neon">Contacto</span>
            </h2>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
              ¿Tenés un proyecto en mente o te gustaría sumar un desarrollador a tu equipo? Hablemos y hagamos que las cosas sucedan.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Github */}
            <motion.a 
              href="https://github.com/Vixo-Dev"
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: isMobile }}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center justify-center gap-4 p-8 rounded-2xl bg-secondary/10 border border-white/5 hover:bg-secondary/20 hover:border-[#b983ff]/60 hover:shadow-[0_0_30px_rgba(185,131,255,0.4)] transition-all group"
            >
              <div className="p-4 rounded-full bg-white/5 group-hover:bg-[#b983ff]/20 transition-colors">
                <FaGithub size={36} color="#b983ff" style={{ filter: 'drop-shadow(0 0 8px rgba(185,131,255,0.6))' }} className="transition-transform group-hover:scale-110" />
              </div>
              <div className="text-center">
                <h3 className="font-medium text-foreground mb-1">GitHub</h3>
                <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">Vixo-Dev</p>
              </div>
            </motion.a>

            {/* LinkedIn */}
            <motion.a 
              href="https://www.linkedin.com/in/david-valenzuela-guijosa-3a7b3b39a"
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: isMobile }}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center justify-center gap-4 p-8 rounded-2xl bg-secondary/10 border border-white/5 hover:bg-secondary/20 hover:border-[#00a0dc]/60 hover:shadow-[0_0_30px_rgba(0,160,220,0.4)] transition-all group"
            >
              <div className="p-4 rounded-full bg-white/5 group-hover:bg-[#00a0dc]/20 transition-colors">
                <FaLinkedin size={36} color="#00a0dc" style={{ filter: 'drop-shadow(0 0 8px rgba(0,160,220,0.6))' }} className="transition-transform group-hover:scale-110" />
              </div>
              <div className="text-center">
                <h3 className="font-medium text-foreground mb-1">LinkedIn</h3>
                <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">David Valenzuela</p>
              </div>
            </motion.a>

            {/* Email */}
            <motion.a 
              href="mailto:davidvg1511@gmail.com"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: isMobile }}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center justify-center gap-4 p-8 rounded-2xl bg-secondary/10 border border-white/5 hover:bg-secondary/20 hover:border-[#ff5252]/60 hover:shadow-[0_0_30px_rgba(255,82,82,0.4)] transition-all group"
            >
              <div className="p-4 rounded-full bg-white/5 group-hover:bg-[#ff5252]/20 transition-colors">
                <FaEnvelope size={36} color="#ff5252" style={{ filter: 'drop-shadow(0 0 8px rgba(255,82,82,0.6))' }} className="transition-transform group-hover:scale-110" />
              </div>
              <div className="text-center">
                <h3 className="font-medium text-foreground mb-1">Correo Electrónico</h3>
                <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">davidvg1511@gmail.com</p>
              </div>
            </motion.a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#050505] py-8 px-6 border-t border-white/5 text-center relative z-20">
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center">
          <h2 className="text-xl font-bold text-foreground/50 uppercase tracking-widest mb-2">DAVID <span className="text-primary/50 text-neon">VALENZUELA</span></h2>
          <p className="text-xs text-muted-foreground/40">© {new Date().getFullYear()} Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
