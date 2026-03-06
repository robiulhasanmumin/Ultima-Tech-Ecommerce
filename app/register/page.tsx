import RegisterForm from '@/components/auth/register'
import { Navbar } from '@/components/navbar'
  
export const metadata = {
  title: 'Register | Ultima-Tech',
  description: 'Create a new Ultima-Tech account.',
}

export default function RegisterPage() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen items-center justify-center px-6 pt-20">
        <RegisterForm />
      </main>
    </>
  )
}
