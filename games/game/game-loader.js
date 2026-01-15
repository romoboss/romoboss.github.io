const id = new URLSearchParams(window.location.search).get("id");
if (!id) location.href = "/";

function toggleFullscreen() {
  const iframe = document.querySelector("iframe");
  if (!iframe) return;

  if (iframe.requestFullscreen) iframe.requestFullscreen();
  else if (iframe.webkitRequestFullscreen) iframe.webkitRequestFullscreen(); // Safari/iOS
  else if (iframe.mozRequestFullScreen) iframe.mozRequestFullScreen(); // Firefox
};

function canFullscreen() {
  const docEl = document.documentElement;

  return !!(
    docEl.requestFullscreen ||
    docEl.webkitRequestFullscreen ||  // Safari / iOS
    docEl.mozRequestFullScreen ||     // Firefox
    docEl.msRequestFullscreen         // IE/Edge
  );
}

fetch(`/sources/games/${id}/info.json`)
  .then(r => r.json())
  .then(game => {

    document.title = game.title;
    document.getElementById("meta-desc").content = game.metaDescription;
    document.getElementById("meta-theme").content = game.themeColor;
    document.getElementById("meta-og").content = game.icon;
    document.getElementById("meta-icon").href = game.icon;

    document.getElementById("gameTitle").innerHTML =
      `${game.title}<img src="${game.icon}" width="75" height="75">`;

    document.getElementById("gameDescription").innerHTML = game.descriptionHTML;

    document.getElementById("playBtn").innerHTML =
      `<h3> Play ${game.title}! </h3>`;
    document.getElementById("playBtn").onclick = () => {
      document.getElementById("gameIframeBox").innerHTML = `
          <iframe
            src="/sources/games/${id}/${game.gameFile}"
            allowfullscreen
            webkitallowfullscreen
            mozallowfullscreen
            allow="fullscreen; autoplay; gamepad"
            class="game-iframe"
          ></iframe>`;
      if (canFullscreen()) {
        document.getElementById("extraButtons").innerHTML +=
          `<button class="button button-other" onClick="toggleFullscreen()")">
          Fullscreen
        </button>`;
      }
    };

    if (game.trailer) {
      document.getElementById("extraButtons").innerHTML +=
        `<button class="button button-other" onclick="redirectToWebsite('${game.trailer}')">
          <img src="../../Images/YouTube.png" width="45" height="45"> Watch Trailer
        </button>`;
    }

    if (game.download) {
      document.getElementById("extraButtons").innerHTML +=
        `<button class="button button-other" onclick="redirectToWebsite('${game.download}')">
          Download
        </button>`;
    }
  });
