module.exports = {
  content: ['*', "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        clrContent: {
          0: "#c0caf5",
          1: "#a9b1d6",
          2: "#79828f",
          3: "#7aa2f7",
          4: "#2ac1de",
          5: "#73daca",
          6: "#9ece6a",
          7: "#e0af68",
          8: "#ff9e64",
          9: "#f77684",
          10: "#f75e60",
        },
        clrBackground: {
          0: "#24283b",
          1: "#1f2335",
          2: "#2a2f45",
        },
        clrRank: {
          "unranked": "#c0caf5",
          "iron": "#8D8B8B",
          "bronze": "#BF9062",
          "silver": "#849DA6",
          "gold": "#E5B55B",
          "platinum": "#3D7877",
          "diamond": "#886CE2",
          "master": "#8E5EB1",
          "grandmaster": "#DD1310",
          "challenger": "#1CA5FC",
        },
        clrWin: "#7aa2f7",
        clrLose: "#f77684",
      }
    },
  },
  plugins: [],
}
