import * as React from 'react';
import Input from 'react-bootstrap/lib/Input';
import CategoryModal from './CategoryModal';
import Store from '../../stores/CategoryStore';

export default class CategorySelect extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showingModal: false,
            value: -1,
            list: Store.getCategoryList()
        }
    }
    __categoryModal() {
        return <CategoryModal />
    }
    render() {
        let projModal;
        if (this.state.showingModal)
            projModal = this.__categoryModal();
            
        return (
            <div>
                {projModal}
                <Input type='select'>
                
                </Input>
            </div>
        )
    }
}