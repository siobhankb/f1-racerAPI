
{
  // get form
  let form = document.getElementById("raceInputForm");

  // handleEvent --> first set function for click
  async function handleSubmit(event) {
    event.preventDefault();
    let seasonInput = event.target.season.value;
    let roundInput = event.target.round.value;
    let raceInfo = await getRaceInfo(seasonInput, roundInput);
    // get info from input, send to card-builder output
    buildRaceInfoCard(raceInfo);
    event.target.season.value = "";
    event.target.round.value = "";
  }

  //addEventListener
  form.addEventListener("submit", handleSubmit);

  //get API data using inputs
  async function getRaceInfo(seasonYear, roundNum) {
    console.log(`seasonYear is ${seasonYear}`);
    console.log(`roundNum is ${roundNum}`);
    raceAPIurl = `http://ergast.com/api/f1/${seasonYear}/${roundNum}/driverStandings.json`;
    try {
      let race_response = await fetch(raceAPIurl);
      let output = await race_response.json();
      results_list =
        output.MRData.StandingsTable.StandingsLists[0]
      console.log("Output: ", results_list);
      return results_list;
    } catch (err) {
      console.log(err);
    }
    return "test";
  }
   function buildRaceInfoCard(raceInfoObj, raceTitleObj) {
     //create card div
     const card = document.createElement("div");
     card.className = "card";

     // card title
     const cardTitle = document.createElement("h4");
     let seasonYear = raceInfoObj["season"];
     let roundNum = raceInfoObj["round"];
     cardTitle.className = "card-title";
     cardTitle.innerHTML = `Results for Round ${roundNum} of the ${seasonYear} Season:`;
     card.append(cardTitle);

     //create card body
     const cardBody = document.createElement("div");
     cardBody.className = "card-body";
     
     // create results table
     const raceTable = document.createElement('table')
     raceTable.className = 'table'
     cardBody.append(raceTable);
     
     //create header row with static labels
     const raceTableHead = document.createElement('thead')
     raceTable.append(raceTableHead)
     const raceTableHeadRow = document.createElement('tr')
     raceTable.append(raceTableHeadRow)
     const raceTableHeadPos = document.createElement('th')
     raceTableHeadPos.scope = 'col'
     raceTableHeadPos.innerHTML = 'Position:'
     raceTableHeadRow.append(raceTableHeadPos)
     const raceTableHeadDrName = document.createElement('th')
     raceTableHeadDrName.scope = 'col'
     raceTableHeadDrName.innerHTML = 'Driver:'
     raceTableHeadRow.append(raceTableHeadDrName)
     const raceTableHeadDrNat = document.createElement('th')
     raceTableHeadDrNat.scope = 'col'
     raceTableHeadDrNat.innerHTML = 'Nationality:'
     raceTableHeadRow.append(raceTableHeadDrNat)
     const raceTableHeadConstr = document.createElement('th')
     raceTableHeadConstr.scope = 'col'
     raceTableHeadConstr.innerHTML = 'Constructor:'
     raceTableHeadRow.append(raceTableHeadConstr)
     const raceTableHeadPoints = document.createElement('th')
     raceTableHeadPoints.scope = 'col'
     raceTableHeadPoints.innerHTML = 'Points:'
     raceTableHeadRow.append(raceTableHeadPoints)  
       
     const raceTableBody = document.createElement('tbody')
     raceTable.append(raceTableBody);
     
     //loop through data and create table rows for first 10 entries
     for (i = 0; i < 10; i++) {
       const driverResult = document.createElement("tr");
       driverResult.scope = "row";
       raceTable.append(driverResult);
       const position = document.createElement("td");
       position.innerHTML = raceInfoObj["DriverStandings"][i]["position"];
       driverResult.append(position);
       const driverName = document.createElement("td");
       let driverFirst =
         raceInfoObj["DriverStandings"][i]["Driver"]["givenName"];
       let driverLast =
         raceInfoObj["DriverStandings"][i]["Driver"]["familyName"];
       driverName.innerHTML = `${driverFirst} ${driverLast}`;
       driverResult.append(driverName);
       const driverNation = document.createElement("td");
       driverNation.innerHTML =
         raceInfoObj["DriverStandings"][i]["Driver"]["nationality"];
       driverResult.append(driverNation);
       const constructor = document.createElement("td");
       constructor.innerHTML =
         raceInfoObj["DriverStandings"][i]["Constructors"][0]["name"];
       driverResult.append(constructor);
       const points = document.createElement("td");
       points.innerHTML = raceInfoObj["DriverStandings"][i]["points"];
       driverResult.append(points);
     } 

     //Add card body to card div
     card.append(cardBody);

     //get section to add results info
     const raceDisplay = document.getElementById("standingTable");

     // add the race results card to the display
     raceDisplay.append(card);
   }
  
}
