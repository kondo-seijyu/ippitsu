import { NotionAPI } from 'notion-client'
import { ExtendedRecordMap } from 'notion-types'

const notion = new NotionAPI()

export async function getNotionPage(pageId: string) {
  return await notion.getPage(pageId)
}

export function getChildPages(recordMap: ExtendedRecordMap) {
  const blocks = recordMap.block as Record<string, { value: any }>

  return Object.entries(blocks)
    .filter(([_, block]) => block.value.type === 'page' && block.value.parent_table === 'block')
    .map(([id, block]) => {
      const val = block.value
      const title = val.properties?.title?.[0]?.[0] || '無題'
      const createdTime = new Date(val.created_time).toISOString()
      const rawCover = val?.format?.page_cover || val?.cover || null
      const cover = getCoverUrl(rawCover, id)

      return { id, title, createdTime, cover }
    })
}

export function getCoverUrl(cover: string | null | undefined, blockId: string): string | null {
  if (!cover) return null
  if (cover.startsWith('/images/')) return `https://www.notion.so${cover}`
  return `https://www.notion.so/image/${encodeURIComponent(cover)}?table=block&id=${blockId}&cache=v2`
}