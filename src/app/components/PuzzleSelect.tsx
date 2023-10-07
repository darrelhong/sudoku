'use client'

import { useAtom } from 'jotai'

import { newGameAtom } from '@/utils/game'
import { puzzlesAtom } from '@/utils/puzzles'

export function PuzzleSelect() {
  const [puzzles] = useAtom(puzzlesAtom)
  const [_, newGame] = useAtom(newGameAtom)

  return (
    <select
      title="Select puzzle"
      className="mb-4 block rounded-md border border-gray-300 p-1 shadow-sm dark:bg-black"
      onChange={(e) => {
        if (Number(e.target.value) === -1) return
        newGame(puzzles[Number(e.target.value)])
      }}
    >
      <option value={-1}>Select puzzle</option>
      {puzzles.map((_, index) => (
        <option key={index} value={index}>
          Puzzle {index + 1}
        </option>
      ))}
    </select>
  )
}
