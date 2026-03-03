import { Providers } from '@/components/providers'
import { Navbar } from '@/components/navbar'
import { LoginForm } from '@/components/auth/login-form'

export const metadata = {
  title: 'Login | Ultima-Tech',
  description: 'Sign in to your Ultima-Tech account.',
}

export default function LoginPage() {
  return (
    <Providers>
      <Navbar />
      <main className="flex min-h-screen items-center justify-center px-6 pt-20">
        <LoginForm />
      </main>
    </Providers>
  )
}
