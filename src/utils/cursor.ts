import { atom } from 'jotai'

export const cursorAtom = atom<[number, number]>([-1, -1])
