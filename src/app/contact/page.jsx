// app/components/Contact.jsx
'use client';
import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Replace this with your actual form submission logic (e.g., API route)
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="text-center p-2 sm:px-8 lg:px-12">
        <h1 className="relative inline-block text-3xl sm:text-4xl md:text-4xl font-extrabold tracking-tight text-gray-200">
          Get in Touch
        </h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed text-gray-300">
          Let&apos;s discuss opportunities and collaborations
        </p>
        <span className="block h-1 w-16 mx-auto mt-3 rounded-full bg-blue-400"></span>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Contact Info */}
        <div className="bg-gray-900 backdrop-blur-md rounded-xl border border-gray-700/50 p-4 lg:p-6 shadow-sm h-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold tracking-tight text-gray-200">Contact Information</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail w-6 h-6 text-white">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-white">Email</h4>
                <p className="text-gray-300">arif.reza3126@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github w-6 h-6 text-white">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-white">GitHub</h4>
                <p className="text-gray-300">github.com/arifrexa</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-red-600 rounded-xl flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin w-6 h-6 text-white">
                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-white">Location</h4>
                <p className="text-gray-300">Dhaka, Bangladesh</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock w-6 h-6 text-white">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-white">Availability</h4>
                <p className="text-gray-300">Open to opportunities</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 pt-8 border-t border-gray-700/50">
            <h3 className="text-2xl font-bold tracking-tight text-gray-200 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              <button className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium h-10 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border-blue-500/50 border transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text w-4 h-4">
                  <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                  <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                  <path d="M10 9H8" />
                  <path d="M16 13H8" />
                  <path d="M16 17H8" />
                </svg>
                Download CV
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = 'mailto:rsakib13@gmail.com';
                }}
                className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium h-10 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 border-green-500/50 border transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail w-4 h-4">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                Send Email
              </button>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-gray-900 backdrop-blur-md rounded-xl border border-gray-700/50 p-4 lg:p-6 shadow-sm h-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold tracking-tight text-gray-200">Send a Message</h3>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-white">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border bg-gray-800/30 border-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                placeholder="Your full name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border bg-gray-800/30 border-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                placeholder="your.email@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border bg-gray-800/30 border-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                placeholder="What's this about?"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                className="w-full px-4 py-3 rounded-lg border bg-gray-800/30 border-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm resize-none"
                placeholder="Tell me about your project or opportunity..."
                required
              />
            </div>
            {submitStatus === 'success' && (
              <p className="text-green-400 text-sm">Message sent successfully!</p>
            )}
            {submitStatus === 'error' && (
              <p className="text-red-400 text-sm">Failed to send. Please try again.</p>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`inline-flex items-center justify-center w-full h-10 px-4 py-2 rounded-md font-medium text-md border backdrop-blur-sm transition-colors ${
                isSubmitting
                  ? 'bg-blue-500/30 cursor-not-allowed text-blue-500'
                  : 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border-blue-500/50'
              }`}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>

      {/* Social Links */}
      <div className="bg-gray-900 backdrop-blur-md rounded-xl border border-gray-700/50 p-4 lg:p-6 shadow-sm">
        <h3 className="text-3xl font-bold text-center text-gray-200 mb-4">Connect With Me</h3>
        <div className="flex justify-center gap-4">
          <a
            href="https://github.com/rsakib15"
            target="_blank"
            rel="noopener noreferrer"
            className="group cursor-pointer rounded-xl p-4 transition-all transform hover:-translate-y-1 bg-gray-800/40 hover:bg-gray-800/70 shadow-md hover:shadow-xl"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github w-10 h-10 transition-transform duration-300 group-hover:scale-110 text-white">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          </a>
          <a
            href="mailto:rsakib13@gmail.com"
            className="group cursor-pointer rounded-xl p-4 transition-all transform hover:-translate-y-1 bg-gray-800/40 hover:bg-gray-800/70 shadow-md hover:shadow-xl"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail w-10 h-10 transition-transform duration-300 group-hover:scale-110 text-white">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/sakibrahman"
            target="_blank"
            rel="noopener noreferrer"
            className="group cursor-pointer rounded-xl p-4 transition-all transform hover:-translate-y-1 bg-gray-800/40 hover:bg-gray-800/70 shadow-md hover:shadow-xl"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin w-10 h-10 transition-transform duration-300 group-hover:scale-110 text-white">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect width="4" height="12" x="2" y="9" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;