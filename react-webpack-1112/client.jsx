
const React = require('react');
const ReactDom = require('react-dom');
const {BrowserRouter} = require('react-router-dom');
const {Route} = require('react-router-dom');

const WordRelay = require('./WordRelay');

ReactDom.render(
<WordRelay />, 
document.querySelector('#root'));