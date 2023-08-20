import { FullPosition } from '@/api';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

export default function ShareholderTable({ shareholders }: { shareholders: FullPosition[] }) {
  let i = 1;

  const sortedShareholders = shareholders.sort((a, b) => b.shares - a.shares)

  return (
    <div className="bg-white py-10">
      <h2 className="px-4 text-base font-semibold leading-7 text-gray-900 sm:px-6 lg:px-8">Holders</h2>
      <table className="mt-6 w-full whitespace-nowrap text-left">
        <colgroup>
          <col className="w-full sm:w-4/12" />
          <col className="lg:w-4/12" />
          <col className="lg:w-2/12" />
          <col className="lg:w-1/12" />
          <col className="lg:w-1/12" />
          <col className="lg:w-1/12" />
        </colgroup>
        <thead className="border-b border-gray-200 text-sm leading-6 text-gray-700">
          <tr>
						<th scope="col" className="py-2 pl-4 pr-8 font-semibold sm:table-cell sm:pl-6 lg:pl-8">
							#
						</th>
            <th scope="col" className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8">
              User
            </th>
            <th scope="col" className="hidden py-2 pl-0 pr-8 font-semibold md:table-cell">
						Holders
						</th>
						<th scope="col" className="hidden py-2 pl-0 pr-4 text-right font-semibold sm:table-cell sm:pr-8 sm:text-left lg:pr-20">
							Shareholder Price
						</th>
            <th scope="col" className="hidden py-2 pl-0 pr-8 font-semibold md:table-cell lg:pr-20">
              Shares
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {sortedShareholders.map((position) => (
            <tr key={position.owner.id} className="hover:bg-gray-50">
              <td className="py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
								<div className="font-mono text-sm leading-6 text-gray-900 text-center">{i++}</div>
							</td>
              <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                <div className="flex items-center gap-x-4">
                  <img src={position.owner.twitterPfpUrl} alt="" className="h-8 w-8 rounded-full bg-gray-100" />
                  <Link href={`/${position.owner.id}`}>
                    <div className="truncate text-sm font-medium leading-6 text-gray-900">{position.owner.twitterName || position.owner.id}</div>
                  </Link>
                </div>
              </td>
							<td className="hidden py-4 pl-0 pr-4 md:table-cell md:pr-8">
								<div className="font-mono text-sm leading-6 text-gray-900">{position.owner.holderCount}</div>
							</td>
              <td className="hidden py-4 pl-0 pr-4 text-sm leading-6 sm:table-cell sm:pr-8 lg:pr-20">
								<div className="font-mono text-sm leading-6 text-gray-900">
                  {parseFloat(position.owner.lastTradePrice).toFixed(3) + ' ETH'}
                </div>
							</td>
              <td className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-gray-500 md:table-cell lg:pr-20">
                {position.shares + ' shares'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
