import { useEffect, useRef, useState } from 'react'

export interface DataProps<T> {
  defaultValue?: T
  value?: T
  onChange?: (date: T) => void
}
const useMergeController = <T>(defautStateValue: T, props: DataProps<T>) => {
  const { value: propsValue, defaultValue, onChange } = props

  const [value, setValue] = useState<T>(() => {
    if (propsValue === undefined) {
      return defaultValue ? defaultValue : defautStateValue
    } else {
      return propsValue
    }
  })

  // console.log('----', propsValue, value)

  const mergeValue = propsValue === undefined ? value : propsValue
  const isFirst = useRef<Boolean>(true)
  useEffect(() => {
    if (propsValue === undefined && !isFirst.current) {
      setValue(propsValue as T)
    }
    isFirst.current = false
  }, [propsValue])

  const setStateValue = (value: T) => {
    if (propsValue === undefined) {
      setValue(value)
    }
    onChange?.(value)
  }

  return { value: mergeValue, setStateValue } as const
}

export default useMergeController
