import { useRef,useEffect } from "react"
import { setCurrent, setIsPlaying, setTime, setLose, Timer, ResetingTimer, ResetingGame, setFind, setScore } from "../../../features/marathonSlice"
import { useDispatch, useSelector } from "react-redux"
import flag from '../../../datas/drapeaux.json'

export default function Marathon() {

    const findRef = useRef(null);
    const {isPlaying,time,gameMode,lose,flagOne,flagTwo,find,score} = useSelector(state => state.marathon)
    const dispatch = useDispatch()
    const selectMode = (mode) => {
        if(mode === 'easy'){
            dispatch(setTime({time:30,mode:'easy'}))
        }else if(mode === 'normal'){
            dispatch(setTime({time:15,mode:'normal'}))
        }else if(mode === 'hard'){
            dispatch(setTime({time:7,mode:'hard'}))
        }else if(mode === 'legendary'){
            dispatch(setTime({time:3,mode:'legendary'}))
        }
    }

    useEffect(() => {
        const isEqualZero = time === 0
        const timer = setTimeout(() => !isEqualZero && isPlaying && dispatch(Timer(time - 1)),1000)
        return () => clearTimeout(timer)
       }, [dispatch, isPlaying, time,lose]) 

    const getRandomInt = () => {
        const randomInt = Math.floor(Math.random() * Object.keys(flag).length)
        return randomInt
    }
    
    useEffect(() => {
        if(!flagOne){
            let currentFlag = Object.entries(flag)[getRandomInt()]
            console.log(currentFlag)
            let flagNumber = 1
            dispatch(setCurrent({currentFlag,flagNumber}))
        }
        if (!flagTwo){
            let currentFlag = Object.entries(flag)[getRandomInt()]
            console.log(currentFlag)
            let flagNumber = 2
            dispatch(setCurrent({currentFlag,flagNumber}))
        }
    })

    const createUrl = (flagNumber) => {
        if(flagOne && flagTwo){
            if(flagNumber === 1) {
                return "https://flagcdn.com/192x144/"+flagOne.currentFlag[0]+'.png'
            }
            return "https://flagcdn.com/192x144/"+flagTwo.currentFlag[0]+'.png'
        }
    }

    useEffect(() => {
        let randomflag
        if(Math.random() > 0.5){
            randomflag = flagOne
        }else{
            randomflag = flagTwo
        }
        let found = flagTwo && flagOne && randomflag.currentFlag[1];
        dispatch(setFind(found))
    },[dispatch,flagTwo,flagOne])

    const isAnswerTrue = (answer) => {
        if(isPlaying && !lose && findRef.current.innerText === answer.currentFlag[1]){
            console.log('find : ',findRef.current.innerText , ' response : ', answer.currentFlag[1] );
            dispatch(setScore())
            dispatch(ResetingTimer())
        }else{
            if(!localStorage.getItem('marathon-bestScore')){
                localStorage.setItem('marathon-bestScore',score)
            }else if (localStorage.getItem('marathon-bestScore') < score){
                localStorage.setItem('marathon-bestScore',score)
            }

            dispatch(ResetingTimer())
            dispatch(setLose())
        }
    } 

    return (
        <div className="container">
            {!isPlaying && 
                <div className='container-selectmode'>
                    <button className="button-selectmode" onClick={() => selectMode('easy')}>easy</button>
                    <button className="button-selectmode" onClick={() => selectMode('normal')}>normal</button>
                    <button className="button-selectmode" onClick={() => selectMode('hard')}>hard</button>
                    <button className="button-selectmode" onClick={() => selectMode('legendary')}>legendary</button>
                </div>

            }        
            <div className="game-container"> 
                {isPlaying ?
                <button className="button-reset button-style-ONE" onClick={() => dispatch(ResetingGame())}>RESET</button>
                : 
                <div>
                    <p className="width">Bienvenue dans "FlaGame"! 🌍 Un défi de drapeaux où chaque bonne réponse vous rapproche du sommet. Choisissez votre difficulté, devinez le drapeau associé au nom affiché. Faites autant de bonnes réponses que possible, car une seule erreur met fin à la partie. Votre score final dévoilera votre maîtrise des drapeaux mondiaux. Prêt à montrer vos connaissances géographiques? 🚀🌐</p>
                    <button className="button-play button-style-ONE" onClick={() => dispatch(setIsPlaying())}>PLAY</button>

                </div>}
                
                <div className="gamemode">{gameMode}</div>
                <div className="timer">{time +' sec'}</div>
                <div className="score">{score}</div>

                {isPlaying ? 
                    <div className="display-marathon">
                        <div className='flags-container'>                    
                            <div className="flag-container" onClick={() => isAnswerTrue(flagOne)} >
                                <img src={createUrl(1)} alt={'drapeaux'} className="flag"/>
                            </div>
                            <div className="flag-container" onClick={() => isAnswerTrue(flagTwo)} >
                                <img src={createUrl(2)} alt={'drapeaux'} className="flag"/>
                            </div>
                        </div>
                        <div>
                            <p className="find" ref={findRef} >{find}</p>
                        </div>
                    </div>
                :
                <div className="lost-container">
                    {lose && <div>Perdu ! Votre score est de {score}</div> }
                    {lose && localStorage.getItem('marathon-bestScore') && <div>Votre meilleur score est de {localStorage.getItem('marathon-bestScore')}</div> }
                </div>
                }    
                
                
            </div>

        </div>)
}