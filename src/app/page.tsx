import Image from 'next/image'
import Link from 'next/link'
import BasicTable from '../components/BasicTable'

async function getTopUsers() {
  const res = await fetch("https://api.thegraph.com/subgraphs/name/dmihal/friend-tech", {
    "headers": {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query: `{
        accounts(first: 10, orderBy: shareSupply, orderDirection: desc) {
          id
          shareSupply
        }
      }`
    }),
    "method": "POST",
  })

  const data = await res.json()
  if (data.errors) {
    throw new Error(data.errors[0].message)
  }

  const dataWithAccounts = await Promise.all(data.data.accounts.map(async (account: any) => {
    const socialDataRes = await fetch(`https://prod-api.kosetto.com/users/${account.id}`)
    const socialData = await socialDataRes.json()
    return {
      ...socialData,
      ...account,
    }
  }))

  return dataWithAccounts
}

export default async function Home() {
  const data = await getTopUsers()

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
    <div className="flex items-center justify-center w-2/3">
      <BasicTable people={data} />
    </div>
  </main>
  
  )
}
