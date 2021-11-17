const React = require('react');
const _ = require('lodash');

class Rsp extends React.PureComponent {
  constructor(props){
    super(props);
    this.state = {
      bgPositionDic : {
        rock : 0,
        scissors : -140,
        paper : -284
      },
      matchDic : {
        rock : 1, 
        scissors : 0,
        paper : -1 ,
      },
      currentPosition : 0,
      recordList : [],
      trying: false,
    }
  }

  componentDidMount() { 
    this.setRspInterval = setInterval(this.setRsp, 30);
    console.log(this.setRsp);
    console.log(document.getElementById('bg'));
  }

  // componentDidUpdate() {
    
  // }
  
  componentWillUnmount() {
    console.log('componentWillUnmount');
    clearInterval(this.setRspInterval);
  }

  setRspInterval;
  setRsp = () => {
    const {currentPosition, bgPositionDic} = this.state;
    this.setState({
      trying: true,
    });
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
  }

  matchClick = (mine) => (e) => {
    console.log(e.target);
    const { currentPosition, bgPositionDic, trying, matchDic, recordList } = this.state;
    
    if(trying) {
      this.setState({
        trying: false,
      })
    } else { // 한번 더 클릭 방지 return 
      return false;
    }

    clearInterval(this.setRspInterval);
    
    function getKeyByValue(object, value) {
      return Object.keys(object).find(key => object[key] === value);
    }
    let computer = getKeyByValue(bgPositionDic, currentPosition);

    let resultTxt = '';
    let diff = matchDic[mine] - matchDic[computer];
    if(diff == 0) { //draw
      resultTxt = 'you '+mine+ ' computer\'s '+computer+' = draw';
    } else if(diff == 1 || diff == -2){ //win
      resultTxt = 'you '+mine+ ' computer\'s '+computer+' = your win';
    } else if(diff == 2 || diff == -1) { //lose
      resultTxt = 'you '+mine+ ' computer\'s '+computer+' = your lose';
    }
    this.setState(prevState=>{
      return {
        recordList: [...prevState.recordList, resultTxt]
      }
    })
  }

  matchRestart = () => {
    const { trying } = this.state;
    if(!trying) {
      this.setRspInterval = setInterval(this.setRsp, 30);
    }
  }


 
  render() {
    const { currentPosition, recordList } = this.state;
    return ((
      <>
      <div id="bg" style={{backgroundPosition: `${currentPosition}px 0px`}}></div>
      <div>
        <button type="button" onClick={this.matchClick('rock')}>Rock</button>
        <button type="button" onClick={this.matchClick('scissors')}>Scissors</button>
        <button type="button" onClick={this.matchClick('paper')}>Paper</button>
      </div>
      <br />
      <div>
        <button type="button" onClick={this.matchRestart}>RESTART</button>
      </div>
      <br />
      <h3 style={{marginBottom:0}}>▼ Record List</h3>
      <ul style={{padding:0, margin:0}}>
      {
        !recordList.length ? null 
        : recordList.map((v,i)=>{
          return ((
            <li key={i+v}>{i+1}. {v}</li>
          ))
        })
      }
      </ul>
      
      </>
    ));
  }

}
module.exports = Rsp;