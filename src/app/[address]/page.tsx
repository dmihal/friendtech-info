import UserHeader from '../../components/UserHeader'

async function getSocialData(address: string) {
  const socialDataRes = await fetch(`https://prod-api.kosetto.com/users/${address}`)
  const socialData = await socialDataRes.json()
  return socialData
}

async function getData(address: string) {
  const res = await fetch("https://api.thegraph.com/subgraphs/name/dmihal/friend-tech", {
    "headers": {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query: `{
        account(id: "${address.toLowerCase()}") {
          id
          shareSupply
          positions {
            subject {
              id
            }
          }
          shareholders {
            owner {
              id
            }
          }
        }
      }`
    }),
    "method": "POST",
  })

  const data = await res.json()

  if (!data.data.account) {
    return null
  }

  return {
    ...data.data.account,
    ...await getSocialData(address),
    positions: await Promise.all(data.data.account.positions.map(async (position: any) => {
      return {
        ...position,
        ...await getSocialData(position.subject.id),
      }
    })),
    shareholders: await Promise.all(data.data.account.shareholders.map(async (shareholder: any) => {
      return {
        ...shareholder,
        ...await getSocialData(shareholder.owner.id),
      }
    })),
  }
}

export default async function Page({ params }: { params: { address: string } }) {
  const data = await getData(params.address)
  return <div>
    <main className='flex min-h-screen flex-col items-center mx-auto w-90vw sm:w-70vw p-4'>
      <div className='w-full'>
        <UserHeader user={data}/>
      </div>
      <div className='w-full'>
        
      </div>
    </main>
  </div>
}
