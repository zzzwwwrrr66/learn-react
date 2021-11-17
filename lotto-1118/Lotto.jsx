import React, {Component} from 'react';

import Balls from './Balls';

const getLottoNum = () => {
  const arr = Array(45).fill().map((v,i)=>{return i+1})

  const randomNum = {};
  randomNum['lotto'] = []
  randomNum['bonus'] = null

  for(let i = 0; i < 6; i++) {
    randomNum['lotto'].push(arr.splice(Math.floor(Math.random() * 45 - i), 1)[0] )
  }

  randomNum['bonus'] = arr.splice(Math.floor(Math.random() * 45 - arr.length), 1)[0] 

  return [...randomNum['lotto'], randomNum['bonus']];
}

class Lotto extends Component {
  state =  {
    lotto: getLottoNum(),
    bonus: null,
    winBalls: [],
  }

  componentDidMount() {
    this.setlotto();
  }

  componentWillUnmount() {
    clearTimeout(this.ballsTimeOut); 
  }

  componentDidUpdate() {
    console.log('update');
  }

  ballsTimeOut;

  setlotto = () => {
    const {lotto} = this.state
    for(let i = 0; i < 7; i++) {
      this.ballsTimeOut = setTimeout(()=>{
        let num = lotto[i];
        if(i == 6) {//bonus
          this.setState({
            bonus: num,
          });
        }else {//win numbers
          this.setState(prevState=>{
            return{
              winBalls: [...prevState.winBalls, num]
            }
          })
        }
      }, 1000 * i);

    }
  }

  render() {
    const {winBalls, bonus} = this.state
    return (
      <>
      <h2>setlotto</h2>
      <ul className='ballWrap'>
        {
          !winBalls.length ? null
          : winBalls.map((v,i)=>{
            return ((
              <Balls key={i} ballNumber={v}/>
            ))
          })
        }
      </ul>
      <h4>bonus</h4>
      <ul className='ballWrap'>
        {
          !bonus ? null
          :  <Balls ballNumber={bonus}/>
        }
      </ul>
      </>
    )
  }
}

export default Lotto;