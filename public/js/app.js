// access the DOM to declare variables for creating the calendar
const calendar = document.getElementById("cal-body");
const monthEl = document.getElementById("current-month");
const prevMonthBtn = document.getElementById("prev-month");
const nextMonthBtn = document.getElementById("next-month");

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

let events;
let tasks;

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
    addTaskOrEventBtn.innerHTML = `<i class="fa-solid fa-plus"></i>`;

    const editTaskOrEventBtn = document.createElement("button");
    editTaskOrEventBtn.classList.add("edit-task-or-event-btn");
    editTaskOrEventBtn.innerHTML = `<i class="fa-solid fa-pen"></i>`;

    const eventName = document.createElement("small");
    eventName.classList.add(".event-name");

    const taskName = document.createElement("small");
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
    const dayNumber = day.querySelector("day-number");
    if (i >= firstDayOfWeek && dayCount <= daysInMonth) {
      const thisDate = new Date(year, month, dayCount);
      const eventName = document.querySelector(".event-name");
      const taskName = document.querySelector(".task-name");

      if (events[thisDate]) {
        const event = events[thisDate];
        eventName.innerText = `${event.title}`;
      } else {
        eventName.innerText = ``;
      }

      if (tasks[thisDate]) {
        const task = tasks[thisDate];
        taskName.innerText = `${task.title}`;
      } else {
        taskName.innerText = ``;
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

prevMonthBtn.addEventListener("click", previousMonth);
nextMonthBtn.addEventListener("click", nextMonth);

drawCalBody();
updateCalendar(currentMonth, currentYear, events, tasks);
