import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Target, Zap, Heart, Users } from 'lucide-react'

export const metadata = {
  title: 'About Us | Ultima-Tech',
  description: 'Learn about the mission, vision, and team behind Ultima-Tech.',
}

const values = [
  {
    icon: Target,
    title: 'Our Mission',
    description:
      'To make cutting-edge technology accessible and delightful for everyone, bridging the gap between innovation and everyday life.',
  },
  {
    icon: Zap,
    title: 'Innovation First',
    description:
      'We continuously scout the globe for the most innovative tech products, ensuring our catalog stays ahead of the curve.',
  },
  {
    icon: Heart,
    title: 'Customer Obsession',
    description:
      'Every decision we make starts with our customers. From product curation to after-sales support, your satisfaction drives us.',
  },
  {
    icon: Users,
    title: 'Community Driven',
    description:
      'We believe in building a community of tech enthusiasts who share knowledge, insights, and a passion for the future.',
  },
]

const team = [
  { name: 'Alex Rivera', role: 'Founder & CEO', initials: 'AR' },
  { name: 'Jordan Lee', role: 'Head of Product', initials: 'JL' },
  { name: 'Sam Nakamura', role: 'Lead Engineer', initials: 'SN' },
  { name: 'Priya Sharma', role: 'Design Director', initials: 'PS' },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24">
        {/* Hero */}
        <section className="py-20">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">About Us</p>
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
              Shaping the Future of Tech Retail
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Founded in 2022, Ultima-Tech started with a simple idea: premium technology should be
              easy to discover, trust, and enjoy. Today we serve over 50,000 customers across 85+ countries.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="bg-secondary/30 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="group flex flex-col gap-4 rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/50"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                    <v.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-card-foreground">{v.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12 text-center">
              <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">Our Team</p>
              <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
                Meet the People Behind Ultima-Tech
              </h2>
            </div>
            <div className="mx-auto grid max-w-3xl grid-cols-2 gap-8 lg:grid-cols-4">
              {team.map((member) => (
                <div key={member.name} className="flex flex-col items-center gap-3 text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
                    {member.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
