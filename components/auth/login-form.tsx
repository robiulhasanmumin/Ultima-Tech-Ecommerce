'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Lock, Mail, Eye, EyeOff } from 'lucide-react'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'

export default function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const searchParams = useSearchParams()
   const callbackUrl = searchParams.get('callbackUrl') || '/'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,  
    })

    setLoading(false)

    if (result?.error) {
      Swal.fire({
        title: 'Login Failed',
        text: result.error, 
        icon: 'error',
      })
    } else {
      Swal.fire({
        title: 'Welcome Back!',
        text: 'Login successful.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      })
       router.push(callbackUrl)
      router.refresh()
    }
  }

  const handleGoogleLogin = async () => {
    Swal.fire({
      title: 'Connecting to Google...',
      text: 'Please wait while we redirect you.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();  
      }
    });

    try {
       await signIn('google', { callbackUrl: callbackUrl });
    } catch (error) {
      Swal.fire({
        title: 'Oops!',
        text: 'Something went wrong with Google Login.',
        icon: 'error',
      });
    }
  };

  return (
    <div className="flex min-h-[90vh] items-center justify-center px-4 py-2 bg-background">
        <div className="w-full max-w-lg"> 
         <div className="overflow-hidden rounded-3xl border border-border bg-card/50 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
           <div className="bg-[radial-gradient(ellipse_at_top,_#4f46e515_0%,_transparent_70%)] p-10 md:p-12">
             
             <div className="mb-10 text-center">
               <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20">
                 <Lock className="h-8 w-8 text-primary" />
               </div>
               <h1 className="text-2xl font-extrabold tracking-tight text-card-foreground">Welcome Back</h1>
               <p className="mt-2 text-sm text-muted-foreground font-medium">Access your premium tech dashboard</p>
             </div>

             {/* Google Login  */}
             <button
               onClick={handleGoogleLogin}
               type="button"
               className="flex w-full items-center justify-center gap-4 rounded-xl border border-border bg-background py-3 text-sm font-bold text-foreground transition-all duration-300 hover:bg-secondary hover:shadow-md active:scale-[0.98]"
             >
               <svg className="h-5 w-5" viewBox="0 0 24 24">
                 <path
                   d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                   fill="#4285F4"
                 />
                 <path
                   d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                   fill="#34A853"
                 />
                 <path
                   d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                   fill="#FBBC05"
                 />
                 <path
                   d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"
                   fill="#EA4335"
                 />
               </svg>
               Continue with Google
             </button>

             <div className="relative my-10">
               <div className="absolute inset-0 flex items-center">
                 <span className="w-full border-t border-border"></span>
               </div>
               <div className="relative flex justify-center text-xs uppercase">
                 <span className="bg-card px-4 text-muted-foreground font-semibold tracking-wider">Or secure email login</span>
               </div>
             </div>

             <form onSubmit={handleSubmit} className="flex flex-col gap-6">
               <div className="flex flex-col gap-2.5">
                 <label htmlFor="email" className="text-sm font-bold text-card-foreground ml-1">
                   Email Address
                 </label>
                 <div className="relative">
                   <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                   <input
                     id="email"
                     type="email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     placeholder="name@example.com"
                     className="w-full rounded-xl border border-border bg-secondary/30 py-4 pl-12 pr-4 text-sm font-medium transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none focus:bg-background"
                     required
                   />
                 </div>
               </div>

               <div className="flex flex-col gap-2.5">
                 <label htmlFor="password" className="text-sm font-bold text-card-foreground ml-1">
                   Password
                 </label>
                 <div className="relative">
                   <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                   <input
                     id="password"
                     type={showPassword ? 'text' : 'password'}
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     placeholder="••••••••"
                     className="w-full rounded-xl border border-border bg-secondary/30 py-4 pl-12 pr-12 text-sm font-medium transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none focus:bg-background"
                     required
                   />
                   <button
                     type="button"
                     onClick={() => setShowPassword(!showPassword)}
                     className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                   >
                     {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                   </button>
                 </div>
               </div>

               <button
                 type="submit"
                 disabled={loading}
                 className="mt-4 flex h-14 items-center justify-center rounded-xl bg-primary text-base font-bold text-primary-foreground shadow-xl shadow-primary/20 transition-all duration-300 hover:bg-primary/90 hover:shadow-primary/40 disabled:opacity-50 active:scale-[0.98]"
               >
                 {loading ? (
                   <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                 ) : (
                   'Sign In'
                 )}
               </button>
             </form>

             <div className="mt-10 text-center border-t border-border/50 pt-8">
               <p className="text-sm text-muted-foreground font-medium">
                 Don&apos;t have an account yet?{' '}
                 <Link href="/register" className="font-bold text-primary hover:text-primary/80 transition-colors underline-offset-4 hover:underline">
                   Create Account
                 </Link>
               </p>
             </div>
           </div>
         </div>
       </div>
     </div>
  )
}