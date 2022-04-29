const trackImage= document.querySelector('img');
const titleTrack = document.getElementById('title');
const artist = document.getElementById('artist');
const audioElement = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeElement = document.getElementById('current-time');
const durationElement = document.getElementById('duration');
const prevButton = document.getElementById('prev');
const playButton = document.getElementById('play');
const nextButton = document.getElementById('next');

// Music tracks
const songs = [
    {
        name: 'jacinto-1',
        titleName: 'Electric Chill Machine',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-2',
        titleName: 'Seven Nation Army(Remix)',
        artist: 'Jacinto Design'        
    },
    {
        name: 'jacinto-3',
        titleName: 'Goodnight, Disco Queen',
        artist: 'Jacinto Design'        
    },
    {
        name: 'metric-1',
        titleName: 'Front Row (Remix)',
        artist: 'Metric/Jacinto Design'        
    },
]

// boolean to check the play/pause status of the music player
let isPlaying = false;

// Play
const playSong = () => {
    isPlaying = true;
    playButton.classList.replace('fa-play', 'fa-pause');
    playButton.setAttribute('title', 'Pause');
    audioElement.play();
}

// Pause
const pauseSong = () => {
    isPlaying = false;
    playButton.classList.replace('fa-pause', 'fa-play');
    audioElement.pause();
}

// Update DOM
const loadSong = (song) => {
    titleTrack.textContent = song.titleName;
    artist.textContent = song.artist;
    audioElement.src = `music/${song.name}.mp3`;
    trackImage.src= `img/${song.name}.jpg`;
}

// current song index
let songIndex = 0;

const prevSong = () => {
    songIndex--;

    if(songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);
    playSong();
}

const nextSong = () => {
    songIndex++;

    if(songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);
    playSong();
}

// Update progress bar and time
const updateProgressBar = (e) => {
    if(isPlaying) {
        const {duration, currentTime} = e.srcElement;

        // update the progressBar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        // Calculate the total duration of the song
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if(durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }

        // Delay Switching duration Element to avoid NaN
        if(durationSeconds) {
            durationElement.textContent = `${durationMinutes}:${durationSeconds}`;
        }

        // Calculate the current duration of the song
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if(currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }

        currentTimeElement.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

const setProgressBar = (e) => {
    const width = e.srcElement.clientWidth;
    const clickX = e.offsetX;

    const {duration} = audioElement;
    audioElement.currentTime = (clickX / width) * duration;

}

// Event Listeners

// Play or Pause event listener
playButton.addEventListener('click', () => isPlaying ? pauseSong() : playSong());
prevButton.addEventListener('click', prevSong);
nextButton.addEventListener('click', nextSong);
audioElement.addEventListener('timeupdate', updateProgressBar);
audioElement.addEventListener('ended', nextSong);
progressContainer.addEventListener('click', setProgressBar);

// On Load - Select first song
loadSong(songs[songIndex]);

