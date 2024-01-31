import { useNavigate } from "react-router-dom";
import "./App.css";

function App() {
  const navigate = useNavigate();
  const navigateTo = (hash) => {
    navigate(hash);
  };

  return (
    <div className="App">
      <h1 className="title">Le Petit GameLab 🎮</h1>
      <p>
        {" "}
        Bienvenue au Petit GameLab! 🎮 Oui, c'est un peu comme une salle de jeux
        pour adultes, mais sans le code vestimentaire sérieux. <br /> Ici, on
        jongle entre deux petits jeux, on trébuche sur des pixels et on
        s'émerveille devant des mondes virtuels sans prendre tout trop au
        sérieux. <br />
        <br /> C'est un peu comme une pause café, mais avec des contrôleurs.{" "}
        <br /> Alors, détendez-vous, prenez une manette (ou deux si vous êtes
        feeling pro), et laissez-vous emporter par nos mini-aventures
        virtuelles.
        <br /> Parce qu'au Petit GameLab, chaque partie est une victoire, même
        si c'est juste contre un méchant pixelisé.
      </p>
      <div className="home-mode-container">
        <div
          className="home-mode"
          onClick={() => navigateTo("/LePetitGameLab/findate")}
        >
          <h2>FinDate</h2>
        </div>
        <div
          className="home-mode"
          onClick={() => navigateTo("/LePetitGameLab/flagame")}
        >
          <h2>FlaGame</h2>
        </div>
        {/*         <div className='home-mode' onClick={() => navigateTo('/LePetitGameLab/squareDash')}>
          <h2>SquareDash</h2> 
        </div>*/}
      </div>
    </div>
  );
}

export default App;
