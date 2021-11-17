import React, {memo} from "react"

const ballColor = (ball) => {
  let result;
  
  if(ball <= 1 && ball <= 10) {
    result = 'yellow'
  } else if(ball <= 11 && ball <= 20){
    result = 'blue'
  } else if(ball <= 21 && ball <= 30){
    result = 'red'
  } else if(ball <= 31 && ball <= 40){
    result = 'gray'
  } else {
    result = 'green'
  }
  console.log(ball, result);
  return result;
}

const Balls = ({ballNumber}) => {
  return (
    <>
    <li className={`ball ${ballColor(ballNumber)}`}>{ballNumber}</li>
    </>
  ) 
}

export default memo(Balls);