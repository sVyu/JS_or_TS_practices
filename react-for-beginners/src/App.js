import Button from "./Button";
import styles from "./App.module.css";
import {useState, useEffect} from "react";

function App() {
  const [counter, setValue] = useState(0);
  const [keyword, setKeyword] = useState("");
  const onClick = () => setValue((prev) => prev+1);
  const onChange = (event) => {setKeyword(event.target.value)};
  // console.log("i run all the time");
  useEffect(() => {
    console.log("call the api");
  }, []);
  useEffect(() => {
    console.log("I run when 'keyword' changes")
  }, [keyword]);

  useEffect(() => {
    console.log("I run when 'counter' changes")
  }, [counter]);

  return (
    <div>
      <input value={keyword} onChange={onChange} type="text" placeholder="Search here..." />
      <h1 className={styles.title}>{counter}</h1>
      {/* <Button text={"Hello ~ "} onClick={onClick} ></Button> */}
      <button onClick={onClick}>click me</button>
    </div>
  );
}

export default App;
