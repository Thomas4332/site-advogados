import React, { useState } from 'react';
import { Shield, BookOpen, UserCheck, GraduationCap, Mail, ChevronRight, Award } from 'lucide-react';
import { LAWYERS, CORE_VALUES, FIRM_INFO } from '../data/lawFirmData';
import { Lawyer } from '../types';

interface AboutSectionProps {
  onSelectLawyerForConsultation: (lawyerName: string, area: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onSelectLawyerForConsultation }) => {
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null);

  return (
    <section id="sobre" className="py-20 bg-[#080e1e] border-t border-[#19243d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#c6a052] mb-3">
            <span className="w-6 h-[1px] bg-[#c6a052]" />
            <span>Nossa Trajetória & Princípios</span>
          </div>
          <h2 className="font-serif-display text-2xl sm:text-3xl md:text-4xl text-white font-normal leading-tight mb-4">
            Uma advocacia construída sobre pilares de rigor técnico, integridade e proximidade real.
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Fundado em {FIRM_INFO.foundationYear} no coração financeiro e jurídico de São Paulo, o escritório{' '}
            <strong className="text-white font-medium">{FIRM_INFO.name}</strong> nasceu com o propósito
            de oferecer assessoria jurídica de alto padrão técnico, desmistificando o juridiquês e colocando
            a segurança e a tranquilidade do cliente no centro de cada deliberação.
          </p>
        </div>

        {/* Story & Philosophy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          <div className="lg:col-span-7 bg-[#0d162d] border border-[#1e2d4e] rounded-xl p-6 sm:p-8 space-y-6">
            <h3 className="font-brand text-lg text-white font-semibold flex items-center gap-2.5">
              <BookOpen className="w-5 h-5 text-[#c6a052]" />
              <span>Nossa História e Compromisso Institucional</span>
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Ao longo de quase duas décadas de prática ininterrupta, acompanhamos famílias na resolução
              pacífica de heranças, trabalhadores e empresários na recomposição justa de suas relações profissionais,
              e corporações na estruturação de negócios com solidez jurídica.
            </p>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Rejeitamos abordagens generalistas ou impessoais. No nosso escritório, cada caso é conduzido
              diretamente por um sócio especialista, garantindo acompanhamento minucioso do início ao encerramento,
              com relatórios periódicos em linguagem acessível e previsibilidade.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#1b2848]">
              <div className="p-4 rounded-lg bg-[#111c38] border border-[#233357]">
                <div className="text-xs uppercase font-semibold tracking-wider text-[#c6a052] mb-1">Missão</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Garantir a defesa intransigente dos direitos de nossos clientes mediante soluções jurídicas lúcidas,
                  preventivas e éticas.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-[#111c38] border border-[#233357]">
                <div className="text-xs uppercase font-semibold tracking-wider text-[#c6a052] mb-1">Visão</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Ser referência duradoura de excelência e confiabilidade, aliando tradição jurídica a métodos modernos e resolutivos.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            {CORE_VALUES.map((val, idx) => (
              <div
                key={idx}
                className="bg-[#0b1328] border border-[#1b2746] rounded-xl p-5 hover:border-[#c6a052]/50 transition-colors"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-md bg-[#162342] border border-[#25365e] flex items-center justify-center shrink-0 text-[#c6a052]">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-1">{val.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{val.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lawyer Team Presentation */}
        <div className="mt-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#c6a052] mb-2">
              <UserCheck className="w-4 h-4" />
              <span>Corpo Jurídico</span>
            </div>
            <h3 className="font-serif-display text-2xl sm:text-3xl text-white font-normal">
              Sócios e Advogados Especialistas
            </h3>
            <p className="text-slate-300 text-sm mt-2">
              Profissionais pós-graduados com dedicação exclusiva e rigor ético certificado pela OAB.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {LAWYERS.map((lawyer) => (
              <div
                key={lawyer.id}
                className="bg-[#0c152c] border border-[#1e2e54] rounded-xl overflow-hidden flex flex-col justify-between hover:border-[#c6a052] transition-all duration-300 group"
              >
                <div>
                  {/* Photo Container */}
                  <div className="relative h-64 overflow-hidden bg-[#070d1d]">
                    <img
                      src={lawyer.photo}
                      alt={`${lawyer.name} - ${lawyer.role}`}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c152c] via-transparent to-transparent" />
                    
                    {/* OAB Badge in Card */}
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded bg-[#080e1e]/90 backdrop-blur-md border border-[#c6a052]/40 text-[#c6a052] text-[11px] font-bold tracking-wider">
                      {lawyer.oab}
                    </div>
                  </div>

                  {/* Lawyer Info */}
                  <div className="p-5">
                    <h4 className="font-serif-display text-lg text-white font-medium group-hover:text-[#c6a052] transition-colors">
                      {lawyer.name}
                    </h4>
                    <div className="text-xs font-medium text-[#c6a052] mt-0.5 mb-2">
                      {lawyer.role}
                    </div>
                    <p className="text-xs text-slate-300 line-clamp-3 mb-4 leading-relaxed">
                      {lawyer.bio}
                    </p>

                    {/* Education Pills */}
                    <div className="space-y-1.5 mb-4">
                      {lawyer.education.slice(0, 2).map((edu, eIdx) => (
                        <div key={eIdx} className="flex items-start gap-1.5 text-[11px] text-slate-400">
                          <GraduationCap className="w-3.5 h-3.5 text-[#c6a052] shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{edu}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer of Card */}
                <div className="p-5 pt-0 border-t border-[#182544] mt-auto">
                  <div className="flex items-center justify-between pt-3">
                    <button
                      onClick={() => setSelectedLawyer(lawyer)}
                      className="text-xs font-semibold text-slate-300 hover:text-[#c6a052] flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>Ver currículo</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onSelectLawyerForConsultation(lawyer.name, lawyer.areas[0])}
                      className="px-2.5 py-1 text-[11px] font-medium rounded bg-[#18274a] text-[#c6a052] hover:bg-[#c6a052] hover:text-[#080d1c] transition-colors cursor-pointer"
                    >
                      Consultar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal with Full Lawyer Profile */}
      {selectedLawyer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0d162f] border border-[#263a66] rounded-xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative shadow-2xl">
            <button
              onClick={() => setSelectedLawyer(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-[#1a284c]"
              aria-label="Fechar detalhes do advogado"
            >
              ✕
            </button>

            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <img
                src={selectedLawyer.photo}
                alt={selectedLawyer.name}
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-lg object-cover border-2 border-[#c6a052]"
              />
              <div>
                <div className="inline-block px-2.5 py-0.5 rounded bg-[#182548] text-[#c6a052] text-xs font-bold mb-1">
                  Inscrição {selectedLawyer.oab}
                </div>
                <h3 className="font-serif-display text-2xl text-white font-medium">{selectedLawyer.name}</h3>
                <div className="text-sm text-slate-300 font-medium mb-2">{selectedLawyer.role}</div>
                <p className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#c6a052]" />
                  <span>{selectedLawyer.email}</span>
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <h4 className="text-xs uppercase font-semibold text-[#c6a052] tracking-wider mb-2">
                  Biografia Profissional
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">{selectedLawyer.bio}</p>
              </div>

              <div>
                <h4 className="text-xs uppercase font-semibold text-[#c6a052] tracking-wider mb-2">
                  Formação Acadêmica & Títulos
                </h4>
                <ul className="space-y-1.5">
                  {selectedLawyer.education.map((edu, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <GraduationCap className="w-4 h-4 text-[#c6a052] shrink-0 mt-0.5" />
                      <span>{edu}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs uppercase font-semibold text-[#c6a052] tracking-wider mb-2">
                  Áreas de Atuação Direta
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedLawyer.areas.map((area, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded bg-[#16223e] border border-[#293d6b] text-xs text-slate-200"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#1d2d52] flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={() => setSelectedLawyer(null)}
                className="px-4 py-2 text-xs text-slate-400 hover:text-white"
              >
                Voltar
              </button>
              <button
                onClick={() => {
                  const l = selectedLawyer;
                  setSelectedLawyer(null);
                  onSelectLawyerForConsultation(l.name, l.areas[0]);
                }}
                className="px-5 py-2.5 rounded bg-[#c6a052] text-[#080d1c] text-xs font-semibold hover:bg-[#d6b267]"
              >
                Agendar Consulta com {selectedLawyer.name.split(' ')[1]}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
