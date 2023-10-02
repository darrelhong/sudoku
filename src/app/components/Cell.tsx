'use client'

import { useAtom } from 'jotai'
import { useRef } from 'react'

import { ICell, showGuidesAtom } from '@/utils/game'
import { getXYFromIndex } from '@/utils/helpers'

export function Cell({
  cell,
  handleKeyUp,
}: {
  cell: ICell
  handleKeyUp: (e: React.KeyboardEvent<HTMLDivElement>, index: number) => void
}) {
  const [showGuides] = useAtom(showGuidesAtom)
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div
      className={`flex aspect-square cursor-pointer items-center justify-center focus-within:bg-amber-300 ${getBorderClassName(
        cell.index,
      )}`}
      onClick={() => {
        inputRef.current?.focus()
      }}
      onKeyUp={(e) => {
        handleKeyUp(e, cell.index)
      }}
    >
      {!cell.isFixed && (
        <input
          className="w-0"
          type="number"
          ref={inputRef}
          title="cell"
          pattern="[0-9]*"
        />
      )}
      <span
        className={`absolute ${!cell.isFixed ? 'font-semibold' : ''} ${
          !cell.isFixed &&
          (showGuides
            ? cell.isInvalid
              ? 'text-rose-500'
              : 'text-teal-500'
            : 'text-sky-500')
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
