import { React, useContext } from 'react'
import SummonerContext from "../../context/summoner/SummonerContext"
import "../../css/Match.css"

const Match = (props) => {
  const ddragon_patch = process.env.REACT_APP_DDRAGON_PATCH;
  const cdragon_patch = process.env.REACT_APP_CDRAGON_PATCH;
  const match = props.match;

  const { summonerName } = useContext(SummonerContext);
  const kda = (match.deaths ? (match.kills + match.assists) / match.deaths : (match.kills + match.assists)).toFixed(2);
  const gameTime = Math.floor(match.duration / 60).toString() + 'm ' + Math.floor(match.duration % 60).toString() + 's';
  const gameType = (match.type !== 'CLASSIC' && match.type !== 'ARAM') ? 'RGM' : (match.type[0].toUpperCase() + match.type.slice(1, match.type.length).toLowerCase());
  const csPerMin = (match.cs / (match.duration / 60)).toFixed(1);

  return (
    <div className={`flex flex-row justify-start items-center px-3 w-full rounded-lg bg-opacity-20 ${match.win ? 'bg-blue-700' : 'bg-red-700'} match`}>
      <div className='flex flex-col mx-2 items-center justify-start match-info'>
        <div className='text-lg leading-5 match-info-type'>{gameType}</div>
        <div className={`text-base ${match.win ? 'text-blue-500' : 'text-red-500'} match-info-result`}>{match.win ? 'Victory' : 'Defeat'}</div>
        <div className='text-sm match-info-time'>{gameTime}</div>
      </div>
      <div className='flex flex-row justify-start items-center match-info-champ-kda-wrapper'>
        <img className='match-main-champ-img m-2 rounded-lg' src={`https://cdn.communitydragon.org/${cdragon_patch}/champion/${match.champId}/tile`} alt="" />
        <div className='w-28 flex flex-col text-clrContent-0 match-kda-wrapper'>
          <div className='flex flex-row font-semibold space-x-1 font-sans text-xl justify-evenly match-kda-stats'>
            <div>{match.kills}</div>
            <div className='text-slate-400'>/</div>
            <div className='text-red-500'>{match.deaths}</div>
            <div className='text-slate-400'>/</div>
            <div>{match.assists}</div>
          </div>
          <div className='flex flex-row space-x-1 font-sans text-base justify-center match-kda-text'>
            <div>KDA:</div>
            <div className={`${kda !== 0 ? (kda > 3 ? (kda > 5 ? 'text-amber-500' : 'text-blue-600') : 'text-clrContent-0') : 'text-red-500'} font-medium`}>{kda}</div>
          </div>
        </div>
        <div className='flex flex-col items-center mx-2 justify-evenly w-28 match-level-wrapper'>
          <div className='text-clrContent-1'>Level:
            <span className='text-clrContent-0'> {match.champLevel}
            </span>
          </div>
          <div>
            <span className='text-clrContent-1'>CS:
              <span className='text-clrContent-0'> {match.cs}
                <span className='text-clrContent-0'> ({csPerMin})
                </span>
              </span>
            </span>
          </div>
          <div className='flex flex-row items-center justify-center'>
            <img className='mx-1.5 match-level-img' src="https://img.icons8.com/ios-filled/15/fbbf24/coins.png" alt="not_found" />
            <span>{match.goldEarned}</span>
          </div>
        </div>
      </div>


      <ul className='mx-2 flex flex-row items-center justify-start my-0.5 match-items'>
        <div className='flex flex-row items-center justify-start'>
          {match.items.slice(0, 3).map((item) => {
            if (item === 0) return (
              <li className='bg-clrBackground-0 ml-0.5 opacity-50 rounded-[0.25rem]'>
                <img className='match-item invisible' src={"https://ddragon.leagueoflegends.com/cdn/12.6.1/img/item/3036.png"} alt="not_found" />
              </li>
            )
            else return (
              <li className='bg-clrBackground-0 ml-0.5 rounded-[0.25rem]'>
                <img className='match-item rounded-[0.25rem]' src={`https://ddragon.leagueoflegends.com/cdn/${ddragon_patch}/img/item/${item}.png`} alt="not_found" />
              </li>
            )
          })}
        </div>
        <div className='flex flex-row items-center justify-start my-0.5'>
          {match.items.slice(3, match.items.length).map((item) => {
            if (item === 0) return (
              <li className='bg-clrBackground-0 ml-0.5 opacity-50 rounded-[0.25rem]'>
                <img className='match-item invisible' src={"https://ddragon.leagueoflegends.com/cdn/12.6.1/img/item/3036.png"} alt="not_found" />
              </li>
            )
            else return (
              <li className='bg-clrBackground-0 ml-0.5 rounded-[0.25rem]'>
                <img className='match-item rounded-[0.25rem]' src={`https://ddragon.leagueoflegends.com/cdn/${ddragon_patch}/img/item/${item}.png`} alt="not_found" />
              </li>
            )
          })}
        </div>
      </ul>

      <div className='flex flex-row mx-2 match-members-wrapper'>
        <div className='flex flex-col m-2 w-40 match-members'>
          {match.team1.map((member) => {
            return (
              <div className={`flex flex-row m-0.5 items-center ${(summonerName === member.summonerName) && 'bg-slate-200 bg-opacity-20 rounded-sm'}`}>
                <img className='rounded-sm mr-1 match-member-img' src={`https://cdn.communitydragon.org/${cdragon_patch}/champion/${member.champId}/tile`} alt="" />
                <div className='match-member-name'>{member.summonerName}</div>
              </div>
            )
          })}
        </div>
        <div className='flex flex-col m-2 w-40 match-members'>
          {match.team2.map((member) => {
            return (
              <div className={`flex flex-row m-0.5 items-center ${(summonerName === member.summonerName) && 'bg-slate-200 bg-opacity-20 rounded-sm'}`}>
                <img className='rounded-sm mr-1 match-member-img' src={`https://cdn.communitydragon.org/${cdragon_patch}/champion/${member.champId}/tile`} alt="" />
                <div className='match-member-name'>{member.summonerName}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Match