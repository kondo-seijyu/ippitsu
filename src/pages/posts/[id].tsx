import { GetStaticPaths, GetStaticProps } from 'next'
import { NotionRenderer } from 'react-notion-x'
import { getNotionPage, getChildPages } from '@/lib/notion'
import { ExtendedRecordMap } from 'notion-types'
import 'react-notion-x/src/styles.css'

interface Props {
  recordMap: ExtendedRecordMap
}

// 🔧 UUIDをハイフン付き形式に整える関数
function formatUUID(id: string) {
  return `${id.substring(0, 8)}-${id.substring(8, 12)}-${id.substring(12, 16)}-${id.substring(16, 20)}-${id.substring(20)}`
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
  const posts = getChildPages(recordMap)

  const paths = posts.map((post) => ({
    params: {
      id: post.id.replace(/-/g, ''), // URLではハイフン無しIDを使う
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const rawId = context.params?.id as string
  const pageId = formatUUID(rawId) // ← 🔧ここでハイフン付きに整形
  const recordMap = await getNotionPage(pageId)

  return {
    props: {
      recordMap,
    },
    revalidate: 60,
  }
}