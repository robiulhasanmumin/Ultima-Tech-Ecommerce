import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import heroimg from '@/public/gaget.png'

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-12 lg:pt-0 lg:pb-0 lg:mt-8">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#4f46e520_0%,_transparent_50%)]" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-10 px-6 lg:flex-row lg:gap-16">
        
        {/* 1. Text Section */}
        <div className="flex flex-1 flex-col gap-6 order-2 lg:order-1 lg:gap-6">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 mx-auto lg:mx-0">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest sm:text-xs">New Collection 2026</span>
          </div>

          <h1 className="text-balance text-center text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-6xl lg:text-left lg:text-7xl">
            Future on
            <br />
            <span className="text-primary">Your Wrist</span>
          </h1>

          <p className="max-w-md mx-auto text-center text-sm leading-relaxed text-muted-foreground sm:text-lg lg:mx-0 lg:text-left">
            Discover the next generation of premium tech gadgets. Engineered for performance, designed for elegance.
          </p>

          <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
            <Link
              href="/shop"
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:scale-105 hover:bg-primary/90 sm:px-8 sm:py-4"
            >
              Shop Now
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/shop"
              className="rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:scale-105 hover:border-primary/50 hover:bg-secondary sm:px-8 sm:py-4"
            >
              Explore
            </Link>
          </div>

          {/* Stats Section */}
          <div className="flex justify-center gap-6 border-t border-border pt-8 sm:gap-12 lg:justify-start">
            <div className="text-center lg:text-left">
              <p className="text-xl font-bold text-foreground sm:text-3xl">200+</p>
              <p className="text-[10px] text-muted-foreground uppercase sm:text-xs">Products</p>
            </div>
            <div className="border-l border-border pl-6 text-center sm:pl-12 lg:text-left">
              <p className="text-xl font-bold text-foreground sm:text-3xl">50K+</p>
              <p className="text-[10px] text-muted-foreground uppercase sm:text-xs">Customers</p>
            </div>
            <div className="border-l border-border pl-6 text-center sm:pl-12 lg:text-left">
              <p className="text-xl font-bold text-foreground sm:text-3xl">4.9</p>
              <p className="text-[10px] text-muted-foreground uppercase sm:text-xs">Rating</p>
            </div>
          </div>
        </div>

         <div className="relative flex w-full flex-1 items-center justify-center order-1 lg:order-2">
          {/* Glowing Background effect */}
          <div className="absolute h-64 w-64 rounded-full bg-primary/20 blur-[80px] sm:h-80 sm:w-80 lg:h-[500px] lg:w-[500px]" />
          
          {/* Image Container */}
          <div className="relative h-[300px] w-[300px] sm:h-[400px] sm:w-[400px] lg:h-[550px] lg:w-[550px]">
            <Image
              src={heroimg}
              alt="Premium smartwatch"
              fill
              className="object-contain"  
              priority
            />
          </div>
        </div>

      </div>
    </section>
  )
}