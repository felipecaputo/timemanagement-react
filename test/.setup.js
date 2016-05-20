require('babel-register')();

var jsdom = require('jsdom').jsdom;
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';

global.React = React;

chai.use(chaiEnzyme()); // Note the invocation at the end

var exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

var documentRef = document;