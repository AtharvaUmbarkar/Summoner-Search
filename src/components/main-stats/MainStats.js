/* eslint-disable no-unused-vars */
import { isEmpty } from 'lodash';
import { React, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import '../../css/MainStats.css'
import { rankedColors } from '../../constants';

import ProfileChampmastery from './ProfileChampmastery';
import SummonerContext from '../../context/summoner/SummonerContext'

const MainStats = (props) => {
  const cdragon_patch = process.env.REACT_APP_CDRAGON_PATCH;

  const navigate = useNavigate();
  const { summonerStats, summonerName, matchHistory } = useContext(SummonerContext);

  const champMastery = summonerStats.masteryList;
  const rankedData = summonerName ? summonerStats.rankedData[0] : undefined;
  let summonerRank = summonerName && !isEmpty(rankedData) ? rankedData.tier[0].toUpperCase() + rankedData.tier.slice(1, rankedData.tier.length).toLowerCase() : undefined;
  const profileIconId = summonerStats.profileIconId;
  const summonerLevel = summonerStats.summonerLevel;

  const profileIconLink = summonerName ? `https://cdn.communitydragon.org/${cdragon_patch}/profile-icon/${profileIconId}` : undefined;

  useEffect(() => {
    if (!summonerName || isEmpty(summonerStats)) navigate("/home");
  })

  return (
    <>
      {summonerName && <section className='profile-info'>
        <ul className="pr-list">

          <li className="pr-list-item pr-stats">
            <div className='pr-title'>Account Info</div>
            <div className='pr-account-wrapper'>
              <div className="pr-icon-wrapper">
                <img className='pr-icon' src={profileIconLink} alt='not_found' />
              </div>
              <div className="pr-name-level-rank-wrapper">
                <div className='pr-summoner-name'><p>Name: </p><p>{summonerName}</p></div>
                <div className='pr-summoner-level'><p>Level: </p><p>{summonerLevel}</p></div>
                <div className='pr-summoner-rank'><p>Rank: </p><p style={{ color: `${rankedColors[!isEmpty(rankedData) ? summonerRank.toLowerCase() : 'unranked']}` }}>{(summonerName && !isEmpty(rankedData)) ? summonerRank + " " + rankedData.rank : "Unranked"}</p></div>
              </div>
            </div>
          </li>

          <li className="pr-list-item pr-ranked-wrapper">
            <div className='pr-title'>Ranked Stats</div>
            <div className='pr-ranked-emblem-stats-wrapper'>
              <div>
                {isEmpty(rankedData) ?
                  (<img className='pr-ranked-emblem-image' style={{ borderColor: `${rankedColors[!isEmpty(rankedData) ? summonerRank.toLowerCase() : 'unranked']}` }} src='./images/ranked-emblems/Emblem_Unranked.png' alt='not_found1'></img>) :
                  (<img className='pr-ranked-emblem-image' style={{ borderColor: `${rankedColors[!isEmpty(rankedData) ? summonerRank.toLowerCase() : 'unranked']}` }} src={`./images/ranked-emblems/Emblem_${rankedData.tier}.png`} alt='not_found'></img>)}
              </div>
              <div className='pr-ranked-stats'>
                <div className='pr-ranked-stats-item'><p>Tier: </p><p>{(!isEmpty(rankedData)) ? summonerRank : " Unranked"}</p></div>
                <div className='pr-ranked-stats-item' ><p>Division: </p><p>{isEmpty(rankedData) ? '-' : rankedData.rank}</p></div>
                <div className='pr-ranked-stats-item'><p>Total Matches: </p><p>{isEmpty(rankedData) ? '-' : rankedData.wins + rankedData.losses}</p></div>
                <div className='pr-ranked-stats-item'><p>Win %: </p><p>{isEmpty(rankedData) ? '-' : (rankedData.wins * 100 / (rankedData.wins + rankedData.losses)).toFixed(0)}</p></div>
                <div className='pr-ranked-stats-item'><p>Wins: </p><p>{isEmpty(rankedData) ? '-' : rankedData.wins}</p></div>
                <div className='pr-ranked-stats-item'><p>Losses: </p><p>{isEmpty(rankedData) ? '-' : rankedData.losses}</p></div>
                <div className='pr-ranked-stats-item'><p>Division Points: </p><p>{isEmpty(rankedData) ? '-' : rankedData.leaguePoints}</p></div>
              </div>
            </div>
          </li>

          {champMastery && <li className="pr-list-item pr-champs">
            <div className='pr-title'>Most played champions</div>
            {champMastery.slice(0, 4).map((champ) => {
              return <ProfileChampmastery key={champ.championId} champ={champ} />;
            })}
          </li>}

        </ul>
      </section>}
      {/* <section className="ranked-stats">
        Ranked Stats
      </section>
      <section className="champion-mastery">
        Champion Mastery
      </section> */}
    </>
  )
}

export default MainStats