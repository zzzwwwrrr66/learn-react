const React = require('react');
const _ = require('lodash');

class ResponseCheck extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      screenStatus: 'clickToStart',
      screenTxt: 'Click To Start',
      time: 0,
      averageList: [],
      average: [],
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

  timeOut;

  click = (e) => {
    const { screenStatus, time, count, averageList } = this.state;

    if(screenStatus == 'clickToStart') { // First time click to start
      let radnomTime = Math.floor(Math.random() * 5);
      this.setState({
        screenStatus: 'wait',
        screenTxt: 'Wait!! Click to green',
      });

      this.timeOut = setTimeout(this.changeClass, radnomTime * 1000);

    } else if(screenStatus == 'wait') { // Too soon!
      clearTimeout(this.timeOut);
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
            screenTxt: 'Last is  ' + diffTime + 'MS' + ' Are you restart???',
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
      });

      this.timeOut = setTimeout(this.changeClass, radnomTime * 1000);
    }
  }

  render() {
    const { screenStatus, screenTxt, average, count } = this.state;
    return ((
      <>
      <div id="screen" className={screenStatus} onClick={this.click}>
        <p>{screenTxt}</p>
      </div>
      <p>{count}/5</p>
      <p>▼ your average time is</p>
      {
        average.length === 0 ? null 
        :average.map((v, i)=>{
          return ((
            <div key={i}>{i+1} - {v}ms</div>
          ));
        })
      }
      </>
    ));
  }

}
module.exports = ResponseCheck;
