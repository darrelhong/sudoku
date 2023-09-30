'use client'

import { useAtom } from 'jotai'
import { useHydrateAtoms } from 'jotai/utils'

import { GRID_SIZE } from '@/utils/constants'
import { getGridFromPuzzleString, gridAtom } from '@/utils/game'

import { Cell } from './Cell'

export function Board({ initialPuzzle }: { initialPuzzle: string }) {
  useHydrateAtoms([[gridAtom, getGridFromPuzzleString(initialPuzzle)]])
  const [grid] = useAtom(gridAtom)

  return (
    <div className="grid w-full max-w-xl grid-cols-9 overflow-hidden rounded-lg bg-white shadow-lg">
      {grid.map((value, index) => (
        <Cell
          x={index % GRID_SIZE}
          y={Math.floor(index / GRID_SIZE)}
          value={value}
          key={index}
        />
      ))}
    </div>
  )
}
