const React = require('react');
const {PureComponent} = require('react')
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

class NumberBaseball extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      currectNumber: getNumbers(),
      inputVal: '',
      inputCheckTxt: '',
      resultList: [],
      tryCount: 0,
      resultTxt: '',
    }

    this.inputChange = this.inputChange.bind(this);
    console.log(this.props)
  }

  inputRef = React.createRef();
  // setRefInput = (e) => {
  //   this.inputRef = e;
  // };

  inputChange (e) {
    let $val = e.target.value
    this.setState({
      inputVal: $val
    });
  }

  submit = (e) => {
    
    e.preventDefault();
    this.setState({
      inputVal: '',
      inputCheckTxt: '',
    });

    if(this.state.inputVal.trim().length == 4) { // 답일때
       // COUNT
      if(this.state.tryCount == 0) {
        this.setState({
          tryCount: 1,
        });
      }else {
        this.setState((prev)=>{
          prev.tryCount++;
        });
      }

      if(this.state.currectNumber.join('') == this.state.inputVal.trim()) {// homerun
        this.setState({
          resultTxt: 'HOME RUN!!!',
          resultList: [...this.state.resultList, {try: this.state.inputVal, result : 'HOME RUN!!!'}],
        }); 
        if(confirm('HOME RUN!!!!! RESTART??')) {
          this.setState({
            currectNumber: getNumbers(),
            inputVal: '',
            inputCheckTxt: '',
            resultList: [],
            tryCount: 0,
            resultTxt: '',
          }); 
        }
      } else {
        if(this.state.tryCount >= 5) { //기회 9번넘으면 초기화하고 다시 
          alert('FAIL RESTART!!! currect number is '+this.state.currectNumber.join(''));
          this.setState({
            currectNumber: getNumbers(),
            inputVal: '',
            inputCheckTxt: '',
            resultList: [],
            tryCount: 0,
            resultTxt: '',
          }); 
        } else { // STRIKE OR BALL CHECK
          let strikeNum = 0;
          let ballNum = 0;
          this.state.currectNumber.forEach((v, i)=>{
            if(v == parseInt(this.state.inputVal[i])) {
            ++strikeNum;
          } else if(this.state.inputVal.split('').includes(String(v))) {
            ++ballNum;
          }
            this.setState({
              resultTxt: strikeNum+' STRIKE!!! '+ballNum+' BALL!!!',
              resultList: [...this.state.resultList, {try: this.state.inputVal, result : strikeNum+' STRIKE!!! '+ballNum+' BALL!!!'}],
            });
          });
        }
      }
    } else {
      this.setState({
        inputCheckTxt: 'only 4 characters.'
      });
    }
    this.inputRef.current.focus();
  }

  render() {
    const {
      currectNumber,
      inputVal,
      inputCheckTxt,
      resultList,
      tryCount,
      resultTxt
    } = this.state;
    return (
      <>
      <h2>number baseball</h2>
      <form onSubmit={this.submit}>
        <input type="number" ref={this.inputRef} onChange={this.inputChange.bind(this)} value={this.state.inputVal} maxLength="4" />
        <button className={this.state.inputVal} >CHECK</button>
        <p>{this.state.inputCheckTxt}</p>
      </form>
      <ul>
        {
          this.state.resultList.map((v,i)=>{
            return (
              <Try key={i} index={i} obj={v} />
            );
          })
        }
      </ul>
      <p>tried count : {this.state.tryCount}</p>
    </>
    )
  }
}
module.exports = NumberBaseball;

// ▼적어놓을 목록
// map 을 사용할땐 항상 key 를 적어주기 , 리액트자체에서 key를 보고 같은 컴포넌트인지 아닌지 판단(성능 최적화 -> index를 쓰는건 성능최적화에는 별로 안좋다.), 키가중복이면 에러를 뱉는다.
// 화살표함수일땐 리턴을 생략가능

// props value 와 index가 props가된다, 반복문 단위로 분리가 많이된다. 속성네임은 자유
// props 를 객체로 넘겨준다. 자식컴포넌트에서는 props.key를 쓰거나 props를 {구조분해}한다.
// props 주는 부모컴포넌트에서 key를 설정한다.
// 배열에 새로운 요소를 추가할때 push 는 안된다. 왜냐하면 push를 해도 참조값이 변경이 안되므로 리액트는 그전값과 똑같이 인식한다. 그러므로 [...arr<- 그전꺼 풀어놓고, 추가할것];

// class 에서 props 를 안받은 컴포넌트는 값이 undefined 임
// class에서 this.state 쓰기 귀찮을때 render 함수 밑에 const {key, key, key} = this.state 설정하고 설정한값으로 -> 다른곳도 마찬가지임 함수시작전에 구조분해 const 만들어주기 
// 밖에 빼는 함수를 결정하는 기준은  this 안쓸때 빼주기  <- 안에넣어도 상관음 없음 