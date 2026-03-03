'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import toast from 'react-hot-toast'

export function Newsletter() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      toast.success('Thanks for subscribing!')
      setEmail('')
    }
  }

  return (
    <section className="bg-secondary/30 py-24">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">Newsletter</p>
        <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
          Stay Ahead of the Curve
        </h2>
        <p className="mt-4 text-muted-foreground">
          Be the first to know about new releases, exclusive deals, and tech insights.
        </p>
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-0">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="flex-1 rounded-lg border border-border bg-card px-5 py-3 text-sm text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none sm:rounded-r-none sm:border-r-0"
            required
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary/90 sm:rounded-l-none"
          >
            <Send className="h-4 w-4" />
            Subscribe
          </button>
        </form>
      </div>
    </section>
  )
}
