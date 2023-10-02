'use client'

import clsx from 'clsx'
import { useAtom } from 'jotai'
import { useRef } from 'react'

import { GRID_SIZE_SQRT, ZERO_VALUE } from '@/utils/constants'
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

  const { x, y } = getXYFromIndex(cell.index)

  return (
    <div
      className={clsx(
        'flex aspect-square cursor-pointer items-center justify-center border-gray-300 focus-within:bg-amber-300',
        {
          'border-l': x > 0,
          'border-t': y > 0,
          'border-l-2': x !== 0 && x % GRID_SIZE_SQRT === 0,
          'border-t-2': y !== 0 && y % GRID_SIZE_SQRT === 0,
        },
      )}
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
        className={clsx(
          'absolute',
          !cell.isFixed &&
            'font-semibold' &&
            (showGuides
              ? {
                  'text-rose-500': !cell.isFixed && cell.isInvalid,
                  'text-teal-500': !cell.isFixed && !cell.isInvalid,
                }
              : 'text-sky-500'),
        )}
      >
        {cell.value === ZERO_VALUE ? '' : cell.value}
      </span>
    </div>
  )
}
