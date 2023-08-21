import { NextResponse } from 'next/server'
 
export async function GET(
  request: Request,
  { params }: { params: { query: string } }
) {
  const res = await fetch(`https://prod-api.kosetto.com/search/users?username=${params.query}`)
  const data = await res.json()
 
  return NextResponse.json(data)
}
