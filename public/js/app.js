const calendar = document.getElementById("cal-body");
const monthEl = document.getElementById("current-month");

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

const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

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

    daySet.appendChild(dayName);
    daySet.appendChild(dayNum);

    day.appendChild(daySet);

    calendar.appendChild(day);
  }
};

const updateCalendar = (month, year) => {
  const dayElements = document.querySelectorAll(".day");
  const calendarBody = document.getElementById("cal-body");

  const theFirst = new Date();
  theFirst.setDate(1);
  theFirst.setMonth(month);
  theFirst.setFullYear(year);

  const firstDayOfWeek = theFirst.getDay();
  const monthName = months[month];
  const monthWithYear = `${monthName} ${year}`;
  monthEl.innerText = monthWithYear;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const totalDays = firstDayOfWeek + daysInMonth;
  const numberOfWeeks = Math.ceil(totalDays / 7);

  calendarBody.style.gridTemplateRows = `repeat(${numberOfWeeks}, 75px)`;

  let dayCount = 1;

  dayElements.forEach((day, i) => {
    if (i < numberOfWeeks * 7) {
      day.style.display = "block";
    } else {
      day.stylr.display = "none";
    }
  });

  for (let i = 0; i < dayElements.length; i++) {
    const day = dayElements[i];
    const dayNumber = day.querySelector("day-number");
    if (i >= firstDayOfWeek && dayCount <= daysInMonth) {
      const thisDate = new Date(year, month, dayCount);

      dayNumber.innerText = dayCount;
      dayCount++;
    } else {
      dayNumber.innerText = "";
    }
  }
};

const previousMonth = () => {
  if (currentMonth === 0) {
    currentMonth = 12;
    currentYear--;
  }
  updateCalendar(--currentMonth, currentYear);
};

const nextMonth = () => {
  if (currentMonth === 11) {
    currentMonth = -1;
    currentYear++;
  }
  updateCalendar(++currentMonth, currentYear);
};
