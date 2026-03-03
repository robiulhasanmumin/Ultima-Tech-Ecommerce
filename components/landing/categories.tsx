import { Headphones, Watch, Monitor } from 'lucide-react'
import Link from 'next/link'

const categories = [
  {
    icon: Headphones,
    title: 'Audio',
    description: 'Headphones, earbuds, and speakers with studio-quality sound.',
  },
  {
    icon: Watch,
    title: 'Wearables',
    description: 'Smartwatches and fitness trackers that redefine your lifestyle.',
  },
  {
    icon: Monitor,
    title: 'Computing',
    description: 'Laptops, tablets, and displays engineered for peak performance.',
  },
]

export function Categories() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">Browse</p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
            Featured Categories
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              href="/shop"
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:scale-105 hover:border-primary/50"
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_#4f46e510_0%,_transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative flex flex-col gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/20">
                  <cat.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground">{cat.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{cat.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
