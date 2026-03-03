'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'What is the return policy?',
    answer:
      'We offer a 30-day hassle-free return policy on all products. If you are not satisfied with your purchase, simply contact our support team and we will arrange a free return pickup and issue a full refund within 5-7 business days.',
  },
  {
    question: 'Do you offer international shipping?',
    answer:
      'Yes, we ship to over 85 countries worldwide. International orders typically arrive within 7-14 business days. Free express shipping is available for orders over $100 in select regions.',
  },
  {
    question: 'Are all products covered by warranty?',
    answer:
      'Every product sold on Ultima-Tech comes with a comprehensive 2-year manufacturer warranty. This covers defects in materials and workmanship under normal use. Extended warranty plans are also available at checkout.',
  },
  {
    question: 'How can I track my order?',
    answer:
      'Once your order ships, you will receive an email with a tracking number and a link to our real-time tracking page. You can also check your order status anytime by logging into your account dashboard.',
  },
  {
    question: 'Do you offer bulk or corporate pricing?',
    answer:
      'Absolutely. We offer special pricing for bulk orders and corporate clients. Please reach out to our sales team through the Contact page or email business@ultima-tech.com for a custom quote.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, Google Pay, and select cryptocurrency options. All transactions are secured with industry-standard encryption.',
  },
]

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left transition-colors hover:text-primary"
        aria-expanded={open}
      >
        <span className="text-sm font-medium text-foreground pr-4">{question}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ${
            open ? 'rotate-180 text-primary' : ''
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ${
          open ? 'grid-rows-[1fr] pb-5 opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-sm leading-relaxed text-muted-foreground">{answer}</p>
        </div>
      </div>
    </div>
  )
}

export function Faq() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">FAQ</p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Find answers to the most common questions about our products, shipping, and policies.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card px-6">
          {faqs.map((faq) => (
            <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  )
}
