import { selectorFamily } from 'recoil'

import { Article, getArticleById } from '@/api'

export const getPostState = selectorFamily({
  key: 'getPost',
  get:
    ({ postId }: { postId: string }) =>
    async () => {
      const articleResponse = await getArticleById(postId)
      if (articleResponse.code === 404) throw articleResponse.error_message
      return articleResponse.data.article
    },
})
