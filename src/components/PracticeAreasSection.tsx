import React, { useState, useMemo } from 'react';
import {
  FileText,
  HeartHandshake,
  Briefcase,
  Building2,
  ShieldCheck,
  Scale,
  Landmark,
  Clock,
  Search,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { PRACTICE_AREAS } from '../data/lawFirmData';
import { PracticeArea } from '../types';

interface PracticeAreasSectionProps {
  onSelectAreaForConsultation: (areaTitle: string) => void;
}

export const PracticeAreasSection: React.FC<PracticeAreasSectionProps> = ({ onSelectAreaForConsultation }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'individual' | 'business'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeAreaModal, setActiveAreaModal] = useState<PracticeArea | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileText':
        return <FileText className="w-5 h-5 text-[#c6a052]" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-[#c6a052]" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5 text-[#c6a052]" />;
      case 'Building2':
        return <Building2 className="w-5 h-5 text-[#c6a052]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-[#c6a052]" />;
      case 'Scale':
        return <Scale className="w-5 h-5 text-[#c6a052]" />;
      case 'Landmark':
        return <Landmark className="w-5 h-5 text-[#c6a052]" />;
      case 'Clock':
        return <Clock className="w-5 h-5 text-[#c6a052]" />;
      default:
        return <Scale className="w-5 h-5 text-[#c6a052]" />;
    }
  };

  const filteredAreas = useMemo(() => {
    return PRACTICE_AREAS.filter((area) => {
      const matchesCategory =
        selectedCategory === 'all' || area.category === selectedCategory || area.category === 'both';
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        area.title.toLowerCase().includes(q) ||
        area.shortDescription.toLowerCase().includes(q) ||
        area.services.some((s) => s.toLowerCase().includes(q)) ||
        area.whenToConsult.some((w) => w.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="areas" className="py-20 bg-[#070c1b] border-t border-[#17223b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#c6a052] mb-3">
            <span className="w-6 h-[1px] bg-[#c6a052]" />
            <span>Assessoria Especializada</span>
          </div>
          <h2 className="font-serif-display text-2xl sm:text-3xl md:text-4xl text-white font-normal leading-tight mb-4">
            Áreas de Atuação com Linguagem Clara e Foco Resolutivo
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Eliminamos a barreira do jargão excessivo. Explicamos com transparência as opções jurídicas
            reais e os caminhos mais eficientes para proteger seus direitos e seu patrimônio.
          </p>
        </div>

        {/* Filters & Search Controls */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between mb-10 pb-6 border-b border-[#1b2642]">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#c6a052] text-[#070c1b]'
                  : 'bg-[#121c35] text-slate-300 hover:text-white border border-[#213054]'
              }`}
            >
              Todas as Áreas ({PRACTICE_AREAS.length})
            </button>
            <button
              onClick={() => setSelectedCategory('individual')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === 'individual'
                  ? 'bg-[#c6a052] text-[#070c1b]'
                  : 'bg-[#121c35] text-slate-300 hover:text-white border border-[#213054]'
              }`}
            >
              Pessoas Físicas & Famílias
            </button>
            <button
              onClick={() => setSelectedCategory('business')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === 'business'
                  ? 'bg-[#c6a052] text-[#070c1b]'
                  : 'bg-[#121c35] text-slate-300 hover:text-white border border-[#213054]'
              }`}
            >
              Empresas & Negócios
            </button>
          </div>

          {/* Search input */}
          <div className="relative min-w-[280px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por tema (ex: inventário, CLT, contrato)..."
              className="w-full bg-[#101931] border border-[#243459] rounded-lg pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-[#c6a052]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Practice Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredAreas.map((area) => (
            <div
              key={area.id}
              className="bg-[#0b1328] border border-[#1b2848] rounded-xl p-5 flex flex-col justify-between hover:border-[#c6a052] transition-all duration-200 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#14203d] border border-[#22335c] flex items-center justify-center group-hover:border-[#c6a052] transition-colors">
                    {getIcon(area.icon)}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-[#131f3c] text-slate-300 border border-[#203158]">
                    {area.category === 'individual'
                      ? 'Pessoa Física'
                      : area.category === 'business'
                      ? 'Corporativo'
                      : 'Geral'}
                  </span>
                </div>

                <h3 className="font-serif-display text-lg text-white font-medium mb-2 group-hover:text-[#c6a052] transition-colors">
                  {area.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-3">
                  {area.shortDescription}
                </p>

                {/* Top 2 Services bullet preview */}
                <ul className="space-y-1.5 mb-5">
                  {area.services.slice(0, 2).map((srv, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#c6a052] shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{srv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-[#18233f] flex items-center justify-between">
                <button
                  onClick={() => {
                    setActiveAreaModal(area);
                    setExpandedFaq(null);
                  }}
                  className="text-xs font-semibold text-[#c6a052] hover:text-[#e4c278] flex items-center gap-1 cursor-pointer"
                >
                  <span>Como podemos ajudar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onSelectAreaForConsultation(area.title)}
                  className="text-[11px] px-2.5 py-1 rounded bg-[#142242] text-slate-200 hover:bg-[#c6a052] hover:text-[#080d1c] transition-colors font-medium cursor-pointer"
                >
                  Consultar
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredAreas.length === 0 && (
          <div className="text-center py-12 bg-[#0c142b] border border-[#1b2644] rounded-xl">
            <p className="text-slate-300 text-sm">Nenhuma área encontrada para o termo "{searchQuery}".</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-3 text-xs text-[#c6a052] font-semibold underline"
            >
              Limpar filtros de busca
            </button>
          </div>
        )}
      </div>

      {/* Modal with Full Practice Area Details & Accessible FAQ */}
      {activeAreaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0d162f] border border-[#283c6b] rounded-xl max-w-3xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative shadow-2xl">
            <button
              onClick={() => setActiveAreaModal(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-[#1a284c]"
              aria-label="Fechar detalhes da área"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#162344] border border-[#2b3e69] flex items-center justify-center text-[#c6a052]">
                {getIcon(activeAreaModal.icon)}
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#c6a052]">
                  Área de Especialidade
                </span>
                <h3 className="font-serif-display text-2xl text-white font-medium">
                  {activeAreaModal.title}
                </h3>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mb-6 bg-[#111c38] p-4 rounded-lg border border-[#1e2e54]">
              {activeAreaModal.fullDescription}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Services included */}
              <div>
                <h4 className="text-xs uppercase font-semibold text-[#c6a052] tracking-wider mb-3 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Serviços & Atuação Prática</span>
                </h4>
                <ul className="space-y-2">
                  {activeAreaModal.services.map((srv, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c6a052] shrink-0 mt-1.5" />
                      <span>{srv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* When to consult */}
              <div>
                <h4 className="text-xs uppercase font-semibold text-[#c6a052] tracking-wider mb-3 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4" />
                  <span>Quando procurar nossa equipe</span>
                </h4>
                <ul className="space-y-2">
                  {activeAreaModal.whenToConsult.map((wh, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-500 shrink-0 mt-1.5" />
                      <span>{wh}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Accessible FAQs for this Area */}
            {activeAreaModal.faqs.length > 0 && (
              <div className="mt-6 pt-6 border-t border-[#1a284c]">
                <h4 className="text-xs uppercase font-semibold text-[#c6a052] tracking-wider mb-3">
                  Dúvidas Frequentes sobre esta Área (FAQ)
                </h4>
                <div className="space-y-2.5">
                  {activeAreaModal.faqs.map((faq, fIdx) => (
                    <div
                      key={fIdx}
                      className="rounded-lg bg-[#111a33] border border-[#213054] overflow-hidden"
                    >
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === fIdx ? null : fIdx)}
                        className="w-full text-left px-4 py-3 text-xs font-semibold text-white flex items-center justify-between hover:bg-[#162242] transition-colors"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#c6a052] transition-transform duration-200 ${
                            expandedFaq === fIdx ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {expandedFaq === fIdx && (
                        <div className="px-4 pb-3 pt-1 text-xs text-slate-300 border-t border-[#1c2948] bg-[#0c1328]">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="mt-8 pt-4 border-t border-[#1d2d52] flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={() => setActiveAreaModal(null)}
                className="px-4 py-2 text-xs text-slate-400 hover:text-white"
              >
                Fechar
              </button>
              <button
                onClick={() => {
                  const areaTitle = activeAreaModal.title;
                  setActiveAreaModal(null);
                  onSelectAreaForConsultation(areaTitle);
                }}
                className="px-5 py-2.5 rounded bg-[#c6a052] text-[#080d1c] text-xs font-semibold hover:bg-[#d6b267]"
              >
                Solicitar Consulta em {activeAreaModal.title}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
