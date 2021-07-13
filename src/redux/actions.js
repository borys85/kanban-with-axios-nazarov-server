import axios from "axios";



export function getStatuses() {
    return (dispatch) => {
        axios.get('https://nazarov-kanban-server.herokuapp.com/column')
    .then(res =>
        dispatch({type: 'GET_COLUMNS',
            payload: res.data}))
            .catch((error) => console.log(error))
    }
}

export function getCards() {
    return (dispatch) => {
        axios.get(`https://nazarov-kanban-server.herokuapp.com/card`)
            .then(res =>
             dispatch({
                type: 'GET_CARDS',
                payload: res.data
            })).catch((error) => console.log(error))
    }
}

export function addNewCard(card) {
    return (dispatch) => {
        axios.post(`https://nazarov-kanban-server.herokuapp.com/card`, {...card})
            .then(res =>
            dispatch(
               getCards()
            )).catch((error) => console.log(error))
    }
}

export function deleteCard(id) {
    return (dispatch) => {
        axios
            .delete(`https://nazarov-kanban-server.herokuapp.com/card/${id}`)
            .then(res =>
            dispatch(
                getCards()
            )).catch(error => console.log(error))
    }
}

export function updateCard(id, newCard) {
    // const newCards = {
    //     name: name,
    //     description: description,
    //     status: status,
    //     priority: priority
    // }
    return (dispatch) => {
        axios
            .patch(`https://nazarov-kanban-server.herokuapp.com/card/${id}`, {...newCard})
            .then(res =>
            dispatch(
               getCards(newCard)
            )).catch((error) => console.log(error))
    }
}

export function changeStatus(card, statuses, direction) {
    const statusesArr = statuses.map(el => el.status)
    console.log(statuses)
    const newStatus = statusesArr[statusesArr.indexOf(card.status) + direction]
    return (dispatch) => {
        axios
            .patch(`https://nazarov-kanban-server.herokuapp.com/card/${card._id}`, {status: newStatus})
            .then(res => dispatch(
                getCards()
            ))
            .catch((err) => console.log(err))
    }
}

export function changePriority(id, priority, direction) {
    const newPriority = priority + direction;
    return (dispatch) => {
        axios
            .patch(`https://nazarov-kanban-server.herokuapp.com/card/${id}`, {priority: newPriority})
            .then(res => dispatch(
                getCards()
            ))
            .catch((err) => console.log(err))

    }
}