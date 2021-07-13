import 'bootstrap/dist/css/bootstrap.css';
import Card from "./Card";
import {connect} from "react-redux";

function Column(props) {

    return (

        <div className="col">
            {props.title}

            {props.cards.filter(el => el.status === props.status)
                .map(el => <Card key={el._id}
                                 card={el}/>)}
        </div>

    );
}

const mapStateToProps = (state) => ({
    cards: state.cards
})


export default connect(mapStateToProps)(Column);