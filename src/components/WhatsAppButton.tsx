import React, { useState } from 'react';
import { MessageSquare, X, Send, Shield } from 'lucide-react';
import { FIRM_INFO } from '../data/lawFirmData';

export const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMsg, setUserMsg] = useState('');

  const quickMessages = [
    'Olá! Gostaria de uma orientação jurídica inicial.',
    'Preciso de informações sobre Inventário e Partilha.',
    'Gostaria de agendar uma consulta com um advogado.',
    'Possuo uma dúvida sobre Direitos Trabalhistas.',
  ];

  const handleSend = (text: string) => {
    const encoded = encodeURIComponent(text || 'Olá! Gostaria de falar com um advogado do escritório.');
    window.open(`https://wa.me/${FIRM_INFO.whatsappNumeric}?text=${encoded}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      {/* Pop-up dialog for quick WhatsApp message */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-[#0c142b] border border-[#273a66] rounded-xl shadow-2xl p-4 animate-fadeIn">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#1c2a4c] mb-3">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-xs">
                  MC
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0c142b] absolute -bottom-0.5 -right-0.5" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">Atendimento {FIRM_INFO.shortName}</span>
                <span className="text-[10px] text-emerald-400 block font-medium">Plantão WhatsApp Online</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1"
              aria-label="Fechar janela do WhatsApp"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-300 mb-3 leading-relaxed">
            Olá! Como nossa equipe jurídica pode auxiliar você hoje? Escolha um tema ou digite sua mensagem:
          </p>

          {/* Quick theme buttons */}
          <div className="space-y-1.5 mb-3">
            {quickMessages.map((msg, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(msg)}
                className="w-full text-left text-[11px] px-3 py-2 rounded bg-[#121c35] border border-[#213054] text-slate-200 hover:text-white hover:border-[#c6a052] transition-colors"
              >
                {msg}
              </button>
            ))}
          </div>

          {/* Custom message input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={userMsg}
              onChange={(e) => setUserMsg(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend(userMsg);
              }}
              placeholder="Digite sua mensagem aqui..."
              className="flex-1 bg-[#101830] border border-[#223358] rounded-md px-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#c6a052]"
            />
            <button
              onClick={() => handleSend(userMsg)}
              className="p-2 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
              aria-label="Enviar mensagem no WhatsApp"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="mt-2 text-[10px] text-slate-400 flex items-center justify-center gap-1">
            <Shield className="w-3 h-3 text-[#c6a052]" />
            <span>Atendimento sigiloso em conformidade com o Código de Ética da OAB</span>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        id="whatsapp-floating-btn"
        className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-semibold text-xs shadow-xl shadow-emerald-950/60 transition-all cursor-pointer hover:scale-105"
        aria-label="Abrir conversa no WhatsApp"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-200 animate-ping absolute -top-1 -left-1" />
        <MessageSquare className="w-5 h-5 fill-current" />
        <span className="hidden sm:inline font-sans">Falar no WhatsApp</span>
      </button>
    </div>
  );
};
