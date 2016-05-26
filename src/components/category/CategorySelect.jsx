import * as React from 'react';
import {Input, Button} from 'react-bootstrap';
import CategoryModal from './CategoryModal';

export default class CategorySelect extends React.Component {
    constructor(props){
        super(props);
        this.state = {showingModal: false }
    }
    __categoryModal() {
        return <CategoryModal
            onSave={()=>{this.__toggleModal(false)}}
            onCancel={()=>{this.__toggleModal(false)}}
            show={this.state.showingModal}
        />
    }
    __toggleModal(visible){
        this.setState({
            showingModal: visible 
        })
    }
    render() {
        let catModal;
        if (this.state.showingModal)
            catModal = this.__categoryModal();
            
        let button = (
            <Button onClick={()=>{this.__toggleModal(true)}}>
                <span className="glyphicon glyphicon-plus" > </span>
            </Button>);
        
        let options = this.props.categories.map( 
            c => <option value={c.id} key={c.id}>{c.category}</option> )
        return (
            <div>
                {catModal}
                <Input
                    id={this.props.id} 
                    type='select'
                    label='Category'
                    buttonAfter={button}
                    onChange={this.props.onChange}
                    value={this.props.value}>
               
                    {options}
                </Input>
            </div>
        )
    }
}

CategorySelect.propTypes = {
    categories: React.PropTypes.array.isRequired,
    id: React.PropTypes.string.isRequired,
    value: React.PropTypes.any,
    onChange: React.PropTypes.func.isRequired
};