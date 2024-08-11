const main = document.querySelector("main");

const nowPlaying = document.getElementById("now-playing");
const songList = document.getElementById("song-list");

const playPauseBtn = document.getElementById("play-pause-btn");
const backBtn = document.getElementById("back-btn");
const nextBtn = document.getElementById("next-btn");

const currentAudioTime = document.getElementById("current-audio");
const audioLength = document.getElementById("audio-length");

const aot = document.getElementById("aot");

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

document.addEventListener("DOMContentLoaded", () => {
  const randomNumber = Math.floor(Math.random() * 4) + 1;
  main.style.backgroundImage = `url("./assets/images/aot${randomNumber}.gif")`;
});

audios.forEach((audioName, index) => {
  let songListItem = document.createElement("p");

  songListItem.innerHTML = `${audioName} <span class="song-list-index">${
    index + 1
  }</span>`;
  songListItem.setAttribute("class", "song-list-item");
  songListItem.setAttribute("id", index);
  songListItem.onclick = () => playSong(index);

  songList.append(songListItem);
});

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
};

const update = () => {
  if (currentAudio && !isNaN(currentAudio.duration)) {
    currentAudioTime.innerText = formatTime(currentAudio.currentTime);
    audioLength.innerText = formatTime(currentAudio.duration);
  }
};

const playSong = (songId) => {
  currentAudioId = songId;

  if (nowPlaying.style.opacity !== 1) {
    nowPlaying.style.opacity = 1;
  }

  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  document.title = `${audios[currentAudioId]} - Attack on Titan (Shingeki no Kyojin) Openings`;
  nowPlaying.innerText = audios[currentAudioId];

  currentAudioId === 6
    ? nowPlaying.setAttribute("class", "rumble")
    : nowPlaying.classList.remove("rumble");

  currentAudio = new Audio(`./assets/sounds/${currentAudioId}.mp3`);
  currentAudio.addEventListener("loadedmetadata", update);
  currentAudio.addEventListener("timeupdate", update);
  currentAudio.play();

  isPlaying = true;

  playPauseBtn.innerHTML = "&#x23F8;";

  currentAudio.onended = () => {
    const nextSongId =
      currentAudioId !== audios.length - 1 ? currentAudioId + 1 : 0;
    playSong(nextSongId);
  };

  const lastActiveSong = document.querySelector(".active-song");
  if (lastActiveSong) {
    lastActiveSong.classList.remove("active-song");
  }

  document.getElementById(currentAudioId).classList.add("active-song");
};

const togglePlayBtn = () => {
  if (!currentAudio) {
    playSong(0);
  } else {
    if (isPlaying) {
      currentAudio.pause();
      playPauseBtn.innerHTML = "&#x23F5;";

      if (currentAudioId === 6) nowPlaying.classList.remove("rumble");
    } else {
      currentAudio.play();
      playPauseBtn.innerHTML = "&#x23F8;";

      if (currentAudioId === 6) nowPlaying.setAttribute("class", "rumble");
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

aot.addEventListener("mouseover", (e) => {
  aot.innerHTML = "Shingeki no Kyojin";
});

aot.addEventListener("mouseout", (e) => {
  aot.innerHTML = "Attack on Titan";
});
