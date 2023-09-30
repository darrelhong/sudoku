'use client'

import { useAtom } from 'jotai'

import { cursorAtom } from '@/utils/cursor'

export function Cell({ x, y, value }: { x: number; y: number; value: string }) {
  const [[cursorX, cursorY], setCursor] = useAtom(cursorAtom)

  return (
    <button
      className={`grid aspect-square place-items-center p-1 ${getBorderClassName(
        x,
        y,
        cursorX,
        cursorY,
      )}`}
      onClick={() => setCursor([x, y])}
    >
      <span className="absolute">{value === '.' ? '' : value}</span>
    </button>
  )
}

const getBorderClassName = (
  x: number,
  y: number,
  cursorX: number,
  cursorY: number,
) => {
  let className = ''

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

  if (x === cursorX && y === cursorY) {
    className += ' bg-amber-300'
  }

  return className
}
