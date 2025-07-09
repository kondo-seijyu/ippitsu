import { GetStaticPaths, GetStaticProps } from 'next'
import { NotionRenderer } from 'react-notion-x'
import { getNotionPage, getChildPages } from '@/lib/notion'
import { ExtendedRecordMap } from 'notion-types'

function formatUUID(id: string) {
  return `${id.substring(0, 8)}-${id.substring(8, 12)}-${id.substring(12, 16)}-${id.substring(16, 20)}-${id.substring(20)}`
}

function normalizeId(id: string): string {
  return id.includes('-') ? id : formatUUID(id)
}

interface Props { recordMap: ExtendedRecordMap }

export default function Post({ recordMap }: Props) {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <div className="mb-6">
        <a href="/" className="text-sm text-blue-600 hover:underline">← 戻る</a>
      </div>
      <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none">
        <NotionRenderer recordMap={recordMap} fullPage={false} darkMode={false} />
      </div>
    </main>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const pageId = process.env.NOTION_PAGE_ID as string
  const recordMap = await getNotionPage(pageId)
  const posts = getChildPages(recordMap)

  console.log('生成対象IDs:', posts.map(p => p.id)) // debug用

  const paths = posts.map((post) => ({
    params: { id: normalizeId(post.id) },
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  if (!ctx.params?.id) throw new Error('no id')
  const pageId = normalizeId(ctx.params.id as string)
  const recordMap = await getNotionPage(pageId)
  return { props: { recordMap }, revalidate: 60 }
}