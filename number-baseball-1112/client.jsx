
const React = require('react');
const ReactDom = require('react-dom');
const {BrowserRouter} = require('react-router-dom');
const {Route} = require('react-router-dom');

const NumberBaseball = require('./number-baseball');

ReactDom.render(
<NumberBaseball />, 
document.querySelector('#root'));