import { Models } from "appwrite";

interface Board {
    columns: Map<TypedColumn, Column>,
}

type TypedColumn = "todo" | "inprogress" | "done"

interface Column {
    id: TypedColumn,
    todos: Todo[],
}

interface Todo extends Models.Document {
    $id: string,
    $createdAt: string,
    title: string,
    status: TypedColumn,
    image?: Image,
}

interface Image {
    bucketId: string,
    fileId: string,
}

interface TaskType {
    id: TypedColumn,
    name: string,
    description: string,
    color: string,
    ringColor: string,
}