import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SendIcon, CheckIcon } from 'lucide-react';
export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  const validate = () => {
    let valid = true;
    const newErrors = {
      name: '',
      email: '',
      message: ''
    };
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Optimistic UI: Show success immediately
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      
      // Start the network request in the background
      const sendMessage = async () => {
        try {
          const response = await fetch('https://personal-website-wwin.onrender.com/api/contact', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
          const data = await response.json();
          if (!data.success) {
            // If the request fails, we could show a subtle notification
            // but we won't revert the optimistic UI since the user already saw success
            console.warn('Message queuing failed, but user already saw success');
          }
        } catch (error) {
          // Silent fail - don't disrupt the user experience
          console.error('Background message send failed:', error);
        }
      };
      
      // Fire off the request without waiting
      sendMessage();
      
      // Reset the success state after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }
  };
  return <section id="contact" className="py-10 md:py-16 bg-[#e6dfd0]/30">
      <div className="container mx-auto px-6">
        <motion.div className="max-w-3xl mx-auto mt-[44px]" initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6
      }}>
          <h2 className="text-3xl md:text-4xl font-light leading-tight text-center mb-5">
            Get in Touch
          </h2>
          <div className="mt-5 w-16 h-1 bg-[#b75c3d] mx-auto" />
          <p className="mt-5 text-center text-lg text-[#3c3a36]/80 max-w-xl mx-auto">
            Interested in working on a project together? Drop me a line here!
          </p>
          <div className="mt-21">
            <form onSubmit={handleSubmit} className="space-y-13">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#3c3a36]">
                  Name
                </label>
                <div className="mt-1">
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={`w-full px-4 py-3 bg-[#f7f3eb] border ${errors.name ? 'border-red-500' : 'border-[#b75c3d]/20'} focus:outline-none focus:border-[#b75c3d] transition-colors`} />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#3c3a36]">
                  Email
                </label>
                <div className="mt-1">
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={`w-full px-4 py-3 bg-[#f7f3eb] border ${errors.email ? 'border-red-500' : 'border-[#b75c3d]/20'} focus:outline-none focus:border-[#b75c3d] transition-colors`} />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#3c3a36]">
                  Message
                </label>
                <div className="mt-1">
                  <textarea id="message" name="message" rows={5} value={formData.message} onChange={handleChange} className={`w-full px-4 py-3 bg-[#f7f3eb] border ${errors.message ? 'border-red-500' : 'border-[#b75c3d]/20'} focus:outline-none focus:border-[#b75c3d] transition-colors`} />
                  {errors.message && <p className="mt-1 text-sm text-red-500">
                      {errors.message}
                    </p>}
                </div>
              </div>
              <div className="flex justify-end">
                <motion.button type="submit" disabled={isSubmitted} className={`group relative inline-flex items-center px-6 py-3 overflow-hidden ${isSubmitted ? 'bg-green-600 text-black' : 'border border-[#b75c3d] text-[#b75c3d]'}`} whileHover={!isSubmitted ? {
                scale: 1.02
              } : {}} whileTap={!isSubmitted ? {
                scale: 0.98
              } : {}}>
                  {isSubmitted ? <span className="flex items-center">
                      <CheckIcon className="mr-2" size={16} />
                      Message Sent!
                    </span> : <>
                      <span className="relative z-10 flex items-center">
                        <span>Send Message</span>
                        <SendIcon className="ml-2" size={16} />
                      </span>
                      <span className="absolute inset-0 bg-[#b75c3d] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></span>
                      <span className="absolute inset-0 flex items-center justify-center text-[#f7f3eb] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out z-20">
                        <span>Send Message</span>
                        <SendIcon className="ml-2" size={16} />
                      </span>
                    </>}
                </motion.button>
              </div>
            </form>
            {errors.message && (
              <div className="mt-4 p-4 bg-red-100 text-red-800 rounded text-center">
                {errors.message}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>;
};
