document.querySelector('.click-to-enter').addEventListener('click', function() {
    this.classList.add('hide');
    
    document.querySelector('.main-content').classList.add('show');

    var video = document.getElementById('background-video');
    video.muted = false;
    video.play();
});


function copydiscorduser() {
    navigator.clipboard.writeText("rileyshy08#1523");
    alert("Discord User copied to clipboard!");
}

function copyemail() {
    navigator.clipboard.writeText("rb@rileyb.co.uk");
    alert("Email copied to clipboard!");
}

// Array of video sources
const videoSources = [
    'assets/video1.mp4',
    'assets/video2.mp4',
    'assets/video3.mp4',
  ];
  
  // Initial video index
  let currentVideoIndex = 0;
  
  // Get video elements
  const videoElement = document.getElementById('background-video');
  const videoSourceElement = document.getElementById('video-source');
  
  // Function to update video source
  function updateVideoSource(index) {
    videoSourceElement.src = videoSources[index];
    videoElement.load();
    videoElement.play();
  }
  
  // Event listener for 'Previous' button
  document.getElementById('prev-video').addEventListener('click', () => {
    currentVideoIndex = (currentVideoIndex - 1 + videoSources.length) % videoSources.length;
    updateVideoSource(currentVideoIndex);
  });
  
  // Event listener for 'Next' button
  document.getElementById('next-video').addEventListener('click', () => {
    currentVideoIndex = (currentVideoIndex + 1) % videoSources.length;
    updateVideoSource(currentVideoIndex);
  });
  
  // Optional: Automatically update video source on page load
  updateVideoSource(currentVideoIndex);
  