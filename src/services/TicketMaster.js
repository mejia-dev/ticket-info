export default class TicketMaster {
  static async getEvents(query) {
    try {
      const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?keyword=${query}&apikey=${process.env.TICKETMASTER_API_KEY}`);
      const jsonifiedResponse = await response.json();
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText} ${jsonifiedResponse.message}`;
        console.log(errorMessage);
        throw new Error(errorMessage);
      }
      return jsonifiedResponse;
    } catch(error) {
      return error;
    }
  }
}

// https://app.ticketmaster.com/discovery/v2/events.json?postalCode=${zip}&apikey=${process.env.TICKETMASTER_API_KEY}


