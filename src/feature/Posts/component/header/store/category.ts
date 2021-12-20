import { CategoriesData, getCategories } from '@/api'
import { atom, selector } from 'recoil'

export const domainCategoryState = atom<CategoriesData['categories']>({
  key: 'domainCategory',
  default: selector({
    key: 'domainCategory/Default',
    async get() {
      const categoriesRes = await getCategories()
      if (categoriesRes.code !== 404) {
        return categoriesRes.data.categories
      }
      return []
    },
  }),
})
export const selectDomainIdState = atom({
  key: 'selectDomainId',
  default: 0,
})

export const subdomainCategoryState = selector({
  key: 'subdomainCategory',
  async get({ get }) {
    const categories = get(domainCategoryState)
    const selectDomainCategory = get(selectDomainIdState)
    return (
      categories.find(({ category_id }) => category_id === selectDomainCategory)
        ?.children ?? []
    )
  },
})

export const selectSubdomainIdState = atom({
  key: 'selectSubdomainId',
  default: -1,
})

export const categoryIdState = selector({
  key: 'categoryId',
  get({ get }) {
    const selectDomainId = get(selectDomainIdState)
    const selectSubdomainId = get(selectSubdomainIdState)
    const categoryId =
      selectSubdomainId === -1 ? selectDomainId : selectSubdomainId
    return categoryId
  },
})
