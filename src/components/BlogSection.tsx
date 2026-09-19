import React, { useState, useMemo } from 'react';
import { BookOpen, Clock, Tag, ArrowRight, User, Calendar, Share2, Search, Check } from 'lucide-react';
import { BLOG_POSTS } from '../data/lawFirmData';
import { BlogPost } from '../types';

interface BlogSectionProps {
  onSelectTopicForConsultation: (topicTitle: string) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onSelectTopicForConsultation }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    BLOG_POSTS.forEach((p) => cats.add(p.category));
    return ['all', ...Array.from(cats)];
  }, []);

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCat = selectedCategory === 'all' || post.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.summary.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q));

      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <section id="blog" className="py-20 bg-[#080e20] border-t border-[#1a2745]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#c6a052] mb-3">
            <span className="w-6 h-[1px] bg-[#c6a052]" />
            <span>Conteúdo Educativo & SEO</span>
          </div>
          <h2 className="font-serif-display text-2xl sm:text-3xl md:text-4xl text-white font-normal leading-tight mb-4">
            Artigos Jurídicos Didáticos e Atualizados
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Informações claras sobre legislação, direitos fundamentais e estratégias preventivas,
            redigidas diretamente por nossos advogados especialistas.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between mb-10 pb-6 border-b border-[#1c2948]">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#c6a052] text-[#080e20]'
                    : 'bg-[#111a33] text-slate-300 hover:text-white border border-[#213054]'
                }`}
              >
                {cat === 'all' ? 'Todos os Artigos' : cat}
              </button>
            ))}
          </div>

          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar artigos por tema..."
              className="w-full bg-[#0f172f] border border-[#223154] rounded-lg pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-[#c6a052]"
            />
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-[#0b1328] border border-[#1d2b4a] rounded-xl p-6 sm:p-7 flex flex-col justify-between hover:border-[#c6a052] transition-all group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs text-slate-400 mb-3">
                  <span className="px-2.5 py-0.5 rounded bg-[#131f3d] text-[#c6a052] font-medium border border-[#21325a]">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{post.readTime}</span>
                  </span>
                </div>

                <h3 className="font-serif-display text-xl text-white font-medium mb-3 group-hover:text-[#c6a052] transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed mb-4 line-clamp-3">
                  {post.summary}
                </p>

                {/* Key Takeaways preview */}
                <div className="bg-[#0f1833] rounded-lg p-3.5 border border-[#1c2a4c] mb-5">
                  <div className="text-[11px] font-semibold text-[#c6a052] uppercase tracking-wider mb-2">
                    Destaques Práticos
                  </div>
                  <ul className="space-y-1.5">
                    {post.keyTakeaways.slice(0, 2).map((takeaway, idx) => (
                      <li key={idx} className="text-xs text-slate-300 flex items-start gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c6a052] shrink-0 mt-1.5" />
                        <span className="line-clamp-1">{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between pt-4 border-t border-[#182544] text-xs text-slate-400 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#182649] flex items-center justify-center text-[#c6a052] text-[10px] font-bold">
                      {post.author.name.charAt(4)}
                    </div>
                    <div>
                      <span className="font-medium text-slate-200 block">{post.author.name}</span>
                      <span className="text-[10px] text-slate-400 block">{post.author.oab}</span>
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-400">{post.date}</span>
                </div>

                <button
                  onClick={() => setActiveArticle(post)}
                  className="w-full py-2.5 px-4 rounded-md bg-[#13203f] hover:bg-[#c6a052] hover:text-[#080e20] text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Ler Artigo Completo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12 bg-[#0c1429] border border-[#1b2542] rounded-xl">
            <p className="text-slate-300 text-sm">Nenhum artigo encontrado com esses critérios.</p>
          </div>
        )}
      </div>

      {/* Full Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0b1328] border border-[#273b66] rounded-xl max-w-3xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative shadow-2xl">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-[#1a284c]"
              aria-label="Fechar artigo"
            >
              ✕
            </button>

            {/* Category & Date */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mb-3">
              <span className="px-2.5 py-0.5 rounded bg-[#131f3e] text-[#c6a052] font-semibold border border-[#23355d]">
                {activeArticle.category}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#c6a052]" />
                {activeArticle.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#c6a052]" />
                {activeArticle.readTime}
              </span>
            </div>

            <h3 className="font-serif-display text-2xl sm:text-3xl text-white font-medium mb-4 leading-snug">
              {activeArticle.title}
            </h3>

            {/* Author info banner */}
            <div className="flex items-center justify-between bg-[#101933] p-3.5 rounded-lg border border-[#1e2d50] mb-6">
              <div>
                <div className="text-xs font-semibold text-white">{activeArticle.author.name}</div>
                <div className="text-[11px] text-[#c6a052]">{activeArticle.author.role} • {activeArticle.author.oab}</div>
              </div>
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-[#192749] px-3 py-1.5 rounded"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Link Copiado!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Compartilhar</span>
                  </>
                )}
              </button>
            </div>

            {/* Highlights Box */}
            <div className="bg-[#121c38] border-l-4 border-[#c6a052] p-4 rounded-r-lg mb-6">
              <div className="text-xs uppercase font-bold text-[#c6a052] tracking-wider mb-2">
                Resumo dos Pontos Principais
              </div>
              <ul className="space-y-1.5">
                {activeArticle.keyTakeaways.map((item, idx) => (
                  <li key={idx} className="text-xs text-slate-200 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c6a052] shrink-0 mt-1.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Article Body */}
            <div className="space-y-4 text-sm text-slate-300 leading-relaxed font-sans-body mb-8">
              {activeArticle.content.map((paragraph, pIdx) => (
                <p key={pIdx}>{paragraph}</p>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-[#192544] mb-6">
              {activeArticle.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="text-[11px] px-2.5 py-1 rounded bg-[#101931] border border-[#202f52] text-slate-400"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* CTA to inquire about this topic */}
            <div className="bg-gradient-to-r from-[#121d3a] to-[#17254a] border border-[#273a66] rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-semibold text-white mb-0.5">
                  Ficou com alguma dúvida sobre {activeArticle.category}?
                </h4>
                <p className="text-xs text-slate-300">
                  Nossa equipe pode analisar os documentos e a situação concreta do seu caso.
                </p>
              </div>
              <button
                onClick={() => {
                  const title = activeArticle.title;
                  setActiveArticle(null);
                  onSelectTopicForConsultation(title);
                }}
                className="shrink-0 px-4 py-2.5 rounded bg-[#c6a052] text-[#080e20] text-xs font-semibold hover:bg-[#d8b569] transition-colors"
              >
                Solicitar Orientação sobre o Tema
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
