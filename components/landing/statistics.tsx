'use client'

import { useEffect, useRef, useState } from 'react'
import { Users, ShoppingBag, Globe, Star } from 'lucide-react'

const stats = [
  { icon: Users, value: 50000, suffix: '+', label: 'Happy Customers' },
  { icon: ShoppingBag, value: 1200, suffix: '+', label: 'Products Sold' },
  { icon: Globe, value: 85, suffix: '+', label: 'Countries Served' },
  { icon: Star, value: 4.9, suffix: '/5', label: 'Average Rating', decimals: 1 },
]

function AnimatedNumber({
  target,
  suffix,
  decimals = 0,
  inView,
}: {
  target: number
  suffix: string
  decimals?: number
  inView: boolean
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 2000
    const increment = target / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target])

  return (
    <span className="text-4xl font-bold tabular-nums text-foreground lg:text-5xl">
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString()}
      {suffix}
    </span>
  )
}

export function Statistics() {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true)
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="bg-secondary/30 py-24">
      <div ref={ref} className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">By the Numbers</p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
            Trusted by Thousands Worldwide
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-8 text-center transition-all duration-300 hover:scale-105 hover:border-primary/50"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/20">
                <stat.icon className="h-7 w-7" />
              </div>
              <AnimatedNumber
                target={stat.value}
                suffix={stat.suffix}
                decimals={stat.decimals}
                inView={inView}
              />
              <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
