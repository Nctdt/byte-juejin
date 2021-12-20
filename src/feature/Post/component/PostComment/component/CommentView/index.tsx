import { FC } from 'react'

import { Comment, ReplyInfo } from '@/api'
import dayjs from 'dayjs'
import { getRtime } from '@/utils/getRtime'
import { IconComment, IconThumbUpStroked } from '@douyinfe/semi-icons'

type Props =
  | {
      comment: Comment
      type: 'comment'
    }
  | {
      comment: ReplyInfo
      type: 'reply'
    }

const TimeMap = {
  d: '天',
  m: '分',
  s: '秒',
}

const findTimeText = (time: number) => {
  const now = dayjs()
  for (const [unit, text] of Object.entries(TimeMap) as [
    's' | 'm' | 'd',
    string,
  ][]) {
    const diffTime = now.diff(getRtime(time), unit)
    if (diffTime !== 0) return diffTime + text + '前'
  }
}

const adapterProps = (props: Props) => {
  const { comment, type } = props

  let info =
    props.type === 'comment'
      ? props.comment.comment_info
      : props.comment.reply_info
  const processProps = {
    user_info: comment.user_info,
    ctime: info.ctime,
    digg_count: info.digg_count,
    reply_count: 0,
    content: '',
  }
  if (props.type === 'comment') {
    const { comment_info } = props.comment
    processProps.content = comment_info.comment_content
    processProps.reply_count = comment_info.reply_count
  } else {
    const { reply_info } = props.comment
    processProps.content = reply_info.reply_content
  }
  return processProps
}

export const CommentView: FC<Props> = props => {
  const { user_info, content, ctime, digg_count, reply_count } =
    adapterProps(props)
  const timeText = findTimeText(ctime)
  return (
    <div className={`flex text-sm ${props.type === 'reply' ? '' : 'my-2'}`}>
      <img
        className="w-10 h-10 rounded-full mr-2"
        src={user_info.avatar_large}
        alt=""
      />
      <div className="w-full">
        <div className="flex h-10 items-center">
          <div className="whitespace-nowrap">{user_info.user_name}</div>
          {user_info.level !== 0 && (
            <div className="flex items-center ml-1 mr-2">
              <div className="bg-blue-300 text-white font-bold rounded-sm text-xs px-1">
                Lv{user_info.level}
              </div>
            </div>
          )}
          {user_info.job_title && (
            <div className="text-gray-400 whitespace-nowrap truncate">
              {user_info.job_title}
            </div>
          )}
          <div className="text-gray-400 ml-auto ">{timeText}</div>
        </div>
        <div className="mb-2">{content}</div>
        <div className="flex text-gray-400 mb-2">
          <div className="flex items-center mr-4">
            <IconThumbUpStroked className="mr-1" />
            {digg_count || '点赞'}
          </div>
          <div className="flex items-center">
            <IconComment className="mr-1" />
            {reply_count || '回复'}
          </div>
        </div>
        {props.type === 'comment' && props.comment.reply_infos.length > 0 && (
          <div className="bg-gray-50 rounded-sm p-4">
            {props.comment.reply_infos.map(replyInfo => (
              <CommentView
                key={replyInfo.reply_id}
                type="reply"
                comment={replyInfo}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
