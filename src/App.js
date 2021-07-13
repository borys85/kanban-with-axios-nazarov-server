import './App.css';
import {getCards, getStatuses} from "./redux/actions";
import {connect} from "react-redux";
import {useEffect} from "react";
import Column from "./Column";
import 'bootstrap/dist/css/bootstrap.css';
import AddCardModal from "./AddCardModal";


function App(props) {

    useEffect(() => {
        props.getStatuses()
            props.getCards()
    }, [])

    return (
        <div className="App">
            <h1>Kanban Board</h1>

            <AddCardModal id={props._id}/>

            <div className="container">
                <div className="row align-items-start">
                    {!props.statuses ? <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div> : props.statuses.map(el =>
                        <Column key={el._id}
                                {...el}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    statuses: state.statuses
})

const mapDispatchToProps = (dispatch) => ({
    getStatuses: () => dispatch(getStatuses()),
    getCards: () => dispatch(getCards()),

})


export default connect(mapStateToProps, mapDispatchToProps)(App);
