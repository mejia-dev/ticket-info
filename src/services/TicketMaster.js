export default class TicketMaster {
  
  
  // static async getEvents(query) {
  //   try {
  //     const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?keyword=${query}&apikey=1234`);
  //     //${process.env.TICKETMASTER_API_KEY}
  //     const jsonifiedResponse = await response.json();
  //     if (!response.ok) {
  //       console.log(response.status);
  //       const errorMessage = `${response.status} ${response.statusText} ${jsonifiedResponse.message}`;
  //       throw new Error(errorMessage);
  //     } else {
  //       return jsonifiedResponse;
  //     }
  //   } catch(error) {
  //     return error;
  //   }
  // }

  static async getEvents(query) {
    try {
      const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?keyword=${query}&apikey=1234`);
      //${process.env.TICKETMASTER_API_KEY}
      const jsonifiedResponse = await response.json();
      if (!response.ok) {
        const errorMessage = `HTTP Error: ${response.status}, Text:${response.statusText}, Message: ${jsonifiedResponse.message}`;
        throw new Error(errorMessage);
      }
      return jsonifiedResponse;
    } catch(error) {
      return error;
    }
  }
}

// https://app.ticketmaster.com/discovery/v2/events.json?postalCode=${zip}&apikey=${process.env.TICKETMASTER_API_KEY}


// export default class WeatherService {  
//   static async getWeather(city) {
//     try {
//       const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`);
//       const jsonifiedResponse = await response.json();
//       if (!response.ok) {
//         const errorMessage = `${response.status} ${response.statusText}
//         ${jsonifiedResponse.message}`;
//         throw new Error(errorMessage);
//       }
//       return jsonifiedResponse;
//     } catch(error) {
//       return error;
//     }
//   }
// }