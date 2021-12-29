import { atom, selector, selectorFamily } from 'recoil'

export type SortTabs = 'hot' | 'new' | 'history' | 'afterLook'

export type SortTabConfig = {
  text: string
  showHeader: boolean
  showAddLookAfter: boolean
}
export const sortTabs: Record<SortTabs, SortTabConfig> = {
  hot: { text: '热门', showHeader: true, showAddLookAfter: true },
  new: { text: '最新', showHeader: true, showAddLookAfter: true },
  history: { text: '历史', showHeader: false, showAddLookAfter: false },
  afterLook: { text: '稍后再看', showHeader: false, showAddLookAfter: false },
}
export const sortTabsKV = Object.entries(sortTabs) as [
  SortTabs,
  SortTabConfig,
][]

export const sortTabsState = atom<SortTabs>({
  key: 'sortTabs',
  default: 'hot',
})
export const currentTabState = selectorFamily({
  key: 'currentTab',
  get:
    (k: keyof SortTabConfig) =>
    ({ get }) => {
      const sortBy = get(sortTabsState)
      const curr = sortTabs[sortBy]
      return curr[k]
    },
})
