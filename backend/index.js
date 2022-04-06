const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Available Routes
app.use("/api/stats", require("./routes/stats"));

app.get("/", (req, res) => {
    res.send("Summoner Search Backend");
})

app.listen(port, () => {
    console.log(`Summoner-Search app listening at https://localhost:${port}`);
})