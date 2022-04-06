/* eslint-disable no-unused-vars */
import React from "react";
import SummonerContext from './SummonerContext'
import { useState } from "react";
import { set } from "lodash";

// const Lodash = require('lodash');

const SummonerState = (props) => {
    const host = process.env.REACT_APP_BACKEND_HOST;

    const [summonerName, setSummonerName] = useState('');
    const [summonerStats, setSummonerStats] = useState({});
    const [matchHistory, setMatchHistory] = useState([])

    //* Get basic summoner info
    const fetchSummonerInfo = async (name) => {
        const summonerInfoUrl = host + '/api/stats/get_summoner_data';
        try {
            const response = await fetch(summonerInfoUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                })
            });

            const json = await response.json();
            if (json.success) {
                setSummonerName(json.summonerName);
                setSummonerStats({
                    masteryList: json.masteryList,
                    rankedData: json.rankedData,
                    profileIconId: json.profileIconId,
                    summonerLevel: json.summonerLevel,
                })
                return { success: json.success };
            }
            else {
                return { success: json.success, error: json.error.status.message };
            }
        }
        catch (error) {
            return error;
        }
    }

    const fetchMatchHistory = async (name) => {
        const matchHistoryUrl = host + '/api/stats/get_match_history';
        try {
            const response = await fetch(matchHistoryUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                })
            });

            const json = await response.json();
            if (json.success) {
                const matchDataList = [];
                if (!json.matchList.length === 0) {
                    return { success: json.success };
                }
                for (const idx in json.matchList) {
                    let summonerMatchData = await json.matchList[idx].info.participants.filter((participant) => {
                        return participant.summonerName === json.summonerName;
                    });

                    const win = summonerMatchData[0].win;
                    const kills = summonerMatchData[0].kills;
                    const deaths = summonerMatchData[0].deaths;
                    const assists = summonerMatchData[0].assists;
                    const champId = summonerMatchData[0].championId;
                    const champName = summonerMatchData[0].championName;
                    const champLevel = summonerMatchData[0].champLevel;
                    const cs = summonerMatchData[0].neutralMinionsKilled + summonerMatchData[0].totalMinionsKilled;
                    const goldEarned = summonerMatchData[0].goldEarned;
                    const items = [
                        summonerMatchData[0].item0,
                        summonerMatchData[0].item1,
                        summonerMatchData[0].item2,
                        summonerMatchData[0].item3,
                        summonerMatchData[0].item4,
                        summonerMatchData[0].item5,
                        summonerMatchData[0].item6,
                    ];
                    const matchId = json.matchList[idx].metadata.matchId;
                    const gameStartTime = json.matchList[idx].info.gameStartTimestamp;
                    const duration = json.matchList[idx].info.gameDuration;
                    const type = json.matchList[idx].info.gameMode;
                    const team1 = [];
                    const team2 = [];
                    for (const i in json.matchList[idx].info.participants) {
                        if (json.matchList[idx].info.participants[i].teamId === 100) {
                            team1.push({
                                champId: json.matchList[idx].info.participants[i].championId,
                                champName: json.matchList[idx].info.participants[i].championName,
                                summonerName: json.matchList[idx].info.participants[i].summonerName,
                                teamId: json.matchList[idx].info.participants[i].teamId,
                                win: json.matchList[idx].info.participants[i].win,
                            });
                        }
                        else {
                            team2.push({
                                champId: json.matchList[idx].info.participants[i].championId,
                                champName: json.matchList[idx].info.participants[i].championName,
                                summonerName: json.matchList[idx].info.participants[i].summonerName,
                                teamId: json.matchList[idx].info.participants[i].teamId,
                                win: json.matchList[idx].info.participants[i].win,
                            });
                        }
                    }
                    const matchData = {
                        win,
                        kills,
                        deaths,
                        assists,
                        champId,
                        champName,
                        champLevel,
                        cs,
                        goldEarned,
                        items,
                        matchId,
                        gameStartTime,
                        duration,
                        type,
                        team1,
                        team2,
                    }
                    matchDataList.push(matchData);
                }
                setMatchHistory(matchDataList);
                return { success: json.success };
            }
            else {
                return { success: json.success, error: json.error.status.message };
            }

        }
        catch (error) {
            return error;
        }
    }

    return (
        <SummonerContext.Provider value={{
            fetchSummonerInfo,
            fetchMatchHistory,
            matchHistory,
            summonerStats,
            summonerName,
            setSummonerName
        }}>
            {props.children}
        </SummonerContext.Provider>
    )
}

export default SummonerState;