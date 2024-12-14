// Global Variables and Utility Functions
let stopwatchInterval;
let stopwatchTime = 0;
let stopwatchRunning = false;
let timerInterval;
let calculatorMemory = 0;
let lapTimes = [];
// Utility Functions
function pad(number) {
  return number.toString().padStart(2, "0");
}

// Tool Navigation
function showTool(toolName) {
  const tools = document.querySelectorAll(".tool");
  tools.forEach((tool) => {
    tool.classList.remove("active");
  });
  document.getElementById(toolName).classList.add("active");
}

// Advanced Calculator Functions
function appendToDisplay(value) {
  const display = document.getElementById("calc-display");
  display.value += value;
}

function clearDisplay() {
  document.getElementById("calc-display").value = "";
}

function calculate() {
  try {
    const result = eval(document.getElementById("calc-display").value);
    document.getElementById("calc-display").value = result;
  } catch (error) {
    document.getElementById("calc-display").value = "Error";
  }
}

function memoryStore() {
  calculatorMemory = parseFloat(document.getElementById("calc-display").value);
  alert(`Stored: ${calculatorMemory}`);
}

function memoryRecall() {
  document.getElementById("calc-display").value = calculatorMemory;
}

function memoryClear() {
  calculatorMemory = 0;
  alert("Memory cleared");
}

function scientificCalculation(func) {
  try {
    const currentValue = parseFloat(
      document.getElementById("calc-display").value
    );
    let result;
    switch (func) {
      case "square":
        result = Math.pow(currentValue, 2);
        break;
      case "sqrt":
        result = Math.sqrt(currentValue);
        break;
      case "sin":
        result = Math.sin(currentValue);
        break;
      case "cos":
        result = Math.cos(currentValue);
        break;
      case "log":
        result = Math.log(currentValue);
        break;
    }
    document.getElementById("calc-display").value = result;
  } catch (error) {
    document.getElementById("calc-display").value = "Error";
  }
}

// Stopwatch Functions
function startStopwatch() {
  if (!stopwatchRunning) {
    stopwatchRunning = true;
    stopwatchInterval = setInterval(updateStopwatch, 10);
  }
}

