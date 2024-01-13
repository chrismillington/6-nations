let teams = [];
const tableBox = document.querySelector("#tableBox");

teamCreation();
displayTable(tableBox);
fixtureScheduler();

// Team Creation Form

function teamCreation() {
  setup();
  const teamEntryForm = document.querySelector(".team-entry");
  const teamsEntered = document.querySelector("#teamsEntered");
  teamsEntered.innerHTML = getTeamNames();
  teamEntryForm.createTeams.addEventListener("click", (e) => {
    e.preventDefault();
    createTeam(teamEntryForm.teamName.value);
    teamsEntered.innerHTML = getTeamNames();
  });

  function createTeam(teamName) {
    //Creates named team object and adds to teams
    if (teamName != "") {
      let temp = new Object();
      temp.team = teamName;
      temp.played = 0;
      temp.won = 0;
      temp.drawn = 0;
      temp.lost = 0;
      temp.scored = 0;
      temp.against = 0;
      temp.points = 0;
      teams.push(temp);
    } else {
      console.log("Nothing to Enter");
    }
  }

  function getTeamNames() {
    // returns list of all team names
    let teamNames = [];
    for (x = 0; x < teams.length; x++) {
      teamNames.push(teams[x].team);
    }
    return teamNames;
  }

  function setup() {
    createTeam("England");
    createTeam("Scotland");
    createTeam("Wales");
    createTeam("Ireland");
    createTeam("France");
    createTeam("Italy");
  }
}

function displayTable(location) {
  let table = document.createElement("table");

  //Create Table Header
  let headings = ["Teams", "Pl", "W", "D", "L", "F", "A", "Pts"];
  let header = table.createTHead();
  for (i = 0; i < headings.length; i++) {
    header
      .appendChild(document.createElement("th"))
      .appendChild(document.createTextNode(headings[i]));
  }
  table.appendChild(header);

  // Create Table Body
  let body = document.createElement("tbody");
  for (x = 0; x < teams.length; x++) {
    let teamDetails = Object.values(teams[x]);

    let row = document.createElement("tr");
    for (y = 0; y < teamDetails.length; y++) {
      row
        .appendChild(document.createElement("TD"))
        .appendChild(document.createTextNode(teamDetails[y]));
    }
    body.appendChild(row);
  }

  // Add table and display at specified location
  table.appendChild(body);
  location.appendChild(table);
}

function fixtureScheduler() {
  let schedule = [];

  scheduler();

  function teamList() {
    // returns list of all team names
    let teamNames = [];
    for (x = 0; x < teams.length; x++) {
      teamNames.push(teams[x].team);
    }
    return teamNames;
  }

  function scheduler() {
    scheduleList = teamList();
    for (y = 0; y < scheduleList.length - 1; y++) {
      let temp = scheduleList[1];
      for (x = 1; x < scheduleList.length; x++) {
        scheduleList[x] = scheduleList[x + 1];
      }
      scheduleList[scheduleList.length - 1] = temp;
      for (a = 0; a < scheduleList.length; a += 2) {
        let temp = new Object();
        temp.homeTeam = scheduleList[a];
        temp.homeScore = -1;
        temp.awayTeam = scheduleList[a + 1];
        temp.awayScore = -1;
        schedule.push(temp);
      }
    }
    displaySchedule();
  }
  function displaySchedule() {
    console.log("displaying schedule");
    let board = document.querySelector("#matches");

    let week = 1;
    for (i = 0; i < schedule.length; i++) {
      if (i % (teams.length / 2) === 0) {
        let tempWeek = document.createElement("div");
        tempWeek.classList.add("week");
        tempWeek.innerHTML = `Week ${week}`;
        board.appendChild(tempWeek);
        week++;
      }
      let fixture = document.createElement("div");
      fixture.classList.add("fixture");
      fixture.innerHTML = `${schedule[i].homeTeam}   <input type="number" value=${schedule[1].homeScore}> Vs   <input type="number" value=${schedule[1].awayScore}> ${schedule[i].awayTeam}`;
      board.appendChild(fixture);
    }
    scoreProcess();
  }

  function scoreProcess() {
    let fixtures = document.querySelectorAll(".fixture input");
    console.log(fixtures);
    let home1 = fixtures[x].parentElement;
    console.log("homeTeam - " + home1.fixture);
  }
}
// function scheduleDisplay(list, round) {
//   schedule.innerHTML += `<br> Week ${round + 1} <br>`;
//   for (x = 0; x < list.length; x += 2) {
//     schedule.innerHTML += list[x] + " Vs " + list[x + 1] + "<br>";
//   }
// }

