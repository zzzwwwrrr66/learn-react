
const React = require('react');
const ReactDom = require('react-dom');

const Rsp = require('./Rsp');
const RspHooks = require('./RspHooks');

ReactDom.render(
<RspHooks />, 
document.querySelector('#root'));