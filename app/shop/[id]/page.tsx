import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ProductDetail } from '@/components/shop/product-detail'

export const metadata = {
  title: 'Product Details | Ultima-Tech',
  description: 'View product details and specifications.',
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24">
        <ProductDetail id={id} />
      </main>
      <Footer />
    </>
  )
}
