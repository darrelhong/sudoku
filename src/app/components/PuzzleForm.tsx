'use client'

import { useAtom } from 'jotai'

import { puzzlesAtom } from '@/utils/puzzles'

export function PuzzleForm() {
  const [puzzles] = useAtom(puzzlesAtom)

  return (
    <form className="grid w-full max-w-xl gap-2">
      {puzzles.map((puzzleStr, index) => (
        <div key={index} className="grid gap-0.5">
          <label htmlFor={`puzzle-${index}`}>Puzzle {index + 1}</label>
          <textarea
            id={`puzzle-${index}`}
            defaultValue={puzzleStr}
            className="input"
          />
        </div>
      ))}
    </form>
  )
}
