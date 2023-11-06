const bird = document.querySelector('.bird')
const BIRD_SPEED = .3
let timeSinceLastJump = Infinity
const JUMP_DURATION = 140

export function setUpBird(){
    setTop(280)
    document.removeEventListener('keydown', handleJump)
    document.addEventListener('keydown', handleJump)
}
export function updateBird(delta){
    if(timeSinceLastJump < JUMP_DURATION){
        setTop(getTop() - BIRD_SPEED * delta)
    }else{
        setTop(getTop() + BIRD_SPEED * delta)
    }
    timeSinceLastJump += delta
}
export function getBirdRect(){
    return bird.getBoundingClientRect()
}

function setTop(top){
    bird.style.setProperty('--bird-top', top)
}

function getTop(){
    return parseFloat(getComputedStyle(bird).getPropertyValue('--bird-top'))
}

function handleJump(e){
    if(e.code !== 'Space') return
    timeSinceLastJump = 0
}