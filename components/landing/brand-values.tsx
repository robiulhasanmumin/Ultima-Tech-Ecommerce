import { Truck, Headset, ShieldCheck } from 'lucide-react'

const values = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'Free express shipping on all orders over $100. Delivered in 2-3 business days.',
  },
  {
    icon: Headset,
    title: '24/7 Support',
    description: 'Our expert team is available around the clock to help with any questions.',
  },
  {
    icon: ShieldCheck,
    title: '2-Year Warranty',
    description: 'Every product comes with a comprehensive 2-year manufacturer warranty.',
  },
]

export function BrandValues() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {values.map((val) => (
            <div
              key={val.title}
              className="group flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-8 text-center transition-all duration-300 hover:scale-105 hover:border-primary/50"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/20">
                <val.icon className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground">{val.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{val.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
