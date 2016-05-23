import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import * as ActivityControls from '../../src/components/activity/ActivityControls';
import Cons from '../../src/constants/ActivityConstants';
import * as Factory from './ActivityTestFactory';

describe("PlayStop Button", () => {
    let activity = { status: Cons.ACTIVITY_STATUS.ACTIVE, lastEndTime: 0 };
    
    function PlayStop(activity) {
      return <ActivityControls.ActivityStartStopButton activity={activity} />
    }

    it("is a button", function () {
        expect(mount(PlayStop({})).find('button').length).to.equal(1);
    });

    it("must show play button when activity is stoped", function () {
        expect(shallow(PlayStop(Factory.getNewActivity())).hasClass('btn-success')).to.equal(true);
    });

    it("should show stop button when activity is running", function () {
        expect(shallow(PlayStop(Factory.getRunningActivity())).hasClass('btn-danger')).to.equal(true);
    });

    it("should be disabled for finished activity", function () {
        const wrapper = mount(PlayStop(Factory.getFinishedActivity()));
        expect(wrapper).to.be.disabled();
    });

    it("should be disabled for finished activity", function () {
        const wrapper = mount(PlayStop(Factory.getFinishedActivity()));
        expect(wrapper).to.be.disabled();
    });
    
    
});

describe('Chronometer', function () {
    function getChrono(activity) {
        return <ActivityControls.ActivityChronometer activity={activity} />
    }
    it('should be a chronometer class component', function () {
        expect(mount(getChrono({})).find('.chronometer').length).to.equal(1);
    })

    it('should update if activity is running', function (done) {
        setTimeout(function () {
          expect(
            render(getChrono(Factory.getRunningActivity())).text()
        ).to.not.equals('00:00:00') }, 1500);
        done();
    })
    
    it('should be 00:00:00 for new activity', function() {
        expect(render(getChrono(Factory.getNewActivity())).text()).to.be.equals('00:00:00');
    })
    
    it('should be 00:00:10 based on total duration when stopped', function () {
        expect(render(getChrono(Factory.getActivityWithDuration(10000))).text()).to.be.equals('00:00:10');
    })
    
    it('should change value after start the activity', function (done){
        const activity = Factory.getNewActivity(); 
        const element = mount(getChrono(activity));
        expect(element.text()).to.be.equal('00:00:00');
        activity.lastStartTime = new Date().getTime();
        activity.lastEndTime = Cons.INVALID_ENDTIME;
        
        element.setProps({activity: activity});
        setTimeout(function(){
            expect(element.text()).to.be.equal('00:00:01');
            done();
        }, 1100);
    })
})

describe('Finish button', function() {
  function finishButton(activity) { 
    return <ActivityControls.ActivityFinishButton activity={activity} />
  }
  it('must be a button', function() {
        expect(mount(finishButton({})).find('button').length).to.equal(1);
  })
  it('should be disabled for finished activities', function() {
        expect(mount(finishButton(Factory.getFinishedActivity())).find('button')).to.be.disabled();
  })
  it('should be enabled for active activities', function() {
        expect(mount(finishButton(Factory.getNewActivity())).find('button')).not.to.be.disabled();
  })
})