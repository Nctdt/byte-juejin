import { useRecoilCallback, useRecoilValue } from 'recoil'
import { sortTabsState, SortTabsKey } from '../store/sortTab'

export const useScript = () => {
  const sortBy = useRecoilValue(sortTabsState)
  const handleClick = useRecoilCallback(
    ({ set }) =>
      (sortBy: SortTabsKey) => {
        set(sortTabsState, sortBy)
        if (sortBy === 'history') {
        }
      },
    [sortBy],
  )
  return {
    sortBy,
    handleClick,
  }
}
