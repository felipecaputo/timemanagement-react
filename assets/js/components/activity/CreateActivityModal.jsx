'use strict';

import * as React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Input from 'react-bootstrap/lib/Input';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';

export default class CreateActivityModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            projectId: -1,
            project: '',
            categoryId: -1,
            category: '' 
        };
        
        this.__handleChange = this.__handleChange.bind(this);
    }
    __handleChange(e) {
        let newState = {};
        let value = e.target.value;
        switch (e.target.id) {
            case "modalActivityTitle":
                newState.title = value;
                break;
        
            default:
                throw "Invalid targer for handleChange";
        }
                
        this.setState(newState);
    }
    render() {
        let projectButton = <Button><span className="glyphicon glyphicon-plus"></span></Button>;
        return (
            <Modal show={ this.props.show } className="activity-modal">
                <Modal.Header>
                    <Modal.Title> New Activity </Modal.Title>
                </Modal.Header>
                <Modal.Body>      
                    { this.state.title }              
                    <Input 
                        type="text" id="modalActivityTitle" label="Title" placeholder="Activity title" 
                        value={ this.state.title } onChange={ this.__handleChange } required/>
                    <Input type="select" label="Project" placeholder="Project" buttonAfter={projectButton}>
                        <option value="1">Opcao1</option>
                        <option value="2">Opcao2</option>
                    </Input>
                </Modal.Body>
                <Modal.Footer>
                    <ButtonToolbar>
                        <Button bsStyle="primary">Save</Button>
                        <Button bsStyle="danger">Cancel</Button>
                    </ButtonToolbar>
                </Modal.Footer>
            </Modal>
        )
    }
}

CreateActivityModal.propTypes = {
    show: React.PropTypes.bool.isRequired
}