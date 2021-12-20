import { FC } from 'react'
import { useBoolean } from 'ahooks'

export const CommentInput: FC = () => {
  const [focused, { setTrue, setFalse }] = useBoolean(false)
  return (
    <div
      contentEditable
      spellCheck="false"
      placeholder="输入评论"
      className={`transition-all border rounded-md p-2 w-full h-16 text-sm text-gray-400 outline-none ${
        focused
          ? 'border-blue-400 bg-white'
          : 'border-gray-100 bg-gray-100 before:content-[attr(placeholder)]'
      }`}
      onFocus={() => {
        setTrue()
      }}
      onBlur={() => {
        setFalse()
      }}
    />
  )
}
