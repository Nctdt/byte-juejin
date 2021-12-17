import { FC } from 'react'
import { ArticleList } from './component/ArticleList'
import { Header } from './component/Header'
import { SortTab } from './component/SortTab'
import { useClearSideEffect } from './hooks/useClearSideEffect'

export const Posts: FC = () => {
  useClearSideEffect()
  return (
    <>
      <Header />
      <ArticleList />
      <SortTab />
    </>
  )
}
