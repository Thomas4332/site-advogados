import React from 'react';
import { Shield, Scale, MapPin, Phone, Mail, Clock, MessageSquare } from 'lucide-react';
import { FIRM_INFO, LAWYERS, PRACTICE_AREAS } from '../data/lawFirmData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onSelectArea: (areaTitle: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSelectArea }) => {
  return (
    <footer className="bg-[#050914] text-slate-400 border-t border-[#141e33] text-xs">
      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Col 1: Law Firm Identity */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded bg-[#111c38] border border-[#c6a052]/50 flex items-center justify-center text-[#c6a052]">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <span className="font-brand text-base text-white font-bold block">
                  Menezes, Castro & Silveira
                </span>
                <span className="text-[10px] text-[#c6a052] font-semibold tracking-wider uppercase block">
                  Advogados Associados • {FIRM_INFO.oabSociety}
                </span>
              </div>
            </div>

            <p className="text-slate-300 leading-relaxed text-xs">
              Sociedade de advogados constituída sob as leis brasileiras, dedicada à prestação de serviços
              jurídicos preventivos e contenciosos com transparência, rigor técnico e atendimento humanizado.
            </p>

            <div className="space-y-1.5 pt-2 text-[11px] text-slate-300">
              <div className="flex items-center gap-2">
                <span className="text-[#c6a052] font-semibold">Registro OAB:</span>
                <span>{FIRM_INFO.oabSociety}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#c6a052] font-semibold">CNPJ:</span>
                <span>{FIRM_INFO.cnpj}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Áreas de Atuação */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-semibold text-white tracking-wide">
              Áreas de Atuação
            </h4>
            <ul className="space-y-2">
              {PRACTICE_AREAS.slice(0, 6).map((area) => (
                <li key={area.id}>
                  <button
                    onClick={() => {
                      onNavigate('areas');
                      onSelectArea(area.title);
                    }}
                    className="text-slate-400 hover:text-[#c6a052] transition-colors text-left text-xs"
                  >
                    {area.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Advogados e OABs Individuais */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-semibold text-white tracking-wide">
              Corpo Jurídico
            </h4>
            <ul className="space-y-2">
              {LAWYERS.map((lawyer) => (
                <li key={lawyer.id} className="text-xs">
                  <span className="text-slate-300 block font-medium">{lawyer.name}</span>
                  <span className="text-[10px] text-[#c6a052] font-semibold block">{lawyer.oab}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Sede e Contatos */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-semibold text-white tracking-wide">
              Sede e Contato
            </h4>
            <div className="space-y-2 text-xs text-slate-300">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#c6a052] shrink-0 mt-0.5" />
                <span>{FIRM_INFO.address.street}, {FIRM_INFO.address.complement} - {FIRM_INFO.address.neighborhood}, {FIRM_INFO.address.city}/{FIRM_INFO.address.state}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#c6a052] shrink-0" />
                <span>{FIRM_INFO.phone}</span>
              </p>
              <p className="flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>WhatsApp: {FIRM_INFO.whatsapp}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#c6a052] shrink-0" />
                <span>{FIRM_INFO.email}</span>
              </p>
              <p className="flex items-start gap-2 text-[11px] text-slate-400">
                <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                <span>{FIRM_INFO.openingHours.weekdays}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Mandatory OAB Compliance & Ethics Disclaimer */}
        <div className="mt-12 pt-8 border-t border-[#162238] bg-[#070c19] p-5 rounded-lg">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-[#c6a052] shrink-0 mt-0.5" />
            <div className="space-y-1.5 text-[11px] text-slate-400 leading-relaxed">
              <p className="font-semibold text-slate-200">
                Aviso Legal Institucional e Ético Obrigatório (Provimento CFOAB nº 205/2021):
              </p>
              <p>
                Este sítio eletrônico possui caráter exclusivamente informativo e institucional, em estrita conformidade com o Código de Ética e Disciplina da Ordem dos Advogados do Brasil (OAB) e a legislação aplicável. O conteúdo publicado não consubstancia parecer jurídico, consultoria formal ou promessa de resultados para casos concretos. A relação advogado-cliente somente se estabelece mediante consulta formal e outorga expressa de instrumento procuratório.
              </p>
              <p>
                Os dados pessoais compartilhados por meio deste site são tratados em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD) e protegidos pelo sigilo profissional inerente ao exercício da advocacia (Lei nº 8.906/1994).
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Privacy Links */}
        <div className="mt-8 pt-6 border-t border-[#121b2f] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} {FIRM_INFO.name}. Todos os direitos reservados.
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={() => onNavigate('inicio')} className="hover:text-white transition-colors">
              Página Inicial
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('sobre')} className="hover:text-white transition-colors">
              Sobre o Escritório
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('contato')} className="hover:text-white transition-colors">
              Fale Conosco
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
