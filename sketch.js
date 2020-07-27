let startDate;
let state;
let i = 0;
let j = 0;
let rndJoke;
let img;
let song;
let racesToCome = [];
let racesToComeNames = [];

let fireState = 'off';
let trackMarkings = [];

//Bike Movement
let bikeY;
let bikeAcceleration = 0;

//Fire

let bugs = [];
let numBugs = 40;

let flag = 'down';

let joke = ['Vrooooom', 'Speed = Fun', 'If you crash get back up, if you die walk it off', 'I disconnected my brakes, its about speeding up not slowing down!', 'Two wheels are always better than four', 'Race day is coming', 'Theres no stopping this Race Day will arrive', 'Drive or Die, thats the only way to live', 'Two Wheels, Full Tank, Lets fucking go', "It's nearly fucking race day", 'Fast and Furious has nothing on MotoGP', 'They say the flash is jealous of Marc Marquez', 'Quartararo gonna fuck these boys up', 'If its speed you want, its speed you will get', 'You must become speed!', 'Be the speed you want to see', 'Your fastest is not fast enough', 'So fast you outpace lighning', 'You can create more track friction through shear power of will!' ]

let raceDate = [['9','7'], ['16','7'], ['23','7'], ['13','8'], ['20','8'], ['27','8'], ['11','9'], ['18','9'], ['25','9'], ['8','10'], ['25','10']
] //Dates stored [day, month] remember month is zero indexed for some reason. Also in order nearest to furthest.

let raceName = ['Czech GP', 'Austrian GP', 'Styrian GP', 'San Marino GP', 'Emilia Romagna GP', 'Catalan GP', 'French GP', 'Aragon GP', 'Teruel GP', 'Europe GP', 'Valencia GP']

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }

function preload() {
  song = loadSound('assets/F1-Theme.mp3');
  img = loadImage('assets/bike.png');
}

function drawMain(DaysCounter, HoursCounter, MinutesCounter, SecondsCounter){
        stroke(0)
        fill(0);
        textSize(width*0.04);
        text(racesToComeNames[0], width*0.10, height*0.3);
        fill(0);
        textSize(width*0.03);
        text(DaysCounter + ' Days  ' + HoursCounter + ' Hours  ' + MinutesCounter + ' Minutes  ' + SecondsCounter + ' Seconds', width*0.10, height*0.45);
        textSize(width*0.015);
        text(joke[rndJoke], width*0.10, height*0.6);
        
        
}

function road(){
    fill(50);
    rect(-10, height*0.75, width + 10, height - height*0.75);
}

function mousePressed() {
    if(mouseX > width*0.6 && mouseX < width*0.6 + width*0.3 && mouseY > bikeY && mouseY < bikeY + (width*0.3)/2){
    if (song.isPlaying()) {
      // .isPlaying() returns a boolean
      song.stop();
    } else {
      song.play();
    }

    if(fireState == 'off'){
        fireState = 'on';
    } else {
        fireState = 'off';
    }
    }
  }

function setup() {

    createCanvas(windowWidth,windowHeight)
    for(let i = 0; i < raceDate.length; i++){
        currentDate = new Date().getTime();
        let raceToCheck = raceDate[i];
        let raceDateToCheck =  new Date('2020', raceToCheck[1], raceToCheck[0]).getTime();
        if(currentDate < raceDateToCheck){
            racesToCome.push(raceToCheck);
            racesToComeNames.push(raceName[i]);
        }
    }

    rndJoke = Math.floor(Math.random() * joke.length);
    let lastMarkerPos = 0;
    for(let i=0; i< width/240; i++){
        trackMarkings.push(new trackMarking(width - lastMarkerPos, height*0.75, height - height*0.75));
        lastMarkerPos += 240;
    }

    bikeY = (height - height*0.75)/2 + height*0.4;
    
}

