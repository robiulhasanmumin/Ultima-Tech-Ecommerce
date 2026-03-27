'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'
import useSWR from 'swr'  
import Swal from 'sweetalert2'  
import {
  Menu,
  X,
  User,
  PlusCircle,
  LayoutDashboard,
  LogOut,
  ChevronDown,
  Heart,
  ShoppingBag,  
} from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'

// Fetcher Function
const fetcher = (url: string) => fetch(url).then((r) => r.json())

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/shop' },
  { label: 'My Orders', href: '/my-orders' },  
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: "Privacy Policy", href: "/privacy" },
]

export function Navbar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

   const { data: favorites } = useSWR(session ? '/api/my-fav' : null, fetcher, {
    refreshInterval: 1000  
  })
  
  const favCount = favorites?.length || 0
  const isFavActive = pathname === '/favorites' 

const handleLogout = () => {
    setDropdownOpen(false)
    setMobileOpen(false)

    Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out of your account!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Logout!',
      background: 'var(--card)',
      color: 'var(--foreground)',
    }).then((result) => {
      if (result.isConfirmed) {
         const Toast = Swal.mixin({
           showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          background: 'var(--card)',
          color: 'var(--foreground)',
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

         Toast.fire({
          icon: 'success',
          title: 'Logged out successfully!'
        })

         setTimeout(() => {
          signOut({ callbackUrl: '/' })
        }, 1800)
      }
    })
  }



  return (
    <nav className="fixed top-0 right-0 left-0 z-50 border-b border-border bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold tracking-tight text-foreground">
          ULTIMA<span className="text-primary">-TECH</span>
        </Link>

        {/* Desktop Nav Links */}
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

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 lg:flex">
          {/* Heart Icon with Badge & Active State */}
          <Link
            href="/favorites"
            className={`relative flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-300 ${
              isFavActive 
              ? 'border-primary bg-primary/10 text-primary' 
              : 'border-border bg-secondary/50 text-muted-foreground hover:border-primary/50 hover:text-primary'
            }`}
          >
            <Heart className={`h-5 w-5 transition-colors ${isFavActive ? 'fill-primary text-primary' : ''}`} />
            
            {favCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground animate-in zoom-in">
                {favCount}
              </span>
            )}
          </Link>

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
                <span className="sr-only">Toggle user menu</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>
              
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 overflow-hidden rounded-lg border border-border bg-card shadow-xl animate-in fade-in zoom-in duration-200">
                  <div className="border-b border-border px-4 py-3 bg-muted/30">
                    <p className="text-sm font-medium text-card-foreground">{session.user?.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{session.user?.email}</p>
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
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-destructive transition-colors hover:bg-secondary border-t border-border"
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

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-foreground lg:hidden"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background/95 px-6 pb-6 backdrop-blur-xl lg:hidden animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-4 pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Link
                  href="/favorites"
                  onClick={() => setMobileOpen(false)}
                  className={`relative flex h-9 w-9 items-center justify-center rounded-lg border ${
                    isFavActive 
                    ? 'border-primary bg-primary/10 text-primary' 
                    : 'border-border bg-secondary/50 text-muted-foreground'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isFavActive ? 'fill-primary' : ''}`} />
                  {favCount > 0 && (
                    <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                      {favCount}
                    </span>
                  )}
                </Link>
                <span className={`text-sm font-medium ${isFavActive ? 'text-primary' : ''}`}>My Favorites</span>
              </div>
              <div className='flex items-center gap-2'>
                <ThemeToggle />
                <span className="text-sm font-medium">Theme</span>
              </div>
            </div>

            <div className="space-y-1">
              {navLinks.map((link) => {
                const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block py-2 text-sm transition-colors ${
                      isActive ? 'font-semibold text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>

            {session ? (
              <div className="space-y-3 pt-2 border-t border-border">
                <Link
                  href="/add-product"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <PlusCircle className="h-4 w-4" />
                  Add Product
                </Link>
                <Link
                  href="/manage-products"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Manage Products
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-sm text-destructive font-medium"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
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