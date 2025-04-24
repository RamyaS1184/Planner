const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderCalendar() {
  const weekView = document.getElementById("weekView");
  weekView.innerHTML = "";
  days.forEach(day => {
    const column = document.createElement("div");
    column.className = "day-column";
    column.id = day;
    column.innerHTML = `<h3>${day}</h3>`;

    const dayTasks = tasks.filter(t => t.day === day);
    dayTasks.forEach(task => {
      const div = document.createElement("div");
      div.className = "task";
      div.textContent = `${task.name} (${task.start} - ${task.end})`;
      column.appendChild(div);
    });

    weekView.appendChild(column);
  });
}

function openTaskModal() {
  document.getElementById("taskModal").style.display = "flex";
}

function closeTaskModal() {
  document.getElementById("taskModal").style.display = "none";
  document.getElementById("taskForm").reset();
}

document.getElementById("taskForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("taskName").value;
  const day = document.getElementById("taskDay").value;
  const start = document.getElementById("startTime").value;
  const end = document.getElementById("endTime").value;
  const reminder = document.getElementById("reminderTime").value;

  const task = { name, day, start, end, reminder };
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderCalendar();

  if (reminder) setReminder(task);

  closeTaskModal();
});

function setReminder(task) {
  const now = new Date();
  const [h, m] = task.reminder.split(":".map(Number));
  const reminderTime = new Date();
  reminderTime.setHours(h);
  reminderTime.setMinutes(m);
  reminderTime.setSeconds(0);

  const delay = reminderTime - now;
  if (delay > 0) {
    setTimeout(() => {
      alert(`Reminder: ${task.name} (${task.start} - ${task.end})`);
    }, delay);
  }
}

window.onload = renderCalendar;
