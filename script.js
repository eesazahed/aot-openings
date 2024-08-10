const button = document.querySelector("#play");
const nowPlaying = document.querySelector("#now-playing");

let currentAudio = null;

const audios = {
  1: "Guren no Yumiya",
};

button.addEventListener("click", () => {
  if (nowPlaying.style.opacity !== 1) {
    nowPlaying.style.opacity = 1;
  }

  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  const audioId = 1;

  nowPlaying.innerText = `OP ${1}: ${audios[audioId]}`;
  currentAudio = new Audio(`./assets/sounds/${audioId}.mp3`);
  currentAudio.play();
});
