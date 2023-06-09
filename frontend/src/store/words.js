import { csrfFetch } from "./csrf";

const CREATE_WORD = 'CREATE_WORD';

export const fetchCreateWord = (roundId, wordText) => async (dispatch) => {
    const response = await csrfFetch(`/api/rounds/${roundId}/words`, {
        method: 'POST',
        body: JSON.stringify({ wordText })
    })

    if (response.ok) {
        const word = await response.json();
        // dispatch(createWord(word));
        return word.word;
    } else {
        const data = await response.json();
        return data;
    }
}
