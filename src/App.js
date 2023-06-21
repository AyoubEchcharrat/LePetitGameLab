import { useNavigate } from 'react-router-dom';
import './App.css';



function App() {
  const navigate = useNavigate()
  const navigateTo = (hash) => {
    navigate(hash)
  }

  return (
    <div className="App">
      <h1 className='title'>Trinqil</h1>
      <div className='home-mode-container'>
        <div className='home-mode' onClick={() => navigateTo('/findate')}>
          <h2> FinDate</h2>
        </div>
        <div className='home-mode' onClick={() => navigateTo('/flagame')}>
          <h2> FlaGames</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
