'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import toast from 'react-hot-toast'

export function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        toast.success('Message sent! We will get back to you soon.')
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        const data = await res.json()
        toast.error(data.error || 'Failed to send message.')
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors'

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-8">
      <h3 className="mb-6 text-lg font-semibold text-card-foreground">Send Us a Message</h3>
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-foreground">
              Name
            </label>
            <input
              id="contact-name"
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClass}
              required
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-foreground">
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={inputClass}
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="contact-subject" className="mb-1.5 block text-sm font-medium text-foreground">
            Subject
          </label>
          <input
            id="contact-subject"
            type="text"
            placeholder="How can we help?"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className={inputClass}
            required
          />
        </div>
        <div>
          <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-foreground">
            Message
          </label>
          <textarea
            id="contact-message"
            rows={5}
            placeholder="Tell us more..."
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className={`${inputClass} resize-none`}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary/90 disabled:opacity-60"
        >
          <Send className="h-4 w-4" />
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </div>
    </form>
  )
}