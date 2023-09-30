import { Cell } from "./Cell";

export function Board({ puzzle }: { puzzle: string }) {
  return (
    <div className="grid grid-cols-9 w-full max-w-xl bg-white rounded-lg shadow-lg">
      {puzzle.split("").map((value, index) => (
        <Cell
          x={index % 9}
          y={Math.floor(index / 9)}
          value={value}
          key={index}
        />
      ))}
    </div>
  );
}
