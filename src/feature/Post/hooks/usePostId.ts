import { useParams } from 'react-router-dom'

export const usePostId = () => {
  const { postId } = useParams() as Record<any, string>
  return { postId }
}
