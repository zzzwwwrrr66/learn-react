
const React = require('react');
const ReactDom = require('react-dom');
const {BrowserRouter} = require('react-router-dom');
const {Route} = require('react-router-dom');

const ResponseCheck = require('./ResponseCheck');

ReactDom.render(
<ResponseCheck />, 
document.querySelector('#root'));