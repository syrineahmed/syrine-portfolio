import { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import LanguageSwitcher from './components/layout/LanguageSwitcher';
import Hero from './components/hero/Hero';
import Quote from './components/hero/Quote';
import AvatarGuide from './components/hero/AvatarGuide';
import AmbientBackground3D from './components/hero/AmbientBackground3D';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import Education from './components/sections/Education';
import Certificates from './components/sections/Certificates';
import Resume from './components/sections/Resume';
import Contact from './components/sections/Contact';
import VoiceAssistant from './components/assistant/VoiceAssistant';

export default function App() {
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [pulse, setPulse] = useState(0);

  return (
    <div className="min-h-screen bg-[var(--color-ink)]">
      <AmbientBackground3D />
      <Sidebar />
      <LanguageSwitcher />
      <AvatarGuide excited={pulse} onClick={() => setAssistantOpen(true)} paused={assistantOpen} />

      <main className="md:ps-64 relative">
        <Hero onOpenAssistant={() => setAssistantOpen(true)} assistantPulse={pulse} />
        <Quote />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Education />
        <Certificates />
        <Resume />
        <Contact />
      </main>

      <VoiceAssistant
        isOpen={assistantOpen}
        onOpenChange={setAssistantOpen}
        onPulseChange={setPulse}
      />
    </div>
  );
}
