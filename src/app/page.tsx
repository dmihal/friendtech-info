import { getTopUsers } from '@/api'
import BasicTable from '../components/BasicTable'
import Banner from '../components/Banner'
import SearchHeader from '../components/SearchHeader'

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
      <main className="flex min-h-screen flex-col items-center p-8">
        <h1 className="text-4xl font-bold left-aligned mt-8 mb-10">FriendTech.info</h1>
        <div className="flex flex-col items-center justify-center mt-10">
          <SearchHeader/>
          <BasicTable people={data} />
        </div>
      </main>
    </>
  )
}
