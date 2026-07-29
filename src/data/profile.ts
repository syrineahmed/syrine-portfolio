// Source unique de vérité pour tout le contenu du portfolio.
// Alimente les sections affichées ET la base de connaissances de l'assistant vocal.

export interface Project {
  id: string;
  titleKey: string;
  descKey: string;
  tech: string[];
  link?: string;
  repo?: string;
  featured: boolean;
}

export interface Experience {
  id: string;
  roleKey: string;
  company: string;
  location: string;
  period: string;
  descKey: string;
  tech: string[];
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  category: 'ai' | 'data' | 'business' | 'sustainability';
}

export const contact = {
  email: 'syrineahmed143@gmail.com',
  phone: '+216 54 099 718',
  whatsapp: 'https://wa.me/21654099718',
  github: 'https://github.com/syrineahmed',
  linkedin: 'https://www.linkedin.com/in/syrine-ahmed-02a8802b2/',
  facebook: 'https://www.facebook.com/syrine.ahmed.509',
  instagram: 'https://www.instagram.com/syrine_ahmeed',
  location: 'Tunis / Sousse, Tunisie',
};

export const projects: Project[] = [
  {
    id: 'cv-analyzer',
    titleKey: 'projects.cvAnalyzer.title',
    descKey: 'projects.cvAnalyzer.desc',
    tech: ['Python', 'Groq API', 'LLaMA 3.3', 'Streamlit'],
    link: 'https://cv-analyzer-syrineahmed.streamlit.app',
    featured: true,
  },
  {
    id: 'ai-chatbot',
    titleKey: 'projects.aiChatbot.title',
    descKey: 'projects.aiChatbot.desc',
    tech: ['Python', 'LangChain', 'Streamlit'],
    link: 'https://syrineahmed-chatbot.streamlit.app',
    featured: true,
  },
  {
    id: 'job-search',
    titleKey: 'projects.jobSearch.title',
    descKey: 'projects.jobSearch.desc',
    tech: ['Python', 'Adzuna API', 'Streamlit'],
    link: 'https://job-search-syrineahmed.streamlit.app',
    featured: true,
  },
  {
    id: 'document-chat',
    titleKey: 'projects.documentChat.title',
    descKey: 'projects.documentChat.desc',
    tech: ['Python', 'LangChain', 'ChromaDB', 'RAG'],
    link: 'https://syrineahmed-document-chat.streamlit.app',
    featured: true,
  },
  {
    id: 'weload',
    titleKey: 'projects.weload.title',
    descKey: 'projects.weload.desc',
    tech: ['Spring Boot', 'PostgreSQL', 'React', 'React Native', 'Docker'],
    link: 'https://www.weloadsolutions.com/',
    featured: false,
  },
  {
    id: 'coco-esprit',
    titleKey: 'projects.cocoEsprit.title',
    descKey: 'projects.cocoEsprit.desc',
    tech: ['Spring Boot', 'Angular', 'Web3', 'Cloudinary'],
    repo: 'https://github.com/AmalSlimi/coco_spring',
    featured: false,
  },
  {
    id: 'vs-bazaar',
    titleKey: 'projects.vsBazaar.title',
    descKey: 'projects.vsBazaar.desc',
    tech: ['Spring Boot', 'React.js'],
    repo: 'https://github.com/syrineahmed/Bazaar',
    featured: false,
  },
  {
    id: 'medfly',
    titleKey: 'projects.medfly.title',
    descKey: 'projects.medfly.desc',
    tech: ['Symfony', 'PHP', 'Java'],
    repo: 'https://github.com/syrineahmed/Symfony',
    featured: false,
  },
];

