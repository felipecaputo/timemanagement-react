import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import ActivityCard from '../../src/components/activity/ActivityCard';
import Cons from '../../src/constants/ActivityConstants';
import * as Factory from './ActivityTestFactory';
import * as sinon from 'sinon';

describe('ActivityCard', () => {
    let newActivity = Factory.getNewActivity();
    let wraper = shallow(<ActivityCard activity={newActivity} />);
    
    beforeEach(() => {
        newActivity = Factory.getNewActivity();
        wraper = shallow(<ActivityCard activity={newActivity}/>);
    });
        
    it('should render activity data', () => {
        expect(wraper.find('h3 a').text()).to.be.equal(newActivity.title);
        expect(wraper.find('h3 a').text()).to.be.equal(newActivity.title);
    });
    
    it('should update when changed activity', () => {
        expect(wraper.find('ActivityFinishButton')).to.be.not.disabled();
        wraper.setProps({activity: Factory.getFinishedActivity()});
        expect(wraper.find('ActivityFinishButton')).to.be.disabled();
    });
    
    it('should fire event on title click', () => {
        let callBack = sinon.spy();
        wraper.setProps({onActivityTitleClick: callBack})
        
        expect(callBack.callCount).to.be.equal(0);
        wraper.find('h3 a').simulate('click');
        expect(callBack.callCount).to.be.equal(1);
    })
})