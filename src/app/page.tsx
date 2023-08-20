import { getTopUsers } from '@/api'
import BasicTable from '../components/BasicTable'

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
    <main className="flex min-h-screen flex-col items-center p-8">
      <h1 className="text-4xl font-bold left-aligned mt-8 mb-4">FriendTech.info</h1>
      <div className="flex items-center justify-center w-2/3">
        <BasicTable people={data} />
      </div>
    </main>
  )
}
