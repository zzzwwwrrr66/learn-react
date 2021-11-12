const React = require('react');
const _ = require('lodash')

function getNumbers() {
  [1,2,3,4,5].forEach(v=>{
console.log (
      <li>{v}</li>
    )
  })
}
const NumberBaseball = () => {

  const [currectNumber, setcurrectNumber] = React.useState();
  const [inputVal, setInputVal] = React.useState('');
  const [resultList, setResultList] = React.useState([]);
  const [tryCount, setTryCount] = React.useState(resultList.length);

  const inputRef = React.useRef(null);

  

  const inputChange = (e) => {
    let $val = e.target.value
    setInputVal($val);
  }

  const submit = (e) => {
    e.preventDefault();

    console.log(inputVal);
  }
  
  return (
    <>
      <h2>number baseball</h2>
      <form onSubmit={submit}>
        <input type="number" ref={inputRef} onChange={inputChange} value={inputVal} />
        <button className={inputVal} >CHECK</button>
      </form>
      <ul>
        {
          [1,2,3,4,5].map((v,i)=>{
            return (
              <li key={i}>{v}</li>
            )
          })
        }
      </ul>
      <p>{resultList}</p>
    </>
  );
}

module.exports = NumberBaseball;


// require 는 노드의 모듈 시스템 
// import from 도 똑같다. ES2015 모듈 시스템 -> 노드와는 다르지만 호환사용가능하다.
// export default 는 한곳에서 한번만, export const key1 = 'hi', export const key2 = 'hellow'는 여러번 사용가능  import { key1, key2 }
// 리액트에서 import from 을 쓸수있는 이유는 바벨이 컴포트할때 바꿔주기 때문이다. 
// React 의 반복문 map; -> {} 안에서 다른 반복문을사용하면 작동안한다. _().forEach , forEach 같은