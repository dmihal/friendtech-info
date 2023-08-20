import { getTopUsers } from '@/api'
import BasicTable from '../components/BasicTable'

export default async function Home() {
  const data = await getTopUsers()

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
    <div className="flex items-center justify-center w-2/3">
      <BasicTable people={data} />
    </div>
  </main>
  
  )
}
