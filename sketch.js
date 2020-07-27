let startDate;
let state;
let i = 0;
let j = 0;
let rndJoke;
let img;
let teaDrops = [];

let joke = ['Oh my god, I love tea', 'Is there anything better than Tea?', 'Guys, Guys, Guys Tea!', 'Holy Shit tea time is coming', 'This is to much I can hardly wait', 'Tea, Tea, Tea!', 'Hot Water + Sugar + Teabag = Amazing', 'Please I need tea!', 'Give me Tea and I will marry you!', 'Mr T knows what he wants', 'I want an Avagadros constant worth of Tea', 'With Milk or Without?', 'To Tea or Not to Tea?', 'Warm, sweet, delicious. Tea.', 'If its Tea you want, its Tea you will get', 'Tea keeps on falling on my head', 'You have my Sword! and my Tea!', 'Herbal Vs White. Showdown! FIGHT!', 'The more tea you give me the happier I will be', 'If you want tea, get tea', 'Its gonna be T-Riffic', 'Tea for me!', 'tttttttttttttttt', 'I will kill for Tea', 'Between Tea and Valhala. I choose Tea.', 'I want some tea so jucy sweeeeet', 'Say NO to Coffee, YES to Tea!', 'Vote Tea for President', 'So much beauty from such a small tea bag']


//Confetti
let confettiColor = [], confetti = [];

function drawMain(TimeCounter){
    image(img, width*0.4, height*0.4, 1000, 1000)
        fill(0);
        
        textSize(50);
        text(Math.floor(TimeCounter)  + ' Minutes  ' + Math.floor(((TimeCounter) - (Math.floor(TimeCounter))) * 60) + ' Seconds', width*0.10, height*0.45);
        textSize(25);
        text(joke[rndJoke], width*0.10, height*0.6);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }

function preload() {
  img = loadImage('assets/teaCup.jpg');
}

function setup() {

    createCanvas(windowWidth,windowHeight)
    startDate = new Date('2020', '6' , '25');
    console.log(startDate);
    rndJoke = Math.floor(Math.random() * joke.length);

    confettiColor = [color('#00aeef'), color('#ec008c'), color('#72c8b6')];
    for (let i = 0; i < 100; i++) {
     confetti[i] = new Confetti(random(0, width), random(-height, 0), random(-1, 1));
    }
    teaDrop = new teaLiquid(width*0.72, 0);

    

    for(let a = 0; a < 300; a++){
        let x_ = Math.floor(Math.random() * (width*0.8)) + (width*0.6)
        
        teaDrops.push(new teaLiquid(x_, 0))
    }
    
}

function draw() {
    if(i == 31){
        i = 0
    }

    if(j == 300){
        j = 0
    }
    j = j + 1;
    i = i + 1;



    background(255);
    textSize(22);
    fill(0);
    text('Tea Time Countdown', width*0.01, height*0.05);

    currentDate = new Date();

    
    let startTime = startDate.getTime();
    let time = currentDate.getTime();

    

    let TimeSince = time - startTime;
    let TimeSinceSeconds = TimeSince/1000;
    let TimeSinceMinutes = TimeSinceSeconds/60;
    let TimeSinceHours = TimeSinceMinutes/60;
    
    let NumberOfHours = Math.floor(TimeSinceHours);

    let RemoveMinutes = (NumberOfHours) * 60;
    
    let TimeCounter = 60 - ( TimeSinceMinutes - RemoveMinutes);

    
    if(TimeCounter < 5){
        state = 'closeTo';
    } else if(TimeCounter > 55){
        state = 'teaTime';
    } else {
        state = 'normal';
    }

    if(j == 1){
        rndJoke = (Math.floor(Math.random() * joke.length))
    }
    
    if(state == 'normal'){
        textSize(40);
        text('Tea Time in:', width*0.10, height*0.3);
        drawMain(TimeCounter);

        /*for(let a = 0; a < teaDrops.length; a++){
            teaDrops[a].draw();
            teaDrops[a].move();
        }*/

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
   
}


