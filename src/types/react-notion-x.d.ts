declare module 'react-notion-x' {
  import * as React from 'react'
  import { ExtendedRecordMap } from 'notion-types'

  export interface NotionRendererProps {
    recordMap: ExtendedRecordMap
    fullPage?: boolean
    darkMode?: boolean
  }

  export const NotionRenderer: React.FC<NotionRendererProps>
}