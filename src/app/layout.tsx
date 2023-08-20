import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { GoogleAnalytics } from './GoogleAnalytics'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FriendTech.info',
  description: 'Analytics and metrics for Friend.tech',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <GoogleAnalytics GA_TRACKING_ID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!} />
      <body className={inter.className}>{children}</body>
    </html>
  )
}
