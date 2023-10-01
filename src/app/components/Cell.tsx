'use client'

import { useRef } from 'react'

import { ICell } from '@/utils/game'
import { getXYFromIndex } from '@/utils/helpers'

export function Cell({
  cell,
  handleKeyUp,
}: {
  cell: ICell
  handleKeyUp: (e: React.KeyboardEvent<HTMLDivElement>, index: number) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div
      className={`grid aspect-square cursor-pointer place-items-center focus-within:bg-amber-300 ${getBorderClassName(
        cell.index,
      )}`}
      onClick={() => {
        inputRef.current?.focus()
      }}
      onKeyUp={(e) => {
        handleKeyUp(e, cell.index)
      }}
    >
      <input className="w-0" type="number" ref={inputRef} />
      <span
        className={`absolute ${!cell.isFixed ? 'font-semibold' : ''}  ${
          !cell.isFixed && (cell.isInvalid ? 'text-rose-500' : 'text-teal-500')
        }`}
      >
        {cell.value === 0 ? '' : cell.value}
      </span>
    </div>
  )
}

const getBorderClassName = (index: number) => {
  let className = ''
  const { x, y } = getXYFromIndex(index)

  if (x > 0) {
    className += ' border-l border-gray-300'
  }
  if (x !== 0 && x % 3 === 0) {
    className += ' border-l-2'
  }
  if (y > 0) {
    className += ' border-t border-gray-300'
  }
  if (y !== 0 && y % 3 === 0) {
    className += ' border-t-2'
  }

  return className
}
