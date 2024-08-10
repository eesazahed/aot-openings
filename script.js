const nowPlaying = document.getElementById("now-playing");
const songList = document.getElementById("song-list");
const playPauseBtn = document.getElementById("play-pause-btn");
const backBtn = document.getElementById("back-btn");
const nextBtn = document.getElementById("next-btn");

let currentAudio = null;
let currentAudioId = null;
let isPlaying = false;

const audios = [
  "Guren no Yumiya",
  "Jiyuu no Tsubasa",
  "Shinzou wo Sasageyo",
  "Red Swan",
  "Shoukei To Shikabane No Michi",
  "My War",
  "The Rumbling",
];

audios.forEach((audioName) => {
  const songId = audios.indexOf(audioName);

  let songListItem = document.createElement("p");
  songListItem.innerText = audioName;
  songListItem.setAttribute("class", "song-list-item");
  songListItem.onclick = () => playSong(songId);
  songList.append(songListItem);
});

const playSong = (songId) => {
  if (nowPlaying.style.opacity !== 1) {
    nowPlaying.style.opacity = 1;
  }

  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  nowPlaying.innerText = `OP ${songId + 1}: ${audios[songId]}`;

  songId === 6
    ? nowPlaying.setAttribute("class", "rumble")
    : nowPlaying.classList.remove("rumble");

  currentAudio = new Audio(`./assets/sounds/${songId}.mp3`);
  currentAudioId = songId;
  currentAudio.play();

  isPlaying = true;

  playPauseBtn.style.background = "darkgreen";
  playPauseBtn.innerText = "Pause";

  currentAudio.onended = () => {
    const nextSongId = songId % audios.length;
    playSong(nextSongId);
  };
};

const togglePlayBtn = () => {
  if (!currentAudio) {
    playSong(0);
  } else {
    if (isPlaying) {
      playPauseBtn.style.background = "green";
      currentAudio.pause();
      playPauseBtn.innerText = "Play";
    } else {
      playPauseBtn.style.background = "darkgreen";
      currentAudio.play();
      playPauseBtn.innerText = "Pause";
    }

    isPlaying = !isPlaying;
  }
};

playPauseBtn.addEventListener("click", togglePlayBtn);

backBtn.addEventListener("click", () => {
  if (!currentAudio || currentAudioId === 0) {
    playSong(audios.length - 1);
  } else {
    playSong(currentAudioId - 1);
  }
});

nextBtn.addEventListener("click", () => {
  if (!currentAudio || currentAudioId === audios.length - 1) {
    playSong(0);
  } else {
    playSong(currentAudioId + 1);
  }
});
