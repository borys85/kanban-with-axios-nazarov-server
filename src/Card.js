import 'bootstrap/dist/css/bootstrap.css';
import DeleteCardModal from "./DeleteCardModal";
import UpdateCardModal from "./UpdateCardModal";
import {connect} from "react-redux";
import {changePriority, changeStatus, getCards, getStatuses} from "./redux/actions";


function Card(props) {
    const {name, priority, status, description, _id} = props.card;
    // const moveButtonHandler = (card, statuses, direction) => {
    //     props.changeCardStatus(card, statuses, direction)
    // };
const statusesArr = props.statuses.map(el => el.title)
console.log(statusesArr)
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{description}</h6>
                <p className="card-text">
                    {status}
                    {' '}
                    <button type="button" className="btn btn-primary"
                            onClick={() => props.changeCardStatus(props.card, props.statuses, -1)}
                            disabled={statusesArr.indexOf(status) === 0}>←</button>
                    <button type="button" className="btn btn-secondary"
                            onClick={() => props.changeCardStatus(props.card, props.statuses, 1)}
                            disabled={statusesArr.indexOf(status) === statusesArr.length - 1}>→</button>
                    <br/>
                    Priority: {priority}
                    {' '}
                    <button type="button" className="btn btn-warning"
                            onClick={() => props.changeCardPriority(props.card._id, priority, 1)}
                            disabled={props.priorities.indexOf(priority) === props.priorities.length - 1}
                    >↑
                    </button>
                    <button type="button" className="btn btn-info"
                            onClick={() => props.changeCardPriority(props.card._id, priority, -1)}
                            disabled={props.priorities.indexOf(priority) === 0}
                    >↓
                    </button>
                </p>


                {' '}
                <UpdateCardModal name={name} description={description} status={status}
                                 priority={priority} id={_id}/>
                <DeleteCardModal cardName={name} id={_id}/>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    statuses: state.statuses,
    priorities: state.priorities
})

const mapDispatchToProps = (dispatch) => ({
    changeCardStatus: (card, statuses, direction) => dispatch(changeStatus(card, statuses, direction)),
    changeCardPriority: (id, priority, direction) => dispatch(changePriority(id, priority, direction))
})

export default connect(mapStateToProps, mapDispatchToProps)(Card);