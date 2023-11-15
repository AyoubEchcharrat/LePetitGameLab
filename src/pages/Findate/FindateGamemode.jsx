import { useEffect, useState } from 'react'
import historicalPhotos from '../../datas/historicalPhotos.json'
import { setImageIndex, setPlaying, setdatesend,setScore,setIndex,setReset,setResults,setDeleteOneIndex } from "../../features/findateSlice"
import { useDispatch, useSelector } from "react-redux"

export default function FindateGamemode() {
    const [date,setDate] = useState(2000)
    const {ImageIndexs, playing,index,score,results} = useSelector(state => state.findate)
    const dispatch = useDispatch()

    const getRandomInt = () => {
        const randomInt = Math.floor(Math.random() * historicalPhotos.data.length)
        return randomInt
    }

    useEffect(() => {

        let randomIndex = getRandomInt()
        if(ImageIndexs.length < 5){
            if(ImageIndexs.length === 2){
                console.log(ImageIndexs[0], 'est il egale a ', ImageIndexs[1])
                if(ImageIndexs[0] === ImageIndexs[1]){
                    console.log('SAME, returned')
                    dispatch(setDeleteOneIndex(ImageIndexs[1]))
                }
            }
            ImageIndexs.forEach(element => {
                console.log(element, 'est il egale a ', randomIndex)
                if(element === randomIndex){
                    console.log('SAME, returned')
                    dispatch(setDeleteOneIndex(randomIndex))
                }
            })
            console.log(randomIndex)
            dispatch(setImageIndex(randomIndex))
        }
    },[ImageIndexs, ImageIndexs.length, dispatch])

    const displayOnePhotoName = () => {
        const name = historicalPhotos.data[ImageIndexs[index]].name
        return name
    }

    const displayOnePhotoImage = () => {
        const img = historicalPhotos.data[ImageIndexs[index]].img
        return img
    }

    function handleSubmit(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();
        dispatch(setdatesend(date))
        let scoretoAdd = 100
        if(date === historicalPhotos.data[ImageIndexs[index]].date){
            dispatch(setScore(scoretoAdd))
            console.log('Perfect.')
        }else{
            let realDate = historicalPhotos.data[ImageIndexs[index]].date
            let copyYourDate = date
            if(realDate > copyYourDate){
                while (realDate > copyYourDate) {
                    if(scoretoAdd < 80){
                        scoretoAdd = scoretoAdd - 2
                        copyYourDate = (Number(copyYourDate) +1)
                        console.log(copyYourDate)
                    }else{
                        scoretoAdd = scoretoAdd - 5
                        copyYourDate = (Number(copyYourDate) +1)
                        console.log(copyYourDate)
                    }
                }
                console.log(scoretoAdd)
                dispatch(setScore(scoretoAdd))
            }else{
                while (realDate < copyYourDate) {
                    if(scoretoAdd < 80){
                        scoretoAdd = scoretoAdd - 2
                        copyYourDate = (Number(copyYourDate) -1)
                        console.log(copyYourDate)
                    }else{
                        scoretoAdd = scoretoAdd - 5
                        copyYourDate = (Number(copyYourDate) -1)
                        console.log(copyYourDate)
                    }
                }
                if(scoretoAdd <= 0) {
                    scoretoAdd = 0
                }
                console.log(scoretoAdd)
                dispatch(setScore(scoretoAdd))
            }
        }
        dispatch(setResults(
            {date:historicalPhotos.data[ImageIndexs[index]].date, 
            guess:date,
            scoretoAdd:scoretoAdd,
            image:historicalPhotos.data[ImageIndexs[index]].img
            }))
        dispatch(setIndex())
    }
    
    const resetAll = () => {
        dispatch(setReset())
    }

    const saveBestScore = () =>{
        if(!localStorage.getItem('findate-bestScore')){
            localStorage.setItem('findate-bestScore',score)
        }else if (localStorage.getItem('findate-bestScore') < score){
            localStorage.setItem('findate-bestScore',score)
        }
    }

    return (
        playing ? 
            index < 5 ?
            <div className='player-container-findate'>
                { ImageIndexs.length > 0 ? 
                <div>
                    <h1>{displayOnePhotoName()}</h1>
                    <img className='img-findate' src={`/LePetitGameLab/assets/historicalPhotos/${displayOnePhotoImage()}`} alt='img' /> 
                </div>
                :
                <div>Chargement des données ...</div>
                }

                <form  onSubmit={handleSubmit}>
                    <input type="range" id="yearInput" 
                    min="1800" max="2023" step="1" 
                    value={date} onChange={(e) => setDate(e.target.value)}/>
                    <div className='date-submit'>{date}</div>
                    <button className='button-style-ONE' type='submit'>ENVOYER</button>
                </form>
                </div>
                :
                <div>
                    {saveBestScore()}
                    {console.log(score)}
                    {score > 200 ? `Ton score est de ${score}, félicitations!` :  `Ton score est de ${score}, tu peux mieux faire!` }
                    <div>Ton meilleur score est de {localStorage.getItem('findate-bestScore')}</div>
                    {results.map((element,index) =>
                        <div key={index}>
                            <img className='img-findate' src={`/LePetitGameLab/assets/historicalPhotos/${element.image}`} alt='' />
                            <div className='real-date-result'>Real date : {element.date}</div>
                            <div className='guess-date-result'>Your guessed date : {element.guess}</div>
                            <div className='score-added-result'>Score earned : {element.scoretoAdd}</div>
                        </div>
                    )}
                    <div><button onClick={() => resetAll()}>REJOUER</button></div>
                    
                </div>
            :
            <div className='player-container-findate'>
                <p className='width'> 
Bienvenue dans "FinDate"! 📅 Un défi en cinq images où votre mission est de marier chaque visuel avec sa date correspondante. À la fin de chaque partie, votre score s'affiche. Trouvez les bonnes dates, faites-le à votre rythme, et visez le meilleur score! Prêt à jouer? 🚀📆</p>
                <button className='button-style-ONE' onClick={() => dispatch(setPlaying())}>PLAY</button>
            </div> 
    ) 
}