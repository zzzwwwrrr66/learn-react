const React = require('react');
const {useEffect} = React;
const _ = require('lodash');

const getKeyByValue = (object, value) => {
  return Object.keys(object).find(key => object[key] === value);
}

const RspHooks = () => {
  const [bgPositionDic] = React.useState({
    rock : 0,
    scissors : -140,
    paper : -284
  });
  const [matchDic] = React.useState({
    rock : 1, 
    scissors : 0,
    paper : -1 ,
  });
  const [currentPosition, setCurrentPosition] = React.useState(0);
  const [recordList, setRecordList] = React.useState([]);
  const [trying, setTrying] = React.useState(false);
  const setRspInterval = React.useRef(null);

  useEffect(() => { 
    setRspInterval.current = setInterval(setRsp, 30);
    console.log(`Component Will Unmount 시작`);
    console.log(document.getElementById('bg'));
    console.log(`Component Will Unmount 시작---------------`);
    return () => { 
      console.log('Component Will Unmount'+ '종료');
      console.log(document.getElementById('bg'));
      console.log('Component Will Unmount'+ '종료-------------');
      clearInterval(setRspInterval.current);
    }
  }, [currentPosition]); 

  const setRsp = () => {
    if(!trying) setTrying(true);

    if(currentPosition == bgPositionDic['rock']) {
      setCurrentPosition(bgPositionDic['scissors']);
    } else if(currentPosition == bgPositionDic['scissors']) {
      setCurrentPosition(bgPositionDic['paper']);
    } else if(currentPosition == bgPositionDic['paper']) {
      setCurrentPosition(bgPositionDic['rock']);
    }
  }

  const matchClick = (mine) => (e) => {
    if(trying) {
      setTrying(false);
    } else { 
      return false;
    }

    clearInterval(setRspInterval.current);

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
    setRecordList(prevRecordList=>{
      return [...prevRecordList, resultTxt]
    });
  }

  const matchRestart = () => {
    if(!trying) {
      setRspInterval.current = setInterval(setRsp, 30);
    }
  }

  return ((
    <>
    <div id="bg" style={{backgroundPosition: `${currentPosition}px 0px`}}></div>
    <div>
      <button type="button" onClick={matchClick('rock')}>Rock</button>
      <button type="button" onClick={matchClick('scissors')}>Scissors</button>
      <button type="button" onClick={matchClick('paper')}>Paper</button>
    </div>
    <br />
    <div>
      <button type="button" onClick={matchRestart}>RESTART</button>
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
module.exports = RspHooks;