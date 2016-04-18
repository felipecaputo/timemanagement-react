import * as React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Input from 'react-bootstrap/lib/Input';
import ProjectActions from '../../actions/ProjectActionCreator';

export default class ProjectModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id: -1,
            title: '',
            description: ''
        }
        this.__handleCancel = this.__handleCancel.bind(this);
        this.__handleChange = this.__handleChange.bind(this);
        this.__handleSave = this.__handleSave.bind(this);
    }
    __handleChange(e){
        let s = this.state;
        switch (e.target.id) {
            case 'maTitle':
                s.title = e.target.value;
                break;
            case 'maDescription':
                s.description = e.target.value;
            default:
                throw `Invalid target for project modal ${e.target.id}`;
        }
        this.setState(s);
    }
    __handleSave(){
        let proj = {
            title: this.state.title,
            description: this.state.description
        };
        ProjectActions.addProject(proj);
        this.props.onAfterSave();
    }
    __handleCancel(){
        this.props.onAfterCancel();
    }
    render() {
        return (
            <Modal show={this.props.show}>
                <Modal.Header>
                    <Modal.Title>New Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input type="text" label="Project Title" placeholder="Title" id="maTitle" 
                        onChange={this.__handleChange} value={this.state.title} required/>
                    <Input type="textarea" label="Description" placeholder="Description" id="maDescription"
                        onChange={this.__handleChange} value={this.state.description} required/>
                </Modal.Body>
                <Modal.Footer>
                    <ButtonToolbar>
                        <Button onClick={this.__handleSave} bsStyle="primary">Save</Button>
                        <Button onClick={this.__handleCancel} bsStyle="danger">Cancel</Button>
                    </ButtonToolbar>
                </Modal.Footer>
            </Modal>
        )
    }
}

ProjectModal.propTypes = {
    show: React.PropTypes.bool.isRequired,
    onAfterSave: React.PropTypes.func.isRequired,
    onAfterCancel: React.PropTypes.func.isRequired 
}