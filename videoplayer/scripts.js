//grab elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const toggleScreen = player.querySelector('[data-max]');

function togglePlay() {
	const method = video.paused ? 'play' : 'pause';
	video[method]();
}

function toggleFullScreen() {
	if (toggleScreen.requestFullscreen) {
		toggleScreen.requestFullscreen();
	} else if (toggleScreen.mozRequestFullScreen) {
		toggleScreen.mozRequestFullScreen();
	} else if (toggleScreen.webkitRequestFullscreen) {
		toggleScreen.webkitRequestFullscreen();
	}
}

function updateButton() {
	let icon = this.paused ? '>>' : '||';
	console.log(icon);
	toggle.textContent = icon;
}
function skip() {
	video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
	video[this.name] = this.value;
	console.log(this.value);
	console.log(this.name);
}

function handleProgress() {
	const percent = video.currentTime / video.duration * 100;
	progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
	console.log(e);
	const scrubTime = e.offsetX / progress.offsetWidth * video.duration;
	video.currentTime = scrubTime;
}

let mousedown = false;
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
video.addEventListener('timeupdate', handleProgress);

//add full screen function
toggleScreen.addEventListener('click', toggleFullScreen);

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', e => mousedown && scrub(e));
progress.addEventListener('mousedown', () => (mousedown = true));
progress.addEventListener('mouseup', () => (mousedown = false));
