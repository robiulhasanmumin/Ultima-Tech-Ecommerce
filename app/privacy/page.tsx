import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export const metadata = {
  title: 'Privacy Policy | Ultima-Tech',
  description: 'Ultima-Tech privacy policy. Learn how we collect, use, and protect your data.',
}

const sections = [
  {
    title: '1. Information We Collect',
    content:
      'We collect personal information you voluntarily provide, such as your name, email address, shipping address, and payment details when you create an account or place an order. We also automatically collect device and usage information, including your IP address, browser type, pages visited, and interaction data through cookies and similar technologies.',
  },
  {
    title: '2. How We Use Your Information',
    content:
      'Your information is used to process and fulfill orders, communicate with you about your account and purchases, personalize your shopping experience, send promotional emails (with your consent), improve our website and services, and comply with legal obligations. We never sell your personal data to third parties.',
  },
  {
    title: '3. Data Sharing & Third Parties',
    content:
      'We share your data only with trusted service providers who help us operate our business, such as payment processors, shipping carriers, and analytics providers. These partners are contractually obligated to protect your data and use it only for the purposes we specify.',
  },
  {
    title: '4. Data Security',
    content:
      'We implement industry-standard security measures including SSL/TLS encryption, secure payment processing, regular security audits, and restricted access to personal data. While no system is 100% secure, we continuously work to protect your information from unauthorized access or disclosure.',
  },
  {
    title: '5. Cookies & Tracking',
    content:
      'Our website uses cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can manage your cookie preferences through your browser settings. Essential cookies are required for the site to function properly.',
  },
  {
    title: '6. Your Rights',
    content:
      'You have the right to access, update, or delete your personal information at any time by contacting us or through your account settings. You can opt out of marketing communications by clicking the unsubscribe link in any email. Depending on your location, you may have additional rights under GDPR, CCPA, or other privacy regulations.',
  },
  {
    title: '7. Data Retention',
    content:
      'We retain your personal data for as long as your account is active or as needed to provide you services, comply with legal obligations, resolve disputes, and enforce our agreements. When data is no longer needed, it is securely deleted or anonymized.',
  },
  {
    title: '8. Changes to This Policy',
    content:
      'We may update this privacy policy from time to time to reflect changes in our practices or applicable laws. We will notify you of significant changes by posting a notice on our website or sending you an email. Your continued use of our services after any changes constitutes acceptance of the updated policy.',
  },
]

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24">
        <section className="py-20">
          <div className="mx-auto max-w-3xl px-6">
            <div className="mb-12 text-center">
              <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">Legal</p>
              <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
                Privacy Policy
              </h1>
              <p className="mt-4 text-sm text-muted-foreground">Last updated: March 1, 2026</p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-8">
              <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
                At Ultima-Tech, we take your privacy seriously. This policy explains how we collect,
                use, disclose, and safeguard your information when you visit our website or make a purchase.
                Please read this policy carefully.
              </p>

              <div className="flex flex-col gap-8">
                {sections.map((s) => (
                  <div key={s.title}>
                    <h2 className="mb-3 text-base font-semibold text-foreground">{s.title}</h2>
                    <p className="text-sm leading-relaxed text-muted-foreground">{s.content}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 border-t border-border pt-6">
                <p className="text-sm text-muted-foreground">
                  If you have any questions about this privacy policy, please contact us at{' '}
                  <a href="mailto:privacy@ultima-tech.com" className="text-primary hover:underline">
                    privacy@ultima-tech.com
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
