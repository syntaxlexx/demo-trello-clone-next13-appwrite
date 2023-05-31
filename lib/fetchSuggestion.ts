import { Board } from "@/types";
import formatTodosForAI from "./formatTodosForAI";

const fetchSuggestion = async (board: Board) => {
    const todos = formatTodosForAI(board)
    // console.log("formated TODOS: ", todos);

    const res = await fetch('/api/generateSummary', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ todos })
    })

    const GPTdata = await res.json();
    const { content } = GPTdata

    return content;
}

export default fetchSuggestion
