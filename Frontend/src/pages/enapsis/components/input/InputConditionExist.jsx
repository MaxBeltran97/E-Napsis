import { memo, useEffect } from "react"

export const InputConditionExist = memo(({ value, unregister, labelCondition, children }) => {
  useEffect(() => {
    unregister(labelCondition)
  }, [value])

  if(  !!value && value != '' ) {
    return (
      <>
        { children }
      </>
    )
  }
})
