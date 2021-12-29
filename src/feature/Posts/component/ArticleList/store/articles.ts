import { atom, selector, selectorFamily } from 'recoil'

import { Article, getArticles } from '@/api'
import { localStorageEffect } from '@/effects/localStorageEffect'
import { delay } from '@/utils/delay'
import { categoryIdState } from '../../Header/store/category'
import { sortTabsState } from '../../SortTab/store/sortTab'

const limit = 10

export const articlesState = atom<Article[]>({
  key: 'articles',
  default: [],
})

export const articlesOffsetState = atom({
  key: 'articlesOffset',
  default: 0,
})

export const historyArticlesState = atom<Article[]>({
  key: 'historyArticles',
  default: [],
  effects_UNSTABLE: [localStorageEffect('historyArticles')],
})

export const afterLookArticlesState = atom<Article[]>({
  key: 'afterLookArticles',
  default: [],
  effects_UNSTABLE: [localStorageEffect('afterLookArticles')],
})

export const articlesStateMap: Record<string, typeof historyArticlesState> = {
  history: historyArticlesState,
  afterLook: afterLookArticlesState,
}

export const afterLookArticlesIdSetState = selector({
  key: 'afterLookArticlesIdSet',
  get({ get }) {
    const afterLookArticles = get(afterLookArticlesState)
    return new Set(afterLookArticles.map(({ article_id }) => article_id))
  },
})

export const inAfterLookArticles = selectorFamily({
  key: 'inAfterLookArticles',
  get:
    (id: string) =>
    ({ get }) => {
      const afterLookArticlesIdSet = get(afterLookArticlesIdSetState)
      return afterLookArticlesIdSet.has(id)
    },
})

export const getArticlesState = selector({
  key: 'getArticles',
  async get({ get }) {
    await delay(100)
    const sortBy = get(sortTabsState)
    const offset = get(articlesOffsetState)
    const categoryId = get(categoryIdState)
    if (sortBy === 'history') {
      return get(historyArticlesState)
    } else if (sortBy === 'afterLook') {
      return get(afterLookArticlesState)
    } else {
      const articlesResponse = await getArticles(
        categoryId,
        sortBy,
        offset,
        limit,
      )
      if (articlesResponse.code === 404) return []

      return articlesResponse.data.articles
    }
  },
})

export const isManagerState = atom({
  key: 'isManager',
  default: false,
})

export const managerSelectState = atom<string[]>({
  key: 'managerSelect',
  default: [],
})
