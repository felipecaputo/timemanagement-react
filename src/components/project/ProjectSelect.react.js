'use strict';

import * as React from 'react';
import {Modal,Input,Button} from 'react-bootstrap';
import ProjectModal from './ProjectModal';

export default class ProjectSelect extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showProjectModal: false,
            value: undefined
        };
    }
    __toggleModal(visible){ this.setState({ showProjectModal: visible }) } 
    render() {
        let projModal;
        if (this.state.showProjectModal) {
            projModal = (<ProjectModal 
                onAfterSave={()=>this.__toggleModal(false)}
                onAfterCancel={()=>this.__toggleModal(false)} 
                show={this.state.showProjectModal}>
            </ProjectModal>);
        }
        
        let projectButton = <Button><span className="glyphicon glyphicon-plus" onClick={()=>this.__toggleModal(true)}></span></Button>;    
        return (
            
            <div>
                {projModal}
                <Input 
                    id={this.props.id} 
                    type="select" label="Project" 
                    placeholder="Project" 
                    buttonAfter={projectButton} 
                    onChange={ this.props.onChange } 
                    value={ this.props.value }>
                    
                    {this.props.projects.map( p => <option value={p.id} key={p.id}>{p.title}</option> )}
                </Input>
            </div>
        );
    }
}

ProjectSelect.propTypes = {
    id: React.PropTypes.string.isRequired,
    value: React.PropTypes.any,
    onChange: React.PropTypes.func.isRequired,
    projects: React.PropTypes.array.isRequired
}