// DOM-Elemente abrufen
const getTasksButton = document.getElementById('getTasksButton');
const createTaskForm = document.getElementById('createTaskForm');
const tasksList = document.getElementById('tasksList');

// Funktion zum Abrufen der Termine
const getTasks = async () => {
  try {
    const response = await fetch('/tasks');
    const tasks = await response.json();
    displayTasks(tasks);
  } catch (error) {
    console.error('Fehler beim Abrufen der Termine:', error);
  }
};

// Funktion zum Anzeigen der Termine
const displayTasks = (tasks) => {
  // Vorherige Termine löschen
  tasksList.innerHTML = '';

  // Neue Termine erstellen und zur Liste hinzufügen
  tasks.forEach((task) => {
    const taskItem = document.createElement('li');
    taskItem.classList.add('task');

    const titleElement = document.createElement('h3');
    titleElement.innerText = task.title;
    taskItem.appendChild(titleElement);

    if (task.description) {
      const descriptionElement = document.createElement('p');
      descriptionElement.innerText = task.description;
      taskItem.appendChild(descriptionElement);
    }

    const dueDateElement = document.createElement('p');
    dueDateElement.innerText = `Fälligkeitsdatum: ${task.dueDate ? task.dueDate : 'Kein Datum'}`;
    taskItem.appendChild(dueDateElement);

    const statusElement = document.createElement('div');
    statusElement.classList.add('status');

    const statusLabel = document.createElement('label');
    statusLabel.innerText = 'Status:';
    statusElement.appendChild(statusLabel);

    const statusSelect = document.createElement('select');
    statusSelect.id = `statusSelect_${task._id}`;
    statusSelect.addEventListener('change', () => updateTaskStatus(task._id, statusSelect.value));

    const statusOptions = ['offen', 'in Bearbeitung', 'erledigt'];
    statusOptions.forEach((option) => {
      const optionElement = document.createElement('option');
      optionElement.value = option;
      optionElement.innerText = option;
      statusSelect.appendChild(optionElement);
    });

    statusSelect.value = task.status;
    statusElement.appendChild(statusSelect);

    const updateStatusButton = document.createElement('button');
    updateStatusButton.innerText = 'Status aktualisieren';
    updateStatusButton.addEventListener('click', () => updateTaskStatus(task._id, statusSelect.value));

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Löschen';
    deleteButton.addEventListener('click', () => deleteTask(task._id));

    const statusContainer = document.createElement('div');
    statusContainer.classList.add('status-container');
    statusContainer.appendChild(statusElement);
    statusContainer.appendChild(updateStatusButton);

    taskItem.appendChild(statusContainer);
    taskItem.appendChild(deleteButton);

    tasksList.appendChild(taskItem);
  });
};

// Funktion zum Erstellen eines neuen Termins
const createTask = async (title, description, dueDate) => {
  try {
    const response = await fetch('/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        dueDate,
        status: 'offen',
      }),
    });

    if (response.ok) {
      getTasks();
      createTaskForm.reset();
    } else {
      console.error('Fehler beim Erstellen des Termins:', response.status);
    }
  } catch (error) {
    console.error('Fehler beim Erstellen des Termins:', error);
  }
};

// Funktion zum Löschen eines Termins
const deleteTask = async (taskId) => {
  try {
    const response = await fetch(`/tasks/${taskId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      getTasks();
    } else {
      console.error('Fehler beim Löschen des Termins:', response.status);
    }
  } catch (error) {
    console.error('Fehler beim Löschen des Termins:', error);
  }
};

// Funktion zum Aktualisieren des Status eines Termins
const updateTaskStatus = async (taskId, status) => {
  try {
    const response = await fetch(`/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status,
      }),
    });

    if (response.ok) {
      getTasks();
    } else {
      console.error('Fehler beim Aktualisieren des Status:', response.status);
    }
  } catch (error) {
    console.error('Fehler beim Aktualisieren des Status:', error);
  }
};

// Event-Listener für das Abrufen der Termine bei Button-Klick
getTasksButton.addEventListener('click', () => {
  getTasks();
});

// Event-Listener für das Erstellen eines neuen Termins bei Formular-Einreichung
createTaskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('titleInput').value;
  const description = document.getElementById('descriptionInput').value;
  const dueDate = document.getElementById('dueDateInput').value;
  createTask(title, description, dueDate);
});
