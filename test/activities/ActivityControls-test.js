import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import * as ActivityControls from '../../assets/js/components/activity/ActivityControls';
import Cons from '../../assets/js/constants/ActivityConstants';

describe("PlayStop Button", () => {
  let activity = {status: Cons.ACTIVITY_STATUS.ACTIVE, lastEndTime: 0};

  it("is a button", function() {
    let a =<ActivityControls.ActivityStartStopButton activity={activity} />;
     
    expect(mount(a).find('button').length).to.equal(1);
  });

  it("When activity is stoped, playbutton must be show", function() {
    expect(shallow(<ActivityControls.ActivityStartStopButton activity={activity} />).is('.btn-success')).to.equal(true);
  });
  
  it("When activity is running, stop button must be show", function() {
    activity.lastEndTime = -1;
    expect(shallow(<ActivityControls.ActivityStartStopButton activity={activity} />).is('.btn-danger')).to.equal(true);
  });
  
  it("When activity is running, stop button must be show", function() {
    activity.status = Cons.ACTIVITY_STATUS.FINISHED;
    const wrapper = mount(<ActivityControls.ActivityStartStopButton activity={activity} />); 
    expect(wrapper.props()).to.equal(true);
  });
});