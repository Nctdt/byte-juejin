import { Res } from '@/api'
import { DependencyList, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { isErrorState } from '../store'

export const useError = <T extends Res>(res: T, deps: DependencyList = []) => {
  const setError = useSetRecoilState(isErrorState)
  const isError = res.code === 404

  useEffect(() => {
    if (isError) setError(true)
  }, deps)
  return {
    isError,
  }
}
