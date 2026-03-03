import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#4f46e520_0%,_transparent_50%)]" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-12 px-6 lg:flex-row lg:gap-16">
        {/* Text */}
        <div className="flex flex-1 flex-col gap-8">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-xs font-medium text-muted-foreground">New Collection 2026</span>
          </div>

          <h1 className="text-balance text-5xl font-bold leading-tight tracking-tight text-foreground lg:text-7xl">
            Future on
            <br />
            <span className="text-primary">Your Wrist</span>
          </h1>

          <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
            Discover the next generation of premium tech gadgets. Engineered for performance, designed for elegance.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/shop"
              className="group inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:scale-105 hover:bg-primary/90"
            >
              Shop Now
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/shop"
              className="rounded-lg border border-border px-8 py-3.5 text-sm font-semibold text-foreground transition-all duration-300 hover:scale-105 hover:border-primary/50 hover:bg-secondary"
            >
              Explore
            </Link>
          </div>

          <div className="flex gap-8 pt-4">
            <div>
              <p className="text-2xl font-bold text-foreground">200+</p>
              <p className="text-xs text-muted-foreground">Products</p>
            </div>
            <div className="border-l border-border pl-8">
              <p className="text-2xl font-bold text-foreground">50K+</p>
              <p className="text-xs text-muted-foreground">Customers</p>
            </div>
            <div className="border-l border-border pl-8">
              <p className="text-2xl font-bold text-foreground">4.9</p>
              <p className="text-xs text-muted-foreground">Rating</p>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="relative flex flex-1 items-center justify-center">
          <div className="absolute h-[400px] w-[400px] rounded-full bg-primary/10 blur-3xl" />
          <div className="relative h-[400px] w-[400px] overflow-hidden rounded-3xl border border-border/50 lg:h-[500px] lg:w-[500px]">
            <Image
              src="/images/hero-watch.jpg"
              alt="Premium smartwatch floating in space with glowing blue accents"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
