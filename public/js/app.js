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
// import functions for managing tasks
import {
  getDayTasks,
  createEntry,
  validate,
  getTask,
  update,
  discard,
} from "./tasks.js";
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
// let deleteEventPopup;
let confirmDeleteTaskBtn;
// let confirmDeleteEventBtn;

let date = null;
let selectedDate = null;
window.addEventListener("DOMContentLoaded", () => {
  calContainer = document.getElementById("cal-section");
  calendar = document.getElementById("cal-body");
  monthEl = document.getElementById("current-month");
  prevMonthBtn = document.getElementById("prev-month");
  nextMonthBtn = document.getElementById("next-month");
  addNewTaskBtn = document.getElementById("add-new-task-btn");
  editTaskBtn = document.getElementById("edit-task-btn");
  console.log("editTaskBtn:", editTaskBtn);
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

  calendar.addEventListener("click", (e) => {
    const addIcon = e.target.closest(".add-task-icon");
    const editIcon = e.target.closest(".edit-task-icon");

    const dayEl = e.target.closest(".day");

    if (dayEl) {
      selectedDate = dayEl.dataset.date;
    }

    if (addIcon && dayEl) {
      selectedDate = dayEl.dataset.date;
      currentTask = {};
      taskTitleInput.value = "";
      taskDescInput.value = "";
      startDateTimeInput.value = "";
      endDateTimeInput.value = "";

      calContainer.classList.add("hidden");
      formContainer.classList.remove("hidden");
      deleteTaskBtn.classList.add("hidden");
    }

    if (editIcon && dayEl) {
      date = dayEl.dataset.date;
      const raw = localStorage.getItem("data");
      const data = raw ? JSON.parse(raw) : {};
      const dayTasks = data[date];

      if (dayTasks && dayTasks.length > 0) {
        const task = dayTasks[0];
        currentTask = task;

        taskTitleInput.value = task.title;
        taskDescInput.value = task.description;
        startDateTimeInput.value = task["start date"];
        endDateTimeInput.value = task["end date"];

        calContainer.classList.add("hidden");
        formContainer.classList.remove("hidden");
        deleteTaskBtn.classList.remove("hidden");
      }
    }
  });

  prevMonthBtn.addEventListener("click", previousMonth);
  nextMonthBtn.addEventListener("click", nextMonth);
  addNewTaskBtn.addEventListener("click", () => {
    date = new Date().toISOString().split("T")[0];
    currentTask = {};

    taskTitleInput.value = "";
    taskDescInput.value = "";
    startDateTimeInput.value = "";
    endDateTimeInput.value = "";
    document.querySelector('input[name="priority"][value="low-lvl"]').checked =
      true;
    allDayRadio.checked = true;

    formContainer.classList.remove("hidden");
    calContainer.classList.add("hidden");
    deleteTaskBtn.classList.add("hidden");
  });
  editTaskBtn.addEventListener("click", () => {
    if (!selectedDate) return;

    const raw = localStorage.getItem("data");
    const data = raw ? JSON.parse(raw) : {};
    const dayTasks = data[selectedDate];

    if (dayTasks && dayTasks.length > 0) {
      const task = dayTasks[0];
      currentTask = task;

      taskTitleInput.value = task.title;
      taskDescInput.value = task.description;
      startDateTimeInput.value = task["start date"];
      endDateTimeInput.value = task["end date"];
      document.querySelector(
        `input[name="priority"][value="${task.priority}"]`,
      ).checked = true;

      formContainer.classList.remove("hidden");
      calContainer.classList.add("hidden");
      deleteTaskBtn.classList.remove("hidden");
    }
  });
  cancelTaskBtn.addEventListener("click", () => {
    date = null;
    currentTask = {};

    taskTitleInput.value = "";
    taskDescInput.value = "";
    startDateTimeInput.value = "";
    endDateTimeInput.value = "";

    formContainer.classList.add("hidden");
    calContainer.classList.remove("hidden");
  });
  saveTaskBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (currentTask.id) {
      update(date, {
        ...currentTask,
        title: cleanUpEntries(taskTitleInput.value),
        description: cleanUpEntries(taskDescInput.value),
        "start date": startDateTimeInput.value,
        "end date": endDateTimeInput.value,
        priority: document.querySelector('input[name="priority"]:checked')
          ?.value,
      });
    } else {
      save();
    }

    formContainer.classList.add("hidden");
    calContainer.classList.remove("hidden");
    updateCalendar(currentMonth, currentYear);
    currentTask = {};
  });
  deleteTaskBtn.addEventListener("click", () => {
    date = null;
    currentTask = {};
    discard(date, currentTask.id);

    formContainer.classList.add("hidden");
    calContainer.classList.remove("hidden");
    updateCalendar(currentMonth, currentYear);
  });
  allDayRadio.addEventListener("change", () => {
    startDateTimeInput.closest("label").style.display = "none";
    endDateTimeInput.closest("label").style.display = "none";
    startDateTimeInput.value = "";
    endDateTimeInput.value = "";
  });
  startEndDateRadio.addEventListener("change", () => {
    startDateTimeInput.closest("label").style.display = "block";
    endDateTimeInput.closest("label").style.display = "block";
  });

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
    const dayOneIdx = new Date(currentYear, currentMonth, 1).getDay();

    const dateObj = new Date(currentYear, currentMonth, i - dayOneIdx + 1);
    const key = dateObj.toISOString().split("T")[0];

    const taskList = JSON.parse(localStorage.getItem("data")) || {};
    const thisDayTasks = taskList[key] || [];

    const daySet = document.createElement("div");
    daySet.classList.add("day-set");

    const day = document.createElement("div");
    day.classList.add("day");
    day.dataset.date = key;

    const dayName = document.createElement("p");
    dayName.classList.add("day-name");
    dayName.innerText = days[i % 7];

    const dayNum = document.createElement("p");
    dayNum.classList.add("day-number");

    const addTaskIcon = document.createElement("button");
    addTaskIcon.classList.add("add-task-icon");
    addTaskIcon.innerHTML = `<i class="fa-solid fa-plus"></i>`;

    const editTaskIcon = document.createElement("button");
    editTaskIcon.classList.add("edit-task-icon");
    editTaskIcon.innerHTML = `<i class="fa-solid fa-pen"></i>`;
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
  const taskList = JSON.parse(localStorage.getItem("data")) || {};
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
      const thisDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(dayCount).padStart(2, "0")}`;

      // const eventName = document.querySelector(".event-name");
      const taskName = day.querySelector(".task-name");

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

      // console.log({ taskName, tasks });

      if (taskName && taskList[thisDate] && taskList[thisDate].length > 0) {
        const task = taskList[thisDate][0];
        taskName.classList.remove("hidden");
        taskName.innerHTML = `<p class="task-text">${task.title}</p>
        <p class="task-text">${task.description}<p>`;

        const priorityLvls = taskList[thisDate].map((task) => task.priority);
        day.classList.remove("low-lvl", "medium-lvl", "high-lvl");

        if (priorityLvls.includes("high-lvl")) {
          day.classList.add("high-lvl");
        } else if (priorityLvls.includes("medium-lvl")) {
          day.classList.add("medium-lvl");
        } else if (priorityLvls.includes("low-lvl")) {
          day.classList.add("low-lvl");
        }
      } else {
        taskName.innerHTML = ``;
        taskName.classList.add("hidden");
        day.classList.remove("low-lvl", "medium-lvl", "high-lvl");
      }

      dayNumber.innerText = dayCount;
      dayCount++;
    } else {
      dayNumber.innerText = "";

      const taskName = day.querySelector(".task-name");
      taskName.classList.add("hidden");
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

/* const addOrUpdate = () => {
  const dataIndex = taskData.findIndex((item) => item.id === currentTask.id);
  const taskObj = {
    id: `${cleanUpEntries(taskTitleInput.value)
      .toLowerCase()
      .split(" ")
      .join("-")}-${Date.now()}`,
    title: `${cleanUpEntries(taskTitleInput.value)}`,
    date:
      "All day" ||
      `Starts: ${startDateTimeInput.value}; Ends: ${endDateTimeInput.value}`,
    description: `${cleanUpEntries(taskDescInput.value)}`,
  };

  if (dataIndex === -1) {
    taskData.unshift(taskObj);
  } else {
    taskData[dataIndex] = taskObj;
  }
  localStorage.setItem("tasks", JSON.stringify(taskData));
};
 */
const save = () => {
  const priorityChk = document.querySelector('input[name="priority"]:checked');

  if (!date || !taskTitleInput.value.trim()) return;

  try {
    createEntry(
      date,
      cleanUpEntries(taskTitleInput.value),
      startDateTimeInput.value,
      endDateTimeInput.value,
      cleanUpEntries(taskDescInput.value),
      priorityChk?.value,
    );
  } catch (error) {
    console.error("createEntry failed", error);
  }

  updateCalendar(currentMonth, currentYear);
};

const resetForm = () => {
  taskTitleInput.value = "";
  taskDescInput.value = "";
  startDateTimeInput.value = "";
  endDateTimeInput.value = "";
  formContainer.classList.toggle("hidden");
  calContainer.classList.toggle("hidden");
  currentTask = {};
};

const closeForm = () => {
  const taskToRemove =
    taskTitleInput.value !== (currentTask.title || "") ||
    taskDescInput.value !== (currentTask.description || "");

  if (taskToRemove) {
    deleteTaskPopup.showModal();
  } else {
    resetForm();
  }
};
