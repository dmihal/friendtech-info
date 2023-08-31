'use client'

import { SimpleAccountData } from "@/api"
import { useState } from "react"

export default function RealizedProfitCell({ user }: { user: SimpleAccountData }) {
  const [profitType, setProfitType] = useState('LIFO')

  return (
    <div className="bg-white px-4 py-5 sm:px-5 xl:px-4" style={{ flexBasis: '25%' }}>
      <dt className="text-sm font-medium leading-6 text-gray-500">
        Realized Profit (
          <button onClick={() => setProfitType(profitType === 'LIFO' ? 'FIFO' : 'LIFO')}>{profitType}</button>
        )
      </dt>
      <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
        {parseFloat(profitType === 'LIFO' ? user.realizedProfitLIFO : user.realizedProfitFIFO).toFixed(3)} ETH
      </dd>
    </div>
  )
}
