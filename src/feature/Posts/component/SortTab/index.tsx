import { PlacehodlerFixed } from '@/component/PlacehodlerFixed'
import classNames from 'classnames'
import { FC } from 'react'
import { useScript } from './hooks/useScript'
import { sortTabsKV } from './store/sortTab'

const styles = {
  sortTab: classNames(
    'h-12 fixed bottom-0 bg-white w-screen flex justify-around',
  ),
  sortTabItem: (active: boolean) =>
    classNames('flex items-center', { 'text-blue-500': active }),
}

export const SortTab: FC = () => {
  const { sortBy, handleClick } = useScript()

  return (
    <PlacehodlerFixed>
      <div className="h-12 fixed bottom-0 bg-white w-screen flex justify-around">
        {sortTabsKV.map(([k, { text }]) => (
          <div
            key={k}
            className={styles.sortTabItem(k === sortBy)}
            onClick={() => handleClick(k)}>
            {text}
          </div>
        ))}
      </div>
    </PlacehodlerFixed>
  )
}
