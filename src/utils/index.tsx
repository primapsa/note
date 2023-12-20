import React from 'react'

export const processInputValue = (
  e: React.ChangeEvent<HTMLInputElement>,
  callback: (v: string) => void
): void => {
  const { value } = e.target

  if (value) {
    callback(value)
  }
}
