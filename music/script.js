function showSection(sectionId) {
    document.querySelectorAll('.video-section').forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
    document.getElementById('video-player').classList.add('hidden');
}

function playVideo(videoSrc) {
    document.querySelectorAll('.video-section').forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById('video-player').classList.remove('hidden');
    document.getElementById('video').src = videoSrc;
    document.getElementById('video').play();
}

function goBack() {
    document.getElementById('video').pause();
    document.getElementById('video-player').classList.add('hidden');
    document.querySelectorAll('.video-section').forEach(section => {
        section.classList.add('hidden');
    });
    // Show the last viewed section
    document.querySelector('.video-section:not(.hidden)').classList.remove('hidden');
}
