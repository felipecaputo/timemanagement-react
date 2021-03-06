import * as React from 'react';
import RegistrationModal from '../common/RegistrationModal';
import ActivityPeriodsList from './ActivityPeriodList';
import {Input, FormControls} from 'react-bootstrap';
import CategorySelect from './../category/CategorySelect';
import ProjectSelect from '../project/ProjectSelect';

export default class ActivityDetailsModal extends RegistrationModal {
    constructor(props){
        super(props);
        this.state = Object.assign({}, props.activity);
    }
    __getBody(){ 
        return (
            <form>
                <Input id="activityTitle" label="Title" type="text" value={this.state.title} onChange={e => this.setState({title: e.target.value}) }/>
                <ProjectSelect {...this.props}
                    id="ProjectSelect"
                    value={this.state.projectId}
                    onChange={ e=>  this.setState({projectId: e.target.value, project: e.target.options[e.target.selectedIndex].text}) } 
                />
                <CategorySelect {...this.props} 
                    id="CategorySelect" 
                    value={this.state.categoryId} 
                    onChange={ e=> this.setState({categoryId: e.target.value, category: e.target.options[e.target.selectedIndex].text}) }/>
                <Input id='activityDescription' label="Description" type="textarea" value={this.state.description}  onChange={e => this.setState({description: e.target.value})} />
                <ActivityPeriodsList activity={this.props.activity}/>
            </form>
        )
     }
    __getTitle(){
        
    }
    __handleSave(){
        this.props.onSave(this.state);
    }
    __handleCancel(){
        this.props.onCancel();
    }
}

ActivityDetailsModal.propTypes = {
    activity: React.PropTypes.object.isRequired
}