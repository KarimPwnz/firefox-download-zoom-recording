// Extract video Url

function extractVideoUrl() {
  return document.getElementById("vjs_video_3_html5_api").src;
}

// Add save as button

function generateAnchor(url, name) {
  var anchor = document.createElement("a");
  anchor.href = url;
  anchor.innerText = name;
  anchor.id = "save-as";
  return anchor;
}

function addSaveAs(url, name) {
  var mainDiv = document.getElementsByClassName("transcript-wrapper")[0];
  var anchor = generateAnchor(url, name);
  mainDiv.insertAdjacentElement("afterbegin", anchor);
}

// Main

function injectDownloadLink(videoUrl) {
  // Generate video filename as {{date}}.mp4
  var dateRe = /^https:\/\/ssrweb\.zoom\.us\/(?:cmr\/)?replay.*?\/(\d+)\/(\d+)\/(\d+)/;
  var videoDateArr = videoUrl.match(dateRe).slice(1);
  var videoName = `${videoDateArr.join(" ")}.mp4`;
  // Add link
  addSaveAs(videoUrl, videoName);
}

function main() {
  // Check if anchor already on page
  var saveAsAnchor = document.getElementById("save-as");
  if (saveAsAnchor) return;

  // Run observer to wait for proper video URL
  var observer = new MutationObserver(() => {
    var url = extractVideoUrl();
    if (!url.length) return;
    injectDownloadLink(url);
    observer.disconnect();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

// Run

if (/complete|interactive|loaded/.test(document.readyState)) {
  main();
} else {
  document.addEventListener("DOMContentLoaded", main);
}
