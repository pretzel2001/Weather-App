function connect() {
    if(document.getElementById("searchbar").value == ""){
        var newName = "Dhaka";
    }
    else{
        var newName = document.getElementById("searchbar").value;
    }
    var url = `http://api.openweathermap.org/data/2.5/forecast?q=${newName}&appid=633d582cea18726af0ed38cddbbc9428&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => GetInfo(data));
}
function GetInfo(data) {
    var temperatureE1 = `${data.list[0].main.temp}`;
    document.getElementById("temp").innerText = temperatureE1 + " °C";
    if(document.getElementById("searchbar").value == ""){
        var state = "Dhaka";
    }
    else{
        var state = document.getElementById("searchbar").value;
    }
    document.getElementById("cityName").innerText = state;
    var dateE1 = `${data.list[0].dt_txt}`;
    var newTime = dateE1.slice(12, 20);
    var newDate = dateE1.slice(0, 11);
    document.getElementById("date").innerText = newDate;
    document.getElementById("time").innerText = newTime;
    var humidity = `${data.list[0].main.humidity}`;
    document.getElementById("humidity").innerText = humidity + "%";
    var windSpeed = `${data.list[0].wind.speed}`;
    document.getElementById("windspeed").innerText = windSpeed + " m/s";
    var visibility = `${data.list[0].visibility}`;
    visibility = visibility / 1000;
    document.getElementById("visibility").innerText = visibility + " km";
    var feelsLike = `${data.list[0].main.feels_like}`;
    document.getElementById("feelslike").innerText = feelsLike + " °C";

    var icon = "http://openweathermap.org/img/wn/" + `${data.list[0].weather[0].icon}` + "@2x.png";
    document.getElementById("currenticon").src = icon;

    var dayCount = 2;
    var i = 1;
    var prevDay = parseInt(dateE1.slice(9, 11));
    while (dayCount < 6) {
        var date = `${data.list[i].dt_txt}`;
        date = parseInt(date.slice(9, 11));
        if (date == prevDay + 1) {
            var dateE = `${data.list[i].dt_txt}`;
            dateE = dateE.slice(0, 11);
            var id = "date" + dayCount;
            var id2 = "icon" + dayCount;
            document.getElementById(id).innerText = dateE;
            var ico = "http://openweathermap.org/img/wn/" + `${data.list[i].weather[0].icon}` + "@2x.png";
            document.getElementById(id2).src = ico;
            var id3 = "temp" + dayCount;
            var temp = `${data.list[i].main.temp}`;
            document.getElementById(id3).innerText = temp + " °C";
            dayCount++;
            prevDay = date;
        }
        i++;
    }
}



