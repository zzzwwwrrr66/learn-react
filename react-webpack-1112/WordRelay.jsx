const React = require('react');


const WordRelay = () => {
  const [word, setWord] = React.useState('word');
  const [inputVal, setInputVal] = React.useState('');
  const [result, setResult] = React.useState('');
  const inputRef = React.useRef(null);

  const inputChange = (e) => {
    let $val = e.target.value
    setInputVal($val);
  }

  const wordCheckClick = () => {
    let $word = word.trim();
    let $lastWord = $word[$word.length - 1];
    let $inputWord = inputVal.trim();
    let $inputFirstWord = $inputWord[0];
    
    if($inputWord && $inputWord.length > 1) {
      if($lastWord == $inputFirstWord) {
        setWord($inputWord);
        setInputVal('');
        setResult('true!');
        inputRef.current.value = '';
        inputRef.current.focus();
      } else {
        setResult('false!'); 

      }
    } else {
      setResult('More than one character.');
    }
  }

  return (
    <>
      <h2>word relay</h2>
      <p>{word}</p>
      <div>
        <input type="text" ref={inputRef} onChange={inputChange}  />
        <button onClick={wordCheckClick} className={inputVal} >CHECK</button>
      </div>
      <p>{result}</p>
    </>
  );
}
  


module.exports = WordRelay;