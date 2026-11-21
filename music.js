const song = document.getElementById("song");
const playBtn = document.querySelector(".player-inner");
const nextBtn = document.querySelector(".play-forward");
const prevBtn = document.querySelector(".play-back");
const rangeBar = document.querySelector(".range");
const durationTime = document.querySelector(".duration");
const remainingTime = document.querySelector(".remaining");
const musicName = document.querySelector(".music-name");
const musicImage = document.querySelector(".music-thumb img");
const musicThumbnail = document.querySelector(".music-thumb");
const playRepeat = document.querySelector(".play-repeat");
const playlist = document.getElementById("playlist");

let indexSong = 0;
let isPlaying = false;
let isRepeat = false;

const musics = [
  {
    title: "Holo",
    file: "holo.mp3",
    image: "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?auto=format&fit=crop&w=500&q=80"
  },
  {
    title: "Summer",
    file: "summer.mp3",
    image: "https://images.unsplash.com/photo-1616763355548-1b606f439f86?auto=format&fit=crop&w=500&q=80"
  },
  {
    title: "Thiếu niên hoa hồng - 玫瑰少年",
    file: "thieu-nien-hoa-hong.mp3",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=500&q=80"
  },
  {
    title: "HỒNG NHAN",
    file: "hong-nhan.mp3",
    image: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=500&q=80"
  },
  {
    title: "golden hour",
    file: "golden-hour.mp3",
    image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=500&q=80"
  },
  {
    title: "Daylight",
    file: "daylight.mp3",
    image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=500&q=80"
  }
];

function displayPlaylist() {
  playlist.innerHTML = "";

  musics.forEach((music, index) => {
    const item = document.createElement("div");

    item.className = "playlist-item";

    if (index === indexSong) {
      item.classList.add("active");
    }

    item.innerHTML = `
      <div class="playlist-title">${music.title}</div>
    `;

    item.addEventListener("click", () => {
      indexSong = index;
      loadSong(indexSong);
      playSong();
    });

    playlist.appendChild(item);
  });
}

function loadSong(index) {
  const music = musics[index];

  song.src = "./" + music.file;

  musicName.textContent = music.title;
  musicImage.src = music.image;

  rangeBar.value = 0;
  rangeBar.max = 0;

  remainingTime.textContent = "00:00";
  durationTime.textContent = "00:00";

  song.load();

  displayPlaylist();
}

function playSong() {
  song.play()
    .then(() => {
      isPlaying = true;
      musicThumbnail.classList.add("is-playing");

      playBtn.innerHTML = `
        <ion-icon name="pause"></ion-icon>
      `;
    })
    .catch(() => {
      alert("Không thể phát nhạc. Kiểm tra lại file MP3.");
    });
}

function pauseSong() {
  song.pause();

  isPlaying = false;

  musicThumbnail.classList.remove("is-playing");

  playBtn.innerHTML = `
    <ion-icon name="play"></ion-icon>
  `;
}

playBtn.addEventListener("click", () => {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

nextBtn.addEventListener("click", () => {
  indexSong++;

  if (indexSong >= musics.length) {
    indexSong = 0;
  }

  loadSong(indexSong);
  playSong();
});

prevBtn.addEventListener("click", () => {
  indexSong--;

  if (indexSong < 0) {
    indexSong = musics.length - 1;
  }

  loadSong(indexSong);
  playSong();
});

playRepeat.addEventListener("click", () => {
  isRepeat = !isRepeat;

  if (isRepeat) {
    playRepeat.classList.add("active");
  } else {
    playRepeat.classList.remove("active");
  }
});

song.addEventListener("loadedmetadata", () => {
  rangeBar.max = song.duration;
  durationTime.textContent = formatTime(song.duration);
});

song.addEventListener("timeupdate", () => {
  rangeBar.value = song.currentTime;
  remainingTime.textContent = formatTime(song.currentTime);
});

rangeBar.addEventListener("input", () => {
  song.currentTime = rangeBar.value;
});

song.addEventListener("ended", () => {
  if (isRepeat) {
    song.currentTime = 0;
    playSong();
  } else {
    indexSong++;

    if (indexSong >= musics.length) {
      indexSong = 0;
    }

    loadSong(indexSong);
    playSong();
  }
});

function formatTime(time) {
  if (!time || isNaN(time)) {
    return "00:00";
  }

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return (
    (minutes < 10 ? "0" + minutes : minutes) +
    ":" +
    (seconds < 10 ? "0" + seconds : seconds)
  );
}

loadSong(indexSong);
