import { atom } from 'recoil'

export const sortTabs = {
  hot: '热门',
  new: '最新',
  history: '历史',
}
export type SortTabsKey = keyof typeof sortTabs
export const sortTabsKV = Object.entries(sortTabs) as [SortTabsKey, string][]

export const sortTabsState = atom<SortTabsKey>({
  key: 'sortTabs',
  default: 'hot',
})
