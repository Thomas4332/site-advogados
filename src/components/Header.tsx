import React, { useState, useEffect } from 'react';
import { Phone, Clock, MessageSquare, Menu, X, Shield, Calendar, ArrowRight } from 'lucide-react';
import { FIRM_INFO } from '../data/lawFirmData';

interface HeaderProps {
  onOpenAppointment: (area?: string) => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAppointment, activeSection, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'inicio', label: 'Início' },
    { id: 'sobre', label: 'Sobre o Escritório' },
    { id: 'areas', label: 'Áreas de Atuação' },
    { id: 'blog', label: 'Blog & Artigos' },
    { id: 'contato', label: 'Contato & Localização' },
  ];

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top emergency and compliance notification bar */}
      <div className="bg-[#060b18] text-slate-300 text-xs py-2 border-b border-[#1b253d] hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 text-slate-300 font-medium">
              <Shield className="w-3.5 h-3.5 text-[#c6a052]" />
              <span>Sociedade de Advogados inscrita sob {FIRM_INFO.oabSociety}</span>
            </span>
            <span className="text-slate-500">|</span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-[#c6a052]" />
              <span>{FIRM_INFO.openingHours.weekdays}</span>
            </span>
          </div>

          <div className="flex items-center space-x-6">
            <a
              href={`tel:${FIRM_INFO.phone.replace(/\D/g, '')}`}
              className="flex items-center gap-1.5 hover:text-[#c6a052] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#c6a052]" />
              <span>{FIRM_INFO.phone}</span>
            </a>
            <a
              href={`https://wa.me/${FIRM_INFO.whatsappNumeric}?text=Olá,%20gostaria%20de%20solicitar%20uma%20orientação%20jurídica%20inicial.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#c6a052] hover:text-[#dfba6c] font-medium transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Plantão WhatsApp: {FIRM_INFO.whatsapp}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <nav
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-[#080f24]/95 backdrop-blur-md shadow-xl py-3 border-b border-[#233154]'
            : 'bg-[#0b1329]/90 backdrop-blur-sm py-4 border-b border-[#1b2744]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Law Firm Logo & Inscription */}
          <button
            onClick={() => handleNavClick('inicio')}
            className="flex items-center gap-3.5 text-left group focus:outline-none"
            aria-label="Página inicial de Menezes, Castro & Silveira Advogados"
          >
            {/* Geometric Balance & Monogram Emblem */}
            <div className="relative w-10 h-10 rounded-md bg-gradient-to-br from-[#1d2a4a] to-[#0c152c] border border-[#c6a052]/50 flex items-center justify-center p-2 shadow-inner group-hover:border-[#c6a052] transition-colors">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#c6a052]" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M6 8l6-2 6 2M6 8l-3 6h6l-3-6zM18 8l-3 6h6l-3-6zM4 21h16" />
              </svg>
            </div>
            <div>
              <span className="block font-brand text-lg sm:text-xl font-bold tracking-wide text-slate-100 group-hover:text-[#c6a052] transition-colors">
                Menezes, Castro & Silveira
              </span>
              <span className="block text-[10px] tracking-widest uppercase text-[#c6a052] font-semibold">
                Advogados Associados • {FIRM_INFO.oabSociety}
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-7">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-sm font-medium transition-all relative py-1 focus:outline-none ${
                    isActive ? 'text-[#c6a052]' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c6a052] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Desktop Call to Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => onOpenAppointment()}
              id="header-btn-agendar"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded bg-[#c6a052] text-[#0a1128] hover:bg-[#d6b267] active:bg-[#b08b3e] transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Agendar Consulta</span>
            </button>

            <a
              href={`https://wa.me/${FIRM_INFO.whatsappNumeric}?text=Olá,%20gostaria%20de%20falar%20com%20um%20advogado%20do%20escritório.`}
              target="_blank"
              rel="noopener noreferrer"
              id="header-btn-whatsapp"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded border border-[#2e4069] text-slate-200 hover:text-white hover:border-[#c6a052] hover:bg-[#16213d] transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => onOpenAppointment()}
              className="px-3 py-1.5 text-xs font-semibold rounded bg-[#c6a052] text-[#0a1128] sm:hidden"
            >
              Consulta
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-slate-300 hover:text-white hover:bg-[#19233f] focus:outline-none focus:ring-2 focus:ring-[#c6a052]"
              aria-label={isMobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-[#c6a052]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#0a1126] border-b border-[#233154] px-4 pt-3 pb-6 space-y-3 mt-2 animate-fadeIn">
            <div className="flex flex-col space-y-2 border-b border-[#1b253f] pb-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left px-3 py-2 rounded text-base font-medium transition-colors ${
                    activeSection === item.id
                      ? 'bg-[#18233f] text-[#c6a052] font-semibold'
                      : 'text-slate-300 hover:bg-[#121b33] hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-2 space-y-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenAppointment();
                }}
                className="w-full py-3 px-4 rounded bg-[#c6a052] text-[#0a1128] font-semibold flex items-center justify-center gap-2 text-sm shadow"
              >
                <Calendar className="w-4 h-4" />
                <span>Agendar Consulta Presencial ou Online</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/${FIRM_INFO.whatsappNumeric}?text=Olá,%20gostaria%20de%20falar%20com%20um%20advogado%20do%20escritório.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded border border-[#2b3a61] text-slate-200 hover:text-white flex items-center justify-center gap-2 text-sm bg-[#101931]"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Falar no WhatsApp: {FIRM_INFO.whatsapp}</span>
              </a>

              <div className="text-[11px] text-slate-400 text-center pt-2">
                Atendimento de Seg. a Sex. das 08h30 às 18h30
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
