import {PropTypes} from 'react';
import {Modal, Button, ButtonGroup} from 'react-bootstrap';

const propTypes = {
    show: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    title: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.string, PropTypes.node
    ]).isRequired
}

export default function ConfirmationDialog(props) {
    return (
        <Modal show={props.show}>
            <Modal.Header>
                <Modal.Title>{(props.title || 'Confirmation')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    (typeof props.children === 'string') ?
                        <span className="confirmation-dialog-message">{props.children}</span>
                        :
                        props.children
                }
            </Modal.Body>
            <Modal.Footer>
                <ButtonGroup>
                    <Button id="confirmBtn" bsStyle="primary" onClick={props.onConfirm} />
                    <Button id="cancelBtn" bsStyle="danger" onClick={props.onCancel} />
                </ButtonGroup>
            </Modal.Footer>
        </Modal>
    )
}