const timeDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
let interval;
function timer(secs) {
	clearInterval(interval);
	const now = Date.now();
	const then = now + secs * 1000;
	displayTimeLeft(secs);
	displayEndTime(then);
	interval = setInterval(() => {
		let secsLeft = Math.round((then - Date.now()) / 1000);
		if (secsLeft <= 1) {
			clearInterval(interval);
			return;
		}
		displayTimeLeft(secsLeft);
	}, 1000);
}

function displayTimeLeft(secs) {
	const hours = Math.round(secs / 60 / 60);
	const minutes = Math.floor(secs / 60);
	secsRemaining = secs % 60;
	timeDisplay.textContent = `${hours}: ${minutes} :${secsRemaining < 10 ? '0' : ''}${secsRemaining}`;
}

function displayEndTime(timestamp) {
	const end = new Date(timestamp);
	const hour = end.getHours();
	const minutes = end.getMinutes();
	const secs = end.getSeconds();
	endTime.textContent = `Be Back at : ${hour} : ${minutes}: ${secs}`;
}

function startTimer() {
	const startTime = parseInt(this.dataset.time);
	timer(startTime);
}

timer(90);

buttons.forEach(button => button.addEventListener('click', startTimer));

document.customForm.addEventListener('submit', function setStartTime(e) {
	e.preventDefault();
	const mins = this.minutes.value;
	timer(mins * 60);
	this.reset();
	console.log(mins);
});
