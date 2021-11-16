
const React = require('react');
const ReactDom = require('react-dom');
const {BrowserRouter} = require('react-router-dom');
const {Route} = require('react-router-dom');

// const ResponseCheck = require('./ResponseCheck');
const ResponseCheckHooks = require('./ResponseCheckHooks');

ReactDom.render(
<ResponseCheckHooks />, 
document.querySelector('#root'));