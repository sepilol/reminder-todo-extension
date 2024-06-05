document.addEventListener("DOMContentLoaded", function () {
    // Elements
    const taskForm = document.getElementById("task-form");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");
    const reminderForm = document.getElementById("reminder-form");
    const reminderInput = document.getElementById("reminder-input");
    const reminderTime = document.getElementById("reminder-time");
    const reminderList = document.getElementById("reminder-list");

    // Load tasks and reminders
    chrome.storage.sync.get(["tasks", "reminders"], function (data) {
        if (data.tasks) {
            data.tasks.forEach(task => addTaskToList(task));
        }
        if (data.reminders) {
            data.reminders.forEach(reminder => addReminderToList(reminder));
        }
    });

    // Add task
    taskForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const task = taskInput.value.trim();
        if (task) {
            addTaskToList(task);
            saveTask(task);
            taskInput.value = "";
        }
    });

    // Add reminder
    reminderForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const reminder = reminderInput.value.trim();
        const time = reminderTime.value;
        if (reminder && time) {
            const reminderObj = { reminder, time };
            addReminderToList(reminderObj);
            saveReminder(reminderObj);
            reminderInput.value = "";
            reminderTime.value = "";
        }
    });

    // Remove task
    taskList.addEventListener("click", function (e) {
        if (e.target.tagName === "BUTTON") {
            const taskItem = e.target.parentElement;
            removeTask(taskItem.textContent);
            taskList.removeChild(taskItem);
        }
    });

    // Remove reminder
    reminderList.addEventListener("click", function (e) {
        if (e.target.tagName === "BUTTON") {
            const reminderItem = e.target.parentElement;
            removeReminder(reminderItem.dataset.time);
            reminderList.removeChild(reminderItem);
        }
    });

    // Helper functions
    function addTaskToList(task) {
        const li = document.createElement("li");
        li.textContent = task;
        const button = document.createElement("button");
        button.textContent = "X";
        li.appendChild(button);
        taskList.appendChild(li);
    }

    function saveTask(task) {
        chrome.storage.sync.get("tasks", function (data) {
            const tasks = data.tasks || [];
            tasks.push(task);
            chrome.storage.sync.set({ tasks });
        });
    }

    function removeTask(task) {
        chrome.storage.sync.get("tasks", function (data) {
            const tasks = data.tasks || [];
            const updatedTasks = tasks.filter(t => t !== task);
            chrome.storage.sync.set({ tasks: updatedTasks });
        });
    }

    function addReminderToList(reminderObj) {
        const li = document.createElement("li");
        li.textContent = `${reminderObj.reminder} at ${new Date(reminderObj.time).toLocaleString()}`;
        li.dataset.time = reminderObj.time;
        const button = document.createElement("button");
        button.textContent = "X";
        li.appendChild(button);
        reminderList.appendChild(li);
    }

    function saveReminder(reminderObj) {
        chrome.storage.sync.get("reminders", function (data) {
            const reminders = data.reminders || [];
            reminders.push(reminderObj);
            chrome.storage.sync.set({ reminders });
            scheduleReminder(reminderObj);
        });
    }

    function removeReminder(time) {
        chrome.storage.sync.get("reminders", function (data) {
            const reminders = data.reminders || [];
            const updatedReminders = reminders.filter(r => r.time !== time);
            chrome.storage.sync.set({ reminders: updatedReminders });
        });
    }

    function scheduleReminder(reminderObj) {
        const when = new Date(reminderObj.time).getTime() - Date.now();
        if (when > 0) {
            chrome.alarms.create(reminderObj.time, { when: Date.now() + when });
        }
    }
});
