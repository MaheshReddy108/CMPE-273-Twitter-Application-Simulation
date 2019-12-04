import React from  'react'
import {shallow} from 'enzyme'
import SearchBar from './SearchBar'
import renderer from 'react-test-renderer';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

const setUp = (props={})=>{
    const component = shallow(<SearchBar {...props}/>);
    return component;
}

describe('Search Bar component',()=>{

    let component;

    beforeEach(()=>{
        component = setUp();
    });

      it('should render without errors',()=>{
          const wrapper = component.find('.property-listing-content');
          expect(wrapper.length).toBe(2);
      });

      it('Should Render  buttons for people and topics',()=>{
        const button = component.find('.btn btn-primary btn-lg');
        expect(wrapper.length).toBe(2);
      })
})
