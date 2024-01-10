// Variables
let table = document.querySelector(".table");
let scoreBoard = document.querySelector(".scoreBoard");
let homeTeam = document.querySelector("#homeTeam");
let homeScore = document.querySelector("#homeScore");
let awayTeam = document.querySelector("#awayTeam");
let awayScore = document.querySelector("#awayScore");
let button = document.querySelector("button");
let schedule = document.querySelector(".schedule");
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

//Code
button.addEventListener("click", result);

// Functions

toTable();
scoreEntry("#homeTeam");
scoreEntry("#awayTeam");
scheduler();

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

function homeAway(teamList) {
  let positions = [];
  for (x = 0; x < teams.length; x++) {
    if (teams[x].team === homeTeam.value) {
      positions.push(x);
    }
    if (teams[x].team === awayTeam.value) {
      positions.push(x);
    }
  }
  return positions;
}
function result(e) {
  e.preventDefault();
  //Select teams
  let positions = homeAway(teams);
  let hm = positions[0];
  let aw = positions[1];

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

  teams = teamsSort(teams);
  toTable();
}

function teamsSort(toSort) {
  toSort.sort((a, b) => {
    if (a.points > b.points) return -1;
    if (a.points < b.points) return 1;
    if (a.for > b.for) return -1;
    if (a.for < b.for) return 1;
  });
  return toSort;
}

function check(val, reset) {
  return val > teams.length ? (val = reset) : (val = val);
}

function getTeamsList() {
  let scheduleList = [];
  for (x = 0; x < teams.length; x++) {
    scheduleList.push(teams[x].team);
  }
  return scheduleList;
}

function scheduler() {
  scheduleList = getTeamsList();

  for (y = 0; y < scheduleList.length - 1; y++) {
    let temp = scheduleList[1];
    for (x = 1; x < scheduleList.length; x++) {
      scheduleList[x] = scheduleList[x + 1];
    }
    scheduleList[scheduleList.length - 1] = temp;
    scheduleDisplay(scheduleList, y);
  }
}

function scheduleDisplay(list, round) {
  schedule.innerHTML += `<br> Week ${round + 1} <br>`;
  for (x = 0; x < list.length; x += 2) {
    schedule.innerHTML += list[x] + " Vs " + list[x + 1] + "<br>";
  }
}
