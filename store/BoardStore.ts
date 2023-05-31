import { getTodosGroupedByColumn } from '@/lib/getTodosGroupedByColumn';
import { Board, Column, TypedColumn } from '@/types';
import { create } from 'zustand'

interface BoardState {
    board: Board,
    getBoard: () => void,
    setBoardState: (board: Board) => void
}

export const useBoardStore = create<BoardState>((set) => ({
    board: {
        columns: new Map<TypedColumn, Column>(),
    },
    getBoard: async () => {
        const board = await getTodosGroupedByColumn();

        set({ board });
    },

    setBoardState: (board) => set({ board })
}))