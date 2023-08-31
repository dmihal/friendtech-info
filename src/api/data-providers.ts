
const MINUTE = 60

export async function graphQuery<T = any>(query: string, revalidateTime = 5): Promise<T> {
  const subgraph = process.env.SUBGRAPH || 'dmihal/friend-tech'
  const subgraphSubURL = subgraph.indexOf('Qm') == 0 ? `id/${subgraph}` : `name/${subgraph}`
  const res = await fetch(`https://api.thegraph.com/subgraphs/${subgraphSubURL}`, {
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
