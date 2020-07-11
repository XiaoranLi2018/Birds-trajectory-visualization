let data;

let canvas;
let myMap;
let uniqueUUID;
let bird_coor_list;

// Define the variables for requesting tile maps
const options = {
    lat: 35.8617,
    lng: 104.1954,
    zoom: 1,
    style: 'mapbox://styles/mapbox/dark-v9'
  }
const key = "pk.eyJ1Ijoic2hhcm9ubGkzODIzIiwiYSI6ImNrOTMzMmJkejAxYjUzZ2xpY2dlbG95b3kifQ.Q6tzEGJ47gu_oxtr2YyXaQ";;
const mappa = new Mappa('MapboxGL', key);
  
// This function is used to handle asynchronous loading of external files in a blocking way
function preload() {
    data = loadJSON('./data/Ornitela_simplify1000.geojson');
}

// This function finds the unique UUID in the json file
function find_uniqueUUID(input_json) {
    var allUUID = [];
    for (let i = 0; i < input_json.features.length; i++) {
        allUUID.push(input_json.features[i].properties.UUID)
    }
    return [...new Set(allUUID)];
}

// This function filters the coordinates based on each unique UUID
function create_bird_list(input_json, input_unique_list){
    var bird_list = [];
    for (let i = 0; i < input_unique_list.length; i++) {
        var bird = [];
        for (let e = 0; e < input_json.features.length; e++){
            if (input_json.features[e].properties.UUID === input_unique_list[i]){
                bird.push(input_json.features[e].geometry.coordinates)
            }
        }
        bird_list.push(new Bird(bird));
    }
    return bird_list;
}

// This function is called once when the program starts. It's used to define initial environment properties as the program starts.
function setup() {
    canvas = createCanvas(window.innerWidth, window.innerHeight);
    // Create a reference to a tile map, must be used with overlay()
    myMap = mappa.tileMap(options);
    myMap.overlay(canvas); 

    // Execute the function 
    uniqueUUID = find_uniqueUUID(data);
    
    // Execute the function 
    bird_coor_list = create_bird_list(data, uniqueUUID);
}

function draw(){
    // Clear the canvas at every frame
    clear();
    
    for (let i = 0; i < bird_coor_list.length; i++){
        bird_coor_list[i].update();
        bird_coor_list[i].show();
        bird_coor_list[i].trail();
    }
}

function Bird(bird_list){
    var delta = 0;
    var coordinate = 0;

    this.history = [];

    this.update = function(){
        if (delta < 1) {
            delta += 0.1;
        } else {
            this.history.push(bird_list[coordinate])
            delta = 0;
            coordinate ++;
        }

        this.origin = myMap.latLngToPixel(bird_list[coordinate][1], bird_list[coordinate][0]); 
        this.originVector = createVector(this.origin.x, this.origin.y); 
        this.destination = myMap.latLngToPixel(bird_list[coordinate + 1][1], bird_list[coordinate + 1][0]);  
        this.destinationVector = createVector(this.destination.x, this.destination.y);

        this.birdPosition = this.originVector.lerp(this.destinationVector, delta);
    }

    this.show = function() {
        noStroke();
        fill(255,255,255);
        ellipse(this.birdPosition.x, this.birdPosition.y, 7, 7);
    }

    this.trail = function() {
        //stroke(255,0,0);
        //strokeWeight(1);
        //noFill();
        var a = 0;
        beginShape();
        if (this.history.length > 50) {
            this.history.splice(0, 1);
        }
        /*
        for (var i =0; i < this.history.length; i++) {
            noStroke();
            fill(255,69,0, a);
            var pos = myMap.latLngToPixel(this.history[i][1], this.history[i][0]);
            ellipse(pos.x, pos.y, 4);
            if(a > 255) {
                this.history.shift();
                a = 0;
              }
              a += 50;
        }*/

        for (var i =0; i < this.history.length; i++) {
            noFill();
            strokeWeight(2);
            stroke(255,69,0, a);
            var pos = myMap.latLngToPixel(this.history[i][1], this.history[i][0]);
            vertex(pos.x, pos.y);
            if(a > 255) {
                this.history.shift();
                a = 0;
              }
              a += 50;
            endShape()
        }
    }
}



/*
// This functions draws a line with n-vertices where n = visited routes;
function drawRoute(){
    clear();
    // stroke color and width to see the route line
    stroke(255,0,0, 40);
    strokeWeight(5);
    if(visitedRoutes.length > 0){
      noFill();
      beginShape();
      visitedRoutes.forEach(function (e) {
          var pos = myMap.latLngToPixel(e[1], e[0]);
          vertex(pos.x, pos.y);
      })
      endShape()
    }
  }
*/


/*
if (visitedRoutes.length > 0) {
    stroke(255,0,0);
    strokeWeight(3);
    noFill();

    beginShape();
    for (var i =0; i < visitedRoutes.length; i++) {
        var pos = myMap.latLngToPixel(visitedRoutes[i][1], visitedRoutes[i][0]);
        curveVertex(pos.x, pos.y);
    }
    endShape();
}
*/