import { Article } from '@/api'
import { PlacehodlerFixed } from '@/component/PlacehodlerFixed'
import { Modal } from '@douyinfe/semi-ui'
import { FC, useState } from 'react'
import { RecoilState, useRecoilCallback, useRecoilValue } from 'recoil'
import {
  articlesState,
  isManagerState,
  managerSelectState,
} from '../store/articles'

const useScript = (state: Props['state']) => {
  const isManager = useRecoilValue(isManagerState)
  const managerSelect = useRecoilValue(managerSelectState)
  const clearCurrArticles = useRecoilCallback(({ reset }) => () => {
    reset(state)
    reset(articlesState)
  })
  const clearClick = () => {
    Modal.confirm({
      title: '确认清空历史记录？',
      width: 300,
      onOk() {
        clearCurrArticles()
      },
    })
  }
  const managerClick = useRecoilCallback(({ set, reset }) => () => {
    set(isManagerState, v => {
      if (v) {
        reset(managerSelectState)
      }
      return !v
    })
  })
  const deleteClick = useRecoilCallback(({ set, reset }) => () => {
    set(state, v =>
      v.filter(({ article_id }) => !managerSelect.includes(article_id)),
    )
    set(articlesState, v =>
      v.filter(({ article_id }) => !managerSelect.includes(article_id)),
    )
    reset(isManagerState)
  })
  return { clearClick, deleteClick, managerClick, isManager }
}

interface Props {
  state: RecoilState<Article[]>
}

export const Manager: FC<Props> = ({ state }) => {
  const { clearClick, deleteClick, managerClick, isManager } = useScript(state)
  return (
    <PlacehodlerFixed>
      <div className="fixed top-0 w-screen flex justify-between overflow-hidden text-sm bg-white z-10">
        <div>
          {isManager && (
            <div className="p-2" onClick={deleteClick}>
              删除
            </div>
          )}
        </div>
        <div className="flex">
          <div className="p-2" onClick={clearClick}>
            清空
          </div>
          <div className="p-2" onClick={managerClick}>
            {isManager ? '取消' : '管理'}
          </div>
        </div>
      </div>
    </PlacehodlerFixed>
  )
}
