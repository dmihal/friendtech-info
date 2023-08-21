import { Fragment, useEffect, useRef, useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Combobox, Dialog, Transition } from '@headlessui/react'
import { useRouter } from 'next/navigation'
// import Image from 'next/image'

const people = [
  { id: 1, name: 'Leslie Alexander', url: '#' },
  // More people...
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface User {
  address: string
  twitterUsername: string
  twitterName: string
  twitterPfpUrl: string
}

async function getSearch(query: string): Promise<{ users: User[] }> {
  const req = await fetch(`/api/search/${query}`)
  const result = await req.json()
  return result
}

export default function SearchWizard({ isOpen, onClose }: { isOpen: boolean, onClose: () => void}) {
  const [query, setQuery] = useState('')
  const [people, setPeople] = useState<any[]>([])
  const router = useRouter()
  const queryRef = useRef('')

  useEffect(() => {
    getSearch(query).then((result) => {
      if (query === queryRef.current) {
        setPeople(result.users)
      }
    })
  }, [query])

  return (
    <Transition.Root show={isOpen} as={Fragment} afterLeave={() => setQuery('')} appear>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
              <Combobox onChange={(person: User) => router.push(`/${person.address}`)}>
                <div className="relative">
                  <MagnifyingGlassIcon
                    className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <Combobox.Input
                    className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                    placeholder="Search..."
                    onChange={(event) => {
                      queryRef.current = event.target.value
                      setQuery(event.target.value)
                    }
                    }
                  />
                </div>

                {people.length > 0 && (
                  <Combobox.Options static className="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800">
                    {people.map((person) => (
                      <Combobox.Option
                        key={person.address}
                        value={person}
                        className={({ active }) =>
                          classNames('cursor-pointer select-none px-4 py-2 flex items-center gap-x-2', active ? 'bg-indigo-600 text-white' : '')
                        }
                      >
                        <img src={person.twitterPfpUrl} className="h-8 w-8 rounded-full bg-gray-100" />
                        {person.twitterName}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                )}

                {query !== '' && people.length === 0 && (
                  <p className="p-4 text-sm text-gray-500">No users found.</p>
                )}
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}