import { certificates, contact } from '../data/profile';

export interface KnowledgeEntry {
  keywords: string[];
  answer: (lang: string) => string;
}

// Chaque entrée associe des mots-clés (dans les 3 langues) à une réponse générée
// dynamiquement à partir des VRAIES données du profil (source unique de vérité).
export const knowledgeBase: KnowledgeEntry[] = [
  {
    keywords: ['who', 'qui es', 'qui est', 'من', 'presente', 'présente', 'toi', 'syrine'],
    answer: (lang) =>
      ({
        fr: "Syrine Ahmed est ingénieure logiciel et développeuse IA basée à Tunis, diplômée de l'ESPRIT en génie logiciel. Elle est spécialisée en Java/Spring Boot, React, et intégration IA avec Python, LangChain et RAG.",
        en: 'Syrine Ahmed is a software engineer and AI developer based in Tunis, graduated from ESPRIT in software engineering. She specializes in Java/Spring Boot, React, and AI integration with Python, LangChain and RAG.',
        ar: 'سيرين أحمد مهندسة برمجيات ومطوّرة ذكاء اصطناعي، مقرها تونس، تخرّجت من ESPRIT في هندسة البرمجيات. تتخصص في Java وSpring Boot وReact ودمج الذكاء الاصطناعي.',
      })[lang] ?? '',
  },
  {
    keywords: ['project', 'projets', 'projet', 'مشاريع', 'مشروع', 'apps', 'applications'],
    answer: (lang) => {
      return (
        {
          fr: `Syrine a développé 4 applications IA principales : un analyseur de CV, un chatbot avec mémoire, un moteur de recherche d'emploi intelligent, et un système de chat avec documents (RAG). Elle a aussi construit des plateformes full-stack comme WeLoadSolutions (gestion de flottes) et Coco Esprit.`,
          en: `Syrine built 4 main AI applications: a CV analyzer, a chatbot with memory, a smart job search engine, and a document chat system (RAG). She also built full-stack platforms like WeLoadSolutions (fleet management) and Coco Esprit.`,
          ar: `طوّرت سيرين 4 تطبيقات ذكاء اصطناعي رئيسية: محلل سير ذاتية، روبوت محادثة بذاكرة، محرك بحث ذكي عن الوظائف، ونظام محادثة مع المستندات. كما بنت منصات full-stack مثل WeLoadSolutions.`,
        }[lang] ?? ''
      );
    },
  },
  {
    keywords: ['skill', 'compétence', 'competence', 'مهار', 'tech', 'technologies', 'stack'],
    answer: (lang) =>
      ({
        fr: `Ses compétences couvrent le backend (Java, Spring Boot, PostgreSQL), le frontend (React, Angular, React Native), l'IA (Python, LangChain, RAG, HuggingFace), et le DevOps (Docker, CI/CD, Jenkins).`,
        en: `Her skills cover backend (Java, Spring Boot, PostgreSQL), frontend (React, Angular, React Native), AI (Python, LangChain, RAG, HuggingFace), and DevOps (Docker, CI/CD, Jenkins).`,
        ar: `تشمل مهاراتها الواجهة الخلفية (Java, Spring Boot, PostgreSQL)، الواجهة الأمامية (React, Angular)، والذكاء الاصطناعي (Python, LangChain, RAG).`,
      })[lang] ?? '',
  },
  {
    keywords: ['experience', 'expérience', 'travail', 'job', 'خبرة', 'عمل', 'weload'],
    answer: (lang) =>
      ({
        fr: `Syrine a travaillé chez WeLoadSolutions comme développeuse full-stack sur une plateforme de gestion de flottes en microservices, ainsi que chez VadaSoft et DRÄXLMAIER Group. Elle développe actuellement ses propres applications IA en freelance.`,
        en: `Syrine worked at WeLoadSolutions as a full-stack developer on a fleet management microservices platform, as well as at VadaSoft and DRÄXLMAIER Group. She is currently building her own AI applications as a freelancer.`,
        ar: `عملت سيرين في WeLoadSolutions كمطوّرة full-stack على منصة إدارة أساطيل، وكذلك في VadaSoft وDRÄXLMAIER Group.`,
      })[lang] ?? '',
  },
  {
    keywords: ['certificat', 'certificate', 'شهادة', 'شهادات', 'formation', 'diplome', 'diplôme'],
    answer: (lang) =>
      ({
        fr: `Syrine détient ${certificates.length} certificats, notamment Elements of AI (Université d'Helsinki), Deep Learning Fundamentals (IBM), et Scrum Fundamentals Certified. Elle est diplômée en Génie Logiciel de l'ESPRIT.`,
        en: `Syrine holds ${certificates.length} certificates, including Elements of AI (University of Helsinki), Deep Learning Fundamentals (IBM), and Scrum Fundamentals Certified. She graduated in Software Engineering from ESPRIT.`,
        ar: `تحمل سيرين ${certificates.length} شهادة، منها Elements of AI من جامعة هلسنكي وDeep Learning Fundamentals من IBM. تخرّجت في هندسة البرمجيات من ESPRIT.`,
      })[lang] ?? '',
  },
  {
    keywords: ['contact', 'email', 'mail', 'joindre', 'contacter', 'تواصل', 'بريد', 'hire', 'embaucher', 'recruter'],
    answer: (lang) =>
      ({
        fr: `Vous pouvez contacter Syrine par email à ${contact.email}, ou via LinkedIn et GitHub. Elle est basée à Tunis/Sousse, en Tunisie.`,
        en: `You can contact Syrine by email at ${contact.email}, or via LinkedIn and GitHub. She's based in Tunis/Sousse, Tunisia.`,
        ar: `يمكنكم التواصل مع سيرين عبر البريد الإلكتروني ${contact.email}، أو عبر LinkedIn وGitHub. تقيم في تونس/سوسة.`,
      })[lang] ?? '',
  },
  {
    keywords: ['education', 'études', 'etudes', 'university', 'université', 'esprit', 'تعليم', 'جامعة'],
    answer: (lang) =>
      ({
        fr: `Syrine est diplômée en Génie Logiciel de l'ESPRIT à Tunis (2022-2025), après un cycle préparatoire à l'IPEIB de Bizerte.`,
        en: `Syrine graduated in Software Engineering from ESPRIT in Tunis (2022-2025), after a preparatory program at IPEIB Bizerte.`,
        ar: `تخرّجت سيرين في هندسة البرمجيات من ESPRIT بتونس (2022-2025)، بعد مرحلة تحضيرية في IPEIB ببنزرت.`,
      })[lang] ?? '',
  },
  {
    keywords: ['langue', 'language', 'لغة', 'anglais', 'arabe', 'français'],
    answer: (lang) =>
      ({
        fr: `Syrine parle arabe (langue maternelle), français et anglais couramment, et a des notions d'allemand.`,
        en: `Syrine speaks Arabic (native), French and English fluently, and has basic German.`,
        ar: `تتحدث سيرين العربية (لغة أم)، والفرنسية والإنجليزية بطلاقة، ولديها أساسيات في الألمانية.`,
      })[lang] ?? '',
  },
];

// Correspondance simple par mots-clés — suffisant pour un site statique sans backend.
// Retourne la meilleure réponse trouvée, ou null si aucune correspondance.
export function matchQuestion(question: string, lang: string): string | null {
  const normalized = question.toLowerCase();
  let bestMatch: { entry: KnowledgeEntry; score: number } | null = null;

  for (const entry of knowledgeBase) {
    const score = entry.keywords.filter((kw) => normalized.includes(kw.toLowerCase())).length;
    if (score > 0 && (!bestMatch || score > bestMatch.score)) {
      bestMatch = { entry, score };
    }
  }

  return bestMatch ? bestMatch.entry.answer(lang) : null;
}
