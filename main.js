let main = {
  button: {
    red: document.getElementById("c1"),
    blue: document.getElementById("c2"),
    green: document.getElementById("c3"),
    yellow: document.getElementById("c4"),
    start: document.getElementById("startButton")

  },
  maxLevel: 10000,
  scoreKeeper : document.getElementById("score"),
  game:[], level:1,
    subLevel : 0,
    score : 0,
  highScore : 0,

  startAll : function() {
    //console.log("yes");
    this.button.start.classList.add("hidden");
    this.generateGame();
    this.flashPattern();
    this.addEvents();
  },
  flashPattern : function(){
    this.removeEvents()
    let i
    for (let i = 0; i < this.level; i++) {
      switch (this.game[i]) {
        case 0:
          setTimeout(() => this.longLight(this.button.red), 1000 * i)
          break
        case 1:
          setTimeout(() => this.longLight(this.button.blue), 1000 * i)
          break
        case 2:
          setTimeout(() => this.longLight(this.button.green), 1000 * i)
          break
        case 3:
          setTimeout(() => this.longLight(this.button.yellow), 1000 * i)
          break
      }
    }
    setTimeout(() => this.addEvents(), 1000 * i + 1)
  },
  changeColor : function(color) {
    this.shortLight(color);
    //console.log("at sublevel "+this.subLevel+ " expected " +this.game[this.subLevel]+" and got "+this.colorCodeToNumber(color.dataset.color));
    if(this.colorCodeToNumber(color.dataset.color) == this.game[this.subLevel])
    {this.win()}
    else{
    this.lose()}
  },
  colorswap: function(){
    main.changeColor(this)
  },
  addEvents: function(){
    this.button.red.addEventListener("click", this.colorswap)
    this.button.blue.addEventListener("click", this.colorswap)
    this.button.green.addEventListener("click", this.colorswap)
    this.button.yellow.addEventListener("click", this.colorswap)
  },

  removeEvents: function() {
    this.button.red.removeEventListener("click", this.colorswap)
    this.button.blue.removeEventListener("click", this.colorswap)
    this.button.green.removeEventListener("click", this.colorswap)
    this.button.yellow.removeEventListener("click", this.colorswap)
  },

  win:function(){
    this.subLevel++
    //console.log("sublevel increased")
    if (this.subLevel == this.level) {
      //console.log("win but the thing inside is called")
      this.subLevel = 0;
      this.score += 100;
      this.level++
      this.scoreKeeper.innerHTML = this.score
      setTimeout(() => this.flashPattern(), 1000)
    }
  },
  lose: function(){
    score = 0;
    this.subLevel = 0;
    level = 1
    this.scoreKeeper.innerHTML = score
    alert("Game Over")
    this.generateGame()
    this.removeEvents()
    this.button.start.classList.remove("hidden")
  },

  generateGame:function(){
    this.game = new Array(this.maxLevel).fill(0).map(n => Math.floor(Math.random() * 4))
  },

  longLight:function(color){
    color.classList.add("light")
    setTimeout(() => color.classList.remove("light"), 600)
  },
  shortLight:function(color){
    color.classList.add("light")
    setTimeout(() => color.classList.remove("light"), 200)
  },

  colorCodeToNumber:function(color) {
    switch (color) {
      case "c1":
        return 0
        break
      case "c2":
        return 1
        break
      case "c3":
        return 2
        break
      case "c4":
        return 3
    }


  },
  highScore: function() {
    if (level > highScore) {
      highScore = level;
      localStorage.setItem('highScore', highScore);
    }
  }
}
