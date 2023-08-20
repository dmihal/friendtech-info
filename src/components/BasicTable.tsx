import { SimpleAccountData } from '@/api';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

export default function BasicTable({ people }: { people: SimpleAccountData[] }) {
  return (
    <ul role="list" className="w-full divide-y divide-gray-100">
      {people.map((person) => (
        <li key={person.id} className="relative flex justify-between py-5 hover:bg-gray-50">
          <Link href={`/${person.id}`} className="relative flex flex-1 justify-between py-5 hover:bg-gray-50">
            <div className="flex w-full gap-x-4 pr-6">
                <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.twitterPfpUrl} alt="" />
                <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                    <a href={`https://twitter.com/${person.twitterUsername}`}>
                      <span className="absolute inset-x-0 -top-px bottom-0" />
                      @{person.twitterName}
                    </a>
                </p>
                <p className="mt-1 flex text-xs leading-5 text-gray-500">
                    <a href={`https://www.twitter.com/${person.twitterUsername}`} className="relative truncate hover:underline">
                    {person.twitterUsername}
                    </a>
                </p>
                </div>
            </div>
            <div className="flex items-center justify-between gap-x-4">
                <div className="hidden sm:block">
                <p className="text-sm leading-6 text-gray-900 whitespace-nowrap">Price: {parseInt(person.displayPrice) / 1e18 + ' ETH'}</p>
                <p className="mt-1 flex text-xs leading-5 text-gray-500">Holders: {person.holderCount}</p>
                </div>
                <ChevronRightIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
