import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import TicketMaster from './js/TicketMaster.js';

//Bus Log

async function grabEvents(query) {
  const response = await TicketMaster.getEvents(query);
  if (response["_embedded"]) {
    printEvents(response, query);
  } else {
    printError(response, query);
  }
}



// UI Logic

function printEvents(response, query) {
  document.querySelector('#showResponse').innerText = `The query for ${query} results in the following events:
  Event: ${response["_embedded"].events[0].name}
  Date: ${response['_embedded'].events[0].dates.start.localDate}
  venue: ${response['_embedded'].events[0]["_embedded"].venues[0].name}
  `;
  // date: ${response['_embedded'].events[0].dates.start.localDate}
  // venue: ${response['_embedded'].events[0].venues[0].name}
  // Link: ${response['_embedded'].events[0].url}
  // image: ${response['_embedded'].events[0].images[0]}
}

function printError(error, query) {
  document.querySelector('showResponse').innerText = null;
  document.querySelector('showResponse').innerText = `An error occurred getting data for ${query}: ${error}`;
}

function handleTicketForm() {
  event.preventDefault();
  const input = document.getElementById("text-input").value;
  grabEvents(input);
}

window.addEventListener("load", function() {
  document.getElementById("ticket-form").addEventListener("submit", handleTicketForm);
});