class trackMarking{


    constructor(x_, trackY, trackHeight){
        this.acceleration = 0;
        this.x = x_;
        this.y = trackY + trackHeight/2;
    }

    draw(){
        stroke(255);
        fill(255);
        rect(this.x - 50, this.y, 60, 5);
    }

    move(){
        if(this.acceleration < 15){
            this.acceleration += 0.05;
        }
        
        this.x -= this.acceleration;
    }
        
    
}