import logo from './logo.svg';
import './App.css';
import './assets/css/mycss.css'
import Button from './components/Button/Button';
import Score from './components/Score/Score';
import Card from './components/Card/Card';
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
  // console.log(pokemon)
  return (
    <div className='App'>
      <Button text="bonjour." class="red btn" />
      <Button text="blue" class="blue btn" />
      <Score class="green" />
      <Card />
    </div>
  )
}

export default App;