function updateStopwatch() {
  stopwatchTime++;
  const hours = Math.floor(stopwatchTime / 360000);
  const minutes = Math.floor((stopwatchTime % 360000) / 6000);
  const seconds = Math.floor((stopwatchTime % 6000) / 100);
  const milliseconds = stopwatchTime % 100;

  const display = document.getElementById("stopwatch-display");
  display.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(
    milliseconds
  )}`;
}

function stopStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchRunning = false;
}

function resetStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchRunning = false;
  stopwatchTime = 0;
  lapTimes = [];
  document.getElementById("stopwatch-display").textContent = "00:00:00.00";
  document.getElementById("lap-list").innerHTML = "";
}

function lapStopwatch() {
  if (stopwatchRunning) {
    const lapTime = document.getElementById("stopwatch-display").textContent;
    lapTimes.push(lapTime);

    const lapList = document.getElementById("lap-list");
    lapList.innerHTML = ""; // Clear previous laps
    lapTimes.forEach((lap, index) => {
      const lapItem = document.createElement("li");
      lapItem.innerHTML = `
                <span>Lap ${index + 1}: ${lap}</span>
                <button onclick="removeLap(${index})">Remove</button>
            `;
      lapList.appendChild(lapItem);
    });
  }
}

function removeLap(index) {
  lapTimes.splice(index, 1);
  const lapList = document.getElementById("lap-list");
  lapList.innerHTML = ""; // Rerender laps
  lapTimes.forEach((lap, newIndex) => {
    const lapItem = document.createElement("li");
    lapItem.innerHTML = `
            <span>Lap ${newIndex + 1}: ${lap}</span>
            <button onclick="removeLap(${newIndex})">Remove</button>
        `;
    lapList.appendChild(lapItem);
  });
}

// Counter Functions
let counterValue = 0;

function incrementCounter() {
  counterValue++;
  updateCounterDisplay();
}

function decrementCounter() {
  counterValue--;
  updateCounterDisplay();
}

function resetCounter() {
  counterValue = 0;
  updateCounterDisplay();
}

function updateCounterDisplay() {
  document.getElementById("counter-display").textContent = counterValue;
}

// Advanced To-Do List Functions
function addTask() {
  const input = document.getElementById("todo-input");
  const taskText = input.value.trim();

  if (taskText !== "") {
    const todoList = document.getElementById("todo-list");
    const li = document.createElement("li");

    li.innerHTML = `
      <div class="task-content">
        <span class="task-text">${taskText}</span>
      </div>
      <div class="task-actions">
        <button onclick="completeTask(this)">✓</button>
        <button onclick="deleteTask(this)">🗑️</button>
      </div>
    `;

    todoList.appendChild(li);
    input.value = ""; // Clear the input field
  }
}

function completeTask(button) {
  const taskItem = button.closest("li");
  taskItem.classList.toggle("completed");
}

function deleteTask(button) {
  const taskItem = button.closest("li");
  taskItem.remove();
}

function completeTask(button) {
  const taskItem = button.closest("li");
  taskItem.classList.toggle("completed");
}

function deleteTask(button) {
  const taskItem = button.closest("li");
  taskItem.remove();
}

function completeTask(button) {
  const taskItem = button.closest("li");
  taskItem.classList.toggle("completed");
}

function deleteTask(button) {
  const taskItem = button.closest("li");
  taskItem.remove();
}

// Timer Functions
function startTimer() {
  const hours = parseInt(document.getElementById("hours").value) || 0;
  const minutes = parseInt(document.getElementById("minutes").value) || 0;
  const seconds = parseInt(document.getElementById("seconds").value) || 0;

  let totalSeconds = hours * 3600 + minutes * 60 + seconds;

  if (totalSeconds > 0) {
    timerInterval = setInterval(() => {
      totalSeconds--;
      updateTimerDisplay(totalSeconds);

      if (totalSeconds <= 0) {
        clearInterval(timerInterval);
        playTimerAlertSound();
      }
    }, 1000);
  }
}

function playTimerAlertSound() {
  try {
    const audio = new Audio("Time-UP.mp3");
    audio.play();
  } catch (error) {
    alert("Timer finished!");
  }
}

function updateTimerDisplay(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  document.getElementById("timer-display").textContent = `${pad(hours)}:${pad(
    minutes
  )}:${pad(seconds)}`;
}

function pauseTimer() {
  clearInterval(timerInterval);
}

function resetTimer() {
  clearInterval(timerInterval);
  document.getElementById("timer-display").textContent = "00:00:00";
  document.getElementById("hours").value = "";
  document.getElementById("minutes").value = "";
  document.getElementById("seconds").value = "";
}

// Notepad Functions
function saveNote() {
  const noteContent = document.getElementById("notepad-content").value;
  localStorage.setItem("savedNote", noteContent);
  showNotification("Note saved successfully!");
}

function clearNote() {
  document.getElementById("notepad-content").value = "";
}

function loadSavedNote() {
  const savedNote = localStorage.getItem("savedNote");
  if (savedNote) {
    document.getElementById("notepad-content").value = savedNote;
  }
}

// Currency Converter Functions
function convertCurrency() {
  const amount = document.getElementById("amount").value;
  const fromCurrency = document.getElementById("from-currency").value;
  const toCurrency = document.getElementById("to-currency").value;

  // Comprehensive exchange rates including BDT and INR
  const rates = {
    USD: {
      EUR: 0.92,
      GBP: 0.79,
      JPY: 148.5,
      CAD: 1.35,
      AUD: 1.52,
      BDT: 107.5,
      INR: 82.0,
    },
    EUR: {
      USD: 1.09,
      GBP: 0.86,
      JPY: 161.2,
      CAD: 1.47,
      AUD: 1.65,
      BDT: 116.3,
      INR: 86.5,
    },
    GBP: {
      USD: 1.27,
      EUR: 1.16,
      JPY: 187.4,
      CAD: 1.71,
      AUD: 1.92,
      BDT: 132.5,
      INR: 98.0,
    },
    JPY: {
      USD: 0.0067,
      EUR: 0.0062,
      GBP: 0.0053,
      CAD: 0.0091,
      AUD: 0.0102,
      BDT: 0.72,
      INR: 0.54,
    },
    BDT: { USD: 0.0093, EUR: 0.0086, GBP: 0.0075, JPY: 1.39, INR: 0.77 },
    INR: { USD: 0.0122, EUR: 0.0116, GBP: 0.0102, JPY: 1.85, BDT: 1.3 },
  };

  // Check if the amount is valid
  if (amount === "" || isNaN(amount) || amount <= 0) {
    document.getElementById("currency-result").innerHTML = `
          <p>Please enter a valid amount.</p>
      `;
    return;
  }

  const convertedAmount = (amount * rates[fromCurrency][toCurrency]).toFixed(2);

  document.getElementById("currency-result").innerHTML = `
      <p>${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}</p>
      <small>💡 Current market rates as of today</small>
  `;
}

// QR Code Generator
function generateQR() {
  const qrText = document.getElementById("qr-text").value;
  const qrCodeDiv = document.getElementById("qr-code");

  if (qrText) {
    qrCodeDiv.innerHTML = ""; // Clear previous QR code
    const qr = qrcode(0, "M");
    qr.addData(qrText);
    qr.make();
    qrCodeDiv.innerHTML = qr.createImgTag(5);
  } else {
    showNotification("Please enter text or URL");
  }
}

// Notification System
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add("hide");
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 500);
  }, 3000);
}

// Dark Mode Toggle
let isDarkMode = false;
function toggleDarkMode() {
  isDarkMode = !isDarkMode;
  document.body.classList.toggle("dark-mode", isDarkMode);
  localStorage.setItem("darkMode", isDarkMode);

  // Adjust color scheme
  const root = document.documentElement;
  if (isDarkMode) {
    root.style.setProperty(
      "--primary-gradient",
      "linear-gradient(45deg, #1a1a2e, #16213e)"
    );
    root.style.setProperty(
      "--secondary-gradient",
      "linear-gradient(45deg, rgb(140, 143, 145), #212121)"
    );
    root.style.setProperty(
      "--background-gradient",
      "linear-gradient(135deg, #1a1a2e, #16213e)"
    );
  } else {
    // Reset to original gradients
    root.style.setProperty(
      "--primary-gradient",
      "linear-gradient(45deg, #3494E6, #EC6EAD)"
    );
    root.style.setProperty(
      "--secondary-gradient",
      "linear-gradient(45deg, #4ECDC4, #45B7D1)"
    );
    root.style.setProperty(
      "--background-gradient",
      "linear-gradient(135deg, #f5f7fa, #c3cfe2)"
    );
  }
}

// Initialization
document.addEventListener("DOMContentLoaded", () => {
  // Load saved dark mode preference
  const savedDarkMode = localStorage.getItem("darkMode") === "true";
  if (savedDarkMode) {
    toggleDarkMode();
  }

  // Load saved note
  loadSavedNote();

  // Set default view
  showTool("calculator");

  // Create dark mode toggle button
  const darkModeToggle = document.createElement("button");
  darkModeToggle.id = "dark-mode-toggle";
  darkModeToggle.innerHTML = "🌓";
  darkModeToggle.onclick = toggleDarkMode;
  document.body.appendChild(darkModeToggle);
});
