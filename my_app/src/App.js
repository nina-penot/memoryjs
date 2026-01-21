import logo from './logo.svg';
import React, { useState, useRef } from "react";
import './App.css';
import './assets/css/mycss.css'
//import Button from './components/Button/Button';
//import Score from './components/Score/Score';
//import Card from './components/Card/Card';
//import Board from './components/Board/Board';
// let pokemons = require('./data/pokemons.json');
//import pokemons from './data/pokemons.json'
import Form_Difficulty from './components/Form_Difficulty/Form_Difficulty';
import Select_Difficulty from './components/Select_difficulty/Select_difficulty';
import New_Board from './components/New_Board/New_Board';
// import FetchData from './data/pokemons'

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

function App() {
  //console.log(pokemons);
  let [formsent, formsent_set] = useState(false);
  let [board_difficulty, diff_set] = useState(null);
  let [gameover, setGameOver] = useState(false);
  const boardref = useRef(null);

  function submit_diff(e) {
    e.preventDefault();
    const form = e.target;
    //console.log(form[0].value);

    diff_set(board_difficulty = parseInt(form[0].value));
    formsent_set(formsent = true);
  }

  function restart() {
    diff_set(board_difficulty = null);
    formsent_set(formsent = false);
  }


  if (formsent == false) {
    //setGameOver(false);
    return (
      <form onSubmit={submit_diff}>
        <div>Difficulté : </div>
        <Select_Difficulty />
        <button type='submit'>Commencer</button>
      </form>
    )
  } else {
    // return (
    //   <div>
    //     <Board difficulty={board_difficulty} />
    //     <button onClick={restart}> Restart </button>
    //   </div>

    // )
    return (
      <div>
        <New_Board difficulty={board_difficulty} isGameOver={() => setGameOver(true)} />
        <button onClick={restart}> Restart </button>
      </div>
    )
  }
}

export default App;
