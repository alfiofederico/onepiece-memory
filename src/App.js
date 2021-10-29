import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';
import Molal from './components/Molal'

const cardImages = [
  { src: "/img/luffy.jpg", matched: false },
  { src: "/img/zoro.jpg", matched: false },
  { src: "/img/usopp.jpg", matched: false }, 
  { src: "/img/brook.jpg", matched: false },
  { src: "/img/chopper_0.jpg", matched: false },
  { src: "/img/franky.jpg", matched: false },
  { src: "/img/nami.jpg", matched: false },
  { src: "/img/sanji.jpg", matched: false },
  { src: "/img/robin.jpg", matched: false },
];



function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [matches, setMatches] = useState(0)

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

      setChoiceOne(null)
      setChoiceTwo(null)
      setCards(shuffledCards)
      setTurns(0)
      setMatches(0)
  }

  /* handle choices */

  const handleChoice = (card) => {
    if (choiceOne && choiceOne.id !== card.id) {
      setChoiceTwo(card);
    } else {
      setChoiceOne(card);
    }
  };

/*   compare cards */

  useEffect(() => {
   
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              setMatches(matches + 1)
              return {...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        
       setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo, matches])

/*   reset & add turn */

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setMatches(0)
    setDisabled(false)
  }

  return (
    <div className="App">
      <h1>
        <span className="animate__animated animate__bounce"> One Piece</span> Memory Game
      </h1>
      <button onClick={shuffleCards}>New Game</button>
    {matches  === cardImages.length ? <Molal turns={turns} /> : (
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
          
        ))}
        <p>Turn: <span className="red">{turns}</span></p>
      </div>)}
     
    {/*   <p>
        Turn: <span className="red">{turns}</span>
      </p> */}
    </div> 
  );
}

export default App;
