import React, { useRef } from 'react'
import { FC, RefObject, useEffect, useState } from 'react'

interface Props {
  target: RefObject<HTMLElement>
}
const PlacehodlerDiv: FC<Props> = ({ target }) => {
  const [height, setHeight] = useState(0)
  useEffect(() => {
    const h = target.current?.getBoundingClientRect().height ?? 0
    if (height !== h) setHeight(h)
  })
  return <div style={{ height }} />
}

export const PlacehodlerFixed: FC = ({ children }) => {
  const ref = useRef(null)
  const cloneChildren = React.cloneElement(children as React.ReactElement, {
    ref,
  })

  return (
    <div>
      {cloneChildren}
      <PlacehodlerDiv target={ref} />
    </div>
  )
}