export const experiences: Experience[] = [
  {
    id: 'ai-dev',
    roleKey: 'experience.aiDev.role',
    company: 'Projets Personnels',
    location: 'Remote',
    period: '01/2026 – 03/2026',
    descKey: 'experience.aiDev.desc',
    tech: ['Python', 'Groq API', 'LangChain', 'ChromaDB', 'HuggingFace'],
  },
  {
    id: 'weloadsolutions',
    roleKey: 'experience.weload.role',
    company: 'WeLoadSolutions',
    location: 'Tunis',
    period: '02/2025 – 08/2025',
    descKey: 'experience.weload.desc',
    tech: ['Spring Boot', 'Keycloak', 'PostgreSQL', 'React.js', 'React Native', 'Docker'],
  },
  {
    id: 'vadasoft',
    roleKey: 'experience.vadasoft.role',
    company: 'VadaSoft',
    location: 'Tunis, Monastir',
    period: '07/2024 – 09/2024',
    descKey: 'experience.vadasoft.desc',
    tech: ['Spring Boot', 'React.js'],
  },
  {
    id: 'draxlmaier',
    roleKey: 'experience.draxlmaier.role',
    company: 'DRÄXLMAIER Group',
    location: 'Sousse',
    period: '08/2023 – 09/2023',
    descKey: 'experience.draxlmaier.desc',
    tech: ['Symfony', 'PHP'],
  },
];

export const skills = {
  ai: ['Python', 'Groq API', 'LangChain', 'ChromaDB', 'Streamlit', 'Prompt Engineering', 'RAG', 'HuggingFace'],
  backend: ['Java', 'Spring Boot', 'PHP', 'Symfony', 'REST APIs', 'Keycloak', 'PostgreSQL', 'SQL', 'C#'],
  frontend: ['React.js', 'React Native', 'Angular', 'JavaScript', 'HTML', 'CSS', 'Web3', 'FlutterFlow'],
  devops: ['Docker', 'GitHub Actions', 'Jenkins', 'Nexus', 'SonarQube', 'CI/CD', 'Ubuntu'],
  tools: ['Git', 'Jira', 'Xray', 'Figma', 'Power BI', 'Trello', 'Kali Linux'],
};

export const certificates: Certificate[] = [
  { id: 'elements-ai', name: 'Elements of AI', issuer: 'University of Helsinki & MinnaLearn', date: '2026-07', category: 'ai' },
  { id: 'fundamentals-ai', name: 'Fundamentals of AI', issuer: 'IBM Skills Network / Cognitive Class', date: '2026-07', category: 'ai' },
  { id: 'deep-learning', name: 'Deep Learning Fundamentals', issuer: 'DeepLearning.TV / Cognitive Class', date: '2026-07', category: 'ai' },
  { id: 'intro-ml', name: 'Intro to Machine Learning', issuer: 'Kaggle', date: '2026-07', category: 'ai' },
  { id: 'intermediate-ml', name: 'Intermediate Machine Learning', issuer: 'Kaggle', date: '2026-07', category: 'ai' },
  { id: 'python-101', name: 'Python 101 for Data Science', issuer: 'IBM / Cognitive Class', date: '2026-07', category: 'data' },
  { id: 'python-kaggle', name: 'Python', issuer: 'Kaggle', date: '2026-07', category: 'data' },
  { id: 'pandas', name: 'Pandas', issuer: 'Kaggle', date: '2026-07', category: 'data' },
  { id: 'data-cleaning', name: 'Data Cleaning', issuer: 'Kaggle', date: '2026-07', category: 'data' },
  { id: 'data-viz', name: 'Data Visualization', issuer: 'Kaggle', date: '2026-07', category: 'data' },
  { id: 'intro-programming', name: 'Intro to Programming', issuer: 'Kaggle', date: '2026-07', category: 'data' },
  { id: 'digital-marketing', name: 'Fundamentals of Digital Marketing', issuer: 'Google Digital Garage', date: '2026-07', category: 'business' },
  { id: 'scrum', name: 'Scrum Fundamentals Certified', issuer: 'SCRUMstudy / VMEdu', date: '2026-07', category: 'business' },
  { id: 'sustainability', name: 'Sustainability, Work Ethics & Gender Equity', issuer: 'Honoris United Universities', date: '2024-12', category: 'sustainability' },
];

export const education = [
  { degreeKey: 'education.esprit.degree', school: 'ESPRIT, Tunis', period: '09/2022 – 10/2025' },
  { degreeKey: 'education.ipeib.degree', school: 'IPEIB, Bizerte', period: '09/2019 – 06/2022' },
  { degreeKey: 'education.bac.degree', school: 'Lycée Pilote de Sousse', period: '09/2015 – 06/2019' },
];

export const languages = [
  { name: 'Arabic', level: 'native' },
  { name: 'English', level: 'fluent' },
  { name: 'French', level: 'fluent' },
  { name: 'German', level: 'basic' },
];
