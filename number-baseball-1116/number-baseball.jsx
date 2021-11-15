const React = require('react');
const Try = require('./Try.jsx');
const _ = require('lodash')

function getNumbers() {
  const numList = [1,2,3,4,5,6,7,8,9];
  const pickNumList = [];
  for(let i = 0; i < 4; i++) {
    let ranNum = Math.floor(Math.random() * 9 - i)
    pickNumList.push(numList.splice(ranNum, 1)[0]); 
  }
  return pickNumList;
}
const NumberBaseball = () => {
  const [currectNumber, setCurrectNumber] = React.useState(getNumbers());
  const [inputVal, setInputVal] = React.useState('');
  const [inputCheckTxt, setInputCheckTxt] = React.useState('');
  const [resultList, setResultList] = React.useState([]);
  const [tryCount, setTryCount] = React.useState(0);
  const inputRef = React.useRef(null);

  const inputChange = (e) => {
    let $val = e.target.value
    setInputVal($val);
  }

  const submit = (e) => {
    e.preventDefault();
    setInputVal('');
    setInputCheckTxt('');

    if(inputVal.trim().length == 4) { // 답일때
    // COUNT
    if(tryCount == 0) {
      setTryCount(1);
    } else {
      setTryCount((prev)=>{
        return ++prev
      });
    }
    console.log('tryCount CHECK ', tryCount);

    if(currectNumber.join('') == inputVal.trim()) {// homerun
        setResultList(prev=>{
          return [...prev, {try: inputVal, result : 'HOME RUN!!!'}]
        });
        if(confirm('HOME RUN!!!!! WANT RESTART??')) {
          setCurrectNumber(getNumbers());
          setInputVal('');
          setInputCheckTxt('');
          setResultList([]);
          setTryCount(0);
        }
      } else {
        if(tryCount >= 5) { //기회 9번넘으면 초기화하고 다시 
          alert('FAIL RESTART!!! currect number is '+currectNumber.join(''));
          setCurrectNumber(getNumbers());
          setInputVal('');
          setInputCheckTxt('');
          setResultList([]);
          setTryCount(0);

        } else { // STRIKE OR BALL CHECK
          let strikeNum = 0;
          let ballNum = 0;
          currectNumber.forEach((v, i)=>{
            if(v == parseInt(inputVal[i])) {
              ++strikeNum;
            } else if(inputVal.split('').includes(String(v))) {
              ++ballNum;
            }
          });
          setResultList(prev=>{
            return [...prev, {try: inputVal, result : strikeNum+' STRIKE!!! '+ballNum+' BALL!!!'}]
          });
        }
      }
    } else {
      setInputCheckTxt('only 4 characters.')
    }
  }


  return ((
    <>
      <h2>number baseball</h2>
      <form onSubmit={submit}>
        <input type="number" ref={inputRef} onChange={inputChange} value={inputVal} maxLength="4" />
        <button className={inputVal} >CHECK</button>
        <p>{inputCheckTxt}</p>
      </form>
      <ul>
        {
          resultList.map((v,i)=>{
            return (
              <Try key={i} value={v.try} index={i} obj={v} />
            );
          })
        }
      </ul>
      <p>tried count : {tryCount}</p>
    </>
  ));
}
module.exports = NumberBaseball;
