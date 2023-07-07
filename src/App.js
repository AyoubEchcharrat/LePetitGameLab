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
        <div className='home-mode' onClick={() => navigateTo('/LePetitGameLab/findate')}>
          <h2>FinDate</h2>
        </div>
        <div className='home-mode' onClick={() => navigateTo('/LePetitGameLab/flagame')}>
          <h2>FlaGame</h2>
        </div>
        <div className='home-mode' onClick={() => navigateTo('/LePetitGameLab/squareDash')}>
          <h2>SquareDash</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
