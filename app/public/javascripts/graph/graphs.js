//different colors when data is below 0
//Not used
function graf2(){
	var pointBackgroundColors = [];
	var ctx = document.getElementById('myChart3').getContext('2d');
	var myChart = new Chart(ctx, {
	
	    type: 'line',

	
	    data: {
		labels: ["January", "February", "March", "April", "May", "June", "July"],
		datasets: [{
		    label: "graf3",
		    pointBackgroundColor: pointBackgroundColors,
		    data: [-200, -50,0, 100, 200, 300,500,200],
		}]
	    },

	
	    options: {
		
		}
	});

	for (i = 0; i < myChart.data.datasets[0].data.length; i++) {
	    if (myChart.data.datasets[0].data[i] < 0) {
		pointBackgroundColors.push("#FF0000");

	    } else {
		pointBackgroundColors.push("#0000FF");

	    }
	}

	myChart.update();
}
//generatedataforcurrprov
function databarchartcurrentprovair(temp,id){
	var typeofgraph = "current_air_temp_county";
	var stationame = id;
	var datatempvar= temp;
	generatedataforbar(typeofgraph,datatempvar,stationame);
}
var chart10 = null;
function currentairtempgraphprov(weatherdata){
	if(chart10!=null){
		chart10.destroy();
	}
	var ctx = document.getElementById('myChart9').getContext('2d');
	chart10 = new Chart(ctx, {
	    type: 'bar',
	    data: {
		//labels: stations,
		datasets: currentairtempprov
	    },

	
	    options: {
			title:{
	display:true,
	text: "Nuvarande medeltemperatur luft län"}
	}
	});
}
//generatedataforcurrprov
function databarchartcurrentprovroad(temp,id){
	var typeofgraph = "current_road_temp_county";
	var stationame = id;
	var datatempvar= temp;
	generatedataforbar(typeofgraph,datatempvar,stationame);
}
var chart11 = null;
function currentroadtempgraphprov(weatherdata){
	if(chart11!=null){
		chart11.destroy();
	}
	var ctx = document.getElementById('myChart10').getContext('2d');
	chart11 = new Chart(ctx, {
	    type: 'bar',
	    data: {
		//labels: stations,
		datasets: currentroadtempprov
	    },

	
	    options: {
			title:{
	display:true,
	text: "Nuvarande medeltemperatur väg län"}
	}
	});
}

var currentdaggpunkt = [];
var currentdatawind = [];
var currentdatatemp = [];
var currentroadtemp = [];
var currentairhum = [];
var currentairtempprov = [];
var currentroadtempprov = [];
//Generats variables for the stations used as data for the current bar graphs. 
function generatedataforbar(typeofgraph,datatempvar,stationame){
    var dataFirst = {
    label: stationame,
    backgroundColor: colornamelist[stationnamelist.indexOf(stationame)],
    borderColor: colornamelist[stationnamelist.indexOf(stationame)],
    data: [datatempvar]
  };
	if(typeofgraph=="current_air"){
		currentdatatemp.push(dataFirst);
	}
	if (typeofgraph=="current_road"){
		currentroadtemp.push(dataFirst);
	}
	if (typeofgraph=="current_hum"){
		currentairhum.push(dataFirst);
	}
	if (typeofgraph=="current_windspeed"){
		currentdatawind.push(dataFirst);
	}
	if (typeofgraph=="current_air_temp_county"){
		currentairtempprov.push(dataFirst);
	}
	if (typeofgraph=="current_road_temp_county"){
		currentroadtempprov.push(dataFirst);
	}	
	if (typeofgraph=="current_dagg_temp"){
		currentdaggpunkt.push(dataFirst);
	}


}
//current dagg temp
function databarchartcurrentdagg(data,station_name){
	var typeofgraph = "current_dagg_temp";
	var stationame = station_name;
	var datatempvar= data;
	generatedataforbar(typeofgraph,datatempvar,stationame);
}

var chart15 = null;
function currentdaggpunktfunc(weatherdata){
	if(chart15!=null){
		chart15.destroy();
	}
	var ctx = document.getElementById('myChart12').getContext('2d');
	chart15 = new Chart(ctx, {
	    type: 'bar',
	    data: {
		//labels: stations,
		datasets: currentdaggpunkt
	    },

	    options: {
			title:{
	display:true,
	text: "Nuvarande daggpunkt(nuvarande temp>=0)"}
	}
	});
}


//current data air temp
function databarchartcurrent(weatherdata,station_name){
	var typeofgraph = "current_air";
	var stationame = station_name;
	var datatempvar= weatherdata[0].air_temperature;
        //var datatempvar= weatherdata.air_temperature;
	generatedataforbar(typeofgraph,datatempvar,stationame);
}

