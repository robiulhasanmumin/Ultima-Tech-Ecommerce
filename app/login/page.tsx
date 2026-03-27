import LoginForm from '@/components/auth/login-form'
import { Navbar } from '@/components/navbar'
import { Suspense } from 'react'
 
export const metadata = {
  title: 'Login | Ultima-Tech',
  description: 'Sign in to your Ultima-Tech account.',
}

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen items-center justify-center px-6 pt-20">
        <Suspense fallback={
          <div className="flex h-96 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        }>

        <LoginForm/>
        </Suspense>
      </main>
    </>
  )
}
