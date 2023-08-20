import { XMarkIcon } from '@heroicons/react/20/solid'

export default function Banner() {
  return (
    <div className="flex items-center gap-x-6 bg-gray-900 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
      <p className="text-sm leading-6 text-white">
            <strong className="font-semibold">Support the site</strong>
          <svg viewBox="0 0 2 2" className="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true">
            <circle cx={1} cy={1} r={1} />
          </svg>
          Find us on friend.tech &nbsp;<span aria-hidden="true">&rarr;</span> @friendtechinfo
      </p>
      <div className="flex flex-1 justify-end">
      </div>
    </div>
  )
}