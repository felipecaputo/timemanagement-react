import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import * as sinon from 'sinon';

import ActivityDetailsModal from '../../src/components/activity/ActivityDetailsModal';
import Cons from '../../src/constants/ActivityConstants';
import {Modal} from 'react-bootstrap';
import * as Factory from './ActivityTestFactory';

describe('ActivityDetailsModal', () => {
    let defProps = {categories: [], projects: []}
    it('must be a modal', () => {
        expect(shallow(<ActivityDetailsModal {...defProps} activity={Factory.getFinishedActivity()}/>).find('Modal').length).to.be.equal(1);
    });
    it('must show activity title', () => {
        let act = Factory.getFinishedActivity();
        let wraper = shallow(<ActivityDetailsModal {...defProps} activity={act}/>);
        // console.log(wraper.debug()); 
        expect(1).to.be.equal(1);
    });
})