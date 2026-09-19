import React, { useState, useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';

export const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('mcs_lgpd_consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('mcs_lgpd_consent', 'accepted');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#091124]/95 backdrop-blur-md border-t border-[#1d2d50] p-4 text-xs text-slate-300 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-[#c6a052] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Utilizamos recursos essenciais para assegurar a navegação segura e o funcionamento pleno deste portal
            institucional, em estrita observância à Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD).
            Ao prosseguir, você concorda com nossos padrões de confidencialidade e sigilo profissional.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleAccept}
            className="px-4 py-2 rounded bg-[#c6a052] text-[#080d1c] font-semibold text-xs hover:bg-[#d6b267] transition-colors"
          >
            Entendido e Concordo
          </button>
        </div>
      </div>
    </div>
  );
};
