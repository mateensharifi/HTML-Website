const c1 = document.getElementById("c1"),
      c2 = document.getElementById("c2"),
      c3 = document.getElementById("c3"),
      c4 = document.getElementById("c4"),
      scoreKeeper = document.getElementById("score"),
      startButton = document.getElementById("startButton"),
      var game, level = 1, subLevel = 0, score = 0
      function start(){
        playButton.classList.add("hidden")
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
                setTimeout(() => longLightUp(c1), 1000 * i)
                break
            case 1:
                setTimeout(() => longLightUp(c2), 1000 * i)
                break
            case 2:
                setTimeout(() => longLightUp(c3), 1000 * i)
                break
            case 3:
                setTimeout(() => longLightUp(c4), 1000 * i)
                break
        }
    }
    setTimeout(() => addEvents(), 1000 * i + 1)
}
const pickColor = event => {
    shortLightUp(event.target);
    (colorToNumber(event.target.dataset.color) == game[subLevel])
    ? win()
    : lose()
}

const addEvents = () => {
    c1.addEventListener("click", pickColor)
    c2.addEventListener("click", pickColor)
    c3.addEventListener("click", pickColor)
    c4.addEventListener("click", pickColor)
}

}
const removeEvents = () => {
    c1.removeEventListener("click", pickColor)
    c2.removeEventListener("click", pickColor)
    c3.removeEventListener("click", pickColor)
    c4.removeEventListener("click", pickColor)
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
