'use client'
import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Clock, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '', email: '', subject: '', message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const inputClass = `
    w-full px-4 py-3 rounded-2xl text-sm font-medium
    border border-slate-200 dark:border-slate-700
    bg-white dark:bg-slate-800
    text-slate-800 dark:text-white
    placeholder:text-slate-300 dark:placeholder:text-slate-600
    focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent
    transition-all duration-200
  `;

  const labelClass = "block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide";

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "hello@vibestore.com",
      sub: "We reply within 24 hours",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+95 9 123 456 789",
      sub: "Mon–Fri, 9am–6pm EST",
    },
    {
      icon: MapPin,
      label: "Address",
      value: "123 Vibe Street, Yangon",
      sub: "YGN 10001, Myanmar",
    },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900">

      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-400/10 dark:bg-violet-500/5 rounded-full blur-[130px] -translate-y-1/3 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-400/10 dark:bg-purple-500/5 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 py-16 relative z-10">

        {/* ── Header ── */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-50 dark:bg-violet-500/10 border border-violet-100 dark:border-violet-500/20 text-violet-700 dark:text-violet-400 text-xs font-bold tracking-wide uppercase mb-5">
            <MessageSquare size={12} />
            Get In Touch
          </div>
          <h1 className="text-4xl font-black tracking-tight mb-3">
            <span className="text-slate-900 dark:text-white">We'd love to </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-700 to-purple-400">
              hear from you
            </span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto text-sm leading-relaxed">
            Have a question, feedback, or just want to say hello? Fill out the form and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Left: Contact Info ── */}
          <div className="space-y-4">

            {contactInfo.map(({ icon: Icon, label, value, sub }) => (
              <div
                key={label}
                className="p-5 rounded-3xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 hover:border-violet-200 dark:hover:border-violet-700/50 transition-all duration-200 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-violet-50 dark:bg-violet-500/10 border border-violet-100 dark:border-violet-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-violet-100 dark:group-hover:bg-violet-500/20 transition-colors duration-200">
                    <Icon size={16} className="text-violet-600 dark:text-violet-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-violet-500 dark:text-violet-400 uppercase tracking-widest mb-1">
                      {label}
                    </p>
                    <p className="text-sm font-bold text-slate-800 dark:text-white">
                      {value}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">{sub}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Response time card */}
            <div className="p-5 rounded-3xl bg-gradient-to-br from-violet-600 to-purple-500 text-white">
              <div className="flex items-center gap-2 mb-3">
                <Clock size={16} className="opacity-80" />
                <p className="text-xs font-black uppercase tracking-widest opacity-80">
                  Response Time
                </p>
              </div>
              <p className="text-lg font-black mb-1">Usually within 24h</p>
              <p className="text-xs opacity-70 leading-relaxed">
                Our support team is available Monday to Friday during business hours.
              </p>
            </div>
          </div>

          {/* ── Right: Form ── */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-700/50 p-8">

              {submitted ? (
                /* Success State */
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-3xl bg-green-50 dark:bg-green-500/10 border border-green-100 dark:border-green-500/20 flex items-center justify-center">
                      <CheckCircle size={40} className="text-green-500" strokeWidth={1.5} />
                    </div>
                    <div className="absolute inset-0 bg-green-400/20 rounded-3xl blur-xl -z-10" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">
                      Message Sent! 🎉
                    </h3>
                    <p className="text-sm text-slate-400 max-w-xs">
                      Thanks for reaching out! We'll get back to you within 24 hours.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:border-violet-300 dark:hover:border-violet-700 hover:text-violet-600 dark:hover:text-violet-400 transition-all duration-200"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                /* Form */
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="mb-6">
                    <h2 className="text-xl font-black text-slate-900 dark:text-white">
                      Send a Message
                    </h2>
                    <p className="text-sm text-slate-400 mt-1">
                      Fill out the form below and we'll respond shortly.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Full Name</label>
                      <input
                        className={inputClass}
                        placeholder="full name"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Email</label>
                      <input
                        type="email"
                        className={inputClass}
                        placeholder="name@example.com"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Subject</label>
                    <input
                      className={inputClass}
                      placeholder="How can we help you?"
                      value={form.subject}
                      onChange={e => setForm({ ...form, subject: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Message</label>
                    <textarea
                      rows={5}
                      className={`${inputClass} resize-none`}
                      placeholder="Tell us more about your inquiry..."
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!form.name || !form.email || !form.message || loading}
                    className="w-full py-3.5 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-violet-500/25 transition-all duration-200 hover:scale-[1.02] active:scale-95"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}