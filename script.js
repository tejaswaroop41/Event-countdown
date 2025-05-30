let eventDate;
const eventNameEl = document.getElementById("event-name");
const eventInputEl = document.getElementById("event-input");
const datePickerEl = document.getElementById("date-picker");
const updateEventBtn = document.getElementById("update-event");
const progressBarEl = document.getElementById("progress-bar");

function updateCountdown() {
  if (!eventDate) return;

  const now = new Date().getTime();
  const timeLeft = eventDate - now;

  if (timeLeft < 0) {
    clearInterval(countdownInterval);
    document.getElementById("timer").textContent = "Event Started!";
    progressBarEl.style.width = "100%";
    alert("The event has started!");
    return;
  }

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;

  const totalDuration = eventDate - new Date().setHours(0, 0, 0, 0);
  const progress = ((totalDuration - timeLeft) / totalDuration) * 100;
  progressBarEl.style.width = `${Math.min(progress, 100)}%`;
}

function updateEventDetails() {
  const eventName = eventInputEl.value.trim();
  if (eventName) {
    eventNameEl.textContent = `Countdown to ${eventName}`;
  }

  const selectedDate = datePickerEl.value;
  if (selectedDate) {
    eventDate = new Date(selectedDate).getTime();
    clearInterval(countdownInterval);
    countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();
  }
}

let countdownInterval = setInterval(updateCountdown, 1000);
updateEventBtn.addEventListener("click", updateEventDetails);
