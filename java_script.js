let timerInterval;
let startTime;
let elapsedTime = 0;
let laps = [];

document.getElementById("startStopButton").addEventListener("click", startStop);
document.getElementById("lapButton").addEventListener("click", recordLap);
document.getElementById("resetButton").addEventListener("click", reset);

function startStop() {
  const button = document.getElementById("startStopButton");
  if (button.innerText === "Start") {
    button.innerText = "Stop";
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTimer, 10);
  } else {
    button.innerText = "Start";
    clearInterval(timerInterval);
  }
}

function updateTimer() {
  const elapsedTimeMs = Date.now() - startTime;
  elapsedTime = elapsedTimeMs;
  const formattedTime = formatTime(elapsedTimeMs);
  document.getElementById("timer").innerText = formattedTime;
}

function formatTime(ms) {
  const date = new Date(ms);
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const seconds = date.getUTCSeconds().toString().padStart(2, "0");
  const milliseconds = Math.floor(date.getUTCMilliseconds() / 10)
                        .toString().padStart(2, "0");
  return `${minutes}:${seconds}:${milliseconds}`;
}

function recordLap() {
  const lapTime = formatTime(elapsedTime);
  laps.push(lapTime);
  const lapTimesDiv = document.getElementById("lap-times");
  const lapTimeElement = document.createElement("div");
  lapTimeElement.innerText = `Lap ${laps.length}: ${lapTime}`;
  lapTimesDiv.appendChild(lapTimeElement);
}

function reset() {
  clearInterval(timerInterval);
  document.getElementById("startStopButton").innerText = "Start";
  document.getElementById("timer").innerText = "00:00:00";
  elapsedTime = 0;
  laps = [];
  document.getElementById("lap-times").innerHTML = "";
}
