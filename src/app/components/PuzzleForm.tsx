'use client'

import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

import { puzzlesAtom } from '@/utils/puzzles'

export function PuzzleForm() {
  const [mounted, setHasMounted] = useState(false)

  const [puzzles, setPuzzlesAtom] = useAtom(puzzlesAtom)

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    puzzles: {
      puzzleStr: string
    }[]
  }>({
    mode: 'onChange',
  })

  const { fields, remove, append, replace } = useFieldArray({
    control,
    name: 'puzzles',
  })

  useEffect(() => {
    setHasMounted(true)
  }, [])

  useEffect(() => {
    replace(puzzles.map((puzzleStr) => ({ puzzleStr })))
  }, [puzzles, replace])

  if (!mounted) {
    return null
  }

  return (
    <form
      className="w-full max-w-xl"
      onSubmit={handleSubmit((data) => {
        setPuzzlesAtom(data.puzzles.map(({ puzzleStr }) => puzzleStr))
      })}
    >
      <ul className="grid gap-2">
        {fields.map((field, index) => (
          <li key={field.id} className="grid gap-0.5">
            <label htmlFor={`puzzles.${index}.puzzleStr`}>
              Puzzle {index + 1}
            </label>
            <input
              className="input"
              {...register(`puzzles.${index}.puzzleStr`, {
                validate: (value) => {
                  if (value.length !== 81) {
                    return 'Puzzle must be 81 characters long'
                  }
                  if (value.match(/[^1-9.]/)) {
                    return 'Puzzle must only contain numbers 1-9 and .(period)'
                  }
                  return true
                },
              })}
              id={`puzzles.${index}.puzzleStr`}
              aria-invalid={
                errors.puzzles?.[index]?.puzzleStr ? 'true' : 'false'
              }
            />
            {errors.puzzles?.[index]?.puzzleStr && (
              <p className="text-sm text-red-400">
                {errors.puzzles?.[index]?.puzzleStr?.message}
              </p>
            )}
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
