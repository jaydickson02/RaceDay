class Bug{
    constructor(tempX, tempY, tempR) {
      this.x = tempX;
      this.y = tempY;
      this.radius = tempR;
      
      // pick a random color
      this.color = color(255);
      let r = random(3);
      if(r < 1){
        this.color = color(255,100,20,50); // orange
      } else if(r >= 1 && r < 2 ){
        this.color = color(255, 200, 10, 50); // yellow
      } else if(r >= 2 ){
        this.color = color(255, 80, 5, 50); // reddish
      }
      
    }
  
    show() {
      noStroke();
      fill(this.color);
      ellipse(this.x, this.y, this.radius);
    }
  
    move() {
      this.y += random(-5, 5);
      this.x -= random(1, 3);
    }
    
    shrink(){    
     // shrink size over time
     this.radius-=0.4;
    }
    
    
  
  }