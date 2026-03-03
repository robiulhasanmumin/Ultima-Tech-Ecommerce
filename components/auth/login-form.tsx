'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Lock, Mail, Eye, EyeOff } from 'lucide-react'
import toast from 'react-hot-toast'

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    setLoading(false)

    if (result?.ok) {
      toast.success('Welcome back!')
      router.push('/')
      router.refresh()
    } else {
      toast.error('Invalid credentials. Try admin@ultima.tech / admin123')
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="overflow-hidden rounded-2xl border border-border bg-card/80 backdrop-blur-xl">
        <div className="bg-[radial-gradient(ellipse_at_top,_#4f46e520_0%,_transparent_70%)] p-8">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <Lock className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-card-foreground">Welcome Back</h1>
            <p className="mt-2 text-sm text-muted-foreground">Sign in to your Ultima-Tech account</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-card-foreground">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@ultima.tech"
                  className="w-full rounded-lg border border-border bg-secondary py-3 pl-11 pr-4 text-sm text-secondary-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-medium text-card-foreground">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="admin123"
                  className="w-full rounded-lg border border-border bg-secondary py-3 pl-11 pr-11 text-sm text-secondary-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary/90 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 rounded-lg border border-border/50 bg-secondary/50 p-3 text-center">
            <p className="text-xs text-muted-foreground">
              Demo credentials: <span className="font-medium text-foreground">admin@ultima.tech</span> / <span className="font-medium text-foreground">admin123</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
