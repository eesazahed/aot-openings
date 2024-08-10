const main = document.querySelector("main");
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
  currentAudio.play();

  isPlaying = true;

  playPauseBtn.innerHTML = "&#x23F8;";

  currentAudio.onended = () => {
    const nextSongId = currentAudioId % audios.length;
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
