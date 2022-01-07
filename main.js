const c1 = document.getElementById("c1"),
      c2 = document.getElementById("c2"),
      c3 = document.getElementById("c3"),
      c4 = document.getElementById("c4"),
      maxLevel = 10000;
      scoreKeeper = document.getElementById("score"),
      startButton = document.getElementById("startButton"),
      highScore = document.getElementById("HighScore");
var game, level = 1, subLevel = 0, score = 0
function start() {
   startButton.classList.add("hidden")
   generateGame()
   colors()
   addEvents()
      }
    const colors = () => {
    removeEvents()
    let i
    for (let i = 0; i < level; i++) {
        switch(game[i]) {
            case 0:
                setTimeout(() => longLight(c1), 1000 * i)
                break
            case 1:
                setTimeout(() => longLight(c2), 1000 * i)
                break
            case 2:
                setTimeout(() => longLight(c3), 1000 * i)
                break
            case 3:
                setTimeout(() => longLight(c4), 1000 * i)
                break
        }
    }
    setTimeout(() => addEvents(), 1000 * i + 1)
}
const changeColor = event => {
    shortLight(event.target);
    (colorNum(event.target.dataset.color) == game[subLevel])
    ? win()
    : lose()
}

const addEvents = () => {
    c1.addEventListener("click", changeColor)
    c2.addEventListener("click", changeColor)
    c3.addEventListener("click", changeColor)
    c4.addEventListener("click", changeColor)
}

const removeEvents = () => {
    c1.removeEventListener("click", changeColor)
    c2.removeEventListener("click", changeColor)
    c3.removeEventListener("click", changeColor)
    c4.removeEventListener("click", changeColor)
}

const win = () => {
    subLevel++
    if (subLevel == level) {
        subLevel = 0; score += 100; level++
        scoreKeeper.innerHTML = score
        setTimeout(() => colors(), 1000)
    }
}
const lose = () => {
    score = 0; subLevel = 0; level = 1
    scoreKeeper.innerHTML = score
    swal("", "Game Over", "error")
    generateGame()
    removeEvents()
    startButton.classList.remove("hidden")
}

const generateGame = () => {
    game = new Array(maxLevel).fill(0).map(n => Math.floor(Math.random() * 4))
}

const longLight = color => {
    color.classList.add("light")
    setTimeout(() => color.classList.remove("light"), 600)
}
const shortLight = color => {
    color.classList.add("light")
    setTimeout(() => color.classList.remove("light"), 200)
}

const colorNum = color => {
    switch(color) {
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

  function highScore(){
    if (level > highScore) {
      highScore = level;
       localStorage.setItem('highScore', highScore);
    }
  }
}
