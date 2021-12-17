import { useRecoilState, useRecoilValue } from 'recoil'

import { Category } from '../../../../../api'
import { useClearSideEffect } from '../../../hooks/useClearSideEffect'
import {
  domainCategoryState,
  selectDomainIdState,
  selectSubdomainIdState,
  subdomainCategoryState,
} from '../store/category'

export const useScript = () => {
  const allSubdomain: Category = {
    category_id: -1,
    category_name: '全部',
  }
  const categories = useRecoilValue(domainCategoryState)
  const subdomainCategories = useRecoilValue(subdomainCategoryState)
  const [selectDomainId, setSelectDomainId] =
    useRecoilState(selectDomainIdState)
  const [selectSubdomainId, setSelectSubdomainId] = useRecoilState(
    selectSubdomainIdState,
  )
  return {
    categories,
    subdomainCategories: [allSubdomain, ...subdomainCategories],
    selectDomainId,
    selectSubdomainId,
    domainHandleClick(id: number) {
      setSelectSubdomainId(allSubdomain.category_id)
      setSelectDomainId(id)
    },
    subdomainHandleClick(id: number) {
      setSelectSubdomainId(id)
    },
  }
}
