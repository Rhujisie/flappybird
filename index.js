import { updateBird, setUpBird, getBirdRect} from "./bird.js"
import {updatePipes,setUpPipes, passPipe, getPipeRect} from './pipe.js'

const container = document.querySelector('.container')
const title = document.querySelector('.title')
const subtitle1 = document.querySelector('.subtitle1')
const subtitle2 = document.querySelector('.subtitle2')
const countElem = document.querySelector('.counter')

document.addEventListener('keypress', handleStart, {once: true})

let lastTime
function updateLoop(time){
    if(!lastTime){
        lastTime = time
        window.requestAnimationFrame(updateLoop)
        return
    }
    const delta = time - lastTime
    updateBird(delta)
    updatePipes(delta)
    if(checkLose()) return handleLose()
    lastTime = time
    window.requestAnimationFrame(updateLoop)
}

//start game
function handleStart(){
    title.classList.add('hide')
    container.classList.remove('red')
    setUpBird()
    setUpPipes()
    countElem.textContent = 0
    lastTime = null
    window.requestAnimationFrame(updateLoop)
}
// handle game end
function handleLose(){
    let result = passPipe()
    container.classList.add('red')
    title.classList.remove('hide')
    subtitle1.textContent = 'Game over !!!'
    subtitle2.textContent = result
    setTimeout(()=>{
        subtitle1.textContent = 'Press any key to restart'
        document.addEventListener('keypress', handleStart, {once: true})
    }, 1000)
}
//check lose
function checkLose(){
    let birdRect = getBirdRect()
    const outside = birdRect.top < 0 || birdRect.bottom > window.innerHeight
    const collide = getPipeRect().some(rect => isCollision(birdRect, rect))
    return outside || collide
}

function isCollision(rect1, rect2) {
    return (
      rect1.left < rect2.right &&
      rect1.top < rect2.bottom &&
      rect1.right > rect2.left &&
      rect1.bottom > rect2.top
    )
  }

