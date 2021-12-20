import { useRecoilCallback, useRecoilState } from 'recoil'

import { usePostId } from '@/feature/Post/hooks/usePostId'
import { commentsState, getComments } from '../store/comments'

export const useScript = () => {
  const { postId } = usePostId()
  const [comments, setComments] = useRecoilState(commentsState({ postId }))
  const handleClick = useRecoilCallback(
    () => async () => {
      const offset = comments.defaultLimit
      const limit = comments.total - comments.defaultLimit
      const commentsRest = await getComments(postId, offset, limit)
      setComments(comments => ({
        ...commentsRest,
        data: [...comments.data, ...commentsRest.data],
      }))
    },
    [postId],
  )

  return { comments, handleClick }
}
