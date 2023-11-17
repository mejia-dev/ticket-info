import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import TicketMaster from './services/TicketMaster.js';
import Giphy from './services/Giphy-services.js';

//Business Logic

// async function getTixData(query) {
//   const response = await TicketMaster.getEvent(query);
//   if (response["_embedded"]) {
//     printTixEvents(response, query);
//   } else {
//     printError(response, query);
//   }
// }

async function getTixData(query) {
  const response = await TicketMaster.getEvents(query);
  if (response["_embedded"] && (response.page.totalElements > 0)) {
    const gifQuery = response["_embedded"].events[0].name;
    printTixEvents(response, query);
    getGiphyData(gifQuery.substring(0,49));
  } else if (response.page && (response.page.totalElements === 0)) {
    console.log(response.page)
    printError("No results found",query);
  } else {
    console.log(response);
    printError(response, query);
  }
}

if (weatherResponse instanceof Error) {
  // do something with error
}

async function getGiphyData(searchTerm) {
  const responseGif = await Giphy.getGif(searchTerm);
  if (responseGif.data) {
    printGif(responseGif);
  } 
  else {
    printError("Can't locate GIF for this search", searchTerm);
  }
}

// UI Logic

function printTixEvents(response, query) {
  let newAnchor = document.createElement('a');
  let newImg = document.createElement('img');
  let displayImg = response['_embedded'].events[0].images[0].url;
  newImg.setAttribute("width", "50%");
  newImg.setAttribute("height", "auto");
  document.querySelector('#showResponse').innerText = `The query for ${query} results in the following events:
  Event: ${response["_embedded"].events[0].name}
  Date: ${response['_embedded'].events[0].dates.start.localDate}
  venue: ${response['_embedded'].events[0]["_embedded"].venues[0].name}
  `;
  newAnchor.innerHTML = `<a href="${response['_embedded'].events[0].url}">${response['_embedded'].events[0].url}</a><br>`;
  document.querySelector('#outputDiv').appendChild(newAnchor);
  newImg.setAttribute("src", displayImg);
  document.querySelector('#outputDiv').appendChild(newImg);
}

function printGif(inputData) {
  let newGif = document.createElement("img");
  newGif.src = inputData.data[0].images.downsized.url;
  newGif.alt = inputData.data[0].title;
  document.getElementById("outputDiv").append(newGif);
}

function printError(error, query) {
  document.getElementById('showResponse').innerText = null;
  document.getElementById('showResponse').innerText = `An error occurred getting data for ${query}: ${error}`;
}

function handleTicketForm() {
  event.preventDefault();
  const input = document.getElementById("text-input").value;
  getTixData(input);
}

window.addEventListener("load", function() {
  document.getElementById("ticket-form").addEventListener("submit", handleTicketForm);
});