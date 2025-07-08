import { GetStaticProps } from 'next'
import { getNotionPage, getChildPages } from '@/lib/notion'
import PostCard from '@/components/PostCard'

type Props = {
  posts: any[]
}

export default function Home({ posts }: Props) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const pageId = process.env.NOTION_PAGE_ID as string
  const recordMap = await getNotionPage(pageId)
  const posts = getChildPages(recordMap)

  return {
    props: {
      posts,
    },
    revalidate: 60,
  }
}