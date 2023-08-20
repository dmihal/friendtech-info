import { SimpleAccountData } from '@/api';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

export default function BasicTable({ people }: { people: SimpleAccountData[] }) {
  let i = 1;

  return (
    <div className="bg-white py-10">
      <h2 className="px-4 text-base font-semibold leading-7 text-gray-900 sm:px-6 lg:px-8">Top Friend.tech users</h2>
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
							Market cap
						</th>
            {/* <th scope="col" className="hidden py-2 pl-0 pr-8 font-semibold md:table-cell lg:pr-20">
              TVL
            </th> */}
            <th scope="col" className="py-2 pl-0 pr-4 text-right font-semibold sm:pr-6 lg:pr-8">
							Price
						</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {people.map((person) => (
            <tr key={person.holderCount} className="hover:bg-gray-50">
              <td className="py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
								<div className="font-mono text-sm leading-6 text-gray-900 text-center">{i++}</div>
							</td>
              <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                <div className="flex items-center gap-x-4">
                  <img src={person.twitterPfpUrl} alt="" className="h-8 w-8 rounded-full bg-gray-100" />
                  <Link href={`/${person.id}`}>
                    <div className="truncate text-sm font-medium leading-6 text-gray-900">{person.twitterName}</div>
                  </Link>
                </div>
              </td>
							<td className="hidden py-4 pl-0 pr-4 md:table-cell md:pr-8">
								<div className="font-mono text-sm leading-6 text-gray-900">{person.holderCount}</div>
							</td>
              <td className="hidden py-4 pl-0 pr-4 text-sm leading-6 sm:table-cell sm:pr-8 lg:pr-20">
								<div className="font-mono text-sm leading-6 text-gray-900">
                  {(parseFloat(person.holderCount) * (parseFloat(person.displayPrice) / 1e18)).toFixed(3) + ' ETH'}
                </div>
							</td>
              {/* <td className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-gray-500 md:table-cell lg:pr-20">
                {person.holderCount}
              </td> */}
              <td className="py-4 pl-0 pr-4 text-right text-sm leading-6 text-gray-500 sm:table-cell sm:pr-6 lg:pr-8">
                <div className="font-mono text-sm leading-6 text-gray-900">
                  {(parseFloat(person.displayPrice) / 1e18).toFixed(3) + ' ETH'}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
