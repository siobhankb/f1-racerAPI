console.log('yo');

// standingTable
// ^^ id for div to put table of info

// API address
// http[s]://ergast.com/api/f1/<season>/<round>/...
// position, (time), points, driver name, -->driver nationality<--, and constructor name


// get season input, add to url
// get round info, add to url
// get info from 
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
    //let driverInfo = await getDriverInfo(driver);
    // console.log(raceInfo);
    // console.log(driverInfo);
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
      raceAPIurl = `http://ergast.com/api/f1/${seasonYear}/${roundNum}/results`;
      console.log(raceAPIurl);
    try {
      let race_response = await fetch(raceAPIurl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not OK");
          }
          return response.blob();
        })
        .catch((error) => {
          console.error(
            "There has been a problem with your fetch operation:",
            error
          );
        });
        console.log()
        let race_data = await race_response.json();
        console.log(race_data);

      return race_data;
    } catch (err) {
      console.log(err);
    }
  }

  // async function getDriverInfo(seasonYear, roundNum) {
  //   try {
  //     let driver_response = await fetch(`http://ergast.com/api/f1/drivers`);
  //     let driver_data = await driver_response.json();
  //     return driver_data;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  function buildRaceInfoCard(raceInfoObj) {
    //create card div
    const card = document.createElement("div");
    card.className = "card";

    //create card body
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const raceTitle = document.createElement("h5");
    raceTitle.className = "card-title";
    raceTitle.innerHTML = raceInfoObj;

    //Append title to card body
      cardBody.append(raceTitle);
      
    //Add card body to card div
    card.append(cardBody);

    //create column for the row
    const col = document.createElement("div");
    col.className = "col-12 col-md-10 col-lg-8";

    //add card to body
    col.append(card);

    //create card body
    const raceDisplay = document.getElementById("standingTable");

    // add the new column to our display
    raceDisplay.append(col);
  }
}
