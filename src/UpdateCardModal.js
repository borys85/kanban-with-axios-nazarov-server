import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {
    Button,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
} from "reactstrap";
import {connect} from "react-redux";
import {updateCard} from "./redux/actions";


const UpdateCardModal = (props) => {


    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const [name, setName] = useState(props.name);
    const [description, setDescription] = useState(props.description);
    const [status, setStatus] = useState(props.status);
    const [priority, setPriority] = useState(props.priority);

    const updateButtonHandler = () => {
        props.updateCard(props.name, props.description, props.status, props.priority);
        toggle();
    }



    return (
        <div>
            <Button type="button" className="btn btn-success" onClick={toggle}>Update</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Update</ModalHeader>
                <ModalBody>
                    <div className="input-group mb-3">

                        <input type="text" className="form-control" placeholder="Name" aria-label="Username"
                               aria-describedby="basic-addon1" value={name} onChange={e => setName(e.target.value)}/>
                    </div>
                    <div className="input-group mb-3">

                        <input type="text" className="form-control" placeholder="Description" aria-label="Username"
                               aria-describedby="basic-addon1" value={description} onChange={e => setDescription(e.target.value)}/>
                    </div>
                    <div className="input-group mb-3">
                        <select className="form-select"
                                value={status} onChange={e => setStatus(e.target.value)}>
                            <option >choose status</option>
                            {props.statuses.map(el => <option value={el.status} key={el._id}>{el.status}</option> )}
                        </select>
                    </div>
                    <div className="input-group mb-3">
                        <select  className="form-select"
                                 value={priority} onChange={e => setPriority(e.target.value)}>
                            {props.priorities.map(el => <option value={el} key={el}>{el}</option>)}
                        </select>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={updateButtonHandler}>Update</Button>
                    {' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

const mapStateToProps = (state) => ({
    statuses: state.statuses,
    priorities: state.priorities
})

const mapDispatchToProps = (dispatch) => ({

    updateCard: (name, description, status, priority) => dispatch(updateCard(name, description, status, priority))

})


export default connect(mapStateToProps, mapDispatchToProps)(UpdateCardModal);