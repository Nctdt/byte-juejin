import { useRecoilValue } from 'recoil'
import dayjs from 'dayjs'

import { usePostId } from '@/feature/Post/hooks/usePostId'
import { getPostState } from '../store/post'
import { getRtime } from '@/utils/getRtime'

export const useScript = () => {
  const { postId } = usePostId()
  const post = useRecoilValue(getPostState({ postId }))

  const { ctime } = post.article_info
  const timeText = dayjs(getRtime(ctime)).format('YYYY年MM月DD日 HH:MM')
  return { post, timeText }
}
