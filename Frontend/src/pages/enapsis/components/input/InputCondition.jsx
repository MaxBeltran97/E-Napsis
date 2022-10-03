import { memo, useEffect } from "react"

export const InputCondition = memo(({ value , valueCondition, unregister, labelCondition, children }) => {
  useEffect(() => {
    unregister(labelCondition)
  }, [value])

  if( value === valueCondition ) {
    return (
      <>
        { children }
      </>
    )
  }
})
