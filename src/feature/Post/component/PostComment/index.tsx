import { IconChevronDown } from '@douyinfe/semi-icons'
import { FC } from 'react'
import { CommentInput } from './component/CommentInput'
import { CommentView } from './component/CommentView'
import { useScript } from './hooks/useScript'

export const PostComment: FC = ({}) => {
  const { comments, handleClick } = useScript()
  const { data, total, hasMore } = comments
  return (
    <div className="mt-6 bg-white p-4">
      <div>
        <div className="mb-4 font-bold text-lg">评论</div>
        <div className="mb-8">
          <CommentInput />
        </div>
        <div className="mb-4 font-bold text-lg">全部评论 {total}</div>
        <div className="flex flex-col">
          {data.map(comment => (
            <CommentView
              type="comment"
              key={comment.comment_id}
              comment={comment}
            />
          ))}
        </div>
        {hasMore && (
          <div
            className="flex justify-center items-center py-4 bg-gray-100 rounded"
            onClick={handleClick}>
            查看全部 {total} 条回复
            <IconChevronDown className="ml-1" />
          </div>
        )}
      </div>
    </div>
  )
}
