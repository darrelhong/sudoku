import { Cell } from './Cell'

export function Board({ puzzle }: { puzzle: string }) {
  return (
    <div className="grid w-full max-w-xl grid-cols-9 rounded-lg bg-white shadow-lg">
      {puzzle.split('').map((value, index) => (
        <Cell
          x={index % 9}
          y={Math.floor(index / 9)}
          value={value}
          key={index}
        />
      ))}
    </div>
  )
}
