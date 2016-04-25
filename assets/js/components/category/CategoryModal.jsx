import RegistratonModal from '../common/RegistrationModal';
import Input from 'react-bootstrap/lib/Input';
import Actions from '../../actions/CategoryActionCreator';
import * as React from 'react';

export default class CategoryModal extends RegistratonModal {
    constructor (props) {
        super(props);
        this.state = {
            title: ''
        }
        this.__handleChange = this.__handleChange.bind(this);
    }
    __handleChange(e){
        let s = this.state;
        switch (e.target.id) {
            case 'catTile':
                s.title = e.target.value;
                break;
        
            default:
                throw new Error(`${e.target.id} is not a valid target for handle change`);
        }
    }
    __handleSave(){
        let category = { title: this.state.title };
        Actions.createCategory(category);
        this.props.onSave();
    }
    __handleCancel(){
        this.props.onCancel();
    }
    __getTitle(){
        return 'New Category';
    }
    __getBody(){
        return (
            <Input id="catTitle" onChange={(()=> this.__handleChange())} placeholder="Title"
                label="Title" value={this.state.title}/>
        )
    }
}

CategoryModal.propTypes = {
    onSave: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired
}