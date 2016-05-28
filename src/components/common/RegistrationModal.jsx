'use strict';

import * as React from 'react';
import {Modal, ButtonToolbar, Button} from 'react-bootstrap';

export default class RegistrationModal extends React.Component {
    constructor(props){
        super(props);
        this.__handleCancel = this.__handleCancel.bind(this);
        this.__handleSave = this.__handleSave.bind(this);
    }
    // __getBody(){ throw new Error('Body not implemented')  }
    // __getTitle(){throw new Error('Title not implemented')}
    // __handleSave(){throw new Error('handleSave not implemented')}
    // __handleCancel(){throw new Error('handleCancel not implemented')}
    render() {
        return (
            <form>
                <Modal show={this.props.show}>
                    <Modal.Header>
                        <Modal.Title>{this.__getTitle()}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.__getBody()}
                    </Modal.Body>
                    <Modal.Footer>
                        <ButtonToolbar>
                            <Button id="modalSaveBtn" onClick={this.__handleSave} bsStyle="primary">Save</Button>
                            <Button id="modalCancelBtn" onClick={this.__handleCancel} bsStyle="danger">Cancel</Button>
                        </ButtonToolbar>
                    </Modal.Footer>
                </Modal>
            </form>
        )
    }
}