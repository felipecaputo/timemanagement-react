'use strict';

import * as React from 'react';import Modal from 'react-bootstrap/lib/Modal';
import Input from 'react-bootstrap/lib/Input';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import ProjectSelect from '../project/ProjectSelect';

export default class CreateActivityModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            activity: {
                title: '',
                description: '',
                projectId: -1,
                project: '',
                categoryId: -1,
                category: ''
            },
            processing: false 
        };
        
        this.__handleChange = this.__handleChange.bind(this);
        this.__handleCancel = this.__handleCancel.bind(this);
        this.__handleSave = this.__handleSave.bind(this); 
    }
    __handleChange(e) {
        let activity = this.state.activity;
        let target = e.target;
        switch (e.target.id) {
            case "maTitle":
                activity.title = target.value;
                break;
            case "maProject":
                activity.project = target.options[target.selectedIndex].text;
                activity.projectId = target.value;
                break;
            case "maCategory":
                activity.category = target.options[target.selectedIndex].text;
                activity.categoryId = target.value;
                break;
            case "maDescription":
                activity.description = target.value;
                break;
            default:
                throw "Invalid target for handleChange";
        }
        
        let newState = {
            activity: activity
        };
        this.setState(newState);
    }
    __handleSave(){
        this.setState({
            processing: true
        });
        this.props.onSave(this.state.activity);
    }
    __handleCancel() {
        this.setState({
            processing: true
        });
        this.props.onCancel();
    }    
    render() {
        let categoryButton = <Button><span className="glyphicon glyphicon-plus"></span></Button>;
        
        return (
            <Modal show={ this.props.show } className="activity-modal">
                <Modal.Header>
                    <Modal.Title> New Activity </Modal.Title>
                </Modal.Header>
                <Modal.Body>      
                    { this.state.activity.title }              
                    <Input 
                        type="text" id="maTitle" label="Title" placeholder="Activity title" 
                        value={ this.state.activity.title } onChange={ this.__handleChange } required/>
                    <ProjectSelect id="maProject" value={this.state.activity.projectId} onChange={this.__handleChange} />
                    <Input id="maCategory" type="select" label="Category" placeholder="Project" 
                         onChange={ this.__handleChange } value={ this.state.activity.categoryId }>
                        <option value="1">Opcao1</option>
                        <option value="2">Opcao2</option>
                    </Input>
                    <Input id="maDescription"
                        type="textarea" label="Description" placeholder="Description" 
                        value={ this.state.activity.description } onChange={ this.__handleChange } required/>
                    <p> { JSON.stringify(this.state.activity) } </p>
                </Modal.Body>
                <Modal.Footer>
                    <ButtonToolbar>
                        <Button bsStyle="primary"onClick={this.__handleSave} disabled={this.state.processing}>Save</Button>
                        <Button bsStyle="danger" onClick={this.__handleCancel} disabled={this.state.processing}>Cancel</Button>
                    </ButtonToolbar>
                </Modal.Footer>
            </Modal>
        )
    }
}

CreateActivityModal.propTypes = {
    show: React.PropTypes.bool.isRequired,
    onSave: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired
}