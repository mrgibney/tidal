// let myDate;
let myTimer = 0
let URLstart = "https://erddap.marine.ie/erddap/tabledap/IrishNationalTideGaugeNetwork.json?time%2Cstation_id%2CWater_Level_LAT&time%3E="
let URLend = "&station_id=%22Skerries%20Harbour%22"
let mySwitch = 0;
let maxY = 1;
let radius = 100
let counter = 0
// let tide = []
let JSONlength
function setup() {
	createCanvas(windowWidth,windowHeight)
	background(125)
	print("INTO SET_UP")
}

function gotData(data){

print(data);
tide = data
JSONlength = tide.table.rows.length
print(JSONlength)
oldest_wave = tide.table.rows[0]
print("Oldest Wave is: " + oldest_wave[2])
newest_wave = tide.table.rows[(JSONlength - 1)]
print("Newest Wave is: " + newest_wave[2])
mySwitch = 1;
}


function draw() {
//background(125)
background(0,0,255)
smooth();


if(myTimer != minute()){
print("into IF loop")
getYesterday()
myURL = URLstart + myISO +URLend
loadJSON(myURL, gotData)
myTimer = minute()	
}



if(mySwitch == 1){
background(125)
print("JSON LENGTH IS: " + JSONlength)
noFill()
stroke(255)
strokeWeight(2.5)
beginShape()
for(let i = 0; i < JSONlength; i++){
x = i 
y = (tide.table.rows[i][2])
if(y > maxY){
	maxY = y;
	print(y);
}

mapX = map(x, 0, JSONlength, 0, 1440)*2;
mapY = map(y, 0, 6, 0, 600)*2
// vertex(mapX,mapY)

}
endShape()
mySwitch = 0;

// noLoop()
}


new0 = maxY/2
translate(width/2, height/2);
stroke(255);
beginShape();
radius = 200;
Jcounter = JSONlength - counter
counter++
for(let i = 0; i < JSONlength; i++) {
// Change the radius for every vertex
 
  // i = (i + counter)
  // if(i == JSONlength){
  // 	i = 0
  // }
  Ny = (tide.table.rows[i][2])
  offY = Ny - new0
  const ThisRadius = radius + offY*20;
  const x = cos(radians(i * 360/JSONlength)) * ThisRadius*2;
  const y = sin(radians(i * 360/JSONlength)) * ThisRadius*2;
  vertex(x, y);


}
 endShape();



// stroke(242, 137, 0);
// beginShape();
// for(let i = 0; i < 360; i++){
// // const radius = 100;
//   ThisRadius = radius
//   const x = cos(radians(i * 3.6)) * ThisRadius*2;
//   const y = sin(radians(i * 3.6)) * ThisRadius*2;
//   vertex(x, y);
// }
//   endShape();


}


function getYesterday(){

const today = new Date()
    const yesterday = new Date(today)
	yesterday.setDate(yesterday.getDate() - 29)
	print(yesterday)
    myISO = yesterday.toISOString()
    print(myISO)
	
}
