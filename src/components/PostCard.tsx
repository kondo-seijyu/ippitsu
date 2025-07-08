import Link from 'next/link'

type Post = {
  id: string
  title: string
  createdTime: string
  cover: string | null
}

type Props = {
  post: Post
}

export default function PostCard({ post }: Props) {
  return (
    <Link
      href={`/posts/${post.id}`}
      className="flex flex-col rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transform transition-transform duration-200 hover:scale-[1.02]"
    >
      {post.cover && (
        <img
          src={post.cover}
          alt={post.title || '記事のカバー画像'}
          className="w-full h-48 object-cover rounded-t-xl"
        />
      )}
      <div className="flex flex-col gap-2 p-4">
        <div className="text-xs text-gray-400">
          {new Date(post.createdTime).toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </div>
        <div className="text-sm font-semibold leading-snug line-clamp-2">
          {post.title}
        </div>
      </div>
    </Link>
  )
}