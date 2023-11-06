let HOLE_HEIGHT = 250
let PIPE_INTERVAL_VARIANT = 200
let PIPE_INTERVAL_MIN = 700
let PIPES_SPEED = .5
let PIPE_WIDTH = 50

let pipes = []
let timeSinceLastPipe = PIPE_INTERVAL_VARIANT
let passPipeCount = 0

const container = document.querySelector('.container')
const countElem = document.querySelector('.counter')


export function setUpPipes(){
    HOLE_HEIGHT = 250
    PIPES_SPEED = .5
    PIPE_INTERVAL_MIN = 700
    document.documentElement.style.setProperty('--hole-height', HOLE_HEIGHT)
    pipes.forEach(pipe=> pipe.remove())
    timeSinceLastPipe = PIPE_INTERVAL_VARIANT
    passPipeCount = 0
}
export function updatePipes(delta){
    timeSinceLastPipe += delta
    let interval = (randomNumber(0, 10) * PIPE_INTERVAL_VARIANT) + PIPE_INTERVAL_MIN
    if(timeSinceLastPipe > PIPE_INTERVAL_VARIANT){
        timeSinceLastPipe -= interval
        createPipe()
    }
    pipes.forEach(pipe=>{
        if(pipe.left + pipe.width() < 0){
            passPipeCount++
            countElem.textContent = passPipeCount
            return pipe.remove()  
        }
        pipe.left = pipe.left - (delta * PIPES_SPEED)
    })
    //increase difficulty
    if(passPipeCount > 10){
        HOLE_HEIGHT = 180
        document.documentElement.style.setProperty('--hole-height', HOLE_HEIGHT)
    }else if(passPipeCount > 20){
        PIPES_SPEED = .5
        PIPE_INTERVAL_MIN = 400
    }else if(passPipeCount > 30){
        PIPES_SPEED = .6
        HOLE_HEIGHT = 170
        document.documentElement.style.setProperty('--hole-height', HOLE_HEIGHT)
    }else if(passPipe > 40){
        PIPE_INTERVAL_MIN = 250
        HOLE_HEIGHT = 160
        document.documentElement.style.setProperty('--hole-height', HOLE_HEIGHT)
    }
}
export function passPipe(){
    return passPipeCount
}
export function getPipeRect(){
    return pipes.flatMap(pipe=> pipe.rect())
}

function createPipe(){
    const pipeElem = document.createElement('div')
    const topElem = createPipeSegment('top')
    const bottomElem = createPipeSegment('bottom')
    pipeElem.append(topElem)
    pipeElem.append(bottomElem)
    pipeElem.classList.add('pipe')
    pipeElem.style.setProperty('--hole-top', 
        randomNumber(HOLE_HEIGHT * 1.2, window.innerHeight - (HOLE_HEIGHT * 2)))
    pipeElem.style.width = `${randomNumber(1, 3) * PIPE_WIDTH}px`
    
    const pipe ={
        get left(){
            return parseFloat(getComputedStyle(pipeElem)
            .getPropertyValue('--pipe-left'))
        },
        set left(value){
            pipeElem.style.setProperty('--pipe-left', value)
        },
        width(){
            const regex = /\d+/
            let num = regex.exec(getComputedStyle(pipeElem).getPropertyValue('width'))
            return Number(num[0])
        },
        remove(){
            pipes = pipes.filter(p => p !== pipe)
            pipeElem.remove()
        },
        rect(){
            return [ topElem.getBoundingClientRect(),
                     bottomElem.getBoundingClientRect()]
        }
    }
    pipe.left = window.innerWidth
    container.append(pipeElem)
    pipes.push(pipe)
}

function createPipeSegment(position){
    const segment = document.createElement('div')
    segment.classList.add('segment', position)
    return segment
}

function randomNumber(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}
