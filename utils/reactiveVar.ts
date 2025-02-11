import { useEffect, useReducer } from 'react'

// Source: https://github.com/jorbuedo/react-reactive-var
// Reactive Vars are a concept introduced by Apollo Client. It is a very low
// complexity and low code way to handle simple global state.
// Since the library only has 2 stars and the below code is all it takes, I felt
// it better to maintain a copy.

// TODO: jotai

export interface ReactiveVar<T> {
  (newValue?: T | ((value: T) => T)): T
  subscribe: (handler: (value: T) => void) => () => void
  unsubscribe: (handler: (value: T) => void) => void
}

type EqualsFunc<T> = (a: T, b: T) => boolean

export const makeVar = <T>(
  initialValue: T,
  equalsFunc?: EqualsFunc<T>,
): ReactiveVar<T> => {
  let value = initialValue
  type Handler = (value: T) => void
  const subscribers = new Set<Handler>()

  const reactiveVar = (newValue?: T | ((value: T) => T)) => {
    if (newValue !== undefined) {
      let nextValue = value

      if (newValue instanceof Function) {
        nextValue = newValue(value)
      } else {
        nextValue = newValue
      }

      const valueChanged = equalsFunc
        ? !equalsFunc(nextValue, value)
        : nextValue !== value
      value = nextValue

      if (valueChanged) {
        subscribers.forEach((handler) => {
          handler(value)
        })
      }
    }
    return value
  }

  reactiveVar.subscribe = (handler: Handler) => {
    subscribers.add(handler)
    return () => subscribers.delete(handler)
  }

  reactiveVar.unsubscribe = (handler: Handler) => {
    subscribers.delete(handler)
  }

  return reactiveVar
}

export const useReactiveVar = <T>(reactiveVar: ReactiveVar<T>) => {
  const handler = useReducer<(x: number) => number>((x) => x + 1, 0)[1]

  useEffect(() => {
    reactiveVar.subscribe(handler)
    return () => {
      reactiveVar.unsubscribe(handler)
    }
  }, [reactiveVar, handler])

  return reactiveVar()
}
