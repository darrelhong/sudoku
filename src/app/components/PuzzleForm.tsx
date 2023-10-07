'use client'

import { useAtom } from 'jotai'
import { useFieldArray, useForm } from 'react-hook-form'

import { puzzlesAtom } from '@/utils/puzzles'

export function PuzzleForm() {
  const [puzzles] = useAtom(puzzlesAtom)

  const { register, control } = useForm({
    defaultValues: {
      puzzles: puzzles.map((puzzleStr) => ({ puzzleStr })),
    },
  })
  const { fields, remove, append } = useFieldArray({
    control,
    name: 'puzzles',
  })

  return (
    <form className="w-full max-w-xl">
      <ul className="grid gap-2">
        {fields.map((item, index) => (
          <li key={item.id} className="grid gap-0.5">
            <label htmlFor={`puzzles.${index}.puzzleStr`}>
              Puzzle {index + 1}
            </label>
            <textarea
              className="input"
              {...register(`puzzles.${index}.puzzleStr`)}
              id={`puzzles.${index}.puzzleStr`}
            />
            <button
              className="btn justify-self-start text-sm"
              type="button"
              onClick={() => remove(index)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <section className="mt-3">
        <button
          className="btn text-sm"
          type="button"
          onClick={() => append({ puzzleStr: '' })}
        >
          Add
        </button>
      </section>
      <section className="mt-3">
        <button className="btn" type="submit">
          Save
        </button>
      </section>
    </form>
  )
}
