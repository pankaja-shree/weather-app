
$(document).ready(function(){
  
  var lat, lon, api, city, apidata;
  var cel = true;
  
  getLoc();
  setInterval(getLoc, 1800000);
  
  function getLoc(){
  if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(weatherInfo);
  }
  }
  
   
  function renderData(json,cel){
    
                var currentTemp;
				if(cel){
					currentTemp = json.current.temp_c + "°C";
				}
				else{
					currentTemp = json.current.temp_f + "°F";
				}
				
                var des = json.current.condition.text;
                city = json.location.name;

                $("#lat").html('Latitude: '+ lat.toFixed(2)); 
                $("#lon").html('Longitude: ' + lon.toFixed(2));
                $("#city").html(city);
                $(".temp").html(currentTemp);
                $("#weather").html(des);
                $("#speed").html(' ' + json.current.wind_mph + ' mph');
     
                var iconsrc = 'https:' + json.current.condition.icon;
          
                document.getElementById("weather-image").src = iconsrc;
  }
  
  function weatherInfo(pos){
    lat = pos.coords.latitude;
    lon = pos.coords.longitude;
	var url = 'https://api.apixu.com/v1/current.json?key=b1385ce3224e427e954191546172802&q=' + lat + ',' + lon;
    $.getJSON(url,function(json){
                apidata = json;
                renderData(json,cel);
                
              $("#toggle").click(function(){
                 cel = !cel;
                 renderData(apidata,cel);
              });
            });
      
    }
  

          
  
});