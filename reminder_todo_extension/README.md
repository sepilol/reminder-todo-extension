# Reminder and To-Do List Chrome Extension
#### Video Demo:  <URL HERE>
#### Description:
This project is a Chrome extension designed to help users manage their reminders and to-do lists effectively. The extension allows users to add tasks, mark them as completed, and set reminders, all within a simple and intuitive interface.

### Features:
- **Add Tasks**: Users can add new tasks along with optional due dates.
- **Mark as Completed**: Tasks can be marked as completed by clicking on them.
- **Delete Tasks**: Users can delete tasks when they are no longer needed.
- **Set Reminders**: Users can set reminders for tasks to ensure they don't miss any deadlines.
- **Persistent Storage**: The extension uses Chrome's storage API to save tasks and reminders, making sure they persist even after the browser is closed.

### Installation:
1. Clone this repository or download the ZIP file and extract it to a directory.
    ```sh
    git clone https://github.com/yourusername/reminder-todo-extension.git
    ```
2. Open Chrome and go to `chrome://extensions/`.
3. Enable "Developer mode" in the top right corner.
4. Click "Load unpacked" and select the directory where you cloned/extracted the files.

### Usage:
1. Click the extension icon in the Chrome toolbar to open the popup.
2. Use the input fields to add new tasks and set optional due dates.
3. Click "Add Task" to add the task to your list.
4. Click on a task to mark it as completed.
5. Click the trash icon next to a task to delete it.

### Files:
- `manifest.json`: Configuration file for the Chrome extension.
- `popup.html`: HTML file for the extension's popup interface.
- `popup.css`: CSS file for styling the popup.
- `popup.js`: JavaScript file for handling the popup's functionality.
- `background.js`: JavaScript file for managing background tasks such as notifications.
- `icons/`: Directory containing icon files used by the extension.

### License:
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

### Contributing:
Contributions are welcome! Please open an issue or submit a pull request if you have any improvements or new features to add.

### Contact:
For any questions or feedback, please contact [your email](mailto:your-email@example.com).
