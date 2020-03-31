const initialize = () => {
  const player = document.querySelector("#player");
  const playlist = document.querySelector("#playlist");
  const mediaPath = "https://archive.org/download/mythium/";
  const tracks = [
    {
      track: 1,
      name: "All This Is - Joe L.'s Studio",
      duration: "2:46",
      file: "JLS_ATI.mp3"
    },
    {
      track: 2,
      name: "The Forsaken - Broadwing Studio (Final Mix)",
      duration: "8:30",
      file: "BS_TF.mp3"
    },
    {
      track: 3,
      name: "All The King's Men - Broadwing Studio (Final Mix)",
      duration: "5:01",
      file: "BS_ATKM.mp3"
    },
    {
      track: 4,
      name: "The Forsaken - Broadwing Studio (First Mix)",
      duration: "8:31",
      file: "BSFM_TF.mp3"
    },
    {
      track: 5,
      name: "All The King's Men - Broadwing Studio (First Mix)",
      duration: "5:05",
      file: "BSFM_ATKM.mp3"
    },
    {
      track: 6,
      name: "All This Is - Alternate Cuts",
      duration: "2:48",
      file: "AC_ATI.mp3"
    },
    {
      track: 7,
      name: "All The King's Men (Take 1) - Alternate Cuts",
      duration: "5:44",
      file: "AC_ATKMTake_1.mp3"
    },
    {
      track: 8,
      name: "All The King's Men (Take 2) - Alternate Cuts",
      duration: "5:26",
      file: "AC_ATKMTake_2.mp3"
    },
    {
      track: 9,
      name: "Magus - Alternate Cuts",
      duration: "5:46",
      file: "AC_M.mp3"
    },
    {
      track: 10,
      name: "The State Of Wearing Address (fucked up) - Alternate Cuts",
      duration: "5:25",
      file: "AC_TSOWAfucked_up.mp3"
    },
    {
      track: 11,
      name: "Magus - Popeye's (New Years '04 - '05)",
      duration: "5:53",
      file: "PNY04-05_M.mp3"
    },
    {
      track: 12,
      name: "On The Waterfront - Popeye's (New Years '04 - '05)",
      duration: "4:40",
      file: "PNY04-05_OTW.mp3"
    },
    {
      track: 13,
      name: "Trance - Popeye's (New Years '04 - '05)",
      duration: "13:15",
      file: "PNY04-05_T.mp3"
    },
    {
      track: 14,
      name: "The Forsaken - Popeye's (New Years '04 - '05)",
      duration: "8:12",
      file: "PNY04-05_TF.mp3"
    },
    {
      track: 15,
      name: "The State Of Wearing Address - Popeye's (New Years '04 - '05)",
      duration: "7:02",
      file: "PNY04-05_TSOWA.mp3"
    },
    {
      track: 16,
      name: "Magus - Popeye's (Valentine's Day '05)",
      duration: "5:43",
      file: "PVD_M.mp3"
    },
    {
      track: 17,
      name: "Trance - Popeye's (Valentine's Day '05)",
      duration: "10:45",
      file: "PVD_T.mp3"
    },
    {
      track: 18,
      name: "The State Of Wearing Address - Popeye's (Valentine's Day '05)",
      duration: "5:36",
      file: "PVD_TSOWA.mp3"
    },
    {
      track: 19,
      name: "All This Is - Smith St. Basement (01/08/04)",
      duration: "2:48",
      file: "SSB01_08_04_ATI.mp3"
    }
  ];

  const playlistItems = tracks.map(({ track, name, duration, file }) => {
    return `<li class="playlist-item" id=${"playlist-item-".concat(
      track
    )} data-length=${duration} data-track=${mediaPath.concat(
      file
    )}><span>#${track}</span> ${name}</li>`;
  });

  playlist.innerHTML = playlistItems.join("");

  const handlePlay = music => {
    player.pause();
    player.setAttribute("src", music);
    player.load();
    player.play();
  };

  const handleStop = () => {
    player.pause();
    player.setAttribute("src", "");
  };

  // setup player
  playlist.addEventListener("click", e => {
    // console.log(Array.from(e.target.classList).includes('playlist-item'))
    if (Array.from(e.target.classList).includes("playlist-item")) {
      // console.log(event.target.id);
      if (Array.from(e.target.classList).includes("playing")) {
        e.target.classList.remove("playing");
        handleStop();
        // console.log("stop playing", e.target.id);
      } else {
        e.currentTarget.querySelector(".playing")
          ? e.currentTarget
              .querySelector(".playing")
              .classList.remove("playing")
          : "";
        e.target.classList.add("playing");
        handlePlay(e.target.dataset.track);
        // console.log("started playing", e.target.id);
      }
    }
  });

  // load first media by default
  const loadDefaultMedia = () => {
    console.log(mediaPath.concat(tracks[0].file));
    player.setAttribute("src", mediaPath.concat(tracks[0].file));
    player.load();
  };
  loadDefaultMedia();

  window.addEventListener("load", event => {
    player.addEventListener("play", e => {
      player.volume = 0.2;

      player.addEventListener("progress", e => {
        // console.log(player.duration);
        const progress = ((player.currentTime / player.duration) * 100).toFixed(
          2
        );
        const progressBar = playlist.querySelector(".playing");
        progressBar.setAttribute("data-progress", progress);
      });
    });
  });
};

initialize();
