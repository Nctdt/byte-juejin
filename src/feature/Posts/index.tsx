import { FC } from 'react'
import { ArticleList } from './component/ArticleList'
import { Header } from './component/Header'
import { SortTab } from './component/SortTab'
import { useClearSideEffect } from './hooks/useClearSideEffect'

export const Posts: FC = () => {
  const { showHeader } = useClearSideEffect()
  return (
    <>
      {showHeader && <Header />}
      <ArticleList />
      <SortTab />
    </>
  )
}
