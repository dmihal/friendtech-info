import { getRecentUsers } from '@/api'
import RecentUsersTable from './RecentUsersTable'
import Link from 'next/link'

export const metadata = {
  openGraph: {
    title: 'Recent Users - FriendTech.info',
    siteName: 'FriendTech.info',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Recent Users - FriendTech.info',
    description: 'Friend.tech metrics',
    creator: '@friendtechinfo',
  },
}

export default async function Home() {
  const data = await getRecentUsers()

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <h1 className="text-4xl font-bold left-aligned mt-8 mb-4">FriendTech.info</h1>
      <div>
        <Link href="/">Top Accounts</Link> | <Link href="/traders">Top Traders</Link> | <strong>Recently Joined</strong>
      </div>
      <div className="flex items-center justify-center w-2/3">
        <RecentUsersTable people={data} />
      </div>
    </main>
  )
}
