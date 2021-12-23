import { PlacehodlerFixed } from '@/component/PlacehodlerFixed'
import { Modal } from '@douyinfe/semi-ui'
import { FC, useState } from 'react'
import { useRecoilCallback } from 'recoil'
import { articlesState, historyArticlesState } from '../store/articles'

const useScript = () => {
  const clearHistoryArticles = useRecoilCallback(({ reset }) => () => {
    reset(historyArticlesState)
    reset(articlesState)
  })
  const handleClick = () => {
    Modal.confirm({
      title: '确认清空历史记录？',
      width: 300,
      onOk() {
        clearHistoryArticles()
      },
    })
  }
  return { handleClick }
}

export const ClearHistory: FC = () => {
  const { handleClick } = useScript()
  return (
    <PlacehodlerFixed>
      <div className="fixed top-0 w-screen flex justify-end overflow-hidden bg-white z-10">
        <div className="whitespace-nowrap text-sm p-2" onClick={handleClick}>
          清空
        </div>
      </div>
    </PlacehodlerFixed>
  )
}
