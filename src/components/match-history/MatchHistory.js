import { React, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { isEmpty } from 'lodash';

import SummonerContext from '../../context/summoner/SummonerContext';
import Match from './Match';
import "../../css/MatchHistry.css"

const MatchHistory = () => {
  const navigate = useNavigate();
  const { summonerName, matchHistory } = useContext(SummonerContext);

  useEffect(() => {
    if (!summonerName || isEmpty(matchHistory)) navigate("/home");
  })


  return (
    <div className='match grid place-content-center'>
      <ul className='flex flex-col box-border w-fit p-5 items-center justify-center text-clrContent-0 space-y-2'>
        {matchHistory.map((match, idx) => {
          return <Match key={match.matchId} match={match} />
        })}
      </ul>
    </div>
  )
}

export default MatchHistory