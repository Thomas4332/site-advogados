import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Video, CheckCircle2, AlertCircle, X, ShieldCheck } from 'lucide-react';
import { PRACTICE_AREAS, LAWYERS, FIRM_INFO } from '../data/lawFirmData';
import { AppointmentData } from '../types';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedArea?: string;
  preselectedLawyer?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  preselectedArea = '',
  preselectedLawyer = '',
}) => {
  const [formData, setFormData] = useState<AppointmentData>({
    fullName: '',
    email: '',
    phone: '',
    areaOfLaw: preselectedArea || PRACTICE_AREAS[0].title,
    modality: 'online',
    date: '',
    timeSlot: '10:00',
    briefSummary: '',
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState<string>('');
  const [error, setError] = useState<string>('');

  React.useEffect(() => {
    if (preselectedArea) {
      setFormData((prev) => ({ ...prev, areaOfLaw: preselectedArea }));
    }
  }, [preselectedArea]);

  if (!isOpen) return null;

  const timeSlots = ['09:00', '10:30', '14:00', '15:30', '17:00'];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.date) {
      setError('Por favor, preencha todos os campos obrigatórios (Nome, E-mail, Telefone e Data).');
      return;
    }

    setError('');
    const refCode = `CONS-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingRef(refCode);
    setIsSuccess(true);
  };

  const handleWhatsAppConfirmation = () => {
    const text = encodeURIComponent(
      `Olá! Solicitei um agendamento de consulta inicial pelo site.\n` +
      `*Código:* ${bookingRef}\n` +
      `*Nome:* ${formData.fullName}\n` +
      `*Modalidade:* ${formData.modality === 'presential' ? 'Presencial (Av. Paulista)' : 'Online (Videoconferência)'}\n` +
      `*Área:* ${formData.areaOfLaw}\n` +
      `*Data sugerida:* ${formData.date} às ${formData.timeSlot}`
    );
    window.open(`https://wa.me/${FIRM_INFO.whatsappNumeric}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#0b1328] border border-[#273a66] rounded-xl max-w-xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-[#1a284c]"
          aria-label="Fechar agendamento"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-4 space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif-display text-2xl text-white">Solicitação de Consulta Registrada</h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
              Sua solicitação de agendamento preliminar foi recebida com sucesso. Nossa secretária entrará em contato para
              confirmar a disponibilidade da pauta com o advogado especialista.
            </p>

            <div className="bg-[#101b38] border border-[#1e2e54] rounded-lg p-4 text-xs text-left max-w-md mx-auto space-y-2">
              <div className="flex justify-between border-b border-[#1b2a4d] pb-2">
                <span className="text-slate-400">Código de Agendamento:</span>
                <span className="font-mono font-bold text-[#c6a052]">{bookingRef}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Modalidade:</span>
                <span className="text-white font-medium">
                  {formData.modality === 'presential' ? 'Presencial (Av. Paulista)' : 'Online Seguro'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Data e Horário:</span>
                <span className="text-white font-medium">
                  {formData.date} às {formData.timeSlot}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Área:</span>
                <span className="text-white font-medium">{formData.areaOfLaw}</span>
              </div>
            </div>

            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleWhatsAppConfirmation}
                className="w-full sm:w-auto px-4 py-2.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
              >
                Confirmar Disponibilidade no WhatsApp
              </button>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2.5 rounded bg-[#182649] text-slate-300 text-xs hover:text-white"
              >
                Concluir
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#c6a052] mb-1">
              <Calendar className="w-4 h-4" />
              <span>Agendamento de Atendimento</span>
            </div>
            <h3 className="font-serif-display text-2xl text-white font-medium mb-1">
              Solicitar Consulta Inicial
            </h3>
            <p className="text-xs text-slate-300 mb-6">
              Escolha entre o atendimento presencial na Avenida Paulista ou por videoconferência segura.
            </p>

            {error && (
              <div className="bg-rose-950/30 border border-rose-500/40 text-rose-300 p-3 rounded-lg text-xs flex items-center gap-2 mb-4">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleBooking} className="space-y-4">
              {/* Modality Selector */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Modalidade de Atendimento *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, modality: 'online' })}
                    className={`p-3 rounded-lg border text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                      formData.modality === 'online'
                        ? 'bg-[#18274d] border-[#c6a052] text-white shadow'
                        : 'bg-[#101931] border-[#223358] text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Video className="w-4 h-4 text-[#c6a052] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-semibold block">Online / Remoto</span>
                      <span className="text-[10px] text-slate-400 block">Videoconferência criptografada</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, modality: 'presential' })}
                    className={`p-3 rounded-lg border text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                      formData.modality === 'presential'
                        ? 'bg-[#18274d] border-[#c6a052] text-white shadow'
                        : 'bg-[#101931] border-[#223358] text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <MapPin className="w-4 h-4 text-[#c6a052] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-semibold block">Presencial em SP</span>
                      <span className="text-[10px] text-slate-400 block">Av. Paulista, 1754</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Area of Law */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Área Jurídica *
                </label>
                <select
                  value={formData.areaOfLaw}
                  onChange={(e) => setFormData({ ...formData, areaOfLaw: e.target.value })}
                  className="w-full bg-[#101931] border border-[#24365c] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c6a052]"
                >
                  {PRACTICE_AREAS.map((a) => (
                    <option key={a.id} value={a.title} className="bg-[#0b1328]">
                      {a.title}
                    </option>
                  ))}
                  <option value="Outro Assunto Jurídico" className="bg-[#0b1328]">
                    Outro Assunto
                  </option>
                </select>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Seu Nome Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Nome e Sobrenome"
                    className="w-full bg-[#101931] border border-[#24365c] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c6a052]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Telefone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(11) 98765-4321"
                    className="w-full bg-[#101931] border border-[#24365c] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c6a052]"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  E-mail para Confirmação *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="seuemail@exemplo.com"
                  className="w-full bg-[#101931] border border-[#24365c] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c6a052]"
                />
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Data Desejada *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-[#101931] border border-[#24365c] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c6a052]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Horário Preferencial *
                  </label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full bg-[#101931] border border-[#24365c] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c6a052]"
                  >
                    {timeSlots.map((ts) => (
                      <option key={ts} value={ts} className="bg-[#0b1328]">
                        {ts} (Horário de Brasília)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Ethical notice */}
              <div className="text-[11px] text-slate-400 bg-[#091024] p-3 rounded-lg border border-[#1b2848] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#c6a052] shrink-0" />
                <span>As consultas são protegidas por sigilo de estado e regidas pela tabela de honorários e ética da OAB/SP.</span>
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-md bg-[#c6a052] text-[#080d1c] font-semibold text-xs uppercase tracking-wider hover:bg-[#d8b569] transition-all cursor-pointer shadow"
                >
                  Confirmar Solicitação de Consulta
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
