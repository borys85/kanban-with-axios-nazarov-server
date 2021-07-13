import 'redux-devtools-extension';


const initialState = {
    statuses: [],
    cards: [],
    priorities: [1, 2, 3, 4, 5],
    name: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_COLUMNS':
         return {...state, statuses: action.payload}

        case 'GET_CARDS':
            return {...state, cards: action.payload}

        case 'ADD_CARD':
            return {...state, cards: [...state.cards, action.payload]}


        default: return state
    }
}

export default reducer;