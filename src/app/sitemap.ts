import { getTopUsers } from '@/api'
import { MetadataRoute } from 'next'

const BASE_URL = 'https://friendtech.info'
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const accounts = await getTopUsers()
  const accountRoutes = accounts.map((account, index) => ({
    url: `${BASE_URL}/${account.id}`,
    lastModified: new Date(),
    changeFrequency: 'hourly' as 'hourly',
    priority: Math.max(0.2, 1 - index / 100) / 2,
  }))

  return [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/traders`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/recent`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.4,
    },
    ...accountRoutes,
  ]
}
