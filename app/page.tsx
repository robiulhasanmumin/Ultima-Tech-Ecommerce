import { Providers } from '@/components/providers'
import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/landing/hero'
import { Categories } from '@/components/landing/categories'
import { Trending } from '@/components/landing/trending'
import { BrandValues } from '@/components/landing/brand-values'
import { Newsletter } from '@/components/landing/newsletter'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <Providers>
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <Trending />
        <BrandValues />
        <Newsletter />
      </main>
      <Footer />
    </Providers>
  )
}
