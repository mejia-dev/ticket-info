import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import TicketMaster from './services/TicketMaster.js';
import Giphy from './services/Giphy-services.js';

//Business Logic

async function getTixData(query) {
  const responseTix = await TicketMaster.getEvents(query);
  if (responseTix["_embedded"]) {
    const gifQuery = responseTix["_embedded"].events[0].name;
    printTixEvents(responseTix, query);
    getGiphyData(gifQuery.substring(0,49));
  } 
  else {
    printError(responseTix, query);
  }
}

async function getGiphyData(searchTerm) {
  const responseGif = await Giphy.getGif(searchTerm);
  if (responseGif.data) {
    printGif(responseGif);
  } 
  else {
    printError("Can't locate GIF for this search",searchTerm);
  }
}

// UI Logic

function printTixEvents(responseTix, query) {
  let newAnchor = document.createElement('a');
  let newImg = document.createElement('img');
  let displayImg = responseTix['_embedded'].events[0].images[0].url;
  newImg.setAttribute("width", "50%");
  newImg.setAttribute("height", "auto");
  document.querySelector('#showResponse').innerText = `The query for ${query} results in the following events:
  Event: ${responseTix["_embedded"].events[0].name}
  Date: ${responseTix['_embedded'].events[0].dates.start.localDate}
  venue: ${responseTix['_embedded'].events[0]["_embedded"].venues[0].name}
  `;
  newAnchor.innerHTML = `<a href="${responseTix['_embedded'].events[0].url}">${responseTix['_embedded'].events[0].url}</a><br>`;
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
  document.querySelector('showResponse').innerText = null;
  document.querySelector('showResponse').innerText = `An error occurred getting data for ${query}: ${error}`;
}

function handleTicketForm() {
  event.preventDefault();
  const input = document.getElementById("text-input").value;
  getTixData(input);
}

window.addEventListener("load", function() {
  document.getElementById("ticket-form").addEventListener("submit", handleTicketForm);
});