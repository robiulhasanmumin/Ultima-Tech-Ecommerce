import Link from 'next/link'
import { Github, Twitter, Instagram, Linkedin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="text-xl font-bold tracking-tight text-foreground">
              ULTIMA<span className="text-primary">-TECH</span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Premium tech gadgets for the modern innovator. Discover the future of technology.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground transition-colors hover:text-primary" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground transition-colors hover:text-primary" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground transition-colors hover:text-primary" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground transition-colors hover:text-primary" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Products</h3>
            <div className="flex flex-col gap-2.5">
              <Link href="/shop" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Audio</Link>
              <Link href="/shop" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Wearables</Link>
              <Link href="/shop" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Computing</Link>
              <Link href="/shop" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Accessories</Link>
            </div>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Company</h3>
            <div className="flex flex-col gap-2.5">
              <Link href="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground">About Us</Link>
              <Link href="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Careers</Link>
              <Link href="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Press</Link>
              <Link href="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Contact</Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Stay Updated</h3>
            <p className="text-sm text-muted-foreground">Get the latest news and product updates.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-lg border border-border bg-secondary px-4 py-2 text-sm text-secondary-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
              <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-xs text-muted-foreground">
            {'2026 Ultima-Tech. All rights reserved.'}
          </p>
          <div className="flex gap-6">
            <Link href="/" className="text-xs text-muted-foreground transition-colors hover:text-foreground">Privacy</Link>
            <Link href="/" className="text-xs text-muted-foreground transition-colors hover:text-foreground">Terms</Link>
            <Link href="/" className="text-xs text-muted-foreground transition-colors hover:text-foreground">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
