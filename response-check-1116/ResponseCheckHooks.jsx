const React = require('react');
const _ = require('lodash');
let timeOut = null;

const ResponseCheckHooks = () => {
  const [screenStatus, setScreenStatus] = React.useState('clickToStart');
  const [screenTxt, setScreenTxt] = React.useState('Click To Start');
  const [time, setTime] = React.useState(0);
  const [averageList, setAverageList] = React.useState([]);
  const [average, setAverage] = React.useState([]);
  const [count, setCount] = React.useState(0);
  const timeOutFnc = React.useRef();

  const changeClass = () => {
    setScreenStatus('click');
    setScreenTxt(`CLICK!!!!!`);
    setTime(new Date());
  }

  const click = (e) => {

    if(screenStatus == 'clickToStart') { // First time click to start
      let radnomTime = Math.floor(Math.random() * 5);
      setScreenStatus('wait');
      setScreenTxt('Wait!! Click to green');

      timeOutFnc.current = setTimeout(changeClass, radnomTime * 1000);
      console.log(timeOutFnc);

    } else if(screenStatus == 'wait') { // Too soon!
      clearTimeout(timeOutFnc.current);
      console.log(timeOutFnc);

      setScreenTxt(`Too soon! Click To restart.`);
      setScreenStatus('clickToStart');
    } else if(screenStatus == 'click') {
      let nownow =  new Date(); 
      let now = new Date().getTime();
      let diffTime = (now - time.getTime()) / 1000;
      console.log(nownow, diffTime);

      if(count + 1 > 4) { // if count 4 
        setTime(diffTime);
        setScreenStatus('result');
        setScreenTxt('Last is  ' + diffTime + 'MS' + ' Are you restart???');
        setAverageList([]);
        setCount(0);
        setAverage(prevAverage=>{
          return [...prevAverage, averageList.reduce((p, c) => p + c, 0) / averageList.length]
        })
        
        return false;
      } 
      setTime(diffTime);
      setScreenStatus('result');
      setScreenTxt(diffTime + 'MS' + ' click to restart');
      setAverageList(prevAverageList=>{
        return [...prevAverageList, diffTime]
      });
      setCount(prevCount=>{
        return ++prevCount
      });

    } else if(screenStatus == 'result') { // Restart
      let radnomTime = Math.floor(Math.random() * 5);
      setScreenStatus('wait');
      setScreenTxt('Wait!!');

      timeOutFnc.current = setTimeout(changeClass, radnomTime * 1000);
      console.log(timeOutFnc);
    }
  }

  return ((
    <>
    <div id="screen" className={screenStatus} onClick={click}>
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
module.exports = ResponseCheckHooks;
