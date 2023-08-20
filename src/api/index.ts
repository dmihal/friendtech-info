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
  lastTradePrice: string
  joined: number
  shareSupply: string
}

export interface ChainPosition {
  subject: SimpleAccountChainData
  owner: SimpleAccountChainData
  shares: number
}

export interface FullPosition {
  subject: SimpleAccountData
  owner: SimpleAccountData
  shares: number
}

export interface FullAccountChainData extends SimpleAccountChainData {
  positions: ChainPosition[]
  shareholders: ChainPosition[]
}

export interface FullAccountData extends AccountData {
  positions: FullPosition[]
  shareholders: FullPosition[]
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

async function graphQuery<T = any>(query: string, revalidateTime = 5): Promise<T> {
  const res = await fetch("https://api.thegraph.com/subgraphs/name/dmihal/friend-tech", {
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query,
    }),
    method: "POST",
    next: { revalidate: revalidateTime * MINUTE },
  })
  const data = await res.json()
  if (data.errors) {
    throw new Error(data.errors[0].message)
  }
  return data.data
}

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

async function addSocialData(users: { id: string }[]): Promise<SimpleAccountData[]> {
  const dataWithAccounts = await Promise.all(users.map(async (account: any) => {
    return {
      ...await getSocialData(account.id),
      ...account,
    }
  }))

  return dataWithAccounts
}

async function addPositionsSocialData(positions: ChainPosition[]): Promise<FullPosition[]> {
  const dataWithAccounts = await Promise.all(positions.map(async (position) => {
    return {
      ...position,
      subject: {
        ...await getSocialData(position.subject.id),
        ...position.subject,
      },
      owner: {
        ...await getSocialData(position.owner.id),
        ...position.owner,
      },
      shares: parseInt(position.shares as any),
    }
  }))

  return dataWithAccounts
}

export async function getTopUsers(): Promise<SimpleAccountData[]> {
  const data = await graphQuery(`{
    accounts(first: 100, orderBy: shareSupply, orderDirection: desc) {
      id
      shareSupply
      lastTradePrice
      joined
    }
  }`)

  const dataWithAccounts = await addSocialData(data.accounts)

  return dataWithAccounts
}

export async function getRecentUsers(): Promise<SimpleAccountData[]> {
  const data = await graphQuery(`{
    accounts(first: 100, orderBy: joined, orderDirection: desc) {
      id
      shareSupply
      lastTradePrice
      joined
    }
  }`, 15)

  const dataWithAccounts = await addSocialData(data.accounts)

  return dataWithAccounts
}

export async function getAccountData(address: string): Promise<FullAccountData | null> {
  const data = await graphQuery(`{
    account(id: "${address.toLowerCase()}") {
      id
      shareSupply
      positions(first: 500) {
        owner {
          id
          lastTradePrice
        }
        subject {
          id
          lastTradePrice
        }
        shares
      }
      shareholders(first: 500) {
        owner {
          id
          lastTradePrice
        }
        subject {
          id
          lastTradePrice
        }
        shares
      }
    }
  }`)

  if (!data.account) {
    return null
  }

  return {
    ...data.account,
    ...await getSocialData(address),
    positions: await addPositionsSocialData(data.account.positions),
    shareholders: await addPositionsSocialData(data.account.shareholders),
  }
}

export async function getTimeData(id: string): Promise<{ hourData: AccountTimeData[], dayData: AccountTimeData[] }> {
  const data = await graphQuery(`{
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
  }`)

  const hourData = data.account.hourData.map((hour: any) => ({
    time: parseInt(hour.timestamp),
    open: parseFloat(hour.startPrice),
    high: parseFloat(hour.maxPrice),
    low: parseFloat(hour.minPrice),
    close: parseFloat(hour.endPrice),
    volume: parseFloat(hour.volume),
  }))
  const dayData = data.account.dayData.map((day: any) => ({
    time: parseInt(day.timestamp),
    open: parseFloat(day.startPrice),
    high: parseFloat(day.maxPrice),
    low: parseFloat(day.minPrice),
    close: parseFloat(day.endPrice),
    volume: parseFloat(day.volume),
  }))

  return { hourData, dayData }
}
