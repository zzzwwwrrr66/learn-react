const React = require('react');
const _ = require('lodash');
const { result } = require('lodash');


class responseCheck extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      screenStatus: 'clickToStart',
      screenTxt: 'Click To Start',
      time: 0,
      averageList: [],
      average: [],
      func: null,
      count: 0,
    }

  }

  changeClass = () => {
    this.setState({
      screenStatus: 'click',
      screenTxt: `CLICK!!!!!`,
      time: new Date(),
    })
  }

  click = (e) => {
    const { screenStatus, func, time, count, averageList } = this.state;

    if(screenStatus == 'clickToStart') { // First time click to start
      let radnomTime = Math.floor(Math.random() * 5);
      this.setState({
        screenStatus: 'wait',
        screenTxt: 'Wait!!',
        func: setTimeout(this.changeClass, radnomTime * 1000),
      });
    } else if(screenStatus == 'wait') { // Too soon!
      clearTimeout(func);
      this.setState({
        screenTxt: `Too soon! Click To restart.`,
        screenStatus: 'clickToStart',
      });
    } else if(screenStatus == 'click') {
      let now = new Date().getTime();
      let diffTime = (now - time.getTime()) / 1000;
      
      if(count + 1 > 4) { // if count 4
        this.setState(prev=>{
          return {
            time: diffTime, 
            screenStatus: 'result',
            screenTxt: 'last is  ' + diffTime + 'MS' + ' Are you restart???',
            averageList: [],
            count: 0,
            average: [...prev.average, averageList.reduce((p, c) => p + c, 0) / averageList.length],
          }
        });
        return false;
      } 
      this.setState(prev=>{
        return {
          time: diffTime, 
          screenStatus: 'result',
          screenTxt: diffTime + 'MS' + ' click to restart',
          averageList: [...prev.averageList, diffTime],
          count: ++prev.count
        }
      });

    } else if(screenStatus == 'result') { // Restart
      let radnomTime = Math.floor(Math.random() * 5);
      this.setState({
        screenStatus: 'wait',
        screenTxt: 'Wait!!',
        func: setTimeout(this.changeClass, radnomTime * 1000),
      });
    }
  }

  render() {
    return ((
      <>
      <button onClick={this.click}>btn</button>
      <div id="screen" className={this.state.screenStatus} onClick={this.click}>
        <p>{this.state.screenTxt}</p>
      </div>
      <p>{this.state.count}/5</p>
      <p>your average is</p>
      {
        this.state.average.length === 0 ? null 
        :this.state.average.map((v, i)=>{
          return ((
            <div key={i}>{i+1} - {v}ms</div>
          ));
        })
      }
      </>
    ));
  }

}
module.exports = responseCheck;
