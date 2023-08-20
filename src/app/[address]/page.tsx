import { getAccountData, getTimeData, getTopUsers } from '@/api'
import UserHeader from '../../components/UserHeader'
import ChartWrapper from './ChartWrapper'

export async function generateStaticParams() {
  const accounts = await getTopUsers()
  return accounts.map(account => ({ params: { address: account.id } }))
}

export default async function AddressPage({ params }: { params: { address: string } }) {
  const data = await getAccountData(params.address)
  const timeData = await getTimeData(params.address)

  if (!data) {
    return (
      <div className="w-full overflow-hidden rounded-lg bg-white shadow">
        <h2 className="sr-only" id="profile-overview-title">
          Not found
        </h2>
      </div>
    )
  }

  return (
    <div>
      <main className='flex min-h-screen flex-col items-center mx-auto w-90vw sm:w-70vw p-4'>
        <div className='w-full'>
          <UserHeader user={data}/>
        </div>
        <div className='w-full'>
          <ChartWrapper data={timeData}/>
        </div>
      </main>
    </div>
  )
}
