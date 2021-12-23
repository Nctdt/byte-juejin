import { atom, selector } from 'recoil'

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

export const getHistoryArticlesState = selector({
  key: 'getHistoryArticles',
  async get({ get }) {
    const historyArticles = get(historyArticlesState)
    const categoryId = get(categoryIdState)
    return categoryId === 0
      ? historyArticles
      : historyArticles.filter(
          ({ category_info: { first_category_id, second_category_id } }) =>
            [first_category_id, second_category_id].includes(categoryId),
        )
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
      return get(getHistoryArticlesState)
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