// for (const key in user) {

///  return `<tr><td>${tm.team}</td><td>${tm.played}</td><td>${tm.won}</td><td>${tm.drawn}</td><td>${tm.lost}</td><td>${tm.for}</td><td>${tm.against}</td><td>${tm.points}</td></tr>`;

// //Code
// button.addEventListener("click", result);

// // Functions

// toTable();
// scoreEntry("#homeTeam");
// scoreEntry("#awayTeam");
// scheduler();

// function toTable() {
//   let header =
//     "<table><th>Team</th><th id='num'>Pl</th><th>Won</th><th>Drawn</th><th>Lost</th><th>For</th><th>Ag</th><th>Points</th>";
//   table.innerHTML =
//     header +
//     teams
//       .map((teams) => {
//         return `<tr><td>${nations.team}</td><td>${nations.played}</td><td>${nations.won}</td><td>${nations.drawn}</td><td>${nations.lost}</td><td>${nations.for}</td><td>${nations.against}</td><td>${nations.points}</td></tr>`;
//       })
//       .join() +
//     "</table>";
// }

// function scoreEntry(side) {
//   for (i = 0; i < teams.length; i++) {
//     let opt = document.createElement("option");
//     opt.innerText = teams[i].team;
//     document.querySelector(side).appendChild(opt);
//   }
// }

// function homeAway(teamList) {
//   let positions = [];
//   for (x = 0; x < teams.length; x++) {
//     if (teams[x].team === homeTeam.value) {
//       positions.push(x);
//     }
//     if (teams[x].team === awayTeam.value) {
//       positions.push(x);
//     }
//   }
//   return positions;
// }
// function result(e) {
//   e.preventDefault();
//   //Select teams
//   let positions = homeAway(teams);
//   let hm = positions[0];
//   let aw = positions[1];

//   (teams[hm].for += parseInt(homeScore.value)),
//     (teams[hm].against += parseInt(awayScore.value));
//   teams[aw].for += parseInt(awayScore.value);
//   teams[aw].against += parseInt(homeScore.value);

//   if (homeScore.value > awayScore.value) {
//     teams[hm].won += 1;
//     teams[aw].lost += 1;
//     teams[hm].points += 3;
//   } else if (awayScore.value > homeScore.value) {
//     teams[aw].won += 1;
//     teams[hm].lost += 1;
//     teams[aw].points += 3;
//   } else {
//     teams[hm].drawn += 1;
//     teams[aw].drawn += 1;
//     teams[hm].points += 1;
//     teams[aw].points += 1;
//   }
//   teams[hm].played = parseInt(teams[hm].won) + teams[hm].drawn + teams[hm].lost;
//   teams[aw].played = parseInt(teams[aw].won) + teams[aw].drawn + teams[aw].lost;

//   teams = teamsSort(teams);
//   toTable();
// }

// function teamsSort(toSort) {
//   toSort.sort((a, b) => {
//     if (a.points > b.points) return -1;
//     if (a.points < b.points) return 1;
//     if (a.for > b.for) return -1;
//     if (a.for < b.for) return 1;
//   });
//   return toSort;
// }

// function check(val, reset) {
//   return val > teams.length ? (val = reset) : (val = val);
// }

// function getTeamsList() {
//   let scheduleList = [];
//   for (x = 0; x < teams.length; x++) {
//     scheduleList.push(teams[x].team);
//   }
//   return scheduleList;
// }

// function scheduler() {
//   scheduleList = getTeamsList();

//   for (y = 0; y < scheduleList.length - 1; y++) {
//     let temp = scheduleList[1];
//     for (x = 1; x < scheduleList.length; x++) {
//       scheduleList[x] = scheduleList[x + 1];
//     }
//     scheduleList[scheduleList.length - 1] = temp;
//     scheduleDisplay(scheduleList, y);
//   }
// }

// function scheduleDisplay(list, round) {
//   schedule.innerHTML += `<br> Week ${round + 1} <br>`;
//   for (x = 0; x < list.length; x += 2) {
//     schedule.innerHTML += list[x] + " Vs " + list[x + 1] + "<br>";
//   }
//
