// .article_info.rtime 时间
//  .title 标题
//  .brief_content 简介
//  .comment_count 评论数
//  .digg_count 点赞数
//  .cover_image 图片
// .tags 标签
// .author_user_info.user_name 用户名

import { Article } from '@/api'
import { FC } from 'react'
import { useRecoilState } from 'recoil'
import { useScript } from './hooks/useScript'
import { historyArticlesState } from './store/articles'
import dayjs from 'dayjs'
import { IconThumbUpStroked, IconComment } from '@douyinfe/semi-icons'
import { Spin } from '@douyinfe/semi-ui'
import { useNavigate } from 'react-router-dom'

const Cart: FC<{ article: Article }> = ({ article }) => {
  const { article_info, author_user_info, category_info } = article
  const now = dayjs()
  const realTime = dayjs(+(article_info.rtime + '000'))
  const diffDays = now.diff(realTime, 'days')
  const [historyArticles, setHistoryArticles] =
    useRecoilState(historyArticlesState)
  const handleClick = () => {
    let idx = historyArticles.findIndex(
      a => a.article_id === article.article_id,
    )
    if (idx !== -1) {
      setHistoryArticles(v => {
        const arr = [...v]
        arr.splice(idx, 1)
        return arr
      })
    }
    setHistoryArticles(v => [article, ...v])
    window.open(`/post/${article.article_id}`)
  }
  return (
    <div className="mx-4 my-2 border-b-2 border-gray-200 text-sm">
      <div className="flex my-2">
        <div className="text-gray-600">{author_user_info.user_name}</div>
        <div
          style={{ width: 1 }}
          className="transform scale-y-75 mx-2 bg-gray-300"
        />
        <div className="text-gray-400">{diffDays}天前</div>
      </div>
      <div onClick={handleClick} className="my-2 font-bold text-xl">
        {article_info.title}
      </div>
      <div className="flex h-24 my-2">
        <div className="overflow-hidden overflow-ellipsis flex-1">
          {article_info.brief_content}
        </div>
        {article_info.cover_image !== '' && (
          <img
            className="h-full w-32 ml-2"
            src={article_info.cover_image}
            alt={article_info.title}
          />
        )}
      </div>
      <div className="text-gray-400 flex justify-between my-2">
        <div className="flex">
          <div className="flex items-center mr-8">
            <IconThumbUpStroked className="mr-1" />
            <span>{article_info.digg_count}</span>
          </div>
          <div className="flex items-center">
            <IconComment className="mr-1" />
            <span>{article_info.comment_count}</span>
          </div>
        </div>
        <div className="flex items-center text-gray-500">
          <div className="py-.5 px-2 ml-2 bg-gray-50">
            {category_info.first_category_name}
          </div>
          <div className="py-.5 px-2 ml-2 bg-gray-50">
            {category_info.second_category_name}
          </div>
        </div>
      </div>
    </div>
  )
}

export const ArticleList: FC = () => {
  const { list, loading } = useScript()
  return (
    <div>
      {list.map((article, i) => (
        <Cart key={article.article_id + i} article={article} />
      ))}
      {loading && <Spin size="large" />}
    </div>
  )
}
