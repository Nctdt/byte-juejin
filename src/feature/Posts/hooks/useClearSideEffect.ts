import { useEffect } from 'react'
import { useRecoilCallback, useRecoilValue } from 'recoil'

import {
  articlesState,
  articlesOffsetState,
  isManagerState,
} from '../component/ArticleList/store/articles'
import {
  selectDomainIdState,
  selectSubdomainIdState,
} from '../component/Header/store/category'
import {
  currentTabState,
  sortTabsState,
} from '../component/SortTab/store/sortTab'

export const useClearSideEffect = () => {
  const resetListState = useRecoilCallback(
    ({ reset }) =>
      () => {
        reset(articlesState)
        reset(articlesOffsetState)
        reset(isManagerState)
      },
    [],
  )
  const clearSortByEffect = useRecoilCallback(
    ({ reset }) =>
      () => {
        reset(selectDomainIdState)
        reset(selectSubdomainIdState)
      },
    [],
  )

  const domainId = useRecoilValue(selectDomainIdState)
  const subdomainId = useRecoilValue(selectSubdomainIdState)
  const sortBy = useRecoilValue(sortTabsState)
  const showHeader = useRecoilValue(currentTabState('showHeader'))
  useEffect(() => {
    resetListState()
    if (!showHeader) clearSortByEffect()
    window.scrollTo({ top: 0 })
  }, [domainId, subdomainId, sortBy])
  return { showHeader }
}
