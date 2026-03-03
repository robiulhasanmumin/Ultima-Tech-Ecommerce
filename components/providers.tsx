'use client'

import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'react-hot-toast'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <SessionProvider>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            className: '!bg-card !text-card-foreground !border !border-border',
            success: {
              iconTheme: { primary: '#4f46e5', secondary: '#ffffff' },
            },
            error: {
              iconTheme: { primary: '#ef4444', secondary: '#ffffff' },
            },
          }}
        />
      </SessionProvider>
    </ThemeProvider>
  )
}
