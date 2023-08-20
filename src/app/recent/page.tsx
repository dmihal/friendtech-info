import { getRecentUsers } from '@/api'
import RecentUsersTable from './RecentUsersTable'

export default async function Home() {
  const data = await getRecentUsers()

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
    <h1 className="text-4xl font-bold left-aligned mt-8 mb-4">FriendTech.info</h1>
    <div className="flex items-center justify-center w-2/3">
      <RecentUsersTable people={data} />
    </div>
  </main>
  
  )
}
