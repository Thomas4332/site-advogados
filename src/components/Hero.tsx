import React from 'react';
import { Calendar, MessageSquare, ShieldCheck, Scale, CheckCircle2, Award, Clock } from 'lucide-react';
import { FIRM_INFO } from '../data/lawFirmData';

interface HeroProps {
  onOpenAppointment: (area?: string) => void;
  onExploreAreas: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAppointment, onExploreAreas }) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden bg-gradient-to-b from-[#070d1d] via-[#0c1630] to-[#091124]">
      {/* Subtle architectural background texture and soft ambient light */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#c6a052_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#c6a052]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Institutional Credibility Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#131e38] border border-[#273860] text-xs text-slate-300 mb-6">
            <Scale className="w-3.5 h-3.5 text-[#c6a052]" />
            <span className="font-medium">Sociedade Regular de Advogados • OAB/SP 42.180</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-emerald-400 text-[11px] font-semibold">Atendimento Ativo</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-normal tracking-tight leading-[1.15] mb-6">
            Rigor técnico, serenidade e{' '}
            <span className="text-[#c6a052] italic font-serif">atendimento humanizado</span> em cada etapa.
          </h1>

          {/* Reassuring Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-slate-300 font-sans-body font-normal leading-relaxed max-w-2xl mx-auto mb-8">
            Sabemos que questões jurídicas costumam vir acompanhadas de momentos de incerteza.
            Nossa equipe atua de forma preventiva e estratégica, orientando pessoas e empresas com
            absoluta clareza, discrição e dedicação.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={() => onOpenAppointment()}
              id="hero-cta-agendar"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-md bg-[#c6a052] text-[#080d1c] font-semibold text-sm hover:bg-[#d6b267] active:bg-[#b08b3e] shadow-lg shadow-[#c6a052]/10 transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#080d1c]" />
              <span>Solicitar Consulta Inicial</span>
            </button>

            <a
              href={`https://wa.me/${FIRM_INFO.whatsappNumeric}?text=Olá!%20Gostaria%20de%20conversar%20com%20um%20advogado%20sobre%20minha%20situação.`}
              target="_blank"
              rel="noopener noreferrer"
              id="hero-cta-whatsapp"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-md bg-[#162340] border border-[#2b3e6b] text-slate-200 font-semibold text-sm hover:text-white hover:border-[#c6a052] hover:bg-[#1a2b4f] transition-all"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Conversar pelo WhatsApp</span>
            </a>

            <button
              onClick={onExploreAreas}
              id="hero-cta-areas"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3.5 text-xs text-slate-400 hover:text-[#c6a052] transition-colors"
            >
              <span>Ver áreas de atuação</span>
              <span>↓</span>
            </button>
          </div>

          {/* Ethical Legal Note (OAB Compliance) */}
          <div className="text-[12px] text-slate-400 flex items-center justify-center gap-2 mb-12">
            <ShieldCheck className="w-4 h-4 text-[#c6a052]" />
            <span>Atendimento em estrita conformidade com o Código de Ética e Disciplina da OAB. Sigilo profissional assegurado.</span>
          </div>
        </div>

        {/* Pillars / Key Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-4 border-t border-[#1c2948]">
          <div className="bg-[#0f1933]/70 backdrop-blur border border-[#1e2d50] rounded-lg p-4 sm:p-5 text-center sm:text-left">
            <div className="text-2xl sm:text-3xl font-brand font-bold text-[#c6a052] mb-1">+18 Anos</div>
            <div className="text-xs font-medium text-slate-300">Trajetória e Prática Jurídica</div>
            <p className="text-[11px] text-slate-400 mt-1">Fundado em 2007 em São Paulo</p>
          </div>

          <div className="bg-[#0f1933]/70 backdrop-blur border border-[#1e2d50] rounded-lg p-4 sm:p-5 text-center sm:text-left">
            <div className="text-2xl sm:text-3xl font-brand font-bold text-[#c6a052] mb-1">100%</div>
            <div className="text-xs font-medium text-slate-300">Corpo Técnico Pós-Graduado</div>
            <p className="text-[11px] text-slate-400 mt-1">USP, PUC-SP, FGV e Mackenzie</p>
          </div>

          <div className="bg-[#0f1933]/70 backdrop-blur border border-[#1e2d50] rounded-lg p-4 sm:p-5 text-center sm:text-left">
            <div className="text-2xl sm:text-3xl font-brand font-bold text-[#c6a052] mb-1">Híbrido</div>
            <div className="text-xs font-medium text-slate-300">Presencial & Digital Seguro</div>
            <p className="text-[11px] text-slate-400 mt-1">Av. Paulista ou videoconferência</p>
          </div>

          <div className="bg-[#0f1933]/70 backdrop-blur border border-[#1e2d50] rounded-lg p-4 sm:p-5 text-center sm:text-left">
            <div className="text-2xl sm:text-3xl font-brand font-bold text-[#c6a052] mb-1">STJ & STF</div>
            <div className="text-xs font-medium text-slate-300">Atuação em Instâncias Superiores</div>
            <p className="text-[11px] text-slate-400 mt-1">Sustentações orais e recursos</p>
          </div>
        </div>
      </div>
    </section>
  );
};
