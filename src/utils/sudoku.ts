import { GRID_SIZE, GRID_SIZE_SQRT } from './constants'
import { ICell } from './game'
import { getXYFromIndex } from './helpers'

export const getCellIsInvalid = (cell: ICell, grid: ICell[]) => {
  if (cell.value === 0) return false
  const { index, value } = cell
  const row = getRow(index, grid)
  const col = getColumn(index, grid)
  const square = getSquare(index, grid)
  const hasDuplicate =
    row.filter((cell) => cell.value === value && cell.index !== index).length >
      0 ||
    col.filter((cell) => cell.value === value && cell.index !== index).length >
      0 ||
    square.filter((cell) => cell.value === value && cell.index !== index)
      .length > 0
  return hasDuplicate
}

export const getRow = (index: number, grid: ICell[]) => {
  const { y } = getXYFromIndex(index)
  return grid.filter((_, i) => getXYFromIndex(i).y === y)
}

export const getColumn = (index: number, grid: ICell[]) => {
  const { x } = getXYFromIndex(index)

  return grid.filter((_, i) => getXYFromIndex(i).x === x)
}

export const getSquare = (index: number, grid: ICell[]) => {
  const { x, y } = getXYFromIndex(index)
  const xStart = Math.floor(x / GRID_SIZE_SQRT) * GRID_SIZE_SQRT
  const yStart = Math.floor(y / GRID_SIZE_SQRT) * GRID_SIZE_SQRT
  const square = []
  for (let i = yStart; i < yStart + GRID_SIZE_SQRT; i++) {
    for (let j = xStart; j < xStart + GRID_SIZE_SQRT; j++) {
      const cellIndex = i * GRID_SIZE + j
      square.push(grid[cellIndex])
    }
  }
  return square
}
