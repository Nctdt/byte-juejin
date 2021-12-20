import { IconPlusStroked } from '@douyinfe/semi-icons'
import { Button } from '@douyinfe/semi-ui'
import { FC } from 'react'

import { useScript } from './hooks/useScript'

export const PostDetail: FC = () => {
  const { post, timeText } = useScript()
  const { article_info, author_user_info, article_content } = post

  return (
    <div className="bg-white p-4">
      <div className="text-2xl font-bold">{article_info.title}</div>
      <div className="flex justify-between my-6 items-center">
        <div className="flex items-stretch">
          <img
            className="w-12 h-12 rounded-full mr-2"
            src={author_user_info.avatar_large}
            alt={author_user_info.user_name}
          />
          <div>
            <div className="flex">
              <div className="mr-2">{author_user_info.user_name}</div>
              <div className="flex items-center">
                <div className="bg-blue-300 text-white font-bold rounded-sm text-xs px-1">
                  Lv{author_user_info.level}
                </div>
              </div>
            </div>
            <div className="text-gray-400 text-xs tracking-widest">
              {timeText} · 阅读 {article_info.view_count}
            </div>
          </div>
        </div>
        <Button
          className="border border-blue-400 flex items-center"
          icon={<IconPlusStroked />}>
          关注
        </Button>
      </div>
      {article_info.cover_image !== '' && (
        <img src={article_info.cover_image} alt={article_info.title} />
      )}
      <div dangerouslySetInnerHTML={{ __html: article_content }} />
    </div>
  )
}
