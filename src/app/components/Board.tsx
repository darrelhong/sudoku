'use client'

import { useAtom } from 'jotai'
import { useHydrateAtoms } from 'jotai/utils'
import { useCallback } from 'react'

import {
  getGridFromPuzzleString,
  getValueFromKey,
  gridAtom,
  updateGridAtom,
} from '@/utils/game'

import { Cell } from './Cell'

export function Board({ initialPuzzle }: { initialPuzzle: string }) {
  useHydrateAtoms([[gridAtom, getGridFromPuzzleString(initialPuzzle)]])
  const [grid] = useAtom(gridAtom)
  const [_, updateGrid] = useAtom(updateGridAtom)

  const handleKeyUp = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>, index: number) => {
      const value = getValueFromKey(e.key)
      if (value !== null) {
        updateGrid({ index, value })
      }
    },
    [updateGrid],
  )
  return (
    <div className="grid w-full max-w-xl grid-cols-9 overflow-hidden rounded-lg bg-white text-xl shadow-lg sm:text-2xl">
      {grid.map((cell, index) => (
        <Cell index={index} cell={cell} key={index} handleKeyUp={handleKeyUp} />
      ))}
    </div>
  )
}
