import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import ActivityContainer from '../../src/components/activity/ActivityContainer';
import Cons from '../../src/constants/ActivityConstants';
import * as Factory from './ActivityTestFactory';
import * as sinon from 'sinon';

describe('ActivityContainer', () => {
    let props = {
        activities: [Factory.getNewActivity()],
        finishedActivities: [Factory.getFinishedActivity()],
        projects: [],
        categories: [],
        onActivityTitleClick: sinon.spy(),
        onSaveActivity:  sinon.spy(),
        onCancelEdit:  sinon.spy(),       
        showingCreate: false,
        editingActivity: null,
        showFinished: false
    };
    
    it('should render only unfinished activities', () => {
        let wraper = mount(<ActivityContainer {...props} ></ActivityContainer>);
        expect(wraper.find('.activity-card').length).to.be.equals(1);
    })
    
    
    it('should render all activities', () => {
        let wraper = mount(<ActivityContainer {...props} showFinished={true} ></ActivityContainer>);
        expect(wraper.find('.activity-card').length).to.be.equals(2);
    })
    
    it('should show the new Activity div', () => {
        let wraper = mount(<ActivityContainer {...props} showingCreate={true}></ActivityContainer>);
        expect(wraper.find('EditActivityDiv').length).to.be.equals(1);
    });
    
    it('should show modal for edit activity', () => {
        let wraper = mount(<ActivityContainer {...props} editingActivity={props.activities[0]}></ActivityContainer>);
        expect(wraper.find('ActivityDetailsModal').length).to.be.equals(1);
    })
})