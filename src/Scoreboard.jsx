import { useState } from 'react';

function Scoreboard({score, best}) {
    return (
      <>
        <div>BestScore: {best}</div>
        <div>Current Score: {score}</div>
      </>
    )
}
  
export default Scoreboard