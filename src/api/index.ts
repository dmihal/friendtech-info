import { UTCTimestamp } from "lightweight-charts"

export interface SocialData {
  twitterPfpUrl: string
  twitterName: string
  twitterUsername: string
  holdingCount: string
  holderCount: string
  displayPrice: string
}

export interface SimpleAccountChainData {
  id: string
}

export interface ChainPosition {
  subject: SimpleAccountChainData
}

export interface FullAccountChainData {
  shareSupply: string
}

export type SimpleAccountData = SocialData & SimpleAccountChainData
export type AccountData = SocialData & FullAccountChainData

export interface AccountTimeData {
  time: UTCTimestamp
  open: number
  high: number
  low: number
  close: number
  volume: number
}

const MINUTE = 60

export async function getSocialData(address: string): Promise<SocialData> {
  const socialDataRes = await fetch(`https://prod-api.kosetto.com/users/${address}`, {
    next: { revalidate: 30 * MINUTE },
  })
  const socialData = await socialDataRes.json()
  return socialData
}

export async function getAddressFromUsername(name: string): Promise<string | null> {
  const req = await fetch(`https://prod-api.kosetto.com/search/users?username=${name}`, {
    next: { revalidate: 30 * MINUTE },
  })
  const data = await req.json()

  return data.users.length > 0 && data.users[0].twitterUsername == name ? data.users[0].address : null
}

export async function getTopUsers(): Promise<SimpleAccountData[]> {
  const res = await fetch("https://api.thegraph.com/subgraphs/name/dmihal/friend-tech", {
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query: `{
        accounts(first: 100, orderBy: shareSupply, orderDirection: desc) {
          id
          shareSupply
        }
      }`
    }),
    method: "POST",
    next: { revalidate: 5 * MINUTE },
  })

  const data = await res.json()
  if (data.errors) {
    throw new Error(data.errors[0].message)
  }

  const dataWithAccounts = await Promise.all(data.data.accounts.map(async (account: any) => {
    return {
      ...await getSocialData(account.id),
      ...account,
    }
  }))

  return dataWithAccounts
}

export async function getAccountData(address: string): Promise<AccountData | null> {
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
    next: { revalidate: 5 * MINUTE },
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

export async function getTimeData(id: string): Promise<{ hourData: AccountTimeData[], dayData: AccountTimeData[] }> {
  const res = await fetch("https://api.thegraph.com/subgraphs/name/dmihal/friend-tech", {
    "headers": {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query: `{
        account(id: "${id.toLowerCase()}") {
          hourData {
            timestamp
            minPrice
            maxPrice
            startPrice
            endPrice
            volume
          }
          dayData {
            timestamp
            minPrice
            maxPrice
            startPrice
            endPrice
            volume
          }
        }
      }`
    }),
    "method": "POST",
    next: { revalidate: 5 * MINUTE },
  })
  const data = await res.json()

  if (data.errors) {
    throw new Error(data.errors[0].message)
  }

  const hourData = data.data.account.hourData.map((hour: any) => ({
    time: parseInt(hour.timestamp),
    open: parseFloat(hour.startPrice),
    high: parseFloat(hour.maxPrice),
    low: parseFloat(hour.minPrice),
    close: parseFloat(hour.endPrice),
    volume: parseFloat(hour.volume),
  }))
  const dayData = data.data.account.dayData.map((day: any) => ({
    time: parseInt(day.timestamp),
    open: parseFloat(day.startPrice),
    high: parseFloat(day.maxPrice),
    low: parseFloat(day.minPrice),
    close: parseFloat(day.endPrice),
    volume: parseFloat(day.volume),
  }))

  return { hourData, dayData }
}
