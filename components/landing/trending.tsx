import Image from 'next/image'
import Link from 'next/link'
import { Eye } from 'lucide-react'

const trendingProducts = [
  {
    id: '1',
    title: 'Nova Pro Headphones',
    price: 349,
    image: '/images/product-headphones.jpg',
  },
  {
    id: '6',
    title: 'Pulse Fit Watch',
    price: 599,
    image: '/images/product-watch.jpg',
  },
  {
    id: '2',
    title: 'Zenith UltraBook',
    price: 1999,
    image: '/images/product-laptop.jpg',
  },
  {
    id: '5',
    title: 'Echo Sphere Speaker',
    price: 449,
    image: '/images/product-speaker.jpg',
  },
]

export function Trending() {
  return (
    <section className="bg-secondary/30 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">Popular</p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
            Trending Products
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trendingProducts.map((product) => (
            <div
              key={product.id}
              className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:scale-105 hover:border-primary/50"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <Link
                  href={`/shop/${product.id}`}
                  className="absolute inset-0 flex items-center justify-center bg-background/60 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100"
                >
                  <span className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90">
                    <Eye className="h-4 w-4" />
                    Quick View
                  </span>
                </Link>
              </div>
              <div className="p-5">
                <h3 className="text-sm font-semibold text-card-foreground">{product.title}</h3>
                <p className="mt-1 text-lg font-bold text-primary">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
