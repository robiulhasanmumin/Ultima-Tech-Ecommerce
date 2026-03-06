'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'
import {
  Menu,
  X,
  User,
  PlusCircle,
  LayoutDashboard,
  LogOut,
  ChevronDown,
} from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/shop' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy' },
]

export function Navbar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 border-b border-border bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold tracking-tight text-foreground">
          ULTIMA<span className="text-primary">-TECH</span>
        </Link>

         <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`relative text-sm transition-all duration-300 ${
                  isActive
                    ? 'font-medium text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-primary" />
                )}
              </Link>
            )
          })}
        </div>

         <div className="hidden items-center gap-4 lg:flex">
          <ThemeToggle />
          {session ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground transition-all duration-300 hover:border-primary/50"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                  {session.user?.name?.charAt(0) || 'U'}
                </div>
                <span className="text-secondary-foreground">{session.user?.name}</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 overflow-hidden rounded-lg border border-border bg-card shadow-xl">
                  <div className="border-b border-border px-4 py-3">
                    <p className="text-sm font-medium text-card-foreground">{session.user?.name}</p>
                    <p className="text-xs text-muted-foreground">{session.user?.email}</p>
                  </div>
                  <Link
                    href="/add-product"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-secondary-foreground transition-colors hover:bg-secondary"
                  >
                    <PlusCircle className="h-4 w-4" />
                    Add Product
                  </Link>
                  <Link
                    href="/manage-products"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-secondary-foreground transition-colors hover:bg-secondary"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Manage Products
                  </Link>
                  <button
                    onClick={() => {
                      setDropdownOpen(false)
                      signOut()
                    }}
                    className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-destructive transition-colors hover:bg-secondary"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-all duration-300 hover:scale-105 hover:bg-primary/90"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile & Tab Menu Toggle - এখন 1024px এর নিচে গেলেই (lg:hidden) এটি আসবে */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-foreground lg:hidden"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile & Tab Menu - 1024px এর নিচের সব ডিভাইসের জন্য */}
      {mobileOpen && (
        <div className="border-t border-border bg-background/95 px-6 pb-6 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-4 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Theme</span>
              <ThemeToggle />
            </div>
            {navLinks.map((link) => {
              const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-sm transition-colors ${
                    isActive
                      ? 'font-medium text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
            {session ? (
              <>
                <Link
                  href="/add-product"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <PlusCircle className="h-4 w-4" />
                  Add Product
                </Link>
                <Link
                  href="/manage-products"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Manage Products
                </Link>
                <button
                  onClick={() => {
                    setMobileOpen(false)
                    signOut()
                  }}
                  className="flex items-center gap-2 text-sm text-destructive"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg bg-primary px-5 py-2 text-center text-sm font-medium text-primary-foreground"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}