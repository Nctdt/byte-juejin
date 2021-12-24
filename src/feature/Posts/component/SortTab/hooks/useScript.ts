import { useRecoilCallback, useRecoilValue } from 'recoil'
import { sortTabsState, SortTabs } from '../store/sortTab'

export const useScript = () => {
  const sortBy = useRecoilValue(sortTabsState)
  const handleClick = useRecoilCallback(
    ({ set }) =>
      (sortBy: SortTabs) => {
        set(sortTabsState, sortBy)
      },
    [sortBy],
  )
  return {
    sortBy,
    handleClick,
  }
}
