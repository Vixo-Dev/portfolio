export interface Project {
  id: string;
  title: string;
  role: string;
  date: string;
  description: string;
  tech: string[];
  imageUrl?: string;
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    id: "roca-de-salvacion",
    title: "Iglesia Roca de Salvación",
    role: "Full Stack Developer",
    date: "May 2026 - Jul 2026",
    description: "Sistema de gestión administrativa y asistencia. Desarrollo del backend con arquitectura en capas y seguridad mediante tokens (JWT). Construcción de la API REST e implementación del frontend.",
    tech: ["Spring Boot", "React PWA", "JWT", "Java", "REST API"],
    githubUrl: "https://github.com/davidvg1511"
  },
  {
    id: "chatbot-rag",
    title: "Chatbot RAG Empresarial",
    role: "Full Stack Developer",
    date: "Jul 2026",
    description: "Construcción de un Chatbot RAG integrado nativamente en plataforma web empresarial, utilizando base de datos vectorial para consultas inteligentes sobre documentos internos.",
    tech: ["Gemini AI", "Pinecone", "Node.js", "React.js"],
    githubUrl: "https://github.com/davidvg1511"
  },
  {
    id: "riber",
    title: "Riber",
    role: "Full Stack Developer",
    date: "Abr 2024 - May 2024",
    description: "App móvil de transporte. Implementación de geolocalización en tiempo real para mostrar la ubicación del usuario y las rutas disponibles mediante mapas interactivos.",
    tech: ["React Native", "Google Maps API", "Node.js"],
    githubUrl: "https://github.com/davidvg1511"
  },
  {
    id: "netrix",
    title: "Netrix",
    role: "Backend Developer",
    date: "Jun 2025 - Ago 2025",
    description: "Sistema universitario de préstamo de equipos de redes. Desarrollo de capa backend y acceso a BD. Implementación del patrón DAO, consultas SQL y operaciones CRUD.",
    tech: ["Oracle Cloud", "Java", "SQL"],
    githubUrl: "https://github.com/davidvg1511"
  },
  {
    id: "plataforma-educativa",
    title: "Plataforma Educativa WEB",
    role: "Backend Developer",
    date: "Prototipo Estatal",
    description: "Concurso Estatal de Prototipos y Proyecto de Emprendimiento. Desarrollo del backend para la lógica de la aplicación e implementación de operaciones CRUD para la gestión del foro.",
    tech: ["PHP", "MySQL", "HTML/CSS/JS"],
    githubUrl: "https://github.com/davidvg1511"
  }
];
