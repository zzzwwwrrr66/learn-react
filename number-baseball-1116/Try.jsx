const React = require('react'); 
const { memo } = React;
// import React from 'react';
// import {memo} from 'react';

class TryListClass extends React.PureComponent {
  shouldComponentUpdate(nextProps, nextState, nextContent) {
    console.log(nextProps, nextState, nextContent);
    if(this.props.obj.try != nextProps.obj.try) return true;
    return false;
  }
  constructor(props){
    super(props);
    console.log(this.props)
  }
 
  render() {
    console.log('render')
    return (
      <li className="try-list" >{this.props.obj.try} - {this.props.obj.result}</li>
    );
  }
}

const Try = ({index, obj}) => {
  console.log('render');
  const [propsState, setPropsState] = React.useState(obj.try);
  return (
    <li className="try-list" >{obj.try} - {obj.result}</li>
  );
  
}

// export default Try;
module.exports = memo(Try);

//props class 일때, hooks 일때 적어놓기