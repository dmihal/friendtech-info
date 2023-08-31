'use client'
import { FullPosition } from '@/api';
import { useContext } from 'react';
import Link from 'next/link';
import { AppRouterContext } from 'next/dist/shared/lib/app-router-context';
import { classNames } from '@/utils';

export default function ShareholderTable({ shareholders }: { shareholders: FullPosition[] }) {
  let i = 1;

  const router = useContext(AppRouterContext)!

  const sortedShareholders = shareholders.sort((a, b) => b.shares - a.shares)

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full border-separate border-spacing-0">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 border-b border-gray-300 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 border-b border-gray-300 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                  >
                    User
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 hidden border-b border-gray-300 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                  >
                    Holders
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 border-b border-gray-300 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter hidden sm:table-cell"
                  >
                    Shareholder Price
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 border-b border-gray-300 bg-opacity-75 px-3 py-3.5 text-right text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                  >
                    Shares
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedShareholders.map((shareholder, shareholderIdx) => (
                  <tr key={shareholder.owner.id} onClick={() => router.push(`/${shareholder.owner.id}`)} className="cursor-pointer hover:bg-gray-100">
                    <td
                      className={classNames(
                        shareholderIdx !== sortedShareholders.length - 1 ? 'border-b border-gray-200' : '',
                        'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'
                      )}
                    >
                      {i++}
                    </td>
                    <td
                      className={classNames(
                        shareholderIdx !== sortedShareholders.length - 1 ? 'border-b border-gray-200' : '',
                        'whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell'
                      )}
                    >
                      <div className="flex items-center gap-x-4">
                      <img src={shareholder.owner.twitterPfpUrl} alt="" className="h-8 w-8 rounded-full bg-gray-100" />
                      <Link href={`/${shareholder.owner.id}`}>
                        <div className="truncate text-sm font-medium leading-6 text-gray-900 w-24 md:w-auto">{shareholder.owner.twitterName || shareholder.owner.id}</div>
                      </Link>
                      </div>
                    </td>
                    <td
                      className={classNames(
                        shareholderIdx !== sortedShareholders.length - 1 ? 'border-b border-gray-200' : '',
                        'whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 lg:table-cell'
                      )}
                    >
                      <div className="font-mono text-sm leading-6 text-gray-900">{shareholder.owner.holderCount}</div>
                    </td>
                    <td
                      className={classNames(
                        shareholderIdx !== sortedShareholders.length - 1 ? 'border-b border-gray-200' : '',
                        'whitespace-nowrap hidden sm:table-cell px-3 py-4 text-sm text-gray-500'
                      )}
                    >
                      {parseFloat(shareholder.owner.lastTradePrice).toFixed(3) + ' ETH'}
                    </td>
                    <td
                      className={classNames(
                        shareholderIdx !== sortedShareholders.length - 1 ? 'border-b border-gray-200' : '',
                        'relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-8 lg:pr-8'
                      )}
                    >
                      {shareholder.shares + ' owned'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}