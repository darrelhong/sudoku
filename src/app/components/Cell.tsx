export function Cell({ x, y, value }: { x: number; y: number; value: string }) {
  return (
    <div
      className={`grid aspect-square place-items-center p-1 ${getBorderClassName(
        x,
        y,
      )}`}
    >
      <span className="absolute">{value === '.' ? '' : value}</span>
    </div>
  )
}

const getBorderClassName = (x: number, y: number) => {
  let className = ''

  if (x > 0) {
    className += ' border-l border-gray-300'
  }
  if (x !== 0 && x % 3 === 0) {
    className += ' border-l-2'
  }
  if (y > 0) {
    className += ' border-t border-gray-300'
  }
  if (y !== 0 && y % 3 === 0) {
    className += ' border-t-2'
  }

  return className
}