function draw() {
    /*if(i == 31){
        i = 0
    }
    i = i + 1;
    */

    if(j == 300){
        j = 0
    }

    j = j + 1;


    background(255);
    textSize(22);
    fill(0);
    text('Race Day Countdown', width*0.01, height*0.05);

    let nearestRace = racesToCome[0];

    currentDate = new Date();

    
    let nearestRaceTime = new Date('2020', nearestRace[1], nearestRace[0]).getTime();
    let time = currentDate.getTime();

    let TimeDifference = nearestRaceTime - time;

    

    
    let TimeUntillSeconds = TimeDifference/1000;
    let TimeUntillMinutes = TimeUntillSeconds/60;
    let TimeUntillHours = TimeUntillMinutes/60;
    let TimeUntillDays = TimeUntillHours/24;

    let DaysCounter = Math.floor(TimeUntillDays);
    let HoursCountWthMinutes = (TimeUntillDays - DaysCounter)*24;
    let HoursCounter = Math.floor(HoursCountWthMinutes);
    let MinutesCountWthSeconds = (HoursCountWthMinutes - HoursCounter)*60;
    let MinutesCounter = Math.floor(MinutesCountWthSeconds);
    let SecondsCounter = Math.floor((MinutesCountWthSeconds - MinutesCounter)*60);

    if(fireState =='on'){
        road();
        for(let i = 0; i < trackMarkings.length; i++){
            
            trackMarkings[i].draw();
            trackMarkings[i].move();

            if(trackMarkings[i].x < 0 - 60){
                trackMarkings[i].x = width + 10;
            }
        }

        //Bike Logic
        if(bikeY < height*0.62 && flag == 'down'){
            bikeY += 0.3;
        } else {
            flag = 'up'
        }

        if(bikeY > height*0.52 && flag == 'up'){
            bikeY -= 0.3;
        } else {
            flag = 'down'
        }
    
    }
    
    image(img, width*0.6, bikeY, width*0.35, (width*0.35)/2);


    //Counter and Words
    drawMain(DaysCounter, HoursCounter, MinutesCounter, SecondsCounter);

    

    if(j == 1){
        rndJoke = (Math.floor(Math.random() * joke.length))
    }

    if(fireState == 'on'){
        // loop through all the bugs backwards
        // looping backwards lets us see older particles on top

        for(let i = bugs.length -1; i>= 0; i--){
            bugs[i].move();
            bugs[i].show();
            bugs[i].shrink();
            
            if(bugs[i].radius <= 0 ){
                //remove the dead ones
                bugs.splice(i, 1);
            }
        }

        // make more fire!!!
        let x = width*0.6;
        let y = bikeY + 100;
        let radius = random(30,50);
        let b = new Bug(x, y, radius);
        bugs.push(b);

        stroke(0);
    }

    

    
    /*
    if(TimeCounter < 5){
        state = 'closeTo';
    } else if(TimeCounter > 55){
        state = 'teaTime';
    } else {
        state = 'normal';
    }

    
    
    if(state == 'normal'){
        textSize(40);
        text('Tea Time in:', width*0.10, height*0.3);
        drawMain(TimeCounter);


    }
    
    if(state == 'closeTo'){
        textSize(40);
        text('Get Excited Gentlemen!!', width*0.10, height*0.3);
        drawMain(TimeCounter)
        
    }

    if(state == 'teaTime'){
        textSize(60);

        if(i > 15){
            fill(0)
         } else {
            fill(Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256))
        }
        
        text("It's Fucking Tea Time!", width*0.3, height*0.5);

        for (let i = 0; i < confetti.length / 2; i++) {
            confetti[i].confettiDisplay();
        
            if (confetti[i].y > height) {
              confetti[i] = new Confetti(random(0, width), random(-height, 0), random(-1, 1));
            }
          }
        
          for (let i = int(confetti.length / 2); i < confetti.length; i++) {
            confetti[i].confettiDisplay();
        
            if (confetti[i].y > height) {
              confetti[i] = new Confetti(random(0, width), random(-height, 0), random(-1, 1));
            }

        
          }
    }
    */
   
}

