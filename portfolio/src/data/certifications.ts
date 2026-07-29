import type { IconType } from "react-icons";
import { FaNetworkWired, FaLinux } from "react-icons/fa";

export interface Certification {
  id: string;
  title: string;
  description: string;
  date: string;
  instructor: string;
  hours: number;
  icon: IconType;
}

export const certifications: Certification[] = [
  {
    id: "ccna-srwe",
    title: "CCNA: Fundamentos de Conmutación, Enrutamiento y Redes Inalámbricas",
    description: "Curso 'Switching, Routing and Wireless Essentials'. El segundo de una serie de tres cursos para desarrollar sus habilidades en redes y prepararse para la certificación CCNA y los trabajos de nivel asociado.",
    date: "Jun 25, 2025",
    instructor: "Jonathan David Aguilar Pascoe",
    hours: 70,
    icon: FaNetworkWired
  },
  {
    id: "linux-essentials",
    title: "Fundamentos de Linux",
    description: "Desarrolla habilidades fundamentales en Linux y prepárate para el examen de certificación Linux Essentials del Linux Professional Institute.",
    date: "Apr 29, 2025",
    instructor: "Mauro Bahena Castro",
    hours: 70,
    icon: FaLinux
  }
];
