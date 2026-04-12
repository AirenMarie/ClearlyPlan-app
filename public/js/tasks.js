console.log("tasks.js loaded");

const taskData = JSON.parse(localStorage.getItem("data")) || {};

const getDayTasks = (day) => {
  return taskData[day] || [];
};

const createEntry = (date, task, startDate, endDate, description, priority) => {
  const raw = localStorage.getItem("data");
  const data = raw ? JSON.parse(raw) : {};

  if (!data[date]) {
    data[date] = [];
  }

  const newTask = {
    id: Date.now(),
    title: task,
    "start date": startDate,
    "end date": endDate,
    description: description,
    priority: priority,
  };

  data[date].push(newTask);

  try {
    localStorage.setItem("data", JSON.stringify(data));
    console.log("Saved successfully");
  } catch (error) {
    console.error("setItem failed:", error);
  }

  return newTask;
};

const validate = (task) => {
  if (!task || task.title.trim() === "") {
    return false;
  }
  return (
    (task &&
      typeof task.id !== "undefined" &&
      typeof task.title === "string" &&
      typeof task.startDate === "string" &&
      typeof task.endDate === "string" &&
      typeof task.description === "string") ||
    console.error("Invalid task")
  );
};

const getTask = (date, id) => {
  const dayTasks = getDayTasks(date);
  return dayTasks.find((task) => task.id === id) || null;
};
const update = (date, task) => {
  const raw = localStorage.getItem("data");
  const data = raw ? JSON.parse(raw) : {};
  const dayTasks = data[date] || [];
  const taskIdx = dayTasks.findIndex((t) => t.id === task.id);
  dayTasks[taskIdx] = { ...dayTasks[taskIdx], ...task };
  data[date] = dayTasks;

  if (taskIdx === -1) {
    console.error("No task with that ID found");
    return;
  }

  localStorage.setItem("data", JSON.stringify(data));
};

const discard = (date, id) => {
  const raw = localStorage.getItem("data");
  const data = raw ? JSON.parse(raw) : {};
  const dayTasks = data[date] || [];
  const taskIdx = dayTasks.findIndex((t) => t.id === id);

  if (taskIdx === -1) {
    console.error("No task with that ID found");
    return;
  }

  dayTasks.splice(taskIdx, 1);

  if (dayTasks.length === 0) {
    delete data[date];
  } else {
    data[date] = dayTasks;
  }

  localStorage.setItem("data", JSON.stringify(data));
};

export { getDayTasks, createEntry, validate, getTask, update, discard };
