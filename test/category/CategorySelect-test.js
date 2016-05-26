import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import * as sinon from 'sinon';

import CategorySelect from '../../src/components/category/CategorySelect';
import Cons from '../../src/constants/ActivityConstants';
import {Modal} from 'react-bootstrap';


let props = {
    id: 'test',
    onChange: () => {console.log();},
    categories: [{id: 1, category: 'A'}, {id: 2, category: 'B'}],
    value: 1
}

describe('CategorySelect', () => {
    it('should render options', () => {
        let wraper = shallow(<CategorySelect {...props} />);
        expect(wraper.find('option').length).to.be.equal(2);
        expect(wraper.find('option').at(0).props().value).to.be.equal(1);
    })
    
    it('should show modal on button click', () => {
        let wraper = mount(<CategorySelect {...props} />);
        expect(wraper.find('CategoryModal').length).to.be.equal(0);
        wraper.find('button').simulate('click');
        expect(wraper.find('CategoryModal').length).to.be.equal(1);
    })
})