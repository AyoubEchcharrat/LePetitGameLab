import { Link } from "react-router-dom"
import FindateGamemode from "./FindateGamemode"

export default function Findate(){
    return(       
    <div className="gamemode_findate">
        <Link to='/' >Retour</Link>
        <h1>FinDate</h1>
        <FindateGamemode/>
    </div>)
}