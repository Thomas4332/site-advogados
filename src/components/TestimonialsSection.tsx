import React from 'react';
import { Quote, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../data/lawFirmData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-[#070d1d] border-t border-[#19243d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#c6a052] mb-3">
            <span className="w-6 h-[1px] bg-[#c6a052]" />
            <span>Transparência e Confiança</span>
          </div>
          <h2 className="font-serif-display text-2xl sm:text-3xl md:text-4xl text-white font-normal leading-tight mb-4">
            A Experiência de Quem Conta com Nossa Orientação
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Depoimentos institucionais que refletem nosso compromisso com a clareza didática, dedicação
            técnica e acolhimento humano.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {TESTIMONIALS.map((test) => (
            <div
              key={test.id}
              className="bg-[#0c1429] border border-[#1b2745] rounded-xl p-6 sm:p-7 flex flex-col justify-between hover:border-[#c6a052]/50 transition-colors relative"
            >
              <Quote className="w-8 h-8 text-[#c6a052]/30 mb-4 shrink-0" />

              <p className="text-sm text-slate-300 leading-relaxed italic mb-6">
                "{test.feedback}"
              </p>

              <div className="pt-4 border-t border-[#18233d] flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-white">
                    Cliente {test.initials} • <span className="text-slate-400 font-normal">{test.clientType}</span>
                  </div>
                  <div className="text-[11px] text-[#c6a052] mt-0.5">
                    Área: {test.area}
                  </div>
                </div>
                <div className="text-[10px] text-slate-400 bg-[#121c35] px-2 py-0.5 rounded border border-[#202f50]">
                  Atendimento {test.year}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Legal Disclaimer Box */}
        <div className="p-4 rounded-lg bg-[#0b1224] border border-[#1a2542] text-[11px] text-slate-400 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-[#c6a052] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Nota de Conformidade Ética (OAB):</strong> Em cumprimento aos artigos 28 a 34 do Código de Ética e
            Disciplina da OAB e ao Provimento CFOAB nº 205/2021, as identidades dos clientes foram abreviadas para
            resguardar o sigilo profissional. A atividade da advocacia é de meio, e não de resultado; os relatos acima
            ilustram a qualidade do atendimento e o zelo técnico dispensado, não constituindo garantia ou promessa de
            desfecho similar para causas futuras.
          </p>
        </div>
      </div>
    </section>
  );
};
