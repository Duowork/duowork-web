// Duowork — portfolio source data
// Drop in your real images, links and copy. Each item renders one masonry card.
import workPortfolio from "../../data/portfolio/portfolio.json"

export interface Project {
  id: string;
  title: string;
  cat: string;
  catLabel: string;
  client?: string;
  year?: string;
  size: string;
  cap?: string;
  tag?: string[];
  role: string;
  time?: string;
  platform?: string;
  outcome: string;
  link: string;
  img: {
    src: string;
    alt: string
  };
}

const PROJECTS: Project[] = workPortfolio

export interface Category {
  id: string;
  label: string;
}

export const CATEGORIES: Category[] = [
  { id: "all", label: "All" },
  { id: "product", label: "Product MVP" },
  { id: "mobile", label: "Mobile App" },
  { id: "web", label: "Web App" },
  { id: "ai", label: "AI & Automation" },
  { id: "ux", label: "UI / UX" },
];

export default PROJECTS;
