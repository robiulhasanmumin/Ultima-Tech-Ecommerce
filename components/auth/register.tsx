'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'  
import Link from 'next/link'
import { signIn } from 'next-auth/react'  
import { Lock, Mail, User, Eye, EyeOff, ArrowRight } from 'lucide-react'
import Swal from 'sweetalert2'

export default function RegisterForm() {
  const router = useRouter()
  const searchParams = useSearchParams()  
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

   const callbackUrl = searchParams.get('callbackUrl') || '/'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
       const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await res.json()

      if (res.ok) {
          const loginRes = await signIn('credentials', {
          email,
          password,
          redirect: false,  
        })

        if (loginRes?.ok) {
          Swal.fire({
            title: 'Success!',
            text: 'Account created and logged in successfully!',
            icon: 'success',
            confirmButtonColor: '#4f46e5',
            timer: 2000,
            showConfirmButton: false
          })
          
           setTimeout(() => {
             router.push(callbackUrl)
            router.refresh()  
          }, 500)
        }
      } else {
        Swal.fire({
          title: 'Error!',
          text: data.message || 'Registration failed',
          icon: 'error',
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Oops!',
        text: 'Something went wrong!',
        icon: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[90vh] items-center justify-center px-4 py-8 bg-background">
      <div className="w-full max-w-lg">
        <div className="overflow-hidden rounded-3xl border border-border bg-card/50 backdrop-blur-xl shadow-2xl">
          <div className="bg-[radial-gradient(ellipse_at_top,_#4f46e520_0%,_transparent_70%)] p-10 md:p-12">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <User className="h-7 w-7 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-card-foreground">Create Account</h1>
              <p className="mt-2 text-sm text-muted-foreground">Join Ultima-Tech to start shopping</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-card-foreground ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full rounded-xl border border-border bg-secondary/30 py-4 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-card-foreground ml-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-border bg-secondary/30 py-4 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-card-foreground ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-border bg-secondary/30 py-4 pl-12 pr-12 text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:outline-none"
                    required
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 flex h-14 items-center justify-center gap-2 rounded-xl bg-primary text-base font-bold text-primary-foreground transition-all duration-300 hover:bg-primary/90 disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Register Now'}
                {!loading && <ArrowRight className="h-5 w-5" />}
              </button>
            </form>

            <div className="mt-8 text-center border-t border-border/50 pt-6">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                 <Link href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`} className="font-bold text-primary hover:underline">Sign in here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}