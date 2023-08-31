'use client'
import { SimpleAccountData } from '@/api';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useContext } from 'react';
import { AppRouterContext } from 'next/dist/shared/lib/app-router-context';
import { classNames, getAccountName } from '@/utils';

interface UserTableProps {
  people: SimpleAccountData[]
  traders?: boolean
  props?: any
  onChange?: (prop: string) => void
}

export default function UserTable({ people, traders, props, onChange }: UserTableProps) {

  const router = useContext(AppRouterContext)!
  let i = 1;

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
                  {traders ? (
                    <>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 hidden border-b border-gray-300 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                      >
                        Realized Profit (<button onClick={() => onChange && onChange('order')}>{props.order}</button>)
                      </th>
                    </>
                  ) : (
                    <>
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
                        Market cap
                      </th>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 border-b border-gray-300 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                      >
                        Price
                      </th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {people.map((person, personIdx) => (
                  <tr key={person.id} onClick={() => router.push(`/${person.id}`)} className="cursor-pointer hover:bg-gray-100">
                    <td
                      className={classNames(
                        personIdx !== people.length - 1 ? 'border-b border-gray-200' : '',
                        'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'
                      )}
                    >
                      {i++}
                    </td>
                    <td
                      className={classNames(
                        personIdx !== people.length - 1 ? 'border-b border-gray-200' : '',
                        'whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell'
                      )}
                    >
                      <div className="flex items-center gap-x-4">
                        <img src={person.twitterPfpUrl} alt="" className="h-8 w-8 rounded-full bg-gray-100" />
                        <Link href={`/${person.id}`}>
                          <div className="truncate text-sm font-medium leading-6 text-gray-900 w-24 md:w-auto">
                            {getAccountName(person)}
                          </div>
                        </Link>
                      </div>
                    </td>
                    {traders ? (
                      <>
                        <td
                          className={classNames(
                            personIdx !== people.length - 1 ? 'border-b border-gray-200' : '',
                            'relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-8 lg:pr-8'
                          )}
                        >
                          {parseFloat(person.realizedProfitLIFO).toFixed(3) + ' ETH'}
                        </td>
                      </>
                    ) : (
                      <>
                        <td
                          className={classNames(
                            personIdx !== people.length - 1 ? 'border-b border-gray-200' : '',
                            'whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 lg:table-cell'
                          )}
                        >
                          {person.holderCount}
                        </td>
                        <td
                          className={classNames(
                            personIdx !== people.length - 1 ? 'border-b border-gray-200' : '',
                            'whitespace-nowrap hidden sm:table-cell px-3 py-4 text-sm text-gray-500'
                          )}
                        >
                          {(parseFloat(person.holderCount) * (parseFloat(person.displayPrice) / 1e18)).toFixed(3) + ' ETH'}
                        </td>
                        <td
                          className={classNames(
                            personIdx !== people.length - 1 ? 'border-b border-gray-200' : '',
                            'relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-8 lg:pr-8'
                          )}
                        >
                          {(parseFloat(person.displayPrice) / 1e18).toFixed(3) + ' ETH'}
                        </td>
                      </>
                    )}
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



