import { getTopUsers } from '@/api'
import UserTable from '../components/UserTable'
import Banner from '../components/Banner'
import SearchHeader from '../components/SearchHeader'
import Link from 'next/link'

export const metadata = {
  title: 'FriendTech.info',
  openGraph: {
    title: 'FriendTech.info',
    siteName: 'FriendTech.info',
    locale: 'en_US',
    type: 'website',
  },
}

export default async function Home() {
  const data = await getTopUsers()

  return (
    <>
      <Banner />
      <main className="flex flex-col min-h-screen items-center px-4 md:px-8">
        <h1 className="text-2xl md:text-4xl font-bold text-left mt-4 md:mt-8 mb-5 md:mb-10">FriendTech.info</h1>
        <div className="flex flex-col items-center justify-center mt-5 md:mt-10">
          <SearchHeader/>
          <div>
            <strong>Top Accounts</strong> | <Link href="/traders">Top Traders</Link> | <Link href="/recent">Recently Joined</Link>
          </div>
          <UserTable people={data} />
        </div>
      </main>
    </>
  )
}
