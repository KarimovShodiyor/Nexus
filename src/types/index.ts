export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  fullOverview: string;
  challengesSolved: string[];
  metrics: { label: string; value: string }[];
  category: 'React' | 'JavaScript' | 'UI/UX' | 'Web Applications';
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  year: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'Core Web' | 'Frameworks & Tooling' | 'Architecture';
  level: number; // 0 - 100
  experienceYears: string;
  description: string;
  iconType: 'html' | 'css' | 'js' | 'react' | 'vite' | 'tailwind' | 'git' | 'github' | 'responsive' | 'api';
}

export interface Service {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  icon: string;
  badge: string;
}

export interface PhilosophyPillar {
  title: string;
  description: string;
  accent: string;
}

export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
}
