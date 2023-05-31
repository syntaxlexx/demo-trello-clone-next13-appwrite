import { ID, databases, storage } from '@/appwrite';
import getTodosGroupedByColumn from '@/lib/getTodosGroupedByColumn';
import uploadImage from '@/lib/uploadImage';
import { Board, Column, Image, Todo, TypedColumn } from '@/types';
import { create } from 'zustand'

interface BoardState {
    board: Board,
    getBoard: () => void,
    setBoardState: (board: Board) => void,
    updateTodoInDb: (todo: Todo, columnId: TypedColumn) => void,

    newTaskInput: string,
    setNewTaskInput: (input: string) => void,
    newTaskType: TypedColumn,
    setNewTaskType: (type: TypedColumn) => void,
    image: File | null,
    setImage: (image: File | null) => void,

    searchString: string,
    setSearchString: (searchString: string) => void,

    addTask: (todo: string, columnId: TypedColumn, image?: File | null) => void,
    deleteTask: (taskIndex: number, todoId: Todo, id: TypedColumn) => void,
}

export const useBoardStore = create<BoardState>((set, get) => ({
    board: {
        columns: new Map<TypedColumn, Column>(),
    },
    searchString: "",
    setSearchString: (searchString) => set({ searchString }),

    newTaskInput: "",
    setNewTaskInput: (input) => set({ newTaskInput: input }),
    newTaskType: "todo",
    setNewTaskType: (type) => set({ newTaskType: type }),
    image: null,
    setImage: (image) => set({ image }),

    getBoard: async () => {
        const board = await getTodosGroupedByColumn();

        set({ board });
    },

    setBoardState: (board) => set({ board }),

    updateTodoInDb: async (todo, columnId) => {
        await databases.updateDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID!,
            process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
            todo.$id,
            {
                title: todo.title,
                status: columnId,
            }
        )
    },

    addTask: async (todo, columnId, image = null) => {
        let file: Image | undefined

        if (image) {
            const fileUploaded = await uploadImage(image);
            if (fileUploaded) {
                file = {
                    bucketId: fileUploaded.bucketId,
                    fileId: fileUploaded.$id,
                }
            }
        }

        const { $id } = await databases.createDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID!,
            process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
            ID.unique(),
            {
                title: todo,
                status: columnId,
                ...(file && { image: JSON.stringify(file) }),
            }
        )

        // update board
        set({ newTaskInput: '' })
        set(state => {
            const newColumns = new Map(state.board.columns)

            const newTodo: Todo = {
                $id,
                $createdAt: new Date().toISOString(),
                title: todo,
                status: columnId,
                ...(file && { image: file }),
                $collectionId: '',
                $databaseId: '',
                $updatedAt: '',
                $permissions: []
            }

            const column = newColumns.get(columnId)

            if (!column) {
                newColumns.set(columnId, {
                    id: columnId,
                    todos: [newTodo],
                })
            } else {
                newColumns.get(columnId)?.todos.push(newTodo)
            }

            return {
                board: {
                    columns: newColumns,
                }
            }
        })
    },

    deleteTask: async (taskIndex, todo, id) => {
        const newColumns = new Map(get().board.columns)

        // delete todoId from newColumns
        // do it in an optimistic way
        newColumns.get(id)?.todos.splice(taskIndex, 1)

        set({ board: { columns: newColumns } })

        if (todo.image) {
            await storage.deleteFile(todo.image.bucketId, todo.image.fileId)
        }

        await databases.deleteDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID!,
            process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
            todo.$id,
        )
    },
}))