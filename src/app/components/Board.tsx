'use client'

import { useAtom } from 'jotai'
import { useHydrateAtoms } from 'jotai/utils'
import { useCallback, useEffect } from 'react'

import {
  gameSolvedAtom,
  gridAtom,
  gridWithErrorsAtom,
  updateGridAtom,
} from '@/utils/game'
import { getGridFromPuzzleString, getValueFromKey } from '@/utils/helpers'

import { Cell } from './Cell'

export function Board({ initialPuzzle }: { initialPuzzle: string }) {
  useHydrateAtoms([[gridAtom, getGridFromPuzzleString(initialPuzzle)]])
  const [grid] = useAtom(gridWithErrorsAtom)
  const [_, updateGrid] = useAtom(updateGridAtom)
  const [solved] = useAtom(gameSolvedAtom)

  useEffect(() => {
    if (solved) {
      setTimeout(() => alert('You solved the puzzle!'), 1)
    }
  }, [solved])

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
    <div className="grid w-full max-w-xl grid-cols-9 overflow-hidden rounded-lg bg-white text-xl shadow-lg dark:border dark:border-white dark:bg-black sm:text-2xl">
      {grid.map((cell) => (
        <Cell cell={cell} key={cell.index} handleKeyUp={handleKeyUp} />
      ))}
    </div>
  )
}
