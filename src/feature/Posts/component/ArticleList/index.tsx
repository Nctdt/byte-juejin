import { FC } from 'react'
import { useScript } from './hooks/useScript'
import { List } from './component/List'
import { Manager } from './component/Manager'

export const ArticleList: FC = () => {
  const { list, loading, articlesState } = useScript()
  return (
    <div>
      {articlesState && <Manager state={articlesState} />}
      <List list={list} loading={loading} />
    </div>
  )
}
