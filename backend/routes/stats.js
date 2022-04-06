const express = require('express');
const dotenv = require('dotenv');
let LeagueAPI = require('leagueapiwrapper');
const axios = require('axios');
const { Region } = require('leagueapiwrapper/LeagueAPI/classes');

const router = express.Router();
dotenv.config();

const riotApiKey = process.env.RIOT_API_KEY;

LeagueAPI = new LeagueAPI(riotApiKey, Region.EUW);

router.post('/get_summoner_data', async (req, res) => {
    let success = false;
    // let region = "europe";
    let name = req.body.name;

    if (name === undefined || name === '' || name === null) {
        return res.status(400).send({ success, error: "summoner name invalid" });
    }
    try {
        let summoner = await LeagueAPI.getSummonerByName(name);
        let masteryList = await LeagueAPI.getChampionMastery(summoner);
        let rankedData = await axios.get(`https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summoner.id}?api_key=${riotApiKey}`);
        rankedData = rankedData.data;
        let summonerName = summoner.name;
        let profileIconId = summoner.profileIconId;
        let summonerLevel = summoner.summonerLevel;

        success = true;
        res.status(200).send({ success, masteryList, rankedData, summonerName, profileIconId, summonerLevel });
    }
    catch (error) {
        // console.error(error);
        res.status(400).send({ success, error });
    }
});

router.post('/get_match_history', async (req, res) => {
    let success = false;
    let region = "europe";
    let start = 0;
    let count = 20;
    let name = req.body.name;

    if (name === undefined || name === '' || name === null) {
        return res.status(400).send({ success, error: "summoner name invalid" });
    }

    try {
        let summoner = await LeagueAPI.getSummonerByName(name);
        let summonerName = summoner.name;
        let matchIdList = await axios.get(`https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${summoner.puuid}/ids?start=${start}&count=${count}&api_key=${riotApiKey}`);
        matchIdList = matchIdList.data;

        let matchList = [];
        let matchErrors = [];
        let matchPromises = [];

        for (let idx in matchIdList) {
            try {
                let matchRequest = axios.get(`https://${region}.api.riotgames.com/lol/match/v5/matches/${matchIdList[idx]}?api_key=${riotApiKey}`);
                matchPromises.push(matchRequest);
            }
            catch (error) {
                matchErrors.push(error);
            }
        }

        try {
            let matchResult = await Promise.all(matchPromises);
            for (let idx in matchResult) {
                matchList.push(matchResult[idx].data);
            }
        } catch (error) {
            return res.status(400).send({ success, error });
        }
        success = true;
        // console.log(matchList[count - 1]);
        res.status(200).send({ success, matchList, summonerName });
    }
    catch (error) {
        // console.error(error);
        res.status(400).send({ success, error });
    }
});



module.exports = router;