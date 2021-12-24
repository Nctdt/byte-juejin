import { Spin } from '@douyinfe/semi-ui'
import { FC } from 'react'

import { Article } from '@/api'
import { Cart } from './Cart'

export const List: FC<{
  list: Article[]
  loading: boolean
}> = ({ list, loading }) => {
  return (
    <>
      {list.map((article, i) => (
        <Cart key={article.article_id + i} article={article} />
      ))}
      {loading && <Spin size="large" />}
    </>
  )
}
