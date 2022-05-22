import React from "react";

import { create } from "react-test-renderer";

import Home from "../Home";




describe("Test for Home.js", () => {
   
   test('Matches the snapshot', () => { 
   const component = create(<Home/>);
    expect(component.toJSON()).toMatchSnapshot();
   })

})
