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
let calContainer;
let calendar;
let monthEl;
let prevMonthBtn;
let nextMonthBtn;
let addNewTaskBtn;
let editTaskBtn;
// declare variables for creating the task/event form
let formContainer;
let addTaskForm;
let cancelTaskBtn;
let deleteTaskBtn;
let saveTaskBtn;
let formSection;
let taskRadioDiv;
let taskRadio;
let eventRadio;
let taskTitleInput;
let taskDescInput;
let lowRadio;
let mediumRadio;
let highRadio;
let allDayRadio;
let startEndDateRadio;
let startDateTimeInput;
let endDateTimeInput;
// declare variables for creating popups
let deleteTaskPopup;
let deleteEventPopup;
let confirmDeleteTaskBtn;
let confirmDeleteEventBtn;
window.addEventListener("DOMContentLoaded", () => {
  calContainer = document.getElementById("cal-section");
  calendar = document.getElementById("cal-body");
  monthEl = document.getElementById("current-month");
  prevMonthBtn = document.getElementById("prev-month");
  nextMonthBtn = document.getElementById("next-month");
  addNewTaskBtn = document.getElementById("add-new-task-btn");
  editTaskBtn = document.getElementById("edit-task-btn");
  // declare variables for creating the task/event form
  formContainer = document.getElementById("form-container");
  addTaskForm = document.getElementById("add-task-form");
  cancelTaskBtn = document.getElementById("cancel-task-btn");
  deleteTaskBtn = document.getElementById("delete-task-btn");
  saveTaskBtn = document.getElementById("save-task-btn");
  formSection = document.getElementById("form-container");
  taskRadioDiv = document.getElementById("task-radio-div");
  taskRadio = document.getElementById("task");
  eventRadio = document.getElementById("event");
  taskTitleInput = document.getElementById("task-title");
  taskDescInput = document.getElementById("task-desc");
  lowRadio = document.getElementById("low");
  mediumRadio = document.getElementById("medium");
  highRadio = document.getElementById("high");
  allDayRadio = document.getElementById("all-day");
  startEndDateRadio = document.getElementById("start-and-end");
  startDateTimeInput = document.getElementById("start");
  endDateTimeInput = document.getElementById("end");
  // declare variables for creating popups
  deleteTaskPopup = document.getElementById("delete-task-popup");
  // deleteEventPopup = document.getElementById("delete-event-popup");
  confirmDeleteTaskBtn = document.getElementById("confirm-delete-task-btn");
  // confirmDeleteEventBtn = document.getElementById("confirm-delete-event-btn");

  prevMonthBtn.addEventListener("click", previousMonth);
  nextMonthBtn.addEventListener("click", nextMonth);
  addNewTaskBtn.addEventListener("click", () => {
    formContainer.classList.toggle("hidden");
    calContainer.classList.toggle("hidden");
    deleteTaskBtn.classList.toggle("hidden");
  });
  editTaskBtn.addEventListener("click", () => {
    formContainer.classList.toggle("hidden");
    calContainer.classList.toggle("hidden");
  });
  cancelTaskBtn.addEventListener("click", () => {
    formContainer.classList.toggle("hidden");
    calContainer.classList.toggle("hidden");
  });
  saveTaskBtn.addEventListener("click", () => {
    formContainer.classList.toggle("hidden");
    calContainer.classList.toggle("hidden");

    const dateKey = date;
    const taskInfo = taskTitleInput.value;

    if (taskInfo) {
      save(dateKey, taskInfo);
      taskTitleInput.value = "";
    }
  });

  /* lowRadio.addEventListener("click", () => {
    const dayElements = document.querySelector(".day");
    dayElements.style.backgroundColor = "#5dcf00";
  });
  mediumRadio.addEventListener("click", () => {
    const dayElements = document.querySelector(".day");
    dayElements.style.backgroundColor = "#fdda03";
  });
  highRadio.addEventListener("click", () => {
    const dayElements = document.querySelector(".day");
    dayElements.style.backgroundColor = "#f80200";
  }); */

  drawCalBody();
  updateCalendar(currentMonth, currentYear, tasks);

  console.log("Let's freakin' go!");
});

