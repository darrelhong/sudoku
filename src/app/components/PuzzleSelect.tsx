'use client'

import { useAtom } from 'jotai'

import { newGameAtom } from '@/utils/game'
import { puzzlesAtom } from '@/utils/puzzles'

export function PuzzleSelect() {
  const [puzzles] = useAtom(puzzlesAtom)
  const [_, newGame] = useAtom(newGameAtom)

  return (
    <div className="mb-4 flex gap-2">
      <select
        title="Select puzzle"
        className="btn"
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
      <button className="btn">Edit</button>
    </div>
  )
}
