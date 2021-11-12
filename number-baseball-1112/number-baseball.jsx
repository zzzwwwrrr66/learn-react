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