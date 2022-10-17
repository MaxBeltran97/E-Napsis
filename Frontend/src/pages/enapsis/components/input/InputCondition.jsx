import { memo, useEffect } from "react"

export const InputCondition = memo(({ value , valuesConditions = [], unregister, labelCondition, children }) => {
  useEffect(() => {
    unregister(labelCondition)
  }, [value])

  if( valuesConditions.includes(value) ) {
    return (
      <>
        { children }
      </>
    )
  }
})
