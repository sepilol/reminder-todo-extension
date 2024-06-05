chrome.alarms.onAlarm.addListener(function (alarm) {
    chrome.storage.sync.get("reminders", function (data) {
        const reminders = data.reminders || [];
        const reminder = reminders.find(r => r.time === alarm.name);
        if (reminder) {
            chrome.notifications.create(reminder.time, {
                type: "basic",
                iconUrl: "icons/icon48.png",
                title: "Reminder",
                message: reminder.reminder
            });
        }
    });
});
