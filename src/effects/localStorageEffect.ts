import { AtomEffect } from 'recoil'

export const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  key =>
  ({ setSelf, onSet }) => {
    const savedVal = localStorage.getItem(key)
    if (savedVal !== null) {
      setSelf(JSON.parse(savedVal))
    }

    onSet((newVal, _, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newVal))
    })
  }
