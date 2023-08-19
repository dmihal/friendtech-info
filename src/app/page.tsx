import Image from 'next/image'
import Link from 'next/link'

async function getTopUsers() {
  const res = await fetch("https://api.thegraph.com/subgraphs/name/dmihal/friend-tech", {
    "headers": {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query: `{
        accounts(first: 5, orderBy: shareSupply, orderDirection: desc) {
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

  const dataWithAccounts = await Promise.all(data.data.accounts.map(async (account) => {
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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="relative flex place-items-center">
        <ul>
          {data.map((user) => (
            <li key={user.id}>
              <img width={32} height={32} src={user.twitterPfpUrl} />
              <Link href={`/${user.id}`}>{user.twitterName}</Link>
              <pre>{JSON.stringify(user, null, 2)}</pre>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
