/* What still needs to be done?...
    - set up functionality to save and retrieve items in localStorage
    - display items as tasks or events based on which radio button is selected
    - display reminders based on which checkboxes are selected
    - expand task/event info to view
    - change color of day or task/event based on priority level
    - display date based on which radio button is selected/date set
    - set up functionality to edit or delete tasks
    - ask about:
      - proper implementations for adding and displaying tasks, setting reminders
      - cleaning up code */

// access the DOM to...
// declare variables for creating the calendar
const calendar = document.getElementById("cal-body");
const monthEl = document.getElementById("current-month");
const prevMonthBtn = document.getElementById("prev-month");
const nextMonthBtn = document.getElementById("next-month");
// declare variables for creating the task/event form
const addTaskForm = document.getElementById("add-task-form");
const cancelTaskBtn = document.getElementById("cancel-task-btn");
const deleteTaskBtn = document.getElementById("delete-task-btn");
const saveTaskBtn = document.getElementById("save-task-btn");
const formSection = document.getElementById("form-container");
const taskRadioDiv = document.getElementById("task-radio-div");
const taskRadio = document.getElementById("task");
const eventRadio = document.getElementById("event");
const taskTitleInput = document.getElementById("task-title");
const taskDescInput = document.getElementById("task-desc");
const lowRadio = document.getElementById("low");
const mediumRadio = document.getElementById("medium");
const highRadio = document.getElementById("high");
const allDayRadio = document.getElementById("all-day");
const startEndDateRadio = document.getElementById("start-and-end");
const startDateTimeInput = document.getElementById("start");
const endDateTimeInput = document.getElementById("end");
// declare variables for creating popups
const deleteTaskPopup = document.getElementById("delete-task-popup");
const deleteEventPopup = document.getElementById("delete-event-popup");
const confirmDeleteTaskBtn = document.getElementById("confirm-delete-task-btn");
const confirmDeleteEventBtn = document.getElementById(
  "confirm-delete-event-btn",
);
// declare variables for task and event data
const taskEventData = JSON.parse(localStorage.getItem("data")) || [];
let currentTaskEvent = {};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

let events = [];
let tasks = [];

const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

//draw the calendar
const drawCalBody = () => {
  for (let i = 0; i < 42; i++) {
    const daySet = document.createElement("div");
    daySet.classList.add("day-set");

    const day = document.createElement("div");
    day.classList.add("day");

    const dayName = document.createElement("p");
    dayName.classList.add("day-name");
    dayName.innerText = days[i % 7];

    const dayNum = document.createElement("p");
    dayNum.classList.add("day-number");

    const addTaskOrEventBtn = document.createElement("button");
    addTaskOrEventBtn.classList.add("add-task-or-event-btn");
    addTaskOrEventBtn.innerHTML = `<i class="fa-solid fa-plus hidden"></i>`;

    const editTaskOrEventBtn = document.createElement("button");
    editTaskOrEventBtn.classList.add("edit-task-or-event-btn");
    editTaskOrEventBtn.innerHTML = `<i class="fa-solid fa-pen hidden"></i>`;

    const eventName = document.createElement("div");
    eventName.classList.add("event-name");

    const taskName = document.createElement("div");
    taskName.classList.add("task-name");

    daySet.appendChild(dayName);
    daySet.appendChild(dayNum);

    day.appendChild(daySet);
    day.appendChild(eventName);
    day.appendChild(taskName);
    day.appendChild(addTaskOrEventBtn);
    day.appendChild(editTaskOrEventBtn);

    calendar.appendChild(day);
  }
};

// update the calendar to display added/edited/deleted tasks or events
const updateCalendar = (month, year, events, tasks) => {
  const dayElements = document.querySelectorAll(".day");
  const calendarBody = document.getElementById("cal-body");

  const theFirst = new Date();
  theFirst.setDate(1);
  theFirst.setMonth(month);
  theFirst.setYear(year);

  const firstDayOfWeek = theFirst.getDay();
  const monthName = months[month];
  const monthWithYear = `${monthName} ${year}`;
  monthEl.innerText = monthWithYear;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const totalDays = firstDayOfWeek + daysInMonth;
  const numberOfWeeks = Math.ceil(totalDays / 7);

  calendarBody.style.gridTemplateRows = `repeat(${numberOfWeeks}, 1fr)`;

  let dayCount = 1;

  dayElements.forEach((day, i) => {
    if (i < numberOfWeeks * 7) {
      day.style.display = "block";
    } else {
      day.style.display = "none";
    }
  });

  for (let i = 0; i < dayElements.length; i++) {
    const day = dayElements[i];
    const dayNumber = day.querySelector(".day-number");
    if (i >= firstDayOfWeek && dayCount <= daysInMonth) {
      const thisDate = new Date(year, month, dayCount);
      const eventName = document.querySelector(".event-name");
      const taskName = document.querySelector(".task-name");
      // console.log(thisDate);

      if (events[thisDate]) {
        const event = events[thisDate];
        console.log(events[thisDate]);
        eventName.innerHTML = `<button class="btn"><i class="fa-solid fa-trash"></i>Delete</button>
        <button class="btn"><i class="fa-solid fa-xmark"></i>Close</button>
        <p>${event.title}</p>
        <p>${event.description}<p>`;
      } else {
        eventName.innerHTML = ``;
      }

      if (tasks[thisDate]) {
        const task = tasks[thisDate];
        taskName.innerHTML = `<button class="btn"><i class="fa-solid fa-trash"></i>&ensp; Delete</button>
        <button class="btn"><i class="fa-solid fa-xmark"></i>&ensp; Close</button>
        <p>${task.title}</p>
        <p>${task.description}<p>`;
      } else {
        taskName.innerHTML = ``;
      }

      dayNumber.innerText = dayCount;
      dayCount++;
    } else {
      dayNumber.innerText = "";
    }
  }
};

// navigate the calendar by month
const previousMonth = () => {
  if (currentMonth === 0) {
    currentMonth = 12;
    currentYear--;
  }
  updateCalendar(--currentMonth, currentYear, events, tasks);
};

const nextMonth = () => {
  if (currentMonth === 11) {
    currentMonth = -1;
    currentYear++;
  }
  updateCalendar(++currentMonth, currentYear, events, tasks);
};

const cleanUpEntries = (str) => {
  return str.replace(/[^a-zA-Z0-9\s]/g, "");
};

const addOrUpdate = () => {
  const dataIndex = taskEventData.findIndex(
    (item) => item.id === currentTaskEvent.id,
  );
  const taskEventObj = {
    id: `${cleanUpEntries(taskTitleInput.value)
      .toLowerCase()
      .split(" ")
      .join("-")}-${Date.now()}`,
    title: cleanUpEntries(taskTitleInput.value),
    description: cleanUpEntries(taskDescInput.value),
  };

  if (dataIndex === -1) {
    taskEventData.unshift(taskEventObj);
  } else {
    taskEventData[dataIndex] = taskEventObj;
  }
  localStorage.setItem("data", JSON.stringify(taskEventData));
  displayTaskOrEvent();
};

/* addTaskOrEventBtn.addEventListener('click', {} => {
  
}) */

prevMonthBtn.addEventListener("click", previousMonth);
nextMonthBtn.addEventListener("click", nextMonth);

drawCalBody();
updateCalendar(currentMonth, currentYear, events, tasks);
