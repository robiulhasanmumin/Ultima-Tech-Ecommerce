import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import ShopContent from '@/components/shop/shop-content'
 
export const metadata = {
  title: 'Shop | Ultima-Tech',
  description: 'Explore our collection of premium tech gadgets.',
}

export default function ShopPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24">
        <ShopContent />
      </main>
      <Footer />
    </>
  )
}
