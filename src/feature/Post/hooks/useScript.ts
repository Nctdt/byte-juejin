import { useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { getCommentsState } from '../component/PostComment/store/comments'
import { getPostState } from '../component/PostDetail/store/post'

export const useScript = () => {
  const { postId } = useParams() as Record<any, string>

  const post = useRecoilValue(getPostState({ postId }))
  const comments = useRecoilValue(getCommentsState({ postId }))

  if (post.code === 404)
    return { isError: true, msg: post.error_message } as const

  if (comments.code === 404)
    return { isError: true, msg: comments.error_message } as const

  return { isError: false, post: post.data.article, comments } as const
}
