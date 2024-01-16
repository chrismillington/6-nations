let teams = [];

teamCreation();
displayTable();
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

function displayTable() {
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
  document.querySelector(".tableBox").appendChild(table);
}
console.log(teams);
function fixtureScheduler() {
  console.log("displaying schedule");
  let board = document.querySelector("#matches");
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
        temp.homeScore = 0;
        temp.awayTeam = scheduleList[a + 1];
        temp.awayScore = 0;
        schedule.push(temp);
      }
    }
    displaySchedule();
  }

  function displaySchedule() {
    let week = 1;
    let table = document.querySelector("#matches table");

    for (i = 0; i < schedule.length; i++) {
      if (i % (teams.length / 2) === 0) {
        let tempWeek = document.createElement("tr");
        tempWeek.classList.add("week");
        tempWeek.innerHTML = `Week ${week}`;
        table.appendChild(tempWeek);
        week++;
      }

      let match = document.createElement("tr");
      match.classList.add("fixture");
      match.innerHTML = `
      <td class="homeTeam">${schedule[i].homeTeam}</td>
      <td><input class="homeScore" type="number" value=${schedule[i].homeScore}></td>
      <td><input class="awayScore" type="number" value=${schedule[i].awayScore}></td>
      <td class="awayTeam">${schedule[i].awayTeam}</td>`;
      table.appendChild(match);
    }

    document.querySelector(".process").addEventListener("click", (e) => {
      e.preventDefault();
      let fixtures = document.querySelectorAll(".fixture");

      for (i = 0; i < fixtures.length; i++) {
        let homeT = fixtures[i].querySelector(".homeTeam").textContent;
        let homeS = fixtures[i].querySelector(".homeScore").value;
        let awayT = fixtures[i].querySelector(".awayTeam").textContent;
        let awayS = fixtures[i].querySelector(".awayScore").value;
        // console.log(homeS);
        // console.log(awayS);
        processScores(homeT, homeS, awayS, awayT);
      }
    });
  }

  // Bug with adding
  function processScores(homeTeam, hs, as, awayTeam) {
    homeScore = parseInt(hs);
    awayScore = parseInt(as);
    let homePos = findTeam(homeTeam);
    let awayPos = findTeam(awayTeam);
    console.log("Process Score Loaded" + (homeScore + awayScore));
    if (homeScore != 0 && awayScore != 0) {
      teams[homePos].scored += homeScore;
      teams[homePos].against += awayScore;
      teams[awayPos].scored += awayScore;
      teams[awayPos].against += homeScore;
      console.log(teams);
      if (homeScore > awayScore) {
        teams[homePos].wins += 3;
      } else if (awayScore > homeScore) {
        teams[awayPos].wins += 3;
      } else {
        teams[homePos].drawn += 1;
        teams[awayPos].drawn += 1;
      }
    }
    // displayTable();
  }

  function findTeam(team) {
    for (x = 0; x < teams.length; x++) {
      if (teams[x].team === team) return x;
    }
    return -1;
  }
}
