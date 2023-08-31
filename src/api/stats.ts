import { graphQuery } from "./data-providers";

export interface Stats {
  accounts: string
  tradingFees: string
}

export async function getStats(): Promise<Stats> {
  const data = await graphQuery(`{
    protocol(id: "protocol") {
      accounts
      tradingFees
    }
  }`)

  return data.protocol
}