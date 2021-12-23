import { useEffect } from 'react'
import { useRecoilValue, useRecoilState, useRecoilValueLoadable } from 'recoil'
import { categoryIdState } from '../../Header/store/category'
import { sortTabsState } from '../../SortTab/store/sortTab'
import {
  articlesState,
  articlesOffsetState,
  getArticlesState,
} from '../store/articles'
import { managerHistoryState } from '../store/history'

export const useScript = () => {
  const sortBy = useRecoilValue(sortTabsState)
  const categoryId = useRecoilValue(categoryIdState)
  const [list, setList] = useRecoilState(articlesState)
  const [offset, setOffset] = useRecoilState(articlesOffsetState)
  const articlesLoadable = useRecoilValueLoadable(getArticlesState)

  useEffect(() => {
    const listener: EventListener = () => {
      const el = document.documentElement
      const { scrollHeight, scrollTop, clientHeight } = el
      if (scrollTop + clientHeight >= scrollHeight && sortBy !== 'history') {
        setOffset(offset => offset + 10)
      }
    }
    document.addEventListener('scroll', listener)
    return () => document.removeEventListener('scroll', listener)
  }, [sortBy])
  useEffect(() => {
    let canceled = false
    Promise.resolve(articlesLoadable.contents).then(articles => {
      if (canceled) return
      setList(list => [...list, ...articles])
    })
    return () => {
      canceled = true
    }
  }, [offset, sortBy, categoryId])

  if (articlesLoadable.state === 'hasError') throw articlesLoadable.contents

  return {
    list,
    loading: articlesLoadable.state === 'loading',
    isHistory: sortBy === 'history',
  }
}
