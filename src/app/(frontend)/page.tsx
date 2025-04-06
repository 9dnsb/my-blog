import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Everyday GPT',
  description: 'How I use ChatGPT in real life',
}

export default async function Home() {
  const payload = await getPayload({ config: configPromise })

  const { docs: posts } = await payload.find({
    collection: 'posts',
    limit: 6,
    sort: '-publishedAt',
  })

  return (
    <div className="min-h-screen bg-white text-black py-12 px-4 md:px-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Latest Posts</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div
            key={post.id}
            className="border p-6 rounded-lg shadow-sm hover:shadow-md hover:scale-105 transition-transform duration-300"
          >
            {post.heroImage && typeof post.heroImage === 'object' && post.heroImage.url && (
              <Image
                src={post.heroImage.url}
                alt={post.title}
                width={400}
                height={300}
                className="rounded object-cover"
                style={{ height: '200px', width: '100%' }}
              />
            )}
            <h2 className="text-2xl font-semibold mb-2">
              <Link href={`/posts/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="text-gray-600 mb-4">
              {post.meta?.description?.slice(0, 100) || 'No description available.'}
            </p>
            <Link href={`/posts/${post.slug}`} className="text-blue-600 hover:underline">
              Read More →
            </Link>
          </div>
        ))}
        <div className="h-16" />
      </div>
    </div>
  )
}
