import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import * as sinon from 'sinon';

import ProjectSelect from '../../src/components/project/ProjectSelect';
import Cons from '../../src/constants/ActivityConstants';
import {Modal} from 'react-bootstrap';

let projectList = [ {id: 1, projectName: 'Test1'}, 
                    {id: 2, projectName: 'Best2'},
                    {id: 3, projectName: 'Test3'}]
                    
let props = {
    id: 'test',
    onChange: () => {console.log();},
    projects: projectList,
    value: 1
}

describe('ProjectSelect', () => {
    it('should render options', () => {
        let wraper = shallow(<ProjectSelect {...props} />);
        expect(wraper.find('option').length).to.be.equal(3);
        expect(wraper.find('option').at(0).props().value).to.be.equal(1);
    })
    
    it('should show modal on button click', () => {
        let wraper = mount(<ProjectSelect {...props} />);
        expect(wraper.find('ProjectModal').length).to.be.equal(0);
        wraper.find('button').simulate('click');
        expect(wraper.find('ProjectModal').length).to.be.equal(1);
    })
})