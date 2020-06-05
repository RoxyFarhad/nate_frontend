
import React from 'react';
import { shallow } from 'enzyme';

import DataComponent from './dataComponent';
var data ={
    url: 'hello.com', 
    data: [{word: 'hello', count: "1"}, {word: 'world', count: "1"}], 
    mode: "",
}

describe('Testing DataComponent with Enzyme', () => {
   it('renders without crashing', () => {
      shallow(<DataComponent dataObj={data}/>);
    });
});