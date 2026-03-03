import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { AddProductForm } from '@/components/dashboard/add-product-form'

export const metadata = {
  title: 'Add Product | Ultima-Tech',
  description: 'Add a new product to the Ultima-Tech store.',
}

export default function AddProductPage() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen items-center justify-center px-6 pt-24 pb-12">
        <AddProductForm />
      </main>
      <Footer />
    </>
  )
}
