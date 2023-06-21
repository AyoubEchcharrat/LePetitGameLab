import Marathon from './marathon/Marathon';
import '../index.css';
import { Link } from 'react-router-dom';


export default function Flagame(){

    return(
    <div className='flagame'>
        <Link to='/LePetitGameLab/' >Retour</Link>
        <Marathon />
    </div>)
}