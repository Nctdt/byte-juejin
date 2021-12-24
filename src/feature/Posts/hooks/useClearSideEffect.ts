import { useEffect } from 'react'
import { useRecoilCallback, useRecoilValue } from 'recoil'

import {
  articlesState,
  articlesOffsetState,
} from '../component/ArticleList/store/articles'
import {
  selectDomainIdState,
  selectSubdomainIdState,
} from '../component/Header/store/category'
import { sortTabs, sortTabsState } from '../component/SortTab/store/sortTab'

export const useClearSideEffect = () => {
  const domainId = useRecoilValue(selectDomainIdState)
  const subdomainId = useRecoilValue(selectSubdomainIdState)
  const sortBy = useRecoilValue(sortTabsState)
  const resetListState = useRecoilCallback(
    ({ reset }) =>
      () => {
        reset(articlesState)
        reset(articlesOffsetState)
      },
    [],
  )
  const sortByHistoryHandle = useRecoilCallback(
    ({ reset }) =>
      () => {
        reset(selectDomainIdState)
        reset(selectSubdomainIdState)
      },
    [],
  )
  useEffect(() => {
    resetListState()
    if (!sortTabs[sortBy].showHeader) sortByHistoryHandle()
    window.scrollTo({ top: 0 })
  }, [domainId, subdomainId, sortBy])
  return { showHeader: sortTabs[sortBy].showHeader }
}
