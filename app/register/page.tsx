import RegisterForm from '@/components/auth/register'
import { Navbar } from '@/components/navbar'
import { Suspense } from 'react'
  
export const metadata = {
  title: 'Register | Ultima-Tech',
  description: 'Create a new Ultima-Tech account.',
}

export default function RegisterPage() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen items-center justify-center px-6 pt-20">
        <Suspense fallback={
          <div className="flex h-96 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        }>

        <RegisterForm />
        </Suspense>
      </main>
    </>
  )
}
