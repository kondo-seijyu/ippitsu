import { GetStaticPaths, GetStaticProps } from 'next'
import { NotionRenderer } from 'react-notion-x'
import { getNotionPage, getChildPages } from '@/lib/notion'
import { ExtendedRecordMap } from 'notion-types'
import 'react-notion-x/src/styles.css'

interface Props {
  recordMap: ExtendedRecordMap
}

export default function Post({ recordMap }: Props) {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <div className="mb-6">
        <a href="/" className="text-sm text-blue-600 hover:underline">
          ← 戻る
        </a>
      </div>
      <NotionRenderer recordMap={recordMap} fullPage={false} darkMode={false} />
    </main>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const pageId = process.env.NOTION_PAGE_ID as string
  const recordMap = await getNotionPage(pageId)
  const posts = getChildPages(recordMap) // ✅ 修正：getPostsFromTable → getChildPages

  const paths = posts.map((post) => ({
    params: { id: post.id },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const pageId = context.params?.id as string
  const recordMap = await getNotionPage(pageId)

  return {
    props: {
      recordMap,
    },
    revalidate: 60,
  }
} 
