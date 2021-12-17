import { useRecoilState } from 'recoil'
import { SortTabsKey, sortTabsState } from '../store/sortTab'

export const useScript = () => {
  const [sortBy, setSortBy] = useRecoilState(sortTabsState)
  return {
    sortBy,
    handleClick(sortBy: SortTabsKey) {
      setSortBy(sortBy)
    },
  }
}
