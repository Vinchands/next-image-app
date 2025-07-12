import React from 'react'

interface RenderListProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  getKey?: (item: T, index: number) => string | number
}

export default function RenderList<T>({ items, getKey, renderItem }: RenderListProps<T>) {
  return items.map((item, index) => (
    <React.Fragment key={getKey? getKey(item, index) : index}>
      {renderItem(item, index)}
    </React.Fragment>
  ))
}
