import React, {useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {connect} from "react-redux";
import {deleteCard} from "./redux/actions";



const DeleteCardModal = (props) => {

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const deleteButtonHandler = () => {
        props.deleteCard(props.id);
        toggle();
    }

    return (

        <div>
            <Button color="danger" onClick={toggle}>Delete</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Delete</ModalHeader>
                <ModalBody>
                    Do you want to delete {props.cardName}?
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={deleteButtonHandler}>Yes</Button>{' '}
                    <Button color="secondary" onClick={toggle}>No</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({

    deleteCard: (id) =>
        dispatch(deleteCard(id))

})

export default connect(null, mapDispatchToProps)(DeleteCardModal);