var chart = null;
function currenttempgraph(weatherdata){
	if(chart!=null){
		chart.destroy();
	}
	var ctx = document.getElementById('myChart5').getContext('2d');
	chart = new Chart(ctx, {
	    type: 'bar',
	    data: {
		//labels: stations,
		datasets: currentdatatemp
	    },

	    options: {
			title:{
	display:true,
	text: "Nuvarande lufttemperatur"}
	}
	});
}


//current data windspeed 
function databarchartwindcurrent(weatherdata,station_name){
	var typeofgraph = "current_windspeed";
	var stationame = station_name;
	var datatempvar= weatherdata[0].wind_speed;
	//var datatempvar= weatherdata.wind_speed;
	generatedataforbar(typeofgraph,datatempvar,stationame);
}

var chart6 = null;
function currentwindspeedgraph(weatherdata){
	if(chart6!=null){
		chart6.destroy();
	}
	var ctx = document.getElementById('myChart8').getContext('2d');
	chart6 = new Chart(ctx, {
	    type: 'bar',
	    data: {
		//labels: stations,
		datasets: currentdatawind
	    },

	
	    options: {
			title:{
	display:true,
	text: "Nuvarande vindhastighet"}
	}
	});
}



//current data road temp
function databarchartroadcurrent(weatherdata,station_name){
	var typeofgraph = "current_road";
	var stationame = station_name;
	var datatempvar= weatherdata[0].road_temperature;
	//var datatempvar= weatherdata.road_temperature;
	generatedataforbar(typeofgraph,datatempvar,stationame);
}

var chart1 = null;
function currentroadtempgraph(weatherdata){
	if(chart1!=null){
		chart1.destroy();
	}
	var ctx = document.getElementById('myChart6').getContext('2d');
	chart1 = new Chart(ctx, {
	    type: 'bar',
	    data: {
		//labels: stations,
		datasets: currentroadtemp
	    },

	
	    options: {
			title:{
	display:true,
	text: "Nuvarande vägtemperatur"}
	}
	});
}



//current data air humidity
function databarcharthumcurrent(weatherdata,station_name){
	var typeofgraph = "current_hum";
	var stationame = station_name;
	var datatempvar= weatherdata[0].air_humidity;
	//var datatempvar= weatherdata.air_humidity;
	generatedataforbar(typeofgraph,datatempvar,stationame);
}
var chart2 = null;
function currenthumgraph(weatherdata){
	if(chart2!=null){
		chart2.destroy();
	}
	var ctx = document.getElementById('myChart7').getContext('2d');
	chart2 = new Chart(ctx, {
	    type: 'bar',
	    data: {
		//labels: stations,
		datasets: currentairhum
	    },

	
	    options: {
			title:{
	display:true,
	text: "Nuvarande luftfuktighet"}
	}
	});
}

//airtemp province avg
//multiple lines in the graph
var datagraftempprov = [];
var datagraftimestamptempprov = [];	
var datagraftimestamptempprovnotsliced = [];	
var checktruefalsetempprov=true;
function datamultieplegraftempprov(weatherdata,Prov_id){
	
	var datagraftempprov = [];
	var valuegraph = "avgprovairtemp"
	var Prov_id = Prov_id;
	if (checktruefalsetempprov){
		for(var i = 0; i < weatherdata.length; i++){
			datagraftempprov.push(weatherdata[i].air_temperature);
			datagraftimestamptempprov.push(weatherdata[i].timestamp.slice(2,10)+" "+weatherdata[i].timestamp.slice(12,16));
			datagraftimestamptempprovnotsliced.push(weatherdata[i].timestamp);
		}
	}else{
		for(var i = 0; i < weatherdata.length; i++){
			var x = datagraftimestamptempprovnotsliced.indexOf(weatherdata[i].timestamp);
			var lastx;
			var offset;
			if(x>=0){
				datagraftempprov[x]=weatherdata[i].air_temperature;
				lastx = x;
				offset=0;
			}
			if(x==-1){
				offset++;
				datagraftempprov[lastx+offset]=weatherdata[i].air_temperature;
			}
			//datagraftempprov.push(weatherdata[i].air_temperature);
		}
	} 
	//console.log(datagraftempprov);
	checktruefalsetempprov=false;
	generatedata(valuegraph,datagraftempprov,Prov_id)

}



//wind_speed
//multiple lines in the graph
var datagrafwindspeed = [];
var datagraftimestampwindspeed = [];	
var checktruefalsewind=true;
function datamultieplegrafwinspeed(weatherdata,station_name){
	var datagrafwindspeed = [];
	var valuegraph = "windspeed"
	var stationame = station_name;
	for(var i = 0; i < weatherdata.length; i++){
		datagrafwindspeed.push(weatherdata[i].wind_speed);
	if(checktruefalsewind){
		datagraftimestampwindspeed.push(weatherdata[i].timestamp.slice(2,10)+" "+weatherdata[i].timestamp.slice(12,16));
	}
	}
	checktruefalsewind=false;
	generatedata(valuegraph,datagrafwindspeed,stationame)
}


