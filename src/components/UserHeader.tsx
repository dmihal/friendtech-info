import { AccountData } from "@/api";
import {  ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function UserHeader({ user }: { user: AccountData }) {
    return (
        <div className="md:flex md:items-center md:justify-between md:space-x-5">
        <div className="flex items-start space-x-5">
          <div className="flex-shrink-0">
            <div className="relative">
              <img
                className="h-16 w-16 rounded-full"
                src={user.twitterPfpUrl}
                alt=""
              />
              <span className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true" />
            </div>
          </div>
          {/*
            Use vertical padding to simulate center alignment when both lines of text are one line,
            but preserve the same layout if the text wraps without making the image jump around.
          */}
          <div className="pt-1.5">
            <h1 className="text-2xl font-bold text-gray-900">{user.twitterName}</h1>
            <p className="text-sm font-medium text-gray-500">
            {'@'+user.twitterUsername}
            </p>
          </div>
        </div>
        <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-3 sm:space-y-0 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
          <Link href={`https://www.twitter.com/${user.twitterUsername}`}>
            <button
                type="button"
                className="inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
                Twitter profile
                <span className="pl-1">
                    <ArrowTopRightOnSquareIcon className="h-4 w-4" aria-hidden="true" />
                </span>
            </button>
          </Link>
        </div>
      </div>
    )
  }