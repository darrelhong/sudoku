import { GRID_SIZE } from '@/utils/constants'

import { Cell } from './Cell'

export function Board({ puzzle }: { puzzle: string }) {
  return (
    <div className="grid w-full max-w-xl grid-cols-9 overflow-hidden rounded-lg bg-white shadow-lg">
      {puzzle.split('').map((value, index) => (
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
