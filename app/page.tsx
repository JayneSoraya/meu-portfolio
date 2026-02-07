'use client';

import SpaceBackground from './components/SpaceBackground';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import ContactForm from './components/ContactForm';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Skills from './components/Skills';
import HardSkills from './components/HardSkills';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      <SpaceBackground />
      <Header />
      
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <HardSkills/>
        <Projects />
        <ContactForm />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}