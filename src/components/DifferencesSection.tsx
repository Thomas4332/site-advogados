import React from 'react';
import { HeartHandshake, Eye, ShieldAlert, Cpu, Award, UserCheck, MessageSquareText } from 'lucide-react';
import { FIRM_INFO } from '../data/lawFirmData';

interface DifferencesSectionProps {
  onOpenAppointment: () => void;
}

export const DifferencesSection: React.FC<DifferencesSectionProps> = ({ onOpenAppointment }) => {
  const differentiators = [
    {
      icon: HeartHandshake,
      title: 'Atendimento Humanizado e Acolhedor',
      description:
        'Reconhecemos que quem procura um advogado frequentemente se encontra sob estresse, luto ou apreensão financeira. Oferecemos escuta atenta e orientações com empatia e respeito genuíno.',
    },
    {
      icon: Eye,
      title: 'Transparência Processual e Linguagem Clara',
      description:
        'Adeus ao jargão hermético. Nossos clientes recebem relatórios periódicos, explicados passo a passo, compreendendo exatamente o andamento e as perspectivas reais de cada ato processual.',
    },
    {
      icon: UserCheck,
      title: 'Atuação Direta dos Sócios Especialistas',
      description:
        'Seu caso não será repassado a intermediários inexperientes. Toda a estratégia técnica e as peças principais são elaboradas e supervisionadas diretamente pelos sócios coordenadores.',
    },
    {
      icon: Cpu,
      title: 'Segurança Digital e Plataforma Híbrida',
      description:
        'Atendemos tanto presencialmente em nosso endereço na Avenida Paulista quanto 100% online por videoconferência criptografada, com assinatura digital qualificada e proteção total LGPD.',
    },
  ];

  return (
    <section className="py-20 bg-[#091024] border-t border-[#1a2747]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#c6a052] mb-3">
            <span className="w-6 h-[1px] bg-[#c6a052]" />
            <span>Por Que Confiar em Nossa Advocacia</span>
          </div>
          <h2 className="font-serif-display text-2xl sm:text-3xl md:text-4xl text-white font-normal leading-tight mb-4">
            Diferenciais que Traduzem Segurança e Serenidade para Você
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Uma abordagem técnica que une a sofisticação da tradição jurídica paulista à agilidade e empatia
            que o momento atual exige.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {differentiators.map((diff, idx) => {
            const IconComponent = diff.icon;
            return (
              <div
                key={idx}
                className="bg-[#0e1730] border border-[#1e2e54] rounded-xl p-6 sm:p-7 hover:border-[#c6a052]/60 transition-colors flex flex-col sm:flex-row gap-4 sm:gap-5"
              >
                <div className="w-12 h-12 rounded-lg bg-[#162446] border border-[#263a66] flex items-center justify-center shrink-0 text-[#c6a052]">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif-display text-lg text-white font-medium mb-2">
                    {diff.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {diff.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Commitment Banner */}
        <div className="bg-gradient-to-r from-[#121c38] via-[#162347] to-[#121c38] border border-[#293d6a] rounded-xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h4 className="font-serif-display text-lg sm:text-xl text-white font-medium mb-1">
              Precisa de uma avaliação jurídica inicial sobre a sua situação?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Converse com nossa equipe em ambiente seguro e com sigilo profissional resguardado pela OAB.
            </p>
          </div>
          <button
            onClick={onOpenAppointment}
            className="shrink-0 px-6 py-3 rounded-md bg-[#c6a052] text-[#080d1c] text-xs uppercase font-bold tracking-wider hover:bg-[#d4b065] transition-all shadow-md cursor-pointer"
          >
            Agendar Consulta Inicial
          </button>
        </div>
      </div>
    </section>
  );
};
