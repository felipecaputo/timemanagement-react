import * as React from 'react';
import RegistrationModal from '../common/RegistrationModal';

export default class ActivityDetailsModal extends RegistrationModal {
    constructor(props){
        super(props);
        this.state = Object.assign({visible: props.show}, props.activity);
    }
    __getBody(){ 
        return (
            <div>
                <span>Title :</span> <input type='text' value={this.state.title}/>                
            </div>
        )
     }
    __getTitle(){
        
    }
    __handleSave(){
        
    }
    __handleCancel(){
        
    }
}