'use client'

import { useState } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Software Engineer',
    rating: 5,
    text: 'The quality of the headphones I purchased from Ultima-Tech is outstanding. Crystal clear audio, premium build, and the noise cancellation is genuinely the best I have experienced.',
    avatar: 'SC',
  },
  {
    name: 'Marcus Johnson',
    role: 'Creative Director',
    rating: 5,
    text: 'I have been a loyal customer for over two years now. Every product I have ordered has exceeded my expectations. The smartwatch is a game-changer for my daily workflow.',
    avatar: 'MJ',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Product Designer',
    rating: 5,
    text: 'Incredible customer service and fast shipping. The laptop I bought is sleek, powerful, and perfect for design work. Ultima-Tech truly understands premium tech.',
    avatar: 'ER',
  },
  {
    name: 'David Kim',
    role: 'Startup Founder',
    rating: 4,
    text: 'The whole experience from browsing to delivery was seamless. The tablet I got is perfect for presentations and note-taking. Highly recommended for professionals.',
    avatar: 'DK',
  },
  {
    name: 'Aisha Patel',
    role: 'Data Scientist',
    rating: 5,
    text: 'Ultima-Tech has the best curated collection of tech gadgets I have found anywhere. The earbuds are my daily companion and the sound quality is phenomenal.',
    avatar: 'AP',
  },
  {
    name: 'James Wilson',
    role: 'Photographer',
    rating: 5,
    text: 'As someone who values both aesthetics and performance, Ultima-Tech delivers on both fronts. The speaker I purchased has an incredibly rich and immersive sound profile.',
    avatar: 'JW',
  },
]

export function Testimonials() {
  const [page, setPage] = useState(0)
  const perPage = 3
  const totalPages = Math.ceil(testimonials.length / perPage)
  const visible = testimonials.slice(page * perPage, page * perPage + perPage)

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">Testimonials</p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
            What Our Customers Say
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Real feedback from real customers who trust Ultima-Tech for their premium tech needs.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {visible.map((t) => (
            <div
              key={t.name}
              className="group relative flex flex-col gap-5 rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
            >
              <Quote className="absolute top-6 right-6 h-8 w-8 text-primary/10 transition-colors group-hover:text-primary/20" />
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < t.rating ? 'fill-primary text-primary' : 'text-muted-foreground/30'
                    }`}
                  />
                ))}
              </div>
              <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{t.text}</p>
              <div className="flex items-center gap-3 border-t border-border pt-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium text-card-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-all hover:border-primary/50 disabled:opacity-30 disabled:hover:border-border"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === page ? 'w-8 bg-primary' : 'w-2.5 bg-border hover:bg-muted-foreground/40'
                  }`}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-all hover:border-primary/50 disabled:opacity-30 disabled:hover:border-border"
              aria-label="Next testimonials"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
