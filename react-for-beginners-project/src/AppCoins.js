// import { useState, useEffect } from "react";

// function App() {
//   const [loading, setLoading] = useState(true);
//   const [coins, setCoins] = useState([]);

//   const [index, setIndex] = useState(0);
//   const [money, setMoney] = useState();
//   const [result, setResult] = useState(0);

//   useEffect(() => {
//     fetch('https://api.coinpaprika.com/v1/tickers')
//       .then((response) => response.json())
//       // .then((json) => console.log(json));
//       .then((json) => {
//           setCoins(json);
//           setLoading(false);
//         });
//     // console.log(coins)
//   }, []);

//   useEffect(() => {
//     if (coins.length > 0) { /* coins api를 불러온 다음에 실행 되도록 */
//       setResult(Number(money)/coins[index].quotes.USD.price);
//     }
//   }, [index, money]);

//   const onOptionChange = (event) => {
//     setIndex(event.target.selectedIndex);
//   }

//   const onInputChange = (event) => {
//     setMoney(event.target.value);
//   }

//   return (
//     <div>
//       <h1>The Coins! {loading? "" : `(${coins.length})`}</h1>
//       {loading ? <strong>Loading...</strong> : 
//         <div>
//           <select onChange={onOptionChange}>
//             {coins.map((coin) => <option key={coin.id}>{coin.name} ({coin.symbol}) : ${coin.quotes.USD.price} USD</option>)}
//           </select>
//           <hr />
//           <input onChange={onInputChange} type="number" placeholder="how_many_dollars?"></input>
//           <br />
//           {isNaN(money)|money===''? "":
//           <div>
//             <span>{money} dollars : </span>
//             <span>{result} {coins[index].symbol}</span>
//           </div>}
//         </div>
//       }
//     </div>
//   );
// }
// export default App;


// import { useState, useEffect } from "react";

// function App() {
//   const [loading, setLoading] = useState(true);
//   const [coins, setCoins] = useState([]);

//   const [index, setIndex] = useState(0);
//   const [money, setMoney] = useState(0);

//   useEffect(() => {
//     fetch('https://api.coinpaprika.com/v1/tickers')
//       .then((response) => response.json())
//       .then((json) => {
//           setCoins(json);
//           setLoading(false);
//         });
//   }, []);

//   const onOptionChange = (event) => {
//     setIndex(event.target.selectedIndex);
//   }

//   const onInputChange = (event) => {
//     setMoney(event.target.value);
//   }

//   return (
//     <div>
//       <h1>The Coins! {loading? "" : `(${coins.length})`}</h1>
//       {loading ? <strong>Loading...</strong> : 
//         <div>
//           <select onChange={onOptionChange}>
//             {coins.map((coin) => <option key={coin.id}>{coin.name} ({coin.symbol}) : ${coin.quotes.USD.price} USD</option>)}
//           </select>
//           <hr />
//           <input onChange={onInputChange} type="number" placeholder="how_many_dollars?"></input>
//           <br />
//           {isNaN(money)|money===''? "":
//             <span>{Number(money)/coins[index].quotes.USD.price} {coins[index].symbol} can buy</span>
//           }
//         </div>
//       }
//     </div>
//   );
// }

// export default App;
