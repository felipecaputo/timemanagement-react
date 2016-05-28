import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import * as sinon from 'sinon';

import ActivityDetailsModal from '../../src/components/activity/ActivityDetailsModal';
import Cons from '../../src/constants/ActivityConstants';
import {Modal} from 'react-bootstrap';
import * as Factory from './ActivityTestFactory';

describe('ActivityDetailsModal', () => {
    let defProps = {categories: [{id: 1, category: 'Test'}], projects: []}
    it('must be a modal', () => {
        expect(
            shallow(
                <ActivityDetailsModal 
                    {...defProps} 
                    activity={Factory.getFinishedActivity()}
                />
            ).find('Modal').length).to.be.equal(1);
    });
    
    it('must show activity data', () => {
        let act = Factory.getFinishedActivity();
        let wraper = shallow(<ActivityDetailsModal {...defProps} activity={act}/>);
        expect(wraper.find('Input').first().props().value).to.be.equal(act.title);
        expect(wraper.find('Input').get(1).props.value).to.be.equal(act.description);
        expect(wraper.find('ProjectSelect').get(0).props.value).to.be.equal(act.projectId);
        expect(wraper.find('CategorySelect').get(0).props.value).to.be.equal(act.categoryId);
    });
        
    it('must call save when save button is clicked', () => {
        let act = Factory.getFinishedActivity();
        let wraper = shallow(<ActivityDetailsModal {...defProps} activity={act}/>);
        const saveCb = sinon.spy();
        expect(saveCb.callCount).to.be.equal(0);
        wraper.setProps({onSave: saveCb}).find('#modalSaveBtn').simulate('click');
        
        expect(saveCb.calledOnce).to.be.true;
    });
    
    it('must call cancel when cancel button is clicked', () => {
        let act = Factory.getFinishedActivity();
        let wraper = shallow(<ActivityDetailsModal {...defProps} activity={act}/>);
        const cancelCb = sinon.spy();
        expect(cancelCb.callCount).to.be.equal(0);
        wraper.setProps({onCancel: cancelCb}).find('#modalCancelBtn').simulate('click');
        
        expect(cancelCb.calledOnce).to.be.true;
    });
    
    it('must update state when data change', () => {
        let act = Factory.getRunningActivity();
        let wraper = shallow(<ActivityDetailsModal {...defProps} activity={act}/>);
        const newTitle = 'Awesome new',
              newDesc = 'Description';
        
        wraper.find('#activityTitle').simulate('change', { target: { value: newTitle}});
        expect(wraper.state().title).to.be.equals(newTitle);
        
        wraper.find('#activityDescription').simulate('change', { target: { value: newDesc}});
        expect(wraper.state().description).to.be.equals(newDesc);
    })
})