import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { GoogleAnalytics } from "nextjs-google-analytics";

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
      <GoogleAnalytics trackPageViews />
      <body className={inter.className}>{children}</body>
    </html>
  )
}
