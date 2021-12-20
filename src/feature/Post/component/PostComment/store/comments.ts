import { atom, atomFamily, selector, selectorFamily } from 'recoil'

import { getCommentsByArticleId } from '@/api'

const defaultLimit = 10

export async function getComments(
  postId: string,
  offset: number,
  limit: number,
) {
  const commentsResponse = await getCommentsByArticleId(postId, offset, limit)
  if (commentsResponse.code === 404) throw commentsResponse.error_message
  const { data, total, has_more: hasMore } = commentsResponse
  return { data: data.comments, total, hasMore, defaultLimit }
}

export const commentsState = atomFamily({
  key: 'comments',
  default: selectorFamily({
    key: 'comments/Default',
    get:
      ({
        postId,
        offset = 0,
        limit = defaultLimit,
      }: {
        postId: string
        offset?: number
        limit?: number
      }) =>
      async ({ get }) => {
        return getComments(postId, offset, limit)
      },
  }),
})
