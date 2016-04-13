'use strict';

import * as React from 'react';
import Modal from 'react-bootstrap/lib/Modal';

export default class CreateActivityModal extends React.Component {
    render() {
        return (
            <Modal>
                <Modal.Header>
                    <Modal.Title> New Activity </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                
                </Modal.Body>
                <Modal.Footer>
                
                </Modal.Footer>
            </Modal>
        )
    }
}

CreateActivityModal.propTypes = {
    show: React.PropTypes.bool.isRequired
}