import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import ActivityPeriodList from '../../src/components/activity/ActivityPeriodList';
import Cons from '../../src/constants/ActivityConstants';
import * as Factory from './ActivityTestFactory';

describe('ActivityPeriodList', function () {
    const listWithTwo = <ActivityPeriodList activity={Factory.getFinishedActivity()} />;
    it('should be a grid', function () {
        expect(shallow(listWithTwo).find('Grid').is('.period-list')).to.be.true;
    })
    
    it('should have two periods', () => {
        expect(mount(listWithTwo).find('.period-row')).to.have.length(2);
    })
})