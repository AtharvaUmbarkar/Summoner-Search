import { React, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import '../../css/Home.css'
import SearchIcon from '@mui/icons-material/Search';

import SummonerContext from '../../context/summoner/SummonerContext';

const Home = (props) => {
  document.body.style.height = "100%";
  const navigate = useNavigate();
  const { fetchSummonerInfo, fetchMatchHistory } = useContext(SummonerContext);
  const [summonerName, setSummonerName] = useState("");

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (summonerName) {
      props.setLoadingProgress(20);
      console.log("Submitted Name: " + summonerName);
      const resp1 = fetchSummonerInfo(summonerName);
      const resp2 = fetchMatchHistory(summonerName);
      const resp = await Promise.all([resp1, resp2]);
      props.setLoadingProgress(100);
      const infoResp = resp[0];
      const matchResp = resp[1];

      setSummonerName("");
      if (infoResp.success && matchResp.success) {
        navigate('/main_stats');
      }
      else {
        props.showAlert("Summoner not found", "error");
        console.log(infoResp);
      }
    }
    else {
      props.showAlert("Enter a summoner name", "warning");
    }
  }

  const handleOnChange = (e) => {
    setSummonerName(e.target.value);
  }

  return (
    <div className='home home-flex'>
      <section className='home-desc1'>
        Explore and analyze summoner profiles to get an edge in the competition.
      </section>
      <section className="home-desc2">
        Enter summoner name to begin:
      </section>
      <section className='home-query'>
        <form action="post" className='home-form' onSubmit={handleOnSubmit}>
          <input type="text" /* placeholder="eg.'Atum20'" */ name="summoner-name" className="summoner-name" value={summonerName} onChange={handleOnChange} />
          <button type="submit" value="submit" className="summoner-submit" >
            <SearchIcon className='home-search-icon' sx={{ color: 'white' }} />
          </button>
        </form>
      </section>
    </div>
  )
}

export default Home