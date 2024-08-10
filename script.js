const nowPlaying = document.getElementById("now-playing");
const songList = document.getElementById("song-list");
const playPauseBtn = document.getElementById("play-pause-btn");

let currentAudio = null;
let currentAudioId = null;
let isPlaying = false;

const audios = ["Guren no Yumiya", "Jiyuu no Tsubasa", "Shinzou wo Sasageyo"];

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
  currentAudio = new Audio(`./assets/sounds/${songId}.mp3`);
  currentAudioId = songId;
  currentAudio.play();

  currentAudio.onended = () => {
    const nextSongId = songId % audios.length;
    playSong(nextSongId);
  };
};

const togglePlayPause = () => {
  if (!currentAudio) {
    playSong(0);
  }

  if (isPlaying) {
    playPauseBtn.style.background = "green";

    currentAudio.pause();
    playPauseBtn.innerText = "Play";
  } else {
    playPauseBtn.style.background = "red";
    currentAudio.play();
    playPauseBtn.innerText = "Pause";
  }

  isPlaying = !isPlaying;
};

playPauseBtn.addEventListener("click", togglePlayPause);
