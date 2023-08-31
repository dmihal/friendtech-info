import { getStats } from "@/api/stats";
import { classNames } from "@/utils";

interface DisplayStat {
  name: string
  value: string
  change?: string
  changeType?: 'positive' | 'negative'
}

export default async function StatBar() {
  const stats = await getStats()

  const statList: DisplayStat[] = [
    {
      name: 'Total Accounts',
      value: parseInt(stats.accounts).toLocaleString(),
    },
    {
      name: 'Total Trading Fees',
      value: `${parseFloat(stats.tradingFees).toFixed(2)} ETH`,
    }
  ]

  return (
    <dl className="mx-auto grid grid-cols-1 gap-px bg-gray-900/5 sm:grid-cols-2 lg:grid-cols-2">
      {statList.map((stat) => (
        <div
          key={stat.name}
          className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8"
        >
          <dt className="text-sm font-medium leading-6 text-gray-500">{stat.name}</dt>
          {stat.change && (
            <dd
              className={classNames(
                stat.changeType === 'negative' ? 'text-rose-600' : 'text-gray-700',
                'text-xs font-medium'
              )}
            >
              {stat.change}
            </dd>
          )}
          <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}