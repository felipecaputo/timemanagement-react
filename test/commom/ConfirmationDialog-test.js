import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import ConfirmationDialog from '../../src/components/common/ConfirmationDialog'
import * as sinon from 'sinon';

describe('ConfirmationDialog', () => {
    const defaultProps = {
        show: false,
        onConfirm: sinon.spy(),
        onCancel: sinon.spy
    }
    const message = 'Do you wanna dance?';
    const elementString = <ConfirmationDialog {...defaultProps}>{message}</ConfirmationDialog>;
    const elementChild = <ConfirmationDialog {...defaultProps}> <div><span className="fake-class">{message}</span> </div> </ConfirmationDialog>;
    
    it('must render a modal', () => {
        expect(shallow(elementString).find('Modal').length).to.be.equals(1);
    })
    
    it('must show message with confirmation-dialog-message class when called with string', () => {
        expect(shallow(elementString).find('.confirmation-dialog-message').length).to.be.equals(1);
    })
    
    it('must not show message with confirmation-dialog-message class when called child node', () => {
        let wrapper = shallow(elementChild); 
        expect(wrapper.find('.confirmation-dialog-message').length).to.be.equals(0);
        expect(wrapper.find('.fake-class').length).to.be.equals(1);
    })
    
    it('must call onConfirm when confirmation button is clicked', () => {
        let wrapper = shallow(elementString);
        const confirmCb = sinon.spy();
        wrapper.setProps({onConfirm: confirmCb});
        wrapper.find('#confirmBtn').simulate('click');
        expect(confirmCb.callCount).to.be.equals(1);
    })
    
    it('must call onCancel when cancel button is clicked', () => {
        let wrapper = shallow(elementString);
        const cancelCb = sinon.spy();
        wrapper.setProps({onCancel: cancelCb});
        wrapper.find('#cancelBtn').simulate('click');
        expect(cancelCb.callCount).to.be.equals(1);
    })
    
    
})