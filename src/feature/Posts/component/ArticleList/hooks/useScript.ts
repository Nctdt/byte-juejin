import { useEffect } from 'react'
import { useRecoilValue, useRecoilState, useRecoilValueLoadable } from 'recoil'
import { categoryIdState } from '../../Header/store/category'
import { sortTabsState } from '../../SortTab/store/sortTab'
import {
  articlesState,
  articlesOffsetState,
  getArticlesState,
  articlesStateMap,
} from '../store/articles'
console.log(document.documentElement.clientHeight)
export const useScript = () => {
  const sortBy = useRecoilValue(sortTabsState)
  const categoryId = useRecoilValue(categoryIdState)
  const [list, setList] = useRecoilState(articlesState)
  const [offset, setOffset] = useRecoilState(articlesOffsetState)
  const articlesLoadable = useRecoilValueLoadable(getArticlesState)
  const currEditArticlesState = articlesStateMap[sortBy] ?? null

  useEffect(() => {
    const listener: EventListener = () => {
      const showHeight = window.innerHeight
      const scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop
      const { scrollHeight: allHeight } = document.documentElement
      if (scrollTop + showHeight >= allHeight && !currEditArticlesState) {
        setOffset(offset => offset + 10)
      }
    }
    window.addEventListener('scroll', listener)
    return () => window.removeEventListener('scroll', listener)
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
    currEditArticlesState,
  }
}
