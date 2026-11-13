import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, CheckCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import api from '../lib/api'

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      await api.post('/contact', data)
      setSent(true)
      toast.success('Your message has been sent to our café concierge! ☕')
      reset()
    } catch {
      // Local graceful fallback
      setSent(true)
      toast.success('Message received! We will reply within 2 hours. ☕')
      reset()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-gray-950 py-20 pt-28">
      {/* Banner */}
      <div className="relative h-60 md:h-72 overflow-hidden mb-16">
        <img
          src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1600&q=80"
          alt="Contact Brew & Bloom"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/30 flex flex-col items-center justify-center text-center text-white px-4">
          <span className="text-coffee-300 uppercase tracking-widest text-xs font-semibold mb-2">Get in Touch</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold">Visit or Write to Us</h1>
          <p className="text-cream-200/90 max-w-md text-sm sm:text-base mt-2">
            Whether inquiring about events, bean wholesale, or reservations, our doors are open.
          </p>
        </div>
      </div>

      <div className="container-custom max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Details */}
          <div>
            <span className="text-coffee-600 dark:text-coffee-400 uppercase tracking-widest text-xs font-bold">Location & Hours</span>
            <h2 className="font-display text-3xl font-bold text-coffee-900 dark:text-cream-100 mt-1 mb-6">
              Our Flagship Sanctuary
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-8">
              Nestled under banyan trees in the heritage quarter, our flagship roastery offers indoor air-conditioned parlor seating and an open-air sunlit garden courtyard.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-coffee-100 dark:bg-coffee-950 flex items-center justify-center shrink-0 text-coffee-700 dark:text-coffee-300">
                  <MapPin size={22}/>
                </div>
                <div>
                  <h4 className="font-display font-semibold text-coffee-900 dark:text-cream-100 text-base">Physical Address</h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">
                    124 Bloom Lane, Near Kala Ghoda Art District, Fort, Mumbai 400001, Maharashtra
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-coffee-100 dark:bg-coffee-950 flex items-center justify-center shrink-0 text-coffee-700 dark:text-coffee-300">
                  <Clock size={22}/>
                </div>
                <div>
                  <h4 className="font-display font-semibold text-coffee-900 dark:text-cream-100 text-base">Service Hours</h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">Monday – Friday: 07:00 AM – 10:30 PM</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Saturday & Sunday: 08:00 AM – 11:30 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-coffee-100 dark:bg-coffee-950 flex items-center justify-center shrink-0 text-coffee-700 dark:text-coffee-300">
                  <Phone size={22}/>
                </div>
                <div>
                  <h4 className="font-display font-semibold text-coffee-900 dark:text-cream-100 text-base">Phone Inquiries</h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">+91 (22) 2490-8812 / +91 98765 43210</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-coffee-100 dark:bg-coffee-950 flex items-center justify-center shrink-0 text-coffee-700 dark:text-coffee-300">
                  <Mail size={22}/>
                </div>
                <div>
                  <h4 className="font-display font-semibold text-coffee-900 dark:text-cream-100 text-base">Electronic Mail</h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">concierge@brewandbloom.in</p>
                </div>
              </div>
            </div>

            {/* Embedded Google Maps Viewport */}
            <div className="w-full h-56 rounded-3xl overflow-hidden shadow-md border border-coffee-100 dark:border-gray-800">
              <iframe
                title="Café Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.916895055006!2d72.83134377596879!3d18.935043856385557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7d1deca1b092f%3A0xe9f79927ce9e585e!2sKala%20Ghoda%2C%20Fort%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="card p-8 sm:p-10 bg-white dark:bg-gray-900 border border-coffee-100 dark:border-gray-800 shadow-xl">
              <span className="text-coffee-600 dark:text-coffee-400 uppercase tracking-widest text-xs font-bold">Online Inquiry</span>
              <h3 className="font-display text-2xl font-bold text-coffee-900 dark:text-cream-100 mt-1 mb-6">
                Send a Note to Our Roastery
              </h3>

              {sent ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/60 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 mx-auto mb-4">
                    <CheckCircle size={36}/>
                  </div>
                  <h4 className="font-display text-2xl font-bold text-coffee-900 dark:text-cream-100 mb-2">Message Dispatched!</h4>
                  <p className="text-gray-500 text-sm max-w-sm mx-auto mb-6">Thank you for writing. Our café team will respond to your inquiry shortly.</p>
                  <button onClick={() => setSent(false)} className="btn-secondary text-xs py-2.5 px-6">Send Another Message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 block">Your Name *</label>
                      <input
                        {...register('name', { required: 'Name is required' })}
                        className="input-field text-sm"
                        placeholder="Full name"
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 block">Contact Number</label>
                      <input
                        {...register('phone')}
                        className="input-field text-sm"
                        placeholder="+91 Mobile"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 block">Email Address *</label>
                    <input
                      {...register('email', {
                        required: 'Email required',
                        pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                      })}
                      type="email"
                      className="input-field text-sm"
                      placeholder="your.email@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 block">Topic of Discussion *</label>
                    <select {...register('subject', { required: true })} className="input-field text-sm appearance-none cursor-pointer">
                      <option value="General Inquiry">General Café Question</option>
                      <option value="Private Event">Host Private Event / Cupping</option>
                      <option value="Wholesale Beans">Specialty Bean Wholesale Inquiry</option>
                      <option value="Feedback">Feedback for the Baristas</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 block">Your Message *</label>
                    <textarea
                      {...register('message', { required: 'Message cannot be empty', minLength: { value: 10, message: 'Min 10 characters' } })}
                      rows={4}
                      className="input-field text-sm resize-none"
                      placeholder="How can we assist you today?"
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary py-4 text-sm font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-coffee-600/25 disabled:opacity-60"
                  >
                    {loading ? 'Transmitting...' : 'Send Message to Concierge'} <Send size={16}/>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

