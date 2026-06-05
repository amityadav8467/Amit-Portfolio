import { useState, useEffect, useRef, useCallback } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';

// ─── Turnstile global type declaration ───────────────────────────────────────
declare global {
  interface Window {
    turnstile: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
          'expired-callback'?: () => void;
          'error-callback'?: () => void;
          theme?: 'light' | 'dark' | 'auto';
          size?: 'normal' | 'compact';
        }
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
    onTurnstileLoad?: () => void;
  }
}

// ─── Replace with your actual Cloudflare Turnstile site key ──────────────────
// For local development/testing, use: '1x00000000000000000000AA'  (always passes)
// For staging testing, use:           '3x00000000000000000000FF'  (always shows challenge)
// For production, use your real site key from: https://dash.cloudflare.com → Turnstile
const TURNSTILE_SITE_KEY = '0x4AAAAAADe_Qre0Rqv0l8md'; // 👈 REPLACE THIS

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // ── Turnstile state ────────────────────────────────────────────────────────
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileStatus, setTurnstileStatus] = useState<'idle' | 'verified' | 'expired' | 'error'>('idle');
  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const scriptLoadedRef = useRef(false);

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init('0wh_iJXauOo7kr27S');
  }, []);

  // ── Render the Turnstile widget ────────────────────────────────────────────
  const renderTurnstile = useCallback(() => {
    if (!turnstileContainerRef.current || !window.turnstile) return;

    // Avoid double-rendering
    if (widgetIdRef.current) {
      try { window.turnstile.remove(widgetIdRef.current); } catch (_) {}
      widgetIdRef.current = null;
    }

    widgetIdRef.current = window.turnstile.render(turnstileContainerRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      theme: 'light',
      size: 'normal',
      callback: (token: string) => {
        setTurnstileToken(token);
        setTurnstileStatus('verified');
      },
      'expired-callback': () => {
        setTurnstileToken(null);
        setTurnstileStatus('expired');
      },
      'error-callback': () => {
        setTurnstileToken(null);
        setTurnstileStatus('error');
      },
    });
  }, []);

  // ── Load Turnstile script once ─────────────────────────────────────────────
  useEffect(() => {
    if (scriptLoadedRef.current) return;
    scriptLoadedRef.current = true;

    // If already loaded by another part of the app
    if (window.turnstile) {
      renderTurnstile();
      return;
    }

    // Set a global callback that Turnstile will call when ready
    window.onTurnstileLoad = renderTurnstile;

    const script = document.createElement('script');
    script.src =
      'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad&render=explicit';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup widget on unmount
      if (widgetIdRef.current && window.turnstile) {
        try { window.turnstile.remove(widgetIdRef.current); } catch (_) {}
      }
    };
  }, [renderTurnstile]);

  // ── Helpers ────────────────────────────────────────────────────────────────
  const resetTurnstile = () => {
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
    }
    setTurnstileToken(null);
    setTurnstileStatus('idle');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ── Form submission ────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!turnstileToken) {
      setTurnstileStatus('error');
      return;
    }

    setIsSubmitting(true);

    try {
      // Admin notification
      await emailjs.send('service_my5tl4q', 'template_to7vhs6', {
        to_email: 'ay990351@gmail.com',
        user_name: formData.name,
        user_email: formData.email,
        subject: formData.subject,
        user_message: formData.message,
      });

      // Auto-reply to client
      await emailjs.send('service_my5tl4q', 'template_1xphzrx', {
        to_email: 'ay990351@gmail.com',
        user_name: formData.name,
        user_email: formData.email,
        subject: formData.subject,
        user_message: formData.message,
      });

      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      resetTurnstile(); // Reset CAPTCHA after successful send

      setTimeout(() => setSubmitStatus('idle'), 4000);
    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmitStatus('error');
      resetTurnstile(); // Reset CAPTCHA on error too
      setTimeout(() => setSubmitStatus('idle'), 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Turnstile status label ─────────────────────────────────────────────────
  const turnstileHint = {
    idle: null,
    verified: (
      <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
        <span>✓</span> CAPTCHA verified
      </p>
    ),
    expired: (
      <p className="text-xs text-amber-600 flex items-center gap-1 mt-1">
        <span>⚠</span> CAPTCHA expired — please verify again
      </p>
    ),
    error: (
      <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
        <span>✕</span> Please complete the CAPTCHA to continue
      </p>
    ),
  }[turnstileStatus];

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Get In Touch</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-12 rounded-full" />

          <div className="grid md:grid-cols-2 gap-12">

            {/* ── Left: Contact Info ──────────────────────────────────────── */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h3>
              <p className="text-gray-600 mb-8">
                Feel free to reach out for opportunities, collaborations, or just to say hello!
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                    <a href="tel:+918467977759" className="text-gray-600 hover:text-blue-600 transition-colors">
                      +91 84679 7759
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                    <a href="mailto:ay990351@gmail.com" className="text-gray-600 hover:text-blue-600 transition-colors">
                      ay990351@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Location</h4>
                    <p className="text-gray-600">Ballia, Uttar Pradesh 221711</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Right: Contact Form ─────────────────────────────────────── */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                    placeholder="Your name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                    placeholder="Subject of your message"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all resize-none"
                    placeholder="Your message..."
                  />
                </div>

                {/* ── Cloudflare Turnstile CAPTCHA ── */}
                <div>
                  <div
                    ref={turnstileContainerRef}
                    className="min-h-[65px]"
                    aria-label="CAPTCHA verification"
                  />
                  {turnstileHint}
                </div>

                {/* Submit Button — disabled until CAPTCHA is solved */}
                <button
                  type="submit"
                  disabled={isSubmitting || !turnstileToken}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </button>

                {/* Status messages */}
                {submitStatus === 'success' && (
                  <div className="text-green-600 text-center font-medium bg-green-50 border border-green-200 rounded-lg py-3 px-4">
                    ✓ Message sent successfully! I'll get back to you soon.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="text-red-600 text-center font-medium bg-red-50 border border-red-200 rounded-lg py-3 px-4">
                    ✕ Failed to send message. Please try again.
                  </div>
                )}
              </form>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
