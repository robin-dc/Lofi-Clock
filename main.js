
// =================================================== LOADING SCREEN ==================================================
const load = document.querySelector(".loading")

setTimeout(()=>{
    load.style.display = 'none'
}, 3000)


// ================================================== DIGITAL CLOCK =====================================================
function displayTime(){
    var dateTime = new Date();
    var hrs = dateTime.getHours();
    var min = dateTime.getMinutes();
    var sec = dateTime.getSeconds();
    let session = document.getElementById('sessions');

    if(hrs >= 12){
        session.innerHTML = 'PM';
    }
    else{
        session.innerHTML = 'AM';
    }

    if(hrs > 12){
        hrs = hrs - 12
    }


    let leadhrs = 0;
    let leadmin = 0;
    let leadsec = 0;

    if(hrs < 10){
        leadhrs = "0" + hrs.toString();
    }
    else{
        leadhrs = hrs
    }
    if(min < 10){
        leadmin = "0" + min.toString();
    }
    else{
        leadmin = min
    }
    if(sec < 10){
        leadsec = "0" + sec.toString();
    }
    else{
        leadsec = sec
    }
    document.getElementById('hours').innerHTML = leadhrs;
    document.getElementById('minutes').innerHTML = leadmin;
    document.getElementById('seconds').innerHTML = leadsec;

}
setInterval(displayTime, 10);

// =============================================== FOR FULL SCREEN ====================================================
let fullscreen = document.querySelector(".zoom");
var el = document.documentElement;
let isFullScreen = false

fullscreen.addEventListener('click', function(){
    isFullScreen ? exitFullScreen() : fullScreen()
    fullscreen.addEventListener('keypress', function(e){
        if(e.key === "Escape"){
            exitFullScreen()
        }
        else{
            fullScreen()
        }
    })
})


function fullScreen(){
    isFullScreen = true;
    el.requestFullscreen()
    fullscreen.innerHTML = `
            <i class="fa-solid fa-compress" id="exit-full"></i>
            <p class="tooltip">ZOOM OUT</p>
    `

}
function exitFullScreen(){
    isFullScreen = false;
    document.exitFullscreen()
    fullscreen.innerHTML = `
    <i class="fa-solid fa-expand" id="fullscreen"></i>
    <p class="tooltip">ZOOM IN</p>
`

}


// ================================================== FOR MUSIC ========================================================
let buttonPlay = document.querySelector(".button2")
let music = document.createElement('audio')
let waves = document.querySelector('.waves')

music.src = 'music/sour grapes.m4a'

let isPlaying = false

buttonPlay.addEventListener('click', function(){
    isPlaying ? pauseTrack() : playTrack()
})
function playTrack(){
    isPlaying = true;
    buttonPlay.innerHTML = `<i class="fa-solid fa-headphones"></i>`
    buttonPlay.style.color = '#10b98194'
    buttonPlay.classList.add('active')
    music.play()
    waves.innerHTML = '<img src="img/wave.gif" class="waves"/>'
}
function pauseTrack(){
    isPlaying = false;
    buttonPlay.innerHTML = '<i class="fa fa-play"></i>'
    buttonPlay.classList.remove('active')
    buttonPlay.style.color = 'white'
    music.pause()
    waves.innerHTML = ' '
}
buttonPlay.addEventListener('keydown', function(){
    if(e.key === 32){
        pauseTrack()
    }
})

// ================================================== FOR TODO LIST ===================================================
let postNote = document.getElementById("post-note")
let todoContainer = document.querySelector(".todo-container")
const btnAdd = document.querySelector('#btn-add')


postNote.addEventListener('keypress', function(e){
    if(e.key === "Enter"){
        addTodo()
    }
})

// btnAdd.addEventListener('click', function(){
//     addTodo()
// })

let storage = []
let local = []

let localStorageList = JSON.parse(localStorage.getItem("List"))

if(localStorageList){
    local = localStorageList
    storage = local
    addItem()

}
function addTodo(){

        if(postNote.value === ""){
            const toast = document.querySelector('.toast')
            toast.classList.add('active')
            setTimeout(function(){
                toast.classList.remove('active')
            }, 2000)
        }
        else{
            storage = []
            storage.push(postNote.value)
            local.push(postNote.value)
            addItem()
            postNote.value = ""
            localStorage.setItem("List", JSON.stringify(local))
        }
}

function addItem(){
    for(let i = 0; i < storage.length; i++){
        newNote = document.createElement('div');
        newNote.classList.add('new-note')
        newNote.innerHTML = `<div class="todo-text">
        ${storage[i]}</div>
        <div class="todo-buttons">
            <i class="fa-solid fa-check btn-check"></i>
            <i class="fa-solid fa-trash-can btn-del"></i>
        </div>`
        todoContainer.appendChild(newNote)
    }
    const btnCheck = document.querySelectorAll('.btn-check')

    btnCheck.forEach(function(check){
        check.addEventListener('click', function(e){
            let eText = e.currentTarget.parentElement.previousElementSibling
            eText.classList.toggle("active")

        })
    })

    const btnDelete = document.querySelectorAll('.btn-del')
    btnDelete.forEach(function(check){
        check.addEventListener('click', function(e){
            let noteText = e.currentTarget.parentElement.previousElementSibling.innerText
            let eText = e.currentTarget.parentElement.parentElement
            eText.classList.add("active")
            console.log("localstorage: "+ localStorageList)
            console.log("html: "+ noteText)
            for(let i = 0; i < local.length; i++){
                if(noteText.toLowerCase() == local[i]){
                    console.log("localitem: "+ local[i])
                    console.log("local: "+ local)
                    local.splice(i,1)
                    localStorage.clear()
                    localStorage.setItem("List", JSON.stringify(local))
                }
            }
        })
    })
}
