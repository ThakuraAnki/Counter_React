import React,{useState} from "react";

const App = () => { 
  console.log("App component rendered");

  const [count ,setCount]=useState(0);
  function increment(){
    setCount(count+1);
  }

  function decrement(){
    setCount(count -1);
  }
  function reset(){
    setCount(0);
  }
  return(
    <div>
      <h1>This is my App</h1>
      <h2>Count: {count}</h2>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}

export default App;