// declare variables for task and event data
const taskData = JSON.parse(localStorage.getItem("data")) || {};
let currentTask = {};

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

// let events = [];
let tasks = taskData;

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

    const addTaskIcon = document.createElement("button");
    addTaskIcon.classList.add("add-task-icon");
    addTaskIcon.innerHTML = `<i class="fa-solid fa-plus hidden"></i>`;

    const editTaskIcon = document.createElement("button");
    editTaskIcon.classList.add("edit-task-icon");
    editTaskIcon.innerHTML = `<i class="fa-solid fa-pen hidden"></i>`;

    /* const eventName = document.createElement("div");
    eventName.classList.add("event-name"); */

    const taskName = document.createElement("div");
    taskName.classList.add("task-name");

    daySet.appendChild(dayName);
    daySet.appendChild(dayNum);

    day.appendChild(daySet);
    day.appendChild(taskName);
    day.appendChild(addTaskIcon);
    day.appendChild(editTaskIcon);

    calendar.appendChild(day);
  }
};

// update the calendar to display added/edited/deleted tasks or events
const updateCalendar = (month, year, tasks) => {
  const dayElements = document.querySelectorAll(".day");

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

  calendar.style.gridTemplateRows = `repeat(${numberOfWeeks}, 1fr)`;

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
      // const eventName = document.querySelector(".event-name");
      const taskName = document.querySelector(".task-name");
      // console.log(thisDate);
      /* 
      if (events[thisDate]) {
        const event = events[thisDate];
        console.log(events[thisDate]);
        eventName.innerHTML = `<button class="btn"><i class="fa-solid fa-trash"></i>Delete</button>
        <button class="btn"><i class="fa-solid fa-xmark"></i>Close</button>
        <p>${event.title}</p>
        <p>${event.description}<p>`;
      } else {
        eventName.innerHTML = ``;
      } */

      console.log({ taskName, tasks });

      if (taskName && tasks && tasks[thisDate]) {
        const task = tasks[thisDate];
        taskName.innerHTML = `<button class="view-task-btn"><i class="fa-solid fa-trash"></i>&ensp; Delete</button>
        <button class="view-task-btn"><i class="fa-solid fa-xmark"></i>&ensp; Close</button>
        <p>${task.title}</p>
        <p>${task.description}<p>`;
      } else {
        taskName.innerHTML = ``;
        taskName.classList.toggle("hidden");
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
  updateCalendar(--currentMonth, currentYear, tasks);
};

const nextMonth = () => {
  if (currentMonth === 11) {
    currentMonth = -1;
    currentYear++;
  }
  updateCalendar(++currentMonth, currentYear, tasks);
};

const cleanUpEntries = (str) => {
  return str.replace(/[^a-zA-Z0-9\s]/g, "");
};

const addOrUpdate = () => {
  const dataIndex = taskData.findIndex(
    (item) => item.id === currentTaskEvent.id,
  );
  const taskObj = {
    id: `${cleanUpEntries(taskTitleInput.value)
      .toLowerCase()
      .split(" ")
      .join("-")}-${Date.now()}`,
    title: `${cleanUpEntries(taskTitleInput.value)}`,
    description: `${cleanUpEntries(taskDescInput.value)}`,
  };

  if (dataIndex === -1) {
    taskData.unshift(taskObj);
  } else {
    taskData[dataIndex] = taskObj;
  }
  localStorage.setItem("data", JSON.stringify(taskData));
  // displayTaskOrEvent();
};

const save = () => {
  const taskList = taskData;

  if (!taskList[dateKey]) {
    taskList[dateKey] = [];
  }

  taskList[dateKey].push(taskInfo);

  localStorage.setItem("data", JSON.stringify(taskList));

  console.log("Task(s) for ${dateKey}:", taskInfo);
};

/* addTaskOrEventBtn.addEventListener('click', {} => {
  
}) */
