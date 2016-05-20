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

    it("When activity is stoped, playbutton must be show", function () {
        expect(shallow(PlayStop(Factory.getNewActivity())).is('.btn-success')).to.equal(true);
    });

    it("When activity is running, stop button must be show", function () {
        expect(shallow(PlayStop(Factory.getRunningActivity())).is('.btn-danger')).to.equal(true);
    });

    it("When activity is finished, play must be disabled", function () {
        const wrapper = mount(PlayStop(Factory.getFinishedActivity()));
        expect(wrapper).to.be.disabled();
    });

    it("When activity is finished, stop must be disabled", function () {
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