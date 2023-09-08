import { useState } from 'react';
import Scoreboard from './Scoreboard.jsx';
// import Card from './Card.jsx';

function Card(props)
{
  const id=props.id;
  return (
    <><button onClick={handleScore}>{id}</button></>
  )
}

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [cards, setCards] = useState([]);
  function handleScore() {
    setScore(score+1);
    setBestScore(Math.max(bestScore,score));
  }
  function shuffleCards () {
    let arr = [];
    for (let i = 0; i < cards.length; i++)
    {
      let arr = [];
    }
  }
  function Cards ()
  {
    let arr = [];
    for (let i = 0; i < 10; i++)
    {
      arr.push({id:i, card:Card(id=i)});
    }
    setCards(arr);
  }
  return (
    <>
    {<Scoreboard score={score} best={bestScore}/>}
    <ul>{cards.map((id, card)=> <li key={id}>{card}</li>)}</ul>;
    </>
  )
}

export default App