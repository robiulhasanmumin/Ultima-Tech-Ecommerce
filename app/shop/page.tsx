 import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import ShopContent from '@/components/shop/shop-content'
import { Suspense } from 'react'
 
export const metadata = {
  title: 'Shop | Ultima-Tech',
  description: 'Explore our collection of premium tech gadgets.',
}

export default function ShopPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div>Loading shop...</div>}>
      <main className="min-h-screen pt-24">
        <ShopContent />
      </main>
      </Suspense>
      <Footer />
    </>
  )
}
