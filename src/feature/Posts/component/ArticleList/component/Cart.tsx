import { IconThumbUpStroked, IconComment } from '@douyinfe/semi-icons'
import dayjs from 'dayjs'
import { FC } from 'react'
import { useRecoilCallback, useRecoilValue } from 'recoil'

import { Article } from '@/api'
import {
  afterLookArticlesState,
  historyArticlesState,
  inAfterLookArticles,
} from '../store/articles'
import { getRtime } from '@/utils/getRtime'
import { rmDuplicateAdd } from '../utils/rmDuplicateAdd'
import { currentTabState } from '../../SortTab/store/sortTab'

const useScript = (article: Article) => {
  const { article_info } = article
  const now = dayjs()
  const realTime = dayjs(getRtime(article_info.rtime))
  const diffDays = now.diff(realTime, 'days')

  const showAddAfterLook = useRecoilValue(currentTabState('showAddLookAfter'))
  const inAfterLook = useRecoilValue(
    inAfterLookArticles(article_info.article_id),
  )

  const handleClick = useRecoilCallback(
    ({ set }) =>
      () => {
        set(historyArticlesState, v =>
          rmDuplicateAdd(v, article, a => a.article_id === article.article_id),
        )
        window.open(`/post/${article.article_id}`)
      },
    [],
  )
  const afterLookHandleClick = useRecoilCallback(({ set }) => () => {
    set(afterLookArticlesState, v => {
      const idx = v.findIndex(a => a.article_id === article.article_id)
      const cpArr = [...v]
      if (idx !== -1) {
        cpArr.splice(idx, 1)
        return cpArr
      }
      return [article, ...v]
    })
  })
  return {
    diffDays,
    inAfterLook,
    showAddAfterLook,
    handleClick,
    afterLookHandleClick,
  }
}

export const Cart: FC<{ article: Article }> = ({ article }) => {
  const { article_info, author_user_info, category_info } = article
  const {
    diffDays,
    inAfterLook,
    showAddAfterLook,
    handleClick,
    afterLookHandleClick,
  } = useScript(article)
  return (
    <div
      className="mx-4 my-2 border-b-2 border-gray-200 text-sm"
      onClick={handleClick}>
      <div className="flex mb-2">
        <div className="text-gray-600">{author_user_info.user_name}</div>
        <div
          style={{ width: 1 }}
          className="transform scale-y-75 mx-2 bg-gray-300"
        />
        <div className="text-gray-400">{diffDays}天前</div>
      </div>
      <div className="mb-2 font-bold text-xl">{article_info.title}</div>
      <div className="flex h-24 mb-2">
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
      <div className="text-gray-400 flex justify-between mb-1">
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
      {showAddAfterLook && (
        <div
          className="mb-2"
          onClick={ev => {
            ev.stopPropagation()
            afterLookHandleClick()
          }}>
          {inAfterLook ? '从稍后再看中移除' : '添加至稍后再看'}
        </div>
      )}
    </div>
  )
}
