const React = require('react');
const _ = require('lodash');

// CLASS
// 처음라이프사이클 constructor -> render -> ref set -> componentDidMount
// 리랜더링 사이클 shouldComponentUpdate -> render -> componentDidUpdate
// 제거되기 직전 -> componentWillUnmount -> 소멸 
class Rsp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      check: false,
      stateArr : ['1','2','3','4','5']
    }
    this.init();
  }

  shouldComponentUpdate() {
    console.log('shouldComponentUpdate');
    return true;
  }

  componentDidMount() { // 처음에 랜더가 성공적으로 됬을때 -> 리랜더링에서는 실행되지않는다. -> 비동기, API 리퀘스트할때많이 사용 -> 계속돌아가기떄문에 여러번정기적으로 실행되는건 componentWillUnmount 에서 멈춰줘야한다.  (메모리누수 방지)
    console.log('componentDidMount');
  }

  componentDidUpdate() { // 리랜더링 될때 
    console.log('componentDidUpdate');
  }

  componentWillUnmount() { // 컴포넌트가 제거 직전 실행된다.
    console.log('componentWillUnmount');
  }

  init(){
    console.log('init');
  }

  click = () => {
    const { check } = this.state;
    
    if(!check) this.setState({check: true});
    else this.setState({check: false});

    this.init();
  }


  // 백그라운드 값 https://en.pimg.jp/023/182/267/1/23182267.jpg
  render() {
    const { check, stateArr } = this.state;
    return ((
      <>
      <div>HI</div>
      <button onClick={this.click}>BTN</button>
      {
        (()=>{
          if(check) return <div>뿅</div>
        })()
      }
      </>
    ));
  }

}
// module.exports = Rsp;


// 