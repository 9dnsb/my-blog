'use client'

import { useState, useTransition } from 'react'

export function CommentForm({ slug }: { slug: string }) {
  const [name, setName] = useState('')
  const [comment, setComment] = useState('')
  const [success, setSuccess] = useState(false)
  const [isPending, startTransition] = useTransition()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    startTransition(async () => {
      const res = await fetch(`/api/posts/${slug}/comment`, {
        method: 'POST',
        body: new URLSearchParams({ name, comment }),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })

      if (res.ok) {
        setSuccess(true)
        setName('')
        setComment('')
      }
    })
  }

  return (
    <div className="mt-12 max-w-[48rem] mx-auto">
      <h3 className="text-2xl font-bold mb-4">Leave a Comment</h3>

      {success && <p className="text-green-600 mb-4">Thanks for your comment!</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          required
          className="border p-2 rounded"
        />
        <textarea
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Your comment"
          required
          className="border p-2 rounded h-24"
        />
        <button
          type="submit"
          disabled={isPending}
          className="bg-black text-white py-2 rounded disabled:opacity-50"
        >
          {isPending ? 'Posting...' : 'Post Comment'}
        </button>
      </form>
    </div>
  )
}