//humidity
//multiple lines in the graph
var datagrafhum = [];
var datagraftimestamphum = [];	
var checktruefalsehum=true;
function datamultieplegrafhumidity(weatherdata,station_name){
	var datagrafhum = [];
	var valuegraph = "humidity"
	var stationame = station_name;
	for(var i = 0; i < weatherdata.length; i++){
		datagrafhum.push(weatherdata[i].air_humidity);
		if(checktruefalsehum){
		datagraftimestamphum.push(weatherdata[i].timestamp.slice(2,10)+" "+weatherdata[i].timestamp.slice(12,16));
	}
	}
	checktruefalsehum=false;
	generatedata(valuegraph,datagrafhum,stationame)
}


//air_temp
//multiple lines in the graph
var datagrafair = [];
var datagraftimestampair = [];	
var checktruefalseair=true;
function datamultieplegrafair(weatherdata,station_name){
	var datagrafairtemp = [];
	var valuegraph = "airtemp"
	var stationame = station_name;
	for(var i = 0; i < weatherdata.length; i++){
		datagrafairtemp.push(weatherdata[i].air_temperature);
		if(checktruefalseair){
		datagraftimestampair.push(weatherdata[i].timestamp.slice(2,10)+" "+weatherdata[i].timestamp.slice(12,16));
	}
	}
	checktruefalseair=false;
	generatedata(valuegraph,datagrafairtemp,stationame);
}


//road_temp
//multiple lines in the graph
var data3graf3 = [];
var datagraftimestamp = [];
var checktruefalse=true;	
function datamultieplegraf(weatherdata,station_name){
	var datagrafroadtemp = [];
	var valuegraph = "roadtemp"
	var stationame = station_name;
	for(var i = 0; i < weatherdata.length; i++){
		datagrafroadtemp.push(weatherdata[i].road_temperature);
		if(checktruefalse){
			datagraftimestamp.push(weatherdata[i].timestamp.slice(2,10)+" "+weatherdata[i].timestamp.slice(12,16));
		}
	}
	checktruefalse=false;
	generatedata(valuegraph, datagrafroadtemp,stationame)
}


//Lists to match the color of the stations in the graphs
var stationnamelist = [];
var colornamelist = [];
//Generats variables for the stations used as data for the graphs. 
function generatedata(value, datagraf, stationame){
    if(stationnamelist.includes(stationame)){
	    var dataFirst = {
	    label: stationame,
	    data: datagraf,
	    lineTension: 0.3,
	    fill: false,
	    borderColor: colornamelist[stationnamelist.indexOf(stationame)],
	    backgroundColor: 'transparent',
	    pointBorderColor: colorforline,
	    pointBackgroundColor: 'lightgreen',
	    pointRadius: 1,
	    pointHoverRadius: 5,
	    pointHitRadius: 2,
	    pointBorderWidth: 1,
	    pointStyle: 'rect'
  };
}
else{
    var colorforline = '#' + Math.random().toString(16).slice(2, 8).toUpperCase();
    stationnamelist.push(stationame);
    colornamelist.push(colorforline);
	    var dataFirst = {
	    label: stationame,
	    data: datagraf,
	    lineTension: 0.3,
	    fill: false,
	    borderColor: colorforline,
	    backgroundColor: 'transparent',
	    pointBorderColor: colorforline,
	    pointBackgroundColor: 'lightgreen',
	    pointRadius: 1,
	    pointHoverRadius: 5,
	    pointHitRadius: 2,
	    pointBorderWidth: 1,
	    pointStyle: 'rect'

};
}

	if(value=="roadtemp"){
		data3graf3.push(dataFirst);
	}
	if(value=="airtemp"){
		datagrafair.push(dataFirst);
	}
	if(value=="humidity"){
		datagrafhum.push(dataFirst);
	}
	if(value=="windspeed"){
		datagrafwindspeed.push(dataFirst);
	}
	if (value=="avgprovairtemp"){
		datagraftempprov.push(dataFirst);
		
	}
}


var lineChartptovair = null;
//function to create prov air temp avg graph
function roadtempprov(){
if(lineChartptovair!=null){
	lineChartptovair.destroy();
}

var speedCanvas = document.getElementById("myChart11");
Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 18;


var speedData = {
  labels: datagraftimestamptempprov,
  datasets: datagraftempprov
};

var chartOptions = {
    scales: {
        xAxes: [{
            ticks: {
                fontSize: 15
            }
        }]
    },
    title:{
	display:true,
	text: "Vägtemperatur medel län",
  legend: {
    display: true,
    position: 'top',
    labels: {
      boxWidth: 80,
      fontColor: 'black',
    }
}
  }
};

lineChartptovair = new Chart(speedCanvas, {
  type: 'line',
  data: speedData,
  options: chartOptions
});
lineChartptovair.update();
}

