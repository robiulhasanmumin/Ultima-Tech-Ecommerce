import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ContactForm } from '@/components/contact-form'
import { Mail, MapPin, Phone, Clock } from 'lucide-react'

export const metadata = {
  title: 'Contact | Ultima-Tech',
  description: 'Get in touch with the Ultima-Tech team.',
}

const info = [
  {
    icon: Mail,
    title: 'Email',
    detail: 'support@ultima-tech.com',
    sub: 'We reply within 24 hours',
  },
  {
    icon: Phone,
    title: 'Phone',
    detail: '+1 (555) 123-4567',
    sub: 'Mon-Fri, 9am-6pm EST',
  },
  {
    icon: MapPin,
    title: 'Address',
    detail: '100 Innovation Blvd',
    sub: 'San Francisco, CA 94107',
  },
  {
    icon: Clock,
    title: 'Business Hours',
    detail: 'Mon - Fri, 9am - 6pm',
    sub: 'Weekend support via email',
  },
]

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24">
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-16 text-center">
              <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">Contact</p>
              <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
                Get in Touch
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                Have a question, suggestion, or need help with an order? We would love to hear from you.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
              {/* Contact Info */}
              <div className="flex flex-col gap-6 lg:col-span-2">
                {info.map((item) => (
                  <div
                    key={item.title}
                    className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/50"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-card-foreground">{item.title}</p>
                      <p className="text-sm text-foreground">{item.detail}</p>
                      <p className="text-xs text-muted-foreground">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Form */}
              <div className="lg:col-span-3">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
