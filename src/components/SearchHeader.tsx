import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { BarsArrowUpIcon } from '@heroicons/react/20/solid';
import { ChevronDownIcon } from '@heroicons/react/20/solid';


export default function SearchHeader() {
return (
    <div className="border-b border-gray-200 pb-5 sm:flex w-full sm:items-center sm:justify-between">
    <h3 className="text-xl font-semibold leading-6 text-gray-900">Top Friend.tech users</h3>
    <button
        type="button"
        className="flex items-center rounded-md px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-white"
      >
    <p className='pr-3'>Search</p>
    <MagnifyingGlassIcon className="h-4 w-4 text-gray-600" aria-hidden="true" />
    </button>
    </div>
)
}
