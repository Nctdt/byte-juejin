import { FC, useRef, useState } from 'react'
import { useBoolean } from 'ahooks'
import { Button, Toast } from '@douyinfe/semi-ui'

const useScript = () => {
  const [focused, { setTrue, setFalse }] = useBoolean(false)
  const [value, setValue] = useState('')
  const divRef = useRef<HTMLDivElement>(null)

  const handleFocus = () => {
    setTrue()
  }
  const handleBlur = () => {
    setFalse()
  }
  const handleInput = () => {
    setValue(divRef.current?.innerText ?? '')
  }
  const handleSubmit = () => {
    Toast.info(`提交的评论内容为: ${value}`)
  }
  return {
    divRef,
    isEmpty: value === '',
    actived: focused || !(value === ''),
    value,
    handleFocus,
    handleBlur,
    handleInput,
    handleSubmit,
  }
}

export const CommentInput: FC = () => {
  const {
    divRef,
    actived,
    isEmpty,
    handleFocus,
    handleBlur,
    handleInput,
    handleSubmit,
  } = useScript()
  return (
    <>
      <div
        contentEditable
        spellCheck="false"
        placeholder="输入评论"
        ref={divRef}
        className={`transition-all duration-150 border rounded-md p-2 w-full h-16 text-sm text-gray-400 outline-none ${
          actived ? 'border-blue-400 bg-white' : 'border-gray-100 bg-gray-100'
        } ${isEmpty ? 'before:content-[attr(placeholder)]' : ''}`}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onInput={handleInput}
      />
      {actived && (
        <div className="flex justify-end mt-2">
          <button
            className="px-4 py-2 rounded-md font-normal bg-blue-600 text-white text-xs "
            disabled={isEmpty}
            onClick={handleSubmit}>
            发表评论
          </button>
        </div>
      )}
    </>
  )
}
