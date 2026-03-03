import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/landing/hero'
import { Categories } from '@/components/landing/categories'
import { Trending } from '@/components/landing/trending'
import { Statistics } from '@/components/landing/statistics'
import { Testimonials } from '@/components/landing/testimonials'
import { BrandValues } from '@/components/landing/brand-values'
import { Faq } from '@/components/landing/faq'
import { Newsletter } from '@/components/landing/newsletter'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <Trending />
        <Statistics />
        <BrandValues />
        <Testimonials />
        <Faq />
        <Newsletter />
      </main>
      <Footer />
    </>
  )
}
