import React, { useState, useEffect } from 'react';
import { DEVELOPER_INFO } from '../data/portfolioData';
import { Send, CheckCircle2, AlertCircle, Mail, MessageSquare, Github, Linkedin, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ContactProps {
  initialSubject?: string;
}

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const Contact: React.FC<ContactProps> = ({ initialSubject = '' }) => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: initialSubject || '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState<{
    referenceId: string;
    timestamp: string;
  } | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    if (initialSubject) {
      setFormData((prev) => ({ ...prev, subject: initialSubject }));
    }
  }, [initialSubject]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email format';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Project subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Project message is required';
    } else if (formData.message.trim().length < 15) {
      newErrors.message = 'Please provide at least 15 characters describing your project';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Realistic client dispatch simulation with reference code
    setTimeout(() => {
      setIsSubmitting(false);
      const refId = `STX-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedMessage({
        referenceId: refId,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });

      // Confetti celebratory feedback
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00f0ff', '#38bdf8', '#8b5cf6', '#ffffff'],
        });
      } catch {
        // Fallback if canvas blocked
      }
    }, 900);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(DEVELOPER_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#07090e]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#00f0ff]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#8b5cf6]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col items-start mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-[#00f0ff] uppercase tracking-widest mb-2">
            <span>Transmission Channel</span>
            <span aria-hidden="true">·</span>
            <span>Direct Inquiries</span>
          </div>
          <h2 className="font-['Orbitron',sans-serif] text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight metallic-text">
            LET'S BUILD SOMETHING EXTRAORDINARY.
          </h2>
          <p className="text-slate-400 mt-2 text-base sm:text-lg max-w-2xl">
            Have a project in mind, an opportunity, or need a dedicated React architect? Karimov Shodiyor is ready to connect.
          </p>
        </div>

        {/* 2-Column Grid: Left Contact Info & Direct Links, Right Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Communication Hub */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Contact Card */}
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800">
              <h3 className="font-['Orbitron',sans-serif] text-lg font-bold text-white mb-2">
                DIRECT CONTACT CHANNELS
              </h3>
              <p className="text-sm text-slate-400 mb-6">
                Prefer direct messaging? Reach out via Telegram, email, or explore source work on GitHub.
              </p>

              {/* Email channel */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 rounded-lg bg-[#00f0ff]/10 text-[#00f0ff] shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[11px] font-mono text-slate-400 block uppercase">Official Email</span>
                      <a
                        href={`mailto:${DEVELOPER_INFO.email}`}
                        className="text-xs sm:text-sm text-slate-200 hover:text-[#00f0ff] transition-colors truncate block font-mono"
                      >
                        {DEVELOPER_INFO.email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-[#00f0ff] transition-colors shrink-0"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-[#00f0ff]" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Telegram direct link */}
                <a
                  href={DEVELOPER_INFO.telegram}
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-[#00f0ff]/40 flex items-center justify-between gap-3 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[#00f0ff]/10 text-[#00f0ff] shrink-0">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-slate-400 block uppercase">Telegram Direct</span>
                      <span className="text-xs sm:text-sm text-slate-200 group-hover:text-[#00f0ff] transition-colors font-mono">
                        @stravex_dev
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-[#00f0ff] group-hover:translate-x-1 transition-transform">
                    Chat →
                  </span>
                </a>

                {/* GitHub link */}
                <a
                  href={DEVELOPER_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-[#00f0ff]/40 flex items-center justify-between gap-3 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[#00f0ff]/10 text-[#00f0ff] shrink-0">
                      <Github className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-slate-400 block uppercase">GitHub Profile</span>
                      <span className="text-xs sm:text-sm text-slate-200 group-hover:text-[#00f0ff] transition-colors font-mono">
                        github.com/stravex-karimov
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-[#00f0ff] group-hover:translate-x-1 transition-transform">
                    Code →
                  </span>
                </a>
              </div>
            </div>

            {/* Availability Protocol Badge */}
            <div className="p-4 rounded-xl bg-[#0d121f] border border-slate-800/80 text-xs text-slate-400 flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
              <span>Current Status: Accepting Select Freelance & Contract Projects worldwide</span>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-2xl relative">
              {submittedMessage ? (
                /* Success Screen */
                <div className="py-8 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-14 h-14 mx-auto rounded-full bg-[#00f0ff]/15 border border-[#00f0ff] flex items-center justify-center text-[#00f0ff]">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="font-['Orbitron',sans-serif] text-2xl font-bold text-white metallic-text">
                    TRANSMISSION DISPATCHED
                  </h3>
                  <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-white">{formData.name}</strong>. Your message has been logged under dispatch reference{' '}
                    <span className="font-mono text-[#00f0ff] font-bold">{submittedMessage.referenceId}</span> at {submittedMessage.timestamp}. Karimov Shodiyor will review it shortly.
                  </p>

                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-left text-xs max-w-md mx-auto font-mono text-slate-400 space-y-1">
                    <div><span className="text-slate-500">Subject:</span> {formData.subject}</div>
                    <div><span className="text-slate-500">Contact:</span> {formData.email}</div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setSubmittedMessage(null);
                        setFormData({ name: '', email: '', subject: '', message: '' });
                      }}
                      className="px-6 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-[#07090e] bg-[#00f0ff] hover:bg-[#38bdf8] transition-colors cursor-pointer"
                    >
                      Send Another Transmission
                    </button>
                  </div>
                </div>
              ) : (
                /* Contact Form */
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Name Input */}
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                      Your Name <span className="text-[#00f0ff]">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: undefined });
                      }}
                      placeholder="e.g. Alex Vance"
                      className={`w-full px-4 py-3 rounded-xl bg-slate-900/90 border text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 transition-all ${
                        errors.name
                          ? 'border-red-500/80 focus:ring-red-500'
                          : 'border-slate-800 focus:border-[#00f0ff] focus:ring-[#00f0ff]'
                      }`}
                    />
                    {errors.name && (
                      <p className="flex items-center gap-1 text-xs text-red-400 mt-1 font-mono">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Email Input */}
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                      Email Address <span className="text-[#00f0ff]">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      placeholder="e.g. alex@company.com"
                      className={`w-full px-4 py-3 rounded-xl bg-slate-900/90 border text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 transition-all ${
                        errors.email
                          ? 'border-red-500/80 focus:ring-red-500'
                          : 'border-slate-800 focus:border-[#00f0ff] focus:ring-[#00f0ff]'
                      }`}
                    />
                    {errors.email && (
                      <p className="flex items-center gap-1 text-xs text-red-400 mt-1 font-mono">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  {/* Subject Input */}
                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                      Subject / Project Scope <span className="text-[#00f0ff]">*</span>
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => {
                        setFormData({ ...formData, subject: e.target.value });
                        if (errors.subject) setErrors({ ...errors, subject: undefined });
                      }}
                      placeholder="e.g. React Web App Architecture"
                      className={`w-full px-4 py-3 rounded-xl bg-slate-900/90 border text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 transition-all ${
                        errors.subject
                          ? 'border-red-500/80 focus:ring-red-500'
                          : 'border-slate-800 focus:border-[#00f0ff] focus:ring-[#00f0ff]'
                      }`}
                    />
                    {errors.subject && (
                      <p className="flex items-center gap-1 text-xs text-red-400 mt-1 font-mono">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.subject}</span>
                      </p>
                    )}
                  </div>

                  {/* Message Input with Character Count */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label htmlFor="contact-message" className="block text-xs font-mono uppercase tracking-wider text-slate-300">
                        Message Details <span className="text-[#00f0ff]">*</span>
                      </label>
                      <span className="text-[11px] font-mono text-slate-400">
                        {formData.message.length} chars
                      </span>
                    </div>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: undefined });
                      }}
                      placeholder="Describe your vision, timeline, deliverables, or questions..."
                      className={`w-full px-4 py-3 rounded-xl bg-slate-900/90 border text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 transition-all resize-y ${
                        errors.message
                          ? 'border-red-500/80 focus:ring-red-500'
                          : 'border-slate-800 focus:border-[#00f0ff] focus:ring-[#00f0ff]'
                      }`}
                    />
                    {errors.message && (
                      <p className="flex items-center gap-1 text-xs text-red-400 mt-1 font-mono">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-xs font-bold uppercase tracking-wider text-[#07090e] bg-gradient-to-r from-[#00f0ff] via-[#38bdf8] to-[#0ea5e9] hover:from-[#38bdf8] hover:to-[#00f0ff] shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] transition-all duration-300 disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span>Encrypting & Dispatching...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Transmit Message</span>
                        </>
                      )}
                    </button>
                    <span className="block text-center text-[11px] text-slate-400 font-mono mt-2">
                      Live frontend demonstration with simulated dispatch & verified validation.
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
