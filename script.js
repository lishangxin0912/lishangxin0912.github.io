let container = document.getElementById("container");
let imgContainer = document.getElementById("img-container");
let img = document.querySelector("img");
let songName = document.getElementById("song-name");
let singer = document.getElementById("singer");
let progressContainer = document.getElementById("progress-container");
let progress = document.getElementById("progress");
let durationWrapper = document.getElementById("duration-wrapper");
let currentTimeEl = document.getElementById("current-time");
let durationEl = document.getElementById("duration");
let playerControl = document.getElementById("player-control");
let pre = document.getElementById("pre");
let play = document.getElementById("play");
let next = document.getElementById("next");
let music = document.querySelector("audio");

const songs = [
    {
        name: "Next to you",
        displayName: "Next to you",
        artist: "Cat Trumpet",
    },
    {
        name: "Limbs of Faith",
        displayName: "Limbs of Faith",
        artist: "Beauvois",
    },
    {
        name: "Wings of Piano",
        displayName: "Wings of Piano",
        artist: "V.K克",
    }
]

let playing = false;

function playSong() {
    playing = true;
    play.classList.replace("fa-play", "fa-pause");
    music.play();
}

function pauseSong() {
    playing = false;
    play.classList.replace("fa-pause", "fa-play");
    music.pause();
}

play.addEventListener('click', () => (playing ? pauseSong() : playSong()));

function loadSong(song) {
    songName.textContent = song.displayName;
    singer.innerText = song.artist;
    music.src = song.name + ".mp3";
    img.src = song.name + ".jpeg";
}

let songIndex = 0;
loadSong(songs[songIndex]);

function preSong() {
    songIndex--;
    if (songIndex < 0) songIndex = songs.length - 1;
    loadSong(songs[songIndex]);
    playSong();
}

function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) songIndex = 0;
    loadSong(songs[songIndex]);
    playSong();
}

function updateProgress(e) {
    if (playing) {
        let { duration, currentTime } = e.srcElement;
        let progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        let currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);

        if (currentSeconds < 10) currentSeconds = `0${currentSeconds}`;

        let durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);

        if (durationSeconds < 10) durationSeconds = `0${durationSeconds}`;
    
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
        durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
}

function setProgress(e) {
    let width = this.clientWidth;
    let clickX = e.offsetX;
    let { duration } = music;
    music.currentTime = (clickX / width) * duration;
}

pre.addEventListener('click', preSong);
next.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);


