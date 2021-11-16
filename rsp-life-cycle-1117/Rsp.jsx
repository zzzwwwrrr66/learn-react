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

  componentDidMount() { // 처음에 랜더가 성공적으로 됬을때 -> 리랜더링에서는 실행되지않는다. -> 비동기, API 리퀘스트할때많이 사용 -> 계속돌아가기떄문에 여러번정기적으로 실행되는건 componentWillUnmount 에서 멈춰줘야한다.  (메모리누수 방지)
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

  componentDidUpdate() { // 리랜더링 될때 
    // console.log('componentDidUpdate');
  }

  componentWillUnmount() { // 컴포넌트가 제거 직전 실행된다.
    console.log('componentWillUnmount');
    clearInterval(this.setRsp);
  }

  setRsp;

  matchClick = (mine) => {
    const { currentPosition, bgPositionDic } = this.state;
    clearInterval(this.setRsp);
    let findKey = _.filter(bgPositionDic, item=>item[mine]); // mine값으로 bgPositionDic 에서 key값으로 반환하기 
    console.log(mine, currentPosition, findKey);
  }


  // 백그라운드 값 https://en.pimg.jp/023/182/267/1/23182267.jpg
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


// 