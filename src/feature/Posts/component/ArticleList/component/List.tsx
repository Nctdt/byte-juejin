import { useRecoilValue, useSetRecoilState } from 'recoil'
import { CheckboxGroup, Spin } from '@douyinfe/semi-ui'
import { FC } from 'react'

import { Article } from '@/api'
import { Cart } from './Cart'
import { isManagerState, managerSelectState } from '../store/articles'
import { Checkbox } from '@douyinfe/semi-ui/lib/es/checkbox'

export const List: FC<{
  list: Article[]
  loading: boolean
}> = ({ list, loading }) => {
  const isManager = useRecoilValue(isManagerState)
  const setMangerSelect = useSetRecoilState(managerSelectState)
  console.log('isManager: ', isManager)
  return (
    <>
      <CheckboxGroup onChange={v => setMangerSelect(v)}>
        {list.map((article, i) => (
          <div className="flex">
            {isManager && (
              <div className="flex items-center">
                <Checkbox className="ml-1" value={article.article_id} />
              </div>
            )}
            <Cart key={article.article_id + i} article={article} />
          </div>
        ))}
      </CheckboxGroup>
      {loading && <Spin size="large" />}
    </>
  )
}
