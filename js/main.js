console.log('yo');

// standingTable
// ^^ id for div to put table of info

// API address
// http[s]://ergast.com/api/f1/<season>/<round>/...
// position, (time), points, driver name, -->driver nationality<--, and constructor name

{
  // get form
  let form = document.getElementById("raceInputForm");

  // get info from input, <form name="season">
  // handleEvent --> first set function for click
  async function handleSubmit(event) {
    event.preventDefault();
    let seasonInput = event.target.season.value;
    let roundInput = event.target.round.value;
    let raceInfo = await getRaceInfo(seasonInput, roundInput);
    // get HTML card-builder function from other JS module:
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
     // Season: jsonObj[‘season’]
     // Round:  jsonObj[‘round’]
     const cardTitle = document.createElement("h4");
     let seasonYear = raceInfoObj["season"];
     let roundNum = raceInfoObj["round"];
     cardTitle.className = "card-title";
     cardTitle.innerHTML = `Results for Round ${roundNum} of the ${seasonYear} Season:`;

     //create card body
     const cardBody = document.createElement("div");
     cardBody.className = "card-body";

     // create header for race results table
     const rowHeader = document.createElement("ul");
     rowHeader.className = "list-group list-group-horizontal";
     cardBody.append(rowHeader);
     const positionHead = document.createElement("li");
     positionHead.className = "list-group-item fs-lg fw-bold";
     positionHead.innerHTML = "Position:";
     cardBody.append(positionHead);
     const driverHead = document.createElement("li");
     driverHead.className = "list-group-item fs-lg fw-bold";
     driverHead.innerHTML = "Driver:";
     cardBody.append(driverHead);
     const nationHead = document.createElement("li");
     nationHead.className = "list-group-item fs-lg fw-bold";
     nationHead.innerHTML = "Nationality:";
     cardBody.append(nationHead);
     const constructorHead = document.createElement("li");
     constructorHead.className = "list-group-item fs-lg fw-bold";
     constructorHead.innerHTML = "Constructor:";
     cardBody.append(constructorHead);
     const pointsHead = document.createElement("li");
     pointsHead.className = "list-group-item fs-lg fw-bold";
     pointsHead.innerHTML = "Points:";
     cardBody.append(pointsHead);

     // Position: jsonObj[‘DriverStandings’][index][‘position’]
     // Driver first name: jsonObj[‘DriverStandings’][index][‘Driver’][‘givenName’]
     // Driver last name: jsonObj[‘DriverStandings’][index][‘Driver’][‘familyName’]
     // Driver nationality: jsonObj[‘DriverStandings’][index][‘Driver’][‘nationality’]
     // Constructor:jsonObj[‘DriverStandings’][index][‘Constructors’][0][‘name’]
     // Points:jsonObj[‘DriverStandings’][index][‘points’]

     for (i = 0; i <= 10; i++) {
       const driverResult = document.createElement("ul");
       driverResult.className = "list-group list-group-horizontal";
       cardBody.append(driverResult);
       const position = document.createElement("li");
       position.className = "list-group-item";
       position.innerHTML = raceInfoObj["DriverStandings"][i]["position"];
       cardBody.append(position);
       const driverName = document.createElement("li");
       driverName.className = "list-group-item";
       let driverFirst =
         raceInfoObj["DriverStandings"][i]["Driver"]["givenName"];
       let driverLast =
         raceInfoObj["DriverStandings"][i]["Driver"]["familyName"];
       driverName.innerHTML = `${driverFirst} ${driverLast}`;
       raceInfoObj["DriverStandings"][i]["Driver"]["givenName"];
       cardBody.append(driverName);
       const driverNation = document.createElement("li");
       driverNation.className = "list-group-item";
       driverNation.innerHTML =
         raceInfoObj["DriverStandings"][i]["Driver"]["nationality"];
       cardBody.append(driverNation);
       const constructor = document.createElement("li");
       constructor.className = "list-group-item";
       constructor.innerHTML =
         raceInfoObj["DriverStandings"][i]["Constructors"][0]["name"];
       cardBody.append(constructor);
       const points = document.createElement("li");
       points.className = "list-group-item";
       points.innerHTML = raceInfoObj["DriverStandings"][i]["points"];
       cardBody.append(points);
     }

     //Append title to card body
     cardBody.append(cardTitle);

     //Add card body to card div
     card.append(cardBody);

     //create card body
     const raceDisplay = document.getElementById("standingTable");

     // add the new column to our display
     raceDisplay.append(card);
   }
  
}

// function include(filePath) {
//   const scriptTag = document.createElement("script");
//   scriptTag.src = filePath;
//   document.body.appendChild(scriptTag);
// }

// include("./results.js");