var lineChart1 = null;
//function to create road_temp graph
function roadtemp(){
if(lineChart1!=null){
lineChart1.destroy();
}

var speedCanvas = document.getElementById("myChart2");
Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 18;



var speedData = {
  labels: datagraftimestamp,
  datasets: data3graf3
};

var chartOptions = {
    scales: {
        xAxes: [{
            ticks: {
                fontSize: 15
            }
        }]
    },
    title:{
	display:true,
	text: "Vägtemperatur",
  legend: {
    display: true,
    position: 'top',
    labels: {
      boxWidth: 80,
      fontColor: 'black'
    }
}
  }
};

lineChart1 = new Chart(speedCanvas, {
  type: 'line',
  data: speedData,
  options: chartOptions
});
lineChart1.update();
}


var lineChart2 = null;
//function to create air_temp graph
function airtemp(){
if(lineChart2 != null){
lineChart2.destroy();
}
var speedCanvas = document.getElementById("myChart1");
Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 18;



var speedData = {
  labels: datagraftimestampair,
  datasets: datagrafair
};

var chartOptions = {
    scales: {
        xAxes: [{
            ticks: {
                fontSize: 15
            }
        }]
    },
    title:{
	display:true,
	text: "Lufttemperatur",
  legend: {
    display: true,
    position: 'top',
    labels: {
      boxWidth: 80,
      fontColor: 'black',
    }
}

  }


};

lineChart2 = new Chart(speedCanvas, {
  type: 'line',
  data: speedData,
  options: chartOptions
});
lineChart2.update();
}

var lineChart3 = null;
//function to create humidity graph
function humiditygraph(){
if(lineChart3 != null){
lineChart3.destroy();
}
var speedCanvas = document.getElementById("myChart3");
Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 18;



var speedData = {
  labels: datagraftimestamphum,
  datasets: datagrafhum
};

var chartOptions = {
    scales: {
        xAxes: [{
            ticks: {
                fontSize: 15
            }
        }]
    },
    title:{
	display:true,
	text: "Luftfuktighet",
  legend: {
    display: true,
    position: 'top',
    labels: {
      boxWidth: 80,
      fontColor: 'black'
    }
}
  }
};

lineChart3 = new Chart(speedCanvas, {
  type: 'line',
  data: speedData,
  options: chartOptions
});
lineChart3.update();
}

var lineChart4 = null;
//function to create windspeed graph
function windspeed(){
if(lineChart4 != null){
lineChart4.destroy();
}
var speedCanvas = document.getElementById("myChart4");
Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 18;



var speedData = {
  labels: datagraftimestampwindspeed,
  datasets: datagrafwindspeed
};

var chartOptions = {
    scales: {
        xAxes: [{
            ticks: {
                fontSize: 15
            }
        }]
    },
    title:{
	display:true,
	text: "Vindhastighet",
  legend: {
    display: true,
    position: 'top',
    labels: {
      boxWidth: 80,
      fontColor: 'black'
    }
}
  }
};

lineChart4 = new Chart(speedCanvas, {
  type: 'line',
  data: speedData,
  options: chartOptions
});
lineChart4.update();
}

/*
f/100 ^1/8  (112+0.9T)+0.1T -112
*/
function daggpunktfunc(){
	var dagg;
	for(var i=0;i<currentdatatemp.length;i++){
		if(currentdatatemp[i].data[0]>=0){
			dagg = Math.pow((currentairhum[i].data[0]/100), (1/8)) *(112+(0.9*currentdatatemp[i].data[0]))+(0.1*currentdatatemp[i].data[0])-112;
			databarchartcurrentdagg(dagg,currentdatatemp[i].label);
		}
	}
}

//clear all the arrays
function cleararrays(){
	currentdatatemp = [];
	datagrafwindspeed = [];
	datagraftimestampwindspeed = [];
	currentairtempprov = [];
	currentroadtempprov = [];
	datagrafhum = [];
	datagraftimestamphum = [];	
	datagrafair = [];
	datagraftimestampair = [];
	data3graf3 = [];
	datagraftimestamp = [];	
 	currentroadtemp = [];
	currentairhum = [];	
	currentdatawind = [];
	checktruefalse=true;
	checktruefalseair=true;
	checktruefalsehum=true;
	checktruefalsewind=true;
	datagraftempprov = [];
    	datagraftimestamptempprov = [];	
	datagraftimestamptempprovnotsliced = [];
	checktruefalsetempprov=true;
	currentdaggpunkt = []
}

