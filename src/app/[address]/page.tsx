import { getAccountData, getTimeData, getTopUsers } from '@/api'
import UserHeader from '../../components/UserHeader'
import ChartWrapper from '../../components/ChartWrapper'
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import ShareholderTable from './ShareholderTable'

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
    <main className="p-10 max-w-5xl mx-auto">
      <Link href={'/'}>
        <div className="pb-10 flex items-center text-gray-500">
            <span className="pl-1 pr-2">
                <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
            </span>
            <p className='hover:text-decoration-line inline-block'>Back to home</p>
        </div>
      </Link>
      <UserHeader user={data} />
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8 pt-8">
          {/* Left column */}
          <div className="grid grid-cols-1 gap-4 lg:col-span-2">
          <section aria-labelledby="section-1-title">
              <h2 className="sr-only" id="section-1-title">
              Section Header
              </h2>
              <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="p-6"><ChartWrapper data={timeData}/></div>
              </div>
          </section>
          </div>

          {/* Right column */}
          <div className="grid grid-cols-1 gap-4">
          <section aria-labelledby="section-2-title">
              <h2 className="sr-only" id="section-2-title">
              Section title
              </h2>
              <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="mx-auto grid grid-cols-1 gap-px bg-gray-900/5 sm:grid-cols-2 lg:grid-cols-1">
                  <div className="bg-white px-4 py-5 sm:px-5 xl:px-4" style={{ flexBasis: '25%' }}>
                      <dt className="text-sm font-medium leading-6 text-gray-500">Price</dt>
                      <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
                          {parseFloat(data.lastTradePrice).toFixed(3) + ' ETH'}
                      </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:px-5 xl:px-4" style={{ flexBasis: '25%' }}>
                      <dt className="text-sm font-medium leading-6 text-gray-500">Market Cap</dt>
                      <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
                          {(parseFloat(data.holderCount) * parseFloat(data.lastTradePrice)).toFixed(3) + ' ETH'}
                      </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:px-5 xl:px-4" style={{ flexBasis: '25%' }}>
                      <dt className="text-sm font-medium leading-6 text-gray-500">Total shares</dt>
                      <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
                          {data.shareSupply}
                      </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:px-5 xl:px-4" style={{ flexBasis: '25%' }}>
                      <dt className="text-sm font-medium leading-6 text-gray-500">Holders</dt>
                      <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
                        {data.holderCount}
                      </dd>
                  </div>
                </div>
              </div>
          </section>
        </div>
      </div>
      <ShareholderTable shareholders={data.shareholders} />
    </main>
  )
}

