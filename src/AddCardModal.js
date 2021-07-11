import React, {useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {connect} from "react-redux";
import {addNewCard} from "./redux/actions";


const AddCardModal = (props) => {


    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState(props.priorities[0]);
    console.log(props.statuses)
    const okButtonHandler = () => {
        const card = {name, description, status, priority};
        props.addNewCard(card);
        toggle();
    }


    return (
        <div >
            <Button color="primary" onClick={toggle}>Add New Card</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Add new card</ModalHeader>
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
                    <Button color="primary" onClick={okButtonHandler}>Ok</Button>
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
    addNewCard: (card) => {
        dispatch(addNewCard(card));
    },

})

export default connect(mapStateToProps, mapDispatchToProps)(AddCardModal);