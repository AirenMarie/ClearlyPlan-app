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
  return taskData[day];
};
console.log(getDayTasks("2025-04-01"));

const createEntry = (id, task, description) => {
    
  return {
    id: id,
    title: task,
    description: description,
  };
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

validate({
  id: 1,
  task: "do the dishes",
  description: "1. do dishes 2. take a nap",
});

const update = (date, task) => {
  const dayTasks = getDayTasks(date);

  for (let i = 0; i < dayTasks.length; i++) {
    const currentTask = dayTasks[i];
    if (currentTask.id === task.id) {
      currentTask.title = task.title;
      currentTask.description = task.description;
      return;
    }
  }
  console.log(`${task.id} updated`);
  console.error("No task with that ID found");
};

const deleteTasks = (date, id) => {
  const dayTasks = getDayTasks(date);
  for (let i = 0; i < dayTasks.length; i++) {
    const currentTask = dayTasks[i];
    if (currentTask.id === task.id) {
      dayTasks.splice(i, 1);
      console.log("Task ${id} deleted");
    }
  }
};

update("2025-04-01", createEntry(1, "take a nap", "leave me alone"));

export { getDayTasks, createEntry, validate, update, deleteTasks };
