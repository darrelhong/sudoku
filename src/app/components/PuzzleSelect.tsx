'use client'

import { useAtom } from 'jotai'

import { newGameAtom } from '@/utils/game'

export function PuzzleSelect({
  puzzles,
}: {
  puzzles: {
    id: string
    puzzle: string
  }[]
}) {
  const [_, newGame] = useAtom(newGameAtom)

  return (
    <select
      className="mb-4 block rounded-md border border-gray-300 p-1 shadow-sm"
      onChange={(e) => {
        const puzzle = puzzles.find((puzzle) => puzzle.id === e.target.value)
        newGame(puzzle!.puzzle)
      }}
    >
      {puzzles.map((puzzle, index) => (
        <option key={puzzle.id} value={puzzle.id}>
          Puzzle {index + 1}
        </option>
      ))}
    </select>
  )
}
