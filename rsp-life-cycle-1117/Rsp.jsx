const React = require('react');
const _ = require('lodash');

class Rsp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      bgPositionDic : {
        rock : 0,
        scissors : -140,
        paper : -284
      },
      currentPosition : 0,
      recordList : [],
    }

  }

  componentDidMount() { 
    this.setRsp = setInterval(()=>{
      const {currentPosition, bgPositionDic} = this.state;
      if(currentPosition == bgPositionDic['rock']) {
        this.setState({
          currentPosition: bgPositionDic['scissors']
        });
      } else if(currentPosition == bgPositionDic['scissors']) {
        this.setState({
          currentPosition: bgPositionDic['paper']
        });
      } else if(currentPosition == bgPositionDic['paper']) {
        this.setState({
          currentPosition: bgPositionDic['rock']
        });
      }
    }, 1000);
  }

  componentDidUpdate() { 
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
    clearInterval(this.setRsp);
  }

  setRsp;

  matchClick = (mine) => {
    const { currentPosition, bgPositionDic } = this.state;
    clearInterval(this.setRsp);
    let findKey = _.filter(bgPositionDic, item=>item[mine]); 
    console.log(mine, currentPosition, findKey);
  }


 
  render() {
    const { currentPosition } = this.state;
    return ((
      <>
      <div id="bg" style={{backgroundPosition: `${currentPosition}px 0px`}}>HI Rock Scissors Paper</div>
      <div>
        <button type="button" onClick={()=>this.matchClick('rock')}>Rock</button>
        <button type="button" onClick={()=>this.matchClick('scissors')}>Scissors</button>
        <button type="button" onClick={()=>this.matchClick('paper')}>Paper</button>
      </div>
      </>
    ));
  }

}
module.exports = Rsp;