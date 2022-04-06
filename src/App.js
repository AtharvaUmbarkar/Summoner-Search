import './css/App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from 'react';

import Navbar from './components/Navbar';
import Home from './components/home/Home';
import MainStats from './components/main-stats/MainStats'
import MatchHistory from './components/match-history/MatchHistory'
import Alert from './components/Alert'
import LoadingBar from 'react-top-loading-bar'
import SummonerState from './context/summoner/SummonerState'

function App() {

  const [alert, setAlert] = useState(null);
  const [progress, setProgress] = useState(0)

  const setLoadingProgress = (i) => {
    setProgress(i);
  }

  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  return (
    <>
      <BrowserRouter>
        <SummonerState>
          <LoadingBar
            color='#7aa2f7'
            height={3}
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
          />
          <div className="nav-wrapper">
            <Navbar />
          </div>
          <div className="alert-wrapper">
            <Alert alert={alert} />
            <Routes>
              <Route exact path="/" element={<Navigate replace to="/home" />} />
              <Route exact path="/home" element={<Home showAlert={showAlert} setLoadingProgress={setLoadingProgress} />} />
              <Route exact path="/main_stats" element={<MainStats />} />
              <Route exact path="/match_history" element={<MatchHistory />} />
              {/* <Route exact path="/about" element={<About />} /> */}
            </Routes>
          </div>
        </SummonerState>
      </BrowserRouter>
    </>
  );
}

export default App;
