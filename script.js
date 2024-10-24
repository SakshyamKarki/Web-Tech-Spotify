console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: "Kasturi - Arijit Singh", filePath: "songs/1.mp3", coverPath: "cover/1.jpg" },
    { songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "cover/2.jpg" },
    { songName: "Invincible - DEAF KEV", filePath: "songs/3.mp3", coverPath: "cover/3.jpg" },
    { songName: "My Heart - Different Heaven", filePath: "songs/4.mp3", coverPath: "cover/4.jpg" },
    { songName: "Heroes Tonight - Janji", filePath: "songs/5.mp3", coverPath: "cover/5.jpg" }
];

// Update song item details
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove("fa-regular", "fa-circle-play", "fa-2xl"); // Remove previous play classes
        masterPlay.classList.add("fa-regular", "fa-circle-pause", "fa-2xl"); // Add pause classes
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove("fa-regular", "fa-circle-pause", "fa-2xl"); // Remove pause classes
        masterPlay.classList.add("fa-regular", "fa-circle-play", "fa-2xl"); // Add play classes
        gif.style.opacity = 0;
    }
});

// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    // Update Seekbar
    const progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value / 100) * audioElement.duration;
});

// Function to make all song play buttons show play icon
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove("fa-regular", "fa-circle-pause", "fa-2xl"); // Remove pause classes
        element.classList.add("fa-regular", "fa-circle-play", "fa-2xl"); // Add play classes
    });
};

// Add event listeners for individual song play buttons
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove("fa-regular", "fa-circle-play", "fa-2xl"); // Remove play classes
        e.target.classList.add("fa-regular", "fa-circle-pause", "fa-2xl"); // Add pause classes
        audioElement.src = songs[songIndex].filePath; // Use the filePath from the songs array
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove("fa-regular", "fa-circle-play", "fa-2xl"); // Remove play classes
        masterPlay.classList.add("fa-regular", "fa-circle-pause", "fa-2xl"); // Add pause classes
    });
});

// Next song functionality
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex >= songs.length - 1) ? 0 : songIndex + 1; // Wrap around to the first song
    audioElement.src = songs[songIndex].filePath; // Use the filePath from the songs array
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-regular", "fa-circle-play", "fa-2xl"); // Remove play classes
    masterPlay.classList.add("fa-regular", "fa-circle-pause", "fa-2xl"); // Add pause classes
});

// Previous song functionality
document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex <= 0) ? 0 : songIndex - 1; // Don't go below the first song
    audioElement.src = songs[songIndex].filePath; // Use the filePath from the songs array
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-regular", "fa-circle-play", "fa-2xl"); // Remove play classes
    masterPlay.classList.add("fa-regular", "fa-circle-pause", "fa-2xl"); // Add pause classes
});
