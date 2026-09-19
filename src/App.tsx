/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { PracticeAreasSection } from './components/PracticeAreasSection';
import { DifferencesSection } from './components/DifferencesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { BlogSection } from './components/BlogSection';
import { ContactSection } from './components/ContactSection';
import { AppointmentModal } from './components/AppointmentModal';
import { WhatsAppButton } from './components/WhatsAppButton';
import { CookieBanner } from './components/CookieBanner';
import { Footer } from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [selectedAreaForAppointment, setSelectedAreaForAppointment] = useState<string>('');
  const [selectedLawyerForAppointment, setSelectedLawyerForAppointment] = useState<string>('');
  const [contactInitialArea, setContactInitialArea] = useState<string>('');
  const [contactInitialMessage, setContactInitialMessage] = useState<string>('');

  // Scroll spy to update active section in header
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['inicio', 'sobre', 'areas', 'blog', 'contato'];
      const scrollPosition = window.scrollY + 120;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenAppointment = (area?: string) => {
    if (area) setSelectedAreaForAppointment(area);
    setIsAppointmentOpen(true);
  };

  const handleSelectLawyerForConsultation = (lawyerName: string, area: string) => {
    setSelectedLawyerForAppointment(lawyerName);
    setSelectedAreaForAppointment(area);
    setIsAppointmentOpen(true);
  };

  const handleSelectAreaForConsultation = (areaTitle: string) => {
    setContactInitialArea(areaTitle);
    setContactInitialMessage(`Olá, gostaria de receber uma orientação jurídica na área de ${areaTitle}.`);
    handleNavigate('contato');
  };

  const handleSelectTopicForConsultation = (topicTitle: string) => {
    setContactInitialMessage(`Olá, li o artigo "${topicTitle}" no site e gostaria de esclarecer dúvidas sobre este assunto.`);
    handleNavigate('contato');
  };

  return (
    <div className="min-h-screen bg-[#070c1b] text-slate-100 selection:bg-[#c6a052] selection:text-[#0a1128]">
      {/* Fixed Header */}
      <Header
        onOpenAppointment={handleOpenAppointment}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      <main>
        {/* Section: Início (Hero) */}
        <div id="inicio">
          <Hero
            onOpenAppointment={handleOpenAppointment}
            onExploreAreas={() => handleNavigate('areas')}
          />
        </div>

        {/* Section: Áreas de Atuação */}
        <PracticeAreasSection
          onSelectAreaForConsultation={handleSelectAreaForConsultation}
        />

        {/* Section: Sobre o Escritório & Advogados */}
        <AboutSection
          onSelectLawyerForConsultation={handleSelectLawyerForConsultation}
        />

        {/* Section: Diferenciais & Posicionamento */}
        <DifferencesSection
          onOpenAppointment={() => handleOpenAppointment()}
        />

        {/* Section: Prova Social & Casos de Sucesso Éticos */}
        <TestimonialsSection />

        {/* Section: Blog Jurídico Educativo (SEO) */}
        <BlogSection
          onSelectTopicForConsultation={handleSelectTopicForConsultation}
        />

        {/* Section: Contato & Localização */}
        <ContactSection
          initialArea={contactInitialArea}
          initialMessage={contactInitialMessage}
        />
      </main>

      {/* Institutional Footer */}
      <Footer
        onNavigate={handleNavigate}
        onSelectArea={handleSelectAreaForConsultation}
      />

      {/* Floating WhatsApp Quick Action Button */}
      <WhatsAppButton />

      {/* Appointment Booking Modal */}
      <AppointmentModal
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
        preselectedArea={selectedAreaForAppointment}
        preselectedLawyer={selectedLawyerForAppointment}
      />

      {/* LGPD Cookie Consent Banner */}
      <CookieBanner />
    </div>
  );
}
