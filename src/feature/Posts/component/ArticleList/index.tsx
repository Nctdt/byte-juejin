import { FC } from 'react'
import { useScript } from './hooks/useScript'
import { List } from './component/List'
import { Manager } from './component/Manager'

export const ArticleList: FC = () => {
  const { list, loading, currEditArticlesState } = useScript()
  return (
    <div>
      {currEditArticlesState && <Manager state={currEditArticlesState} />}
      <List list={list} loading={loading} />
    </div>
  )
}
