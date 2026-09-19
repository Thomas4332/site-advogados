import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  Send,
  CheckCircle2,
  AlertCircle,
  Shield,
  Building,
  Navigation,
} from 'lucide-react';
import { FIRM_INFO, PRACTICE_AREAS } from '../data/lawFirmData';
import { ContactFormData } from '../types';

interface ContactSectionProps {
  initialArea?: string;
  initialMessage?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialArea = '', initialMessage = '' }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    areaOfLaw: initialArea || '',
    message: initialMessage || '',
    preferredContact: 'whatsapp',
    urgency: 'normal',
    acceptedPrivacy: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedProtocol, setSubmittedProtocol] = useState<string | null>(null);

  // Update form if initialArea changes
  React.useEffect(() => {
    if (initialArea) {
      setFormData((prev) => ({ ...prev, areaOfLaw: initialArea }));
    }
  }, [initialArea]);

  React.useEffect(() => {
    if (initialMessage) {
      setFormData((prev) => ({ ...prev, message: initialMessage }));
    }
  }, [initialMessage]);

  const validateForm = () => {
    const errs: { [key: string]: string } = {};

    if (!formData.fullName.trim()) {
      errs.fullName = 'Por favor, informe seu nome completo.';
    } else if (formData.fullName.trim().split(' ').length < 2) {
      errs.fullName = 'Informe nome e sobrenome.';
    }

    if (!formData.email.trim()) {
      errs.email = 'Informe um endereço de e-mail.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Informe um e-mail válido (ex: nome@dominio.com).';
    }

    if (!formData.phone.trim()) {
      errs.phone = 'Informe seu telefone ou WhatsApp com DDD.';
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      errs.phone = 'Informe um número válido com DDD (mínimo 10 dígitos).';
    }

    if (!formData.areaOfLaw) {
      errs.areaOfLaw = 'Selecione a área jurídica relacionada.';
    }

    if (!formData.message.trim()) {
      errs.message = 'Por favor, descreva brevemente sua dúvida ou situação.';
    } else if (formData.message.trim().length < 15) {
      errs.message = 'Por favor, forneça mais detalhes para que possamos orientar adequadamente.';
    }

    if (!formData.acceptedPrivacy) {
      errs.acceptedPrivacy = 'É necessário concordar com a política de privacidade e proteção de dados.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 11) val = val.slice(0, 11);

    // Format phone (XX) XXXXX-XXXX or (XX) XXXX-XXXX
    let formatted = val;
    if (val.length > 2) {
      formatted = `(${val.slice(0, 2)}) ${val.slice(2)}`;
    }
    if (val.length > 7) {
      formatted = `(${val.slice(0, 2)}) ${val.slice(2, 7)}-${val.slice(7)}`;
    }

    setFormData({ ...formData, phone: formatted });
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate reliable secure dispatch
    setTimeout(() => {
      const generatedProtocol = `MCS-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedProtocol(generatedProtocol);
      setIsSubmitting(false);
    }, 900);
  };

  const handleSendToWhatsApp = () => {
    const text = encodeURIComponent(
      `Olá! Enviei o formulário de contato (Protocolo: ${submittedProtocol || 'Site'}).\n` +
      `*Nome:* ${formData.fullName}\n` +
      `*Área:* ${formData.areaOfLaw}\n` +
      `*Contato Preferencial:* ${formData.preferredContact}\n` +
      `*Mensagem:* ${formData.message}`
    );
    window.open(`https://wa.me/${FIRM_INFO.whatsappNumeric}?text=${text}`, '_blank');
  };

  return (
    <section id="contato" className="py-20 bg-[#070d1e] border-t border-[#182544]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#c6a052] mb-3">
            <span className="w-6 h-[1px] bg-[#c6a052]" />
            <span>Fale Conosco</span>
          </div>
          <h2 className="font-serif-display text-2xl sm:text-3xl md:text-4xl text-white font-normal leading-tight mb-4">
            Canais de Atendimento e Localização do Escritório
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Estamos prontos para receber você em nossa sede na Avenida Paulista ou atendê-lo remotamente
            com total sigilo e agilidade. Envie sua mensagem ou utilize nossos canais diretos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left: Contact Form */}
          <div className="lg:col-span-7 bg-[#0c142b] border border-[#1d2d50] rounded-xl p-6 sm:p-8">
            <h3 className="font-serif-display text-xl text-white font-medium mb-1">
              Envie uma Mensagem ao Nosso Núcleo Jurídico
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Seus dados serão tratados com sigilo profissional absoluto e protegidos pela LGPD.
            </p>

            {submittedProtocol ? (
              <div className="bg-[#101b38] border border-emerald-500/40 rounded-xl p-6 text-center animate-fadeIn space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-serif-display text-xl text-white">Mensagem Recebida com Sucesso!</h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                  Agradecemos a confiança. Um de nossos advogados especialistas analisará as informações preliminares
                  e entrará em contato em horário comercial através do canal de sua preferência.
                </p>
                <div className="bg-[#091124] p-3 rounded-lg border border-[#1b2a4c] inline-block text-xs">
                  <span className="text-slate-400">Protocolo de Atendimento: </span>
                  <span className="font-mono font-bold text-[#c6a052]">{submittedProtocol}</span>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={handleSendToWhatsApp}
                    className="w-full sm:w-auto px-4 py-2.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Agilizar via WhatsApp com este Protocolo</span>
                  </button>
                  <button
                    onClick={() => {
                      setSubmittedProtocol(null);
                      setFormData({
                        fullName: '',
                        email: '',
                        phone: '',
                        areaOfLaw: '',
                        message: '',
                        preferredContact: 'whatsapp',
                        urgency: 'normal',
                        acceptedPrivacy: false,
                      });
                    }}
                    className="w-full sm:w-auto px-4 py-2.5 rounded bg-[#162344] text-slate-300 text-xs hover:text-white"
                  >
                    Enviar Nova Mensagem
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Full Name */}
                <div>
                  <label htmlFor="contact-fullName" className="block text-xs font-medium text-slate-300 mb-1">
                    Nome Completo *
                  </label>
                  <input
                    id="contact-fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => {
                      setFormData({ ...formData, fullName: e.target.value });
                      if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: '' }));
                    }}
                    placeholder="Ex: Carlos Eduardo Silveira"
                    className={`w-full bg-[#101931] border rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none ${
                      errors.fullName ? 'border-rose-500 focus:border-rose-500' : 'border-[#24365c] focus:border-[#c6a052]'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-medium text-slate-300 mb-1">
                      E-mail de Contato *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                      }}
                      placeholder="seuemail@exemplo.com.br"
                      className={`w-full bg-[#101931] border rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none ${
                        errors.email ? 'border-rose-500 focus:border-rose-500' : 'border-[#24365c] focus:border-[#c6a052]'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-medium text-slate-300 mb-1">
                      Telefone / WhatsApp com DDD *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      placeholder="(11) 98765-4321"
                      className={`w-full bg-[#101931] border rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none ${
                        errors.phone ? 'border-rose-500 focus:border-rose-500' : 'border-[#24365c] focus:border-[#c6a052]'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Area of law selection */}
                <div>
                  <label htmlFor="contact-area" className="block text-xs font-medium text-slate-300 mb-1">
                    Área de Interesse Jurídico *
                  </label>
                  <select
                    id="contact-area"
                    value={formData.areaOfLaw}
                    onChange={(e) => {
                      setFormData({ ...formData, areaOfLaw: e.target.value });
                      if (errors.areaOfLaw) setErrors((prev) => ({ ...prev, areaOfLaw: '' }));
                    }}
                    className={`w-full bg-[#101931] border rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none ${
                      errors.areaOfLaw ? 'border-rose-500 focus:border-rose-500' : 'border-[#24365c] focus:border-[#c6a052]'
                    }`}
                  >
                    <option value="" className="bg-[#0b1329] text-slate-400">
                      Selecione a área jurídica correspondente...
                    </option>
                    {PRACTICE_AREAS.map((area) => (
                      <option key={area.id} value={area.title} className="bg-[#0b1329] text-white">
                        {area.title}
                      </option>
                    ))}
                    <option value="Outra Questão Jurídica" className="bg-[#0b1329] text-white">
                      Outra Questão / Não sei identificar
                    </option>
                  </select>
                  {errors.areaOfLaw && (
                    <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.areaOfLaw}</span>
                    </p>
                  )}
                </div>

                {/* Preferred Contact & Urgency */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Como prefere nosso retorno?
                    </label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, preferredContact: 'whatsapp' })}
                        className={`flex-1 py-1.5 px-2 rounded border text-xs font-medium transition-colors ${
                          formData.preferredContact === 'whatsapp'
                            ? 'bg-[#18274d] border-[#c6a052] text-[#c6a052]'
                            : 'bg-[#101931] border-[#223358] text-slate-400'
                        }`}
                      >
                        WhatsApp
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, preferredContact: 'email' })}
                        className={`flex-1 py-1.5 px-2 rounded border text-xs font-medium transition-colors ${
                          formData.preferredContact === 'email'
                            ? 'bg-[#18274d] border-[#c6a052] text-[#c6a052]'
                            : 'bg-[#101931] border-[#223358] text-slate-400'
                        }`}
                      >
                        E-mail
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, preferredContact: 'phone' })}
                        className={`flex-1 py-1.5 px-2 rounded border text-xs font-medium transition-colors ${
                          formData.preferredContact === 'phone'
                            ? 'bg-[#18274d] border-[#c6a052] text-[#c6a052]'
                            : 'bg-[#101931] border-[#223358] text-slate-400'
                        }`}
                      >
                        Ligação
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Caráter da situação
                    </label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, urgency: 'normal' })}
                        className={`flex-1 py-1.5 px-2 rounded border text-xs font-medium transition-colors ${
                          formData.urgency === 'normal'
                            ? 'bg-[#18274d] border-[#c6a052] text-[#c6a052]'
                            : 'bg-[#101931] border-[#223358] text-slate-400'
                        }`}
                      >
                        Padrão (Normal)
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, urgency: 'urgent' })}
                        className={`flex-1 py-1.5 px-2 rounded border text-xs font-medium transition-colors ${
                          formData.urgency === 'urgent'
                            ? 'bg-amber-950/40 border-amber-500 text-amber-300'
                            : 'bg-[#101931] border-[#223358] text-slate-400'
                        }`}
                      >
                        Prazo Judicial / Urgente
                      </button>
                    </div>
                  </div>
                </div>

                {/* Message description */}
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-medium text-slate-300 mb-1">
                    Resumo do Caso ou Dúvida *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors((prev) => ({ ...prev, message: '' }));
                    }}
                    placeholder="Descreva de forma breve o que está acontecendo (ex: recebimento de notificação, prazo em andamento, divórcio, dúvida contratual)..."
                    className={`w-full bg-[#101931] border rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none ${
                      errors.message ? 'border-rose-500 focus:border-rose-500' : 'border-[#24365c] focus:border-[#c6a052]'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* LGPD Consent Checkbox */}
                <div className="pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.acceptedPrivacy}
                      onChange={(e) => {
                        setFormData({ ...formData, acceptedPrivacy: e.target.checked });
                        if (errors.acceptedPrivacy) setErrors((prev) => ({ ...prev, acceptedPrivacy: '' }));
                      }}
                      className="mt-0.5 rounded bg-[#101931] border-[#25375d] text-[#c6a052] focus:ring-[#c6a052]"
                    />
                    <span className="text-[11px] text-slate-400 leading-tight">
                      Concordo com o tratamento estritamente confidencial destes dados para fins de retorno jurídico pelo
                      escritório, em observância à Lei Geral de Proteção de Dados (Lei nº 13.709/2018) e ao sigilo legal da OAB.
                    </span>
                  </label>
                  {errors.acceptedPrivacy && (
                    <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.acceptedPrivacy}</span>
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  id="contact-btn-submit"
                  className="w-full py-3 rounded-md bg-[#c6a052] hover:bg-[#d6b267] active:bg-[#b08b3e] text-[#080d1c] font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer shadow-md"
                >
                  {isSubmitting ? (
                    <span>Processando envio seguro...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Enviar Mensagem Segura</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right: Institutional Contact Details & Map Card */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Cards */}
            <div className="bg-[#0c142b] border border-[#1d2d50] rounded-xl p-6 space-y-5">
              <h3 className="font-serif-display text-lg text-white font-medium pb-2 border-b border-[#1b2a4b]">
                Canais Diretos & Atendimento
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-md bg-[#162342] border border-[#24355f] flex items-center justify-center text-[#c6a052] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">Endereço da Sede</span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {FIRM_INFO.address.street}, {FIRM_INFO.address.complement}
                    </p>
                    <p className="text-xs text-slate-400">
                      {FIRM_INFO.address.neighborhood} - {FIRM_INFO.address.city}/{FIRM_INFO.address.state} • CEP {FIRM_INFO.address.zipCode}
                    </p>
                    <p className="text-[11px] text-[#c6a052] mt-0.5">
                      ★ {FIRM_INFO.address.reference}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-md bg-[#162342] border border-[#24355f] flex items-center justify-center text-[#c6a052] shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">Telefone Fixo da Central</span>
                    <a
                      href={`tel:${FIRM_INFO.phone.replace(/\D/g, '')}`}
                      className="text-xs text-slate-300 hover:text-[#c6a052] transition-colors"
                    >
                      {FIRM_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-md bg-[#162342] border border-[#24355f] flex items-center justify-center text-emerald-400 shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">WhatsApp de Triagem & Plantão</span>
                    <a
                      href={`https://wa.me/${FIRM_INFO.whatsappNumeric}?text=Olá,%20gostaria%20de%20atendimento%20jurídico.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-emerald-400 hover:underline block"
                    >
                      {FIRM_INFO.whatsapp}
                    </a>
                    <span className="text-[11px] text-slate-400">Atendimento humanizado em horário comercial</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-md bg-[#162342] border border-[#24355f] flex items-center justify-center text-[#c6a052] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">E-mails Institucionais</span>
                    <p className="text-xs text-slate-300">{FIRM_INFO.email}</p>
                    <p className="text-[11px] text-slate-400">Urgências: {FIRM_INFO.emergencyEmail}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-md bg-[#162342] border border-[#24355f] flex items-center justify-center text-[#c6a052] shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">Horário de Funcionamento</span>
                    <p className="text-xs text-slate-300">{FIRM_INFO.openingHours.weekdays}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{FIRM_INFO.openingHours.emergency}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Stylized Interactive Map with Directions */}
            <div className="bg-[#0c142b] border border-[#1d2d50] rounded-xl overflow-hidden">
              <div className="p-4 bg-[#101a33] border-b border-[#1c2a49] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-[#c6a052]" />
                  <span className="text-xs font-semibold text-white">Localização Geográfica</span>
                </div>
                <a
                  href="https://maps.google.com/?q=Avenida+Paulista+1754+Sao+Paulo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-[#c6a052] hover:underline flex items-center gap-1"
                >
                  <Navigation className="w-3 h-3" />
                  <span>Abrir no Google Maps</span>
                </a>
              </div>

              {/* Interactive Visual Map Representation */}
              <div className="relative h-56 w-full bg-[#090f21] p-4 flex flex-col justify-between overflow-hidden">
                {/* Visual grid lines for street mapping effect */}
                <div className="absolute inset-0 opacity-15 pointer-events-none bg-[linear-gradient(to_right,#334775_1px,transparent_1px),linear-gradient(to_bottom,#334775_1px,transparent_1px)] [background-size:28px_28px]" />

                {/* Stylized Paulista Avenue Line */}
                <div className="absolute top-1/2 left-0 right-0 h-4 bg-[#142242] border-y border-[#2b3e6e] flex items-center justify-center">
                  <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">
                    Avenida Paulista
                  </span>
                </div>

                {/* Station Trianon Masp Pin */}
                <div className="relative z-10 flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 text-[10px] font-bold">
                    Metrô Trianon-MASP
                  </span>
                  <span className="text-[10px] text-slate-400">120m a pé</span>
                </div>

                {/* Office Pin */}
                <div className="relative z-10 self-center bg-[#091124] border-2 border-[#c6a052] px-3.5 py-2 rounded-lg shadow-xl text-center">
                  <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-white mb-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Menezes, Castro & Silveira</span>
                  </div>
                  <div className="text-[10px] text-[#c6a052]">Av. Paulista, 1754 • 14º andar</div>
                </div>

                <div className="relative z-10 text-[10px] text-slate-400 flex items-center justify-between">
                  <span>Estacionamento conveniado no edifício</span>
                  <span>Acessibilidade para cadeirantes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
