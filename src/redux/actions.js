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

export function updateCard(name, description, status, priority) {
    const newNameArr = name.map(el => el.name)
    const newName = newNameArr[newNameArr.indexOf(name)]
    const newDescriptionArr = description.map(el => el.description)
    const newDescription = newDescriptionArr[newDescriptionArr.indexOf(description)]
    const newStatusArr = status.map(el => el.status)
    const newStatus = newStatusArr[newStatusArr.indexOf(status)]
    const newPriorityArr = priority.map(el => el.priority)
    const newPriority = newPriorityArr[newStatusArr.indexOf(priority)]
    return (dispatch) => {
        axios.patch(`https://nazarov-kanban-server.herokuapp.com/card`,
            {name: newName, description: newDescription, priority: newPriority, status: newStatus})
            .then(res =>
            dispatch(
               getCards()
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