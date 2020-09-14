var request=require("request");

// request html file of an website 
// request('http://www.google.com', function (error, response, body) {
// 	if(error){
// 		console.error('error:', error);
// 	}else{
// 		if(response.statusCode==200){
// // 			things are good
// 			console.log(body);
// 		}
// 	}
// });


// data from an api call
request('https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=d28c14632a6c8baa8ff068de45ca4578', (error, response, body)=> {
	if(!error && response.statusCode==200){
// 		body is in string so to convert it into json
		const parsedData=JSON.parse(body);
		console.log(`The weather today is ${parsedData.weather[0].description} with temp ${parsedData.main.temp} and humidity ${parsedData.main.humidity}`);
	}
});


