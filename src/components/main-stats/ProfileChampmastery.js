import { React, useEffect, useState } from 'react'
import '../../css/ProfileChampionMastery.css'

const ProfileChampmastery = (props) => {
  const [champName, setChampName] = useState('');

  const fetchChampData = async (id) => {
    const response = await fetch(`https://cdn.communitydragon.org/${cdragon_patch}/champion/${id}/data`);
    const champData = await response.json()
    setChampName(champData.name);
  }

  const cdragon_patch = process.env.REACT_APP_CDRAGON_PATCH;
  const champ = props.champ;
  const champIcon = `https://cdn.communitydragon.org/${cdragon_patch}/champion/${champ.championId}/tile`;

  useEffect(() => {
    const ac = new AbortController();
    fetchChampData(champ.championId, {signal: ac.signal});
    return () => {
      ac.abort();
    }
  })


  return (

    <div className='pr-champs-item'>
      <img className='pr-champ-image' src={champIcon} alt="not_found" />
      <div className='pr-champ-name'>{champName}</div>
      <img className='pr-mastery-image' src={`./images/champion-mastery-emblems/level_${champ.championLevel}.webp`} alt="not_found" />
      <div className='pr-champ-lvl-points-wrapper'>
        <div className='pr-champ-level'><p>Level:</p> <p>{champ.championLevel}</p></div>
        <div className='pr-champ-points'><p>Points:</p> <p>{champ.championPoints}</p></div>
      </div>
    </div>

  )
}

export default ProfileChampmastery
// public\images\champion-mastery-emblems