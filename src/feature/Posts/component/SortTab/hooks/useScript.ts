import { useRecoilState } from 'recoil'
import { sortTabsState, SortTabsKey } from '../store/sortTab'

export const useScript = () => {
  const [sortBy, setSortBy] = useRecoilState(sortTabsState)
  return {
    sortBy,
    handleClick(sortBy: SortTabsKey) {
      setSortBy(sortBy)
    },
  }
}
