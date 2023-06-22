document.addEventListener('DOMContentLoaded', () => {
  const getTasksButton = document.getElementById('getTasksButton');
  const createTaskForm = document.getElementById('createTaskForm');
  const titleInput = document.getElementById('titleInput');
  const descriptionInput = document.getElementById('descriptionInput');
  const dueDateInput = document.getElementById('dueDateInput');
  const tasksList = document.getElementById('tasksList');

  // GET-Anfrage für Aufgaben
  getTasksButton.addEventListener('click', () => {
    fetch('/tasks')
      .then(response => response.json())
      .then(tasks => {
        tasksList.innerHTML = '';
        tasks.forEach(task => {
          const li = document.createElement('li');
          li.textContent = task.title;

          const statusSelect = document.createElement('select');
          statusSelect.innerHTML = `
            <option value="offen">Offen</option>
            <option value="in Bearbeitung">In Bearbeitung</option>
            <option value="erledigt">Erledigt</option>
          `;
          statusSelect.value = task.status;

          const updateButton = document.createElement('button');
          updateButton.textContent = 'Status aktualisieren';
          updateButton.addEventListener('click', () => {
            const newStatus = statusSelect.value;
            updateTaskStatus(task._id, newStatus)
              .then(updatedTask => {
                task.status = updatedTask.status;
                li.textContent = task.title + ' (Status: ' + task.status + ')';
              })
              .catch(error => console.error('Fehler beim Aktualisieren des Status:', error));
          });

          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'Löschen';
          deleteButton.addEventListener('click', () => {
            deleteTask(task._id)
              .then(() => {
                li.remove();
              })
              .catch(error => console.error('Fehler beim Löschen der Aufgabe:', error));
          });

          li.appendChild(statusSelect);
          li.appendChild(updateButton);
          li.appendChild(deleteButton);
          tasksList.appendChild(li);
        });
      })
      .catch(error => console.error('Fehler beim Abrufen der Aufgaben:', error));
  });

  // POST-Anfrage für eine neue Aufgabe
  createTaskForm.addEventListener('submit', event => {
    event.preventDefault();

    const newTask = {
      title: titleInput.value,
      description: descriptionInput.value,
      dueDate: dueDateInput.value,
      status: 'offen'
    };

    fetch('/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTask)
    })
      .then(response => response.json())
      .then(createdTask => {
        const li = document.createElement('li');
        li.textContent = createdTask.title + ' (Status: ' + createdTask.status + ')';

        const statusSelect = document.createElement('select');
        statusSelect.innerHTML = `
          <option value="offen">Offen</option>
          <option value="in Bearbeitung">In Bearbeitung</option>
          <option value="erledigt">Erledigt</option>
        `;
        statusSelect.value = createdTask.status;

        const updateButton = document.createElement('button');
        updateButton.textContent = 'Status aktualisieren';
        updateButton.addEventListener('click', () => {
          const newStatus = statusSelect.value;
          updateTaskStatus(createdTask._id, newStatus)
            .then(updatedTask => {
              createdTask.status = updatedTask.status;
              li.textContent = createdTask.title + ' (Status: ' + createdTask.status + ')';
            })
            .catch(error => console.error('Fehler beim Aktualisieren des Status:', error));
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Löschen';
        deleteButton.addEventListener('click', () => {
          deleteTask(createdTask._id)
            .then(() => {
              li.remove();
            })
            .catch(error => console.error('Fehler beim Löschen der Aufgabe:', error));
        });

        li.appendChild(statusSelect);
        li.appendChild(updateButton);
        li.appendChild(deleteButton);
        tasksList.appendChild(li);

        // Formularfelder zurücksetzen
        titleInput.value = '';
        descriptionInput.value = '';
        dueDateInput.value = '';
      })
      .catch(error => console.error('Fehler beim Erstellen der Aufgabe:', error));
  });

  // PUT-Anfrage zum Aktualisieren des Status einer Aufgabe
function updateTaskStatus(taskId, status) {
  return fetch(`/tasks/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ status })
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Fehler beim Aktualisieren des Status.');
    })
    .then(updatedTask => {
      console.log('Status aktualisiert:', updatedTask);
      return updatedTask;
    })
    .catch(error => console.error('Fehler beim Aktualisieren des Status:', error));
}

  // DELETE-Anfrage zum Löschen einer Aufgabe
  function deleteTask(taskId) {
    return fetch(`/tasks/${taskId}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          console.log('Aufgabe gelöscht:', taskId);
        } else {
          throw new Error('Fehler beim Löschen der Aufgabe.');
        }
      });
  }
});
