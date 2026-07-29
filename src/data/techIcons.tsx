import type { IconType } from 'react-icons';
import {
  SiPython, SiSpringboot, SiPhp, SiPostgresql, SiSharp,
  SiReact, SiAngular, SiJavascript, SiHtml5, SiCss, SiFlutter,
  SiDocker, SiGithubactions, SiJenkins, SiSonarqubeserver, SiUbuntu,
  SiGit, SiJira, SiFigma, SiTrello, SiKalilinux, SiLangchain,
  SiHuggingface, SiStreamlit,
} from 'react-icons/si';
import { FaJava, FaDatabase, FaKey, FaCode, FaLayerGroup } from 'react-icons/fa6';
import { BsFileEarmarkText } from 'react-icons/bs';

// Associe chaque techno (telle qu'écrite dans data/profile.ts) à son icône officielle.
// Fallback sur une icône générique si la techno n'a pas de logo dédié.
export const techIcons: Record<string, IconType> = {
  Python: SiPython,
  Java: FaJava,
  'Spring Boot': SiSpringboot,
  PHP: SiPhp,
  Symfony: FaCode,
  'REST APIs': FaCode,
  Keycloak: FaKey,
  PostgreSQL: SiPostgresql,
  SQL: FaDatabase,
  'C#': SiSharp,
  'React.js': SiReact,
  'React Native': SiReact,
  Angular: SiAngular,
  JavaScript: SiJavascript,
  HTML: SiHtml5,
  CSS: SiCss,
  Web3: FaCode,
  FlutterFlow: SiFlutter,
  Docker: SiDocker,
  'GitHub Actions': SiGithubactions,
  Jenkins: SiJenkins,
  Nexus: FaLayerGroup,
  SonarQube: SiSonarqubeserver,
  'CI/CD': SiGithubactions,
  Ubuntu: SiUbuntu,
  Git: SiGit,
  Jira: SiJira,
  Xray: BsFileEarmarkText,
  Figma: SiFigma,
  'Power BI': FaDatabase,
  Trello: SiTrello,
  'Kali Linux': SiKalilinux,
  'Groq API': FaCode,
  LangChain: SiLangchain,
  ChromaDB: FaDatabase,
  Streamlit: SiStreamlit,
  'Prompt Engineering': FaCode,
  RAG: FaCode,
  HuggingFace: SiHuggingface,
};

export function getTechIcon(tech: string): IconType {
  return techIcons[tech] ?? FaCode;
}
