export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  githubUrl: string;
  demoUrl: string;
  imageUrl: string;
  category: 'web' | 'mobile' | 'ai' | 'fullstack';
  featured?: boolean;
  stats?: {
    stars?: number;
    forks?: number;
    issues?: number;
  };
  date?: string;
  status?: 'completed' | 'in-progress' | 'maintenance';
  duration?: string;
  teamSize?: number;
  achievements?: string[];
  technologies?: {
    frontend?: string[];
    backend?: string[];
    database?: string[];
    tools?: string[];
  };
}

export interface SimpleProject {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  demoUrl: string;
  imageUrl: string;
  color: string;
  featured?: boolean;
}
