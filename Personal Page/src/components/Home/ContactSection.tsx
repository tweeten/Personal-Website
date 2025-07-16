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
  const [isSubmitting, setIsSubmitting] = useState(false);
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
<<<<<<< HEAD:Personal Page/src/components/Home/ContactSection.tsx
<<<<<<< HEAD:Personal Page/src/components/Home/ContactSection.tsx
  const handleSubmit = async (e: React.FormEvent) => {
=======
HEAD
=======
>>>>>>> 7a2ca7c2 (file cleanup):src/components/Home/ContactSection.tsx
  const handleSubmit = (e: React.FormEvent) => {
>>>>>>> d4d46e37 (wiring up backend):src/components/Home/ContactSection.tsx
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      try {
        const response = await fetch('https://personal-website-wwin.onrender.com/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
<<<<<<< HEAD:Personal Page/src/components/Home/ContactSection.tsx
=======
        // Reset success message after a few seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      }, 1500);
<<<<<<< HEAD:Personal Page/src/components/Home/ContactSection.tsx

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      try {
        const response = await fetch('http://localhost:5000/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
>>>>>>> d4d46e37 (wiring up backend):src/components/Home/ContactSection.tsx
        if (response.ok) {
          setIsSubmitted(true);
          setFormData({
            name: '',
            email: '',
            message: ''
          });
<<<<<<< HEAD:Personal Page/src/components/Home/ContactSection.tsx
=======
          // Reset success message after a few seconds
>>>>>>> d4d46e37 (wiring up backend):src/components/Home/ContactSection.tsx
          setTimeout(() => {
            setIsSubmitted(false);
          }, 5000);
        } else {
<<<<<<< HEAD:Personal Page/src/components/Home/ContactSection.tsx
          // handle error
        }
      } catch (error) {
        // handle error
      } finally {
        setIsSubmitting(false);
      }
=======
          const data = await response.json();
          alert(data.error || 'Failed to send message.');
        }
      } catch (error) {
        alert('Failed to send message.');
      } finally {
        setIsSubmitting(false);
      }
34b28601 (wiring up backend)
>>>>>>> d4d46e37 (wiring up backend):src/components/Home/ContactSection.tsx
=======
>>>>>>> 7a2ca7c2 (file cleanup):src/components/Home/ContactSection.tsx
    }
  };
  return <section id="contact" className="py-20 md:py-32 bg-[#e6dfd0]/30">
      <div className="container mx-auto px-6">
        <motion.div className="max-w-3xl mx-auto" initial={{
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
          <h2 className="text-3xl md:text-4xl font-light leading-tight text-center">
            Get in Touch (Coming Soon!)
          </h2>
          <div className="mt-4 w-16 h-1 bg-[#b75c3d] mx-auto" />
          <p className="mt-6 text-center text-lg text-[#3c3a36]/80 max-w-xl mx-auto">
            Interested in working together? I'll be wiring this form up to a database shortly. For now, please reach out to me at tweeten.tyler@gmail.com.
          </p>
          <div className="mt-12">
            <form onSubmit={handleSubmit} className="space-y-6">
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
                <motion.button type="submit" disabled={isSubmitting || isSubmitted} className={`group relative inline-flex items-center px-6 py-3 overflow-hidden ${isSubmitted ? 'bg-green-600 text-white' : 'border border-[#b75c3d] text-[#b75c3d]'}`} whileHover={!isSubmitted ? {
                scale: 1.02
              } : {}} whileTap={!isSubmitted ? {
                scale: 0.98
              } : {}}>
                  {isSubmitting ? <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span> : isSubmitted ? <span className="flex items-center">
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
          </div>
        </motion.div>
      </div>
    </section>;
};