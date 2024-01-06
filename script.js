let table = document.querySelector(".table");
let scoreBoard = document.querySelector(".scoreBoard");
let homeTeam = document.querySelector("#homeTeam");
let homeScore = document.querySelector("#homeScore");
let awayTeam = document.querySelector("#awayTeam");
let awayScore = document.querySelector("#awayScore");
let button = document.querySelector("button");

let teams = [
  {
    team: "England",
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    for: 0,
    against: 0,
    points: 0,
  },
  {
    team: "Wales",
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    for: 0,
    against: 0,
    points: 0,
  },
  {
    team: "Scotland",
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    for: 0,
    against: 0,
    points: 0,
  },
  {
    team: "Ireland",
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    for: 0,
    against: 0,
    points: 0,
  },
  {
    team: "France",
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    for: 0,
    against: 0,
    points: 0,
  },
  {
    team: "Italy",
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    for: 0,
    against: 0,
    points: 0,
  },
];

toTable();
scoreEntry("#homeTeam");
scoreEntry("#awayTeam");

button.addEventListener("click", result);
function toTable() {
  let header =
    "<table><th>Team</th><th id='num'>Pl</th><th>Won</th><th>Drawn</th><th>Lost</th><th>For</th><th>Ag</th><th>Points</th>";
  table.innerHTML =
    header +
    teams
      .map((nations) => {
        return `<tr><td>${nations.team}</td><td>${nations.played}</td><td>${nations.won}</td><td>${nations.drawn}</td><td>${nations.lost}</td><td>${nations.for}</td><td>${nations.against}</td><td>${nations.points}</td></tr>`;
      })
      .join() +
    "</table>";
}

function scoreEntry(side) {
  for (i = 0; i < teams.length; i++) {
    let opt = document.createElement("option");
    opt.innerText = teams[i].team;
    document.querySelector(side).appendChild(opt);
  }
}

function result(e) {
  e.preventDefault();
  let hm;
  let aw;

  for (x = 0; x < teams.length; x++) {
    if (teams[x].team === homeTeam.value) {
      hm = x;
    }
    if (teams[x].team === awayTeam.value) {
      aw = x;
    }
  }

  (teams[hm].for += parseInt(homeScore.value)),
    (teams[hm].against += parseInt(awayScore.value));
  teams[aw].for += parseInt(awayScore.value);
  teams[aw].against += parseInt(homeScore.value);

  if (homeScore.value > awayScore.value) {
    teams[hm].won += 1;
    teams[aw].lost += 1;
    teams[hm].points += 3;
  } else if (awayScore.value > homeScore.value) {
    teams[aw].won += 1;
    teams[hm].lost += 1;
    teams[aw].points += 3;
  } else {
    teams[hm].drawn += 1;
    teams[aw].drawn += 1;
    teams[hm].points += 1;
    teams[aw].points += 1;
  }
  teams[hm].played = parseInt(teams[hm].won) + teams[hm].drawn + teams[hm].lost;
  teams[aw].played = parseInt(teams[aw].won) + teams[aw].drawn + teams[aw].lost;

  console.log(
    "Away",
    parseInt(teams[aw].won) + parseInt(teams[aw]) + parseInt(teams[aw])
  );

  teams.sort((a, b) => {
    if (a.points > b.points) return -1;
    if (a.points < b.points) return 1;
    if (a.for > b.for) return -1;
    if (a.for < b.for) return 1;
  });
  console.log(teams);
  toTable();
}
