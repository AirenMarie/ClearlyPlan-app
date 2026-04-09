const allTasks = {
  "2025-04-01": [
    {
      id: 1,
      title: "do the dishes",
      description: "1. do dishes 2. take a nap",
    },
  ],
};

const getDayTasks = (day) => {
  if (!taskData) {
    return;
  }
  return taskData[day] || [];
};
console.log(getDayTasks("2025-04-01"));

const createEntry = (id, task, description) => {
  if (!taskData[date]) {
    taskData[date] = [];
  }
  const dayTasks = getDayTasks(taskData, date);

  let id = 0;
  for (let i = 0; i < dayTasks.length; i++) {
    const currentTask = dayTasks[i];
    if (currentTask.id >= id) {
      id = currentTask.id + 1;
    }
  }

  const newTask = {
    id: id,
    title: task,
    description: description,
  };
  dayTasks.push(newTask);
  return newTask;
};

const validate = (task) => {
  const keys = Object.keys(task);

  if (keys[0] !== "id") {
    return false;
  }
  if (keys[1] !== "title") {
    return false;
  }
  if (keys[2] !== "description") {
    return false;
  }
  return true;
};

const update = (taskData, date, task) => {
  const dayTasks = getDayTasks(taskData, date);

  for (let i = 0; i < dayTasks.length; i++) {
    const currentTask = dayTasks[i];
    if (currentTask.id === task.id) {
      currentTask.title = task.title;
      currentTask.description = task.description;
      return;
    }
  }
  console.error("No task with that ID found");
};

const discard = (taskData, date, id) => {
  const dayTasks = getDayTasks(taskData, date);
  for (let i = 0; i < dayTasks.length; i++) {
    const currentTask = dayTasks[i];
    if (currentTask.id === task.id) {
      dayTasks.splice(i, 1);
      console.log("Task ${id} deleted");
      return;
    }
  }
  console.error("No task with that ID found");
};

export { getDayTasks, createEntry, validate, update, discard };
