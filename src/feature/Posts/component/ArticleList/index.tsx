import { FC } from 'react'
import { useScript } from './hooks/useScript'
import { List } from './component/List'
import { ClearHistory } from './component/ClearHistory'

export const ArticleList: FC = () => {
  const { list, loading, isHistory } = useScript()
  return (
    <div>
      {isHistory && <ClearHistory />}
      <List list={list} loading={loading} />
    </div>
  )
}
