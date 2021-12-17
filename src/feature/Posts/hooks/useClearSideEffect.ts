import { useEffect } from 'react'
import { useRecoilCallback, useRecoilValue } from 'recoil'
import {
  articlesOffsetState,
  articlesState,
} from '../component/ArticleList/store/articles'
import {
  selectDomainIdState,
  selectSubdomainIdState,
} from '../component/Header/store/category'
import { sortTabsState } from '../component/SortTab/store/sortTab'

export const useClearSideEffect = () => {
  const domainId = useRecoilValue(selectDomainIdState)
  const subdomainId = useRecoilValue(selectSubdomainIdState)
  const sortBy = useRecoilValue(sortTabsState)
  const resetListState = useRecoilCallback(({ reset }) => () => {
    reset(articlesState)
    reset(articlesOffsetState)
  })
  useEffect(() => {
    resetListState()
    window.scrollTo({ top: 0 })
  }, [domainId, subdomainId, sortBy])
}
