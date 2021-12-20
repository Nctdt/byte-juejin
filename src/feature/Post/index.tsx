import { FC } from 'react'

import { ErrorBoundary } from '@/component/ErrorBoundary'
import { PostComment } from './component/PostComment'
import { PostDetail } from './component/PostDetail'
import { PostMiss } from './component/PostMiss'

export const Post: FC = () => {
  return (
    <ErrorBoundary errView={<PostMiss />}>
      <div className="bg-gray-100">
        <PostDetail />
        <PostComment />
      </div>
    </ErrorBoundary>
  )
}
