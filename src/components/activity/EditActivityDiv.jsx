import * as React from 'react';
import {Input,Button,ButtonToolbar} from 'react-bootstrap';
import ProjectSelect from '../project/ProjectSelect';
import CategorySelect from '../category/CategorySelect';

export default class EditActivityDiv extends React.Component {
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
            <div className="container">
                <h2> New Activity - { this.state.activity.title }</h2>
                <div>              
                    <Input 
                        type="text" id="maTitle" label="Title" placeholder="Activity title" 
                        value={ this.state.activity.title } onChange={ this.__handleChange } required/>
                    <ProjectSelect 
                        id="maProject" 
                        value={this.state.activity.projectId} 
                        onChange={this.__handleChange} 
                        projects={this.props.projects}/>
                    <CategorySelect                        
                        id="maCategory"
                        value={this.state.activity.categoryId} 
                        onChange={this.__handleChange} 
                        categories={this.props.categories}/>
                    <Input 
                        id="maDescription"
                        type="textarea" 
                        label="Description" 
                        placeholder="Description" 
                        value={ this.state.activity.description } 
                        onChange={ this.__handleChange } 
                        required/>
                </div>
                <ButtonToolbar>
                    <Button 
                        bsStyle="primary"
                        onClick={this.__handleSave} 
                        disabled={this.state.processing}>Save</Button>
                    <Button 
                        bsStyle="danger" 
                        onClick={this.__handleCancel} 
                        disabled={this.state.processing}>Cancel</Button>
                </ButtonToolbar>
            </div>
        )
    }
}