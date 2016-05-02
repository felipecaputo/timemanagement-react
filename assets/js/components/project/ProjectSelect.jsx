'use strict';

import * as React from 'react';import Modal from 'react-bootstrap/lib/Modal';
import Input from 'react-bootstrap/lib/Input';
import Button from 'react-bootstrap/lib/Button';
import ProjectStore from '../../stores/ProjectStore';
import ProjectModal from './ProjectModal';

export default class ProjectSelect extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showProjectModal: false,
            value: undefined,
            projectList: ProjectStore.getProjectList()
        };
        this.__handleModalCancel = this.__handleModalCancel.bind(this);
        this.__handleModalSaved = this.__handleModalSaved.bind(this);
        this.__showProjectModal = this.__showProjectModal.bind(this);
        this.__getProjectsOptions = this.__getProjectsOptions.bind(this);
        this.__updateProjList = this.__updateProjList.bind(this);
    }
    componentDidMount(){
        this.projReg = ProjectStore.addListener(this.__updateProjList);
    }
    componentWillUnmount() {
        this.projReg.remove();
    }
    __handleModalCancel(){
        this.setState({ showProjectModal: false });
    }
    __handleModalSaved(){
        this.setState({ showProjectModal: false });
    }
    __showProjectModal(){ this.setState({ showProjectModal: true })
    }
    __updateProjList(){
        this.setState({ projectList: ProjectStore.getProjectList() });
    }
    __getProjectsOptions(){
        let options = [];
         
        this.state.projectList.forEach( p => options.push(<option value={p.id} key={p.id}>{p.title}</option>) );
        
        return options
    }    
    render() {
        let projModal;
        if (this.state.showProjectModal) {
            projModal = (<ProjectModal 
                onAfterSave={this.__handleModalSaved}
                onAfterCancel={this.__handleModalCancel} 
                show={this.state.showProjectModal}>
            </ProjectModal>);
        }
        
        let projectButton = <Button><span className="glyphicon glyphicon-plus" onClick={this.__showProjectModal}></span></Button>;    
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
                    
                    {this.__getProjectsOptions()}
                </Input>
            </div>
        );
    }
}

ProjectSelect.propTypes = {
    id: React.PropTypes.string.isRequired,
    value: React.PropTypes.any,
    onChange: React.PropTypes.func.isRequired
}