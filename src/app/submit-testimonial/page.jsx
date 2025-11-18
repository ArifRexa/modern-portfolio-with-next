// app/components/SubmitTestimonial.jsx
'use client';
import React, { useState } from 'react';
import supabase from '@/utils/supabaseClient';

const SubmitTestimonial = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    designation: '',
    location: '',
    testimonial: '',
    avatar: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'testimonial') {
      setCharCount(value.length);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 5 * 1024 * 1024) { // 5MB limit
      setFormData(prev => ({
        ...prev,
        avatar: file
      }));
    } else if (file) {
      alert('File size should not exceed 5 MB');
      e.target.value = ''; // Clear the input
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (charCount < 200) {
      alert('Testimonial must be at least 200 characters long');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Upload avatar if provided
      let avatarUrl = null;
      if (formData.avatar) {
        // Create a unique filename
        const fileName = `testimonial-avatars/${Date.now()}-${formData.avatar.name}`;

        // Upload to Supabase storage
        const { data: uploadData, error: uploadError } = await supabase
          .storage
          .from('testimonial-avatars') // Adjust bucket name as needed
          .upload(fileName, formData.avatar, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) {
          console.error('Avatar upload error:', uploadError);
          throw uploadError;
        }

        // Get the public URL
        const { data: { publicUrl } } = supabase
          .storage
          .from('testimonial-avatars')
          .getPublicUrl(fileName);

        avatarUrl = publicUrl;
      }

      // Insert testimonial data into Supabase
      const { data, error: insertError } = await supabase
        .from('testimonials')
        .insert([{
          name: formData.name,
          email: formData.email,
          company: formData.company,
          designation: formData.designation,
          location: formData.location,
          testimonial: formData.testimonial,
          avatar_url: avatarUrl,
          created_at: new Date().toISOString(),
          is_approved: false // Assuming testimonials need approval before showing
        }]);

      if (insertError) {
        console.error('Supabase insert error:', insertError);
        throw insertError;
      }

      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        designation: '',
        location: '',
        testimonial: '',
        avatar: null
      });
      setCharCount(0);
    } catch (err) {
      console.error('Error submitting testimonial:', err);
      setError(err.message || 'An error occurred while submitting your testimonial. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center py-12 px-4 sm:px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-100">Submit a Testimonial</h1>
          <p className="mt-2 text-lg text-gray-300">
            I&apos;d love to learn from your experience and guidance to grow and excel professionally.
          </p>
          <span className="block h-1 w-32 mx-auto mt-4 rounded-full bg-blue-500"></span>
        </div>
      </div>

      {/* Form Container */}
      <div className="max-w-4xl mx-auto px-4 lg:px-0">
        <div className="bg-gray-900 backdrop-blur-md rounded-xl border border-gray-700/50 p-4 lg:p-6 shadow-sm h-full">
          {submitSuccess ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle text-green-400">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-green-400 mb-4">Thank You!</h2>
              <p className="text-gray-300 max-w-md mx-auto">
                Your testimonial has been submitted successfully. I truly appreciate your time and feedback.
                Your insights will help me continue to grow and improve as a professional.
              </p>
            </div>
          ) : (
            <form className="space-y-4 p-2" onSubmit={handleSubmit}>
              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-2 text-white">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-lg border bg-gray-800/30 border-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-400 transition-colors duration-600 ease-in-out"
                  placeholder="Your full name"
                  autoComplete="off"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              {/* Email */}
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1 text-white">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <p className="text-xs text-gray-400">
                    This email will not be shown in the testimonial.
                  </p>
                </div>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border bg-gray-800/30 border-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-400 transition-colors duration-600 ease-in-out"
                  placeholder="Your email"
                  required
                  autoComplete="off"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm font-medium mb-2 text-white">
                  Company <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border bg-gray-800/30 border-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-400 transition-colors duration-600 ease-in-out"
                  placeholder="Company"
                  required
                  autoComplete="off"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                />
              </div>

              {/* Designation */}
              <div>
                <label className="block text-sm font-medium mb-2 text-white">
                  Designation <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border bg-gray-800/30 border-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-400 transition-colors duration-600 ease-in-out"
                  placeholder="Designation"
                  required
                  autoComplete="off"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                />
              </div>

              {/* Location */}
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1 text-white">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <p className="text-xs text-gray-400">
                    This location will not be shown in the testimonial.
                  </p>
                </div>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border bg-gray-800/30 border-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-400 transition-colors duration-600 ease-in-out resize-none"
                  placeholder="City, Country"
                  autoComplete="off"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                />
              </div>

              {/* Avatar Upload */}
              <div>
                <label className="block text-sm font-medium mb-2 text-white">
                  Upload your Image <span className="text-blue-500">(Optional, maximum 5 MB)</span>
                </label>
                <div className="inline-block">
                  <label className="cursor-pointer w-24 h-24 rounded-full bg-gray-800/30 border-gray-700/50 text-white placeholder-gray-400 border flex items-center justify-center overflow-hidden hover:ring-1 hover:ring-blue-500 transition-all duration-300 ease-in-out transform">
                    <span className="text-gray-400 text-2xl">+</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      autoComplete="off"
                      name="avatar"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              </div>

              {/* Testimonial */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2 text-white">
                  Feedback <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="testimonial"
                  rows="5"
                  className="w-full px-4 py-3 rounded-lg border bg-gray-800/30 border-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 transition-colors duration-600 ease-in-out resize-none"
                  placeholder="Share your experience or feedback..."
                  required
                  autoComplete="off"
                  value={formData.testimonial}
                  onChange={handleInputChange}
                ></textarea>
                <div className="flex justify-between items-center mt-1 text-sm">
                  <span className="text-red-500">Minimum 200 characters required</span>
                  <span className="text-gray-500">{charCount} / 2000</span>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting || charCount < 200}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border-blue-500/50 disabled:bg-gray-700/30 disabled:text-gray-500 disabled:border-gray-700/50"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    'Submit Testimonial'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubmitTestimonial;