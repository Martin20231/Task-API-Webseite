const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
app.use(express.json());

// Statischen Dateiserver für die HTML-Seite konfigurieren
app.use(express.static(path.join(__dirname, 'public')));

// Middleware-Funktion zur Protokollierung der Anfragen
app.use((req, res, next) => {
  const now = new Date().toISOString();
  const { method, url } = req;
  console.log(`[${now}] ${method} ${url}`);
  next();
});

// Mongoose-Verbindung herstellen
mongoose.connect('mongodb+srv://Martin:' + encodeURIComponent('Jappy1994!') + '@cluster0.lp67urt.mongodb.net/heute?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB verbunden');
  })
  .catch(error => console.error('Fehler bei der MongoDB-Verbindung:', error));

// Mongoose-Schema für Aufgaben definieren
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  creationDate: {
    type: Date,
    default: Date.now
  },
  dueDate: {
    type: Date
  },
  status: {
    type: String,
    default: 'offen',
    enum: ['offen', 'in Bearbeitung', 'erledigt']
  }
});
// DELETE-Anfrage zum Löschen einer Aufgabe
app.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  Task.findByIdAndRemove(taskId)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(error => {
      console.error('Fehler beim Löschen der Aufgabe:', error);
      res.sendStatus(500);
    });
});

// Mongoose-Modell für Aufgaben erstellen
const Task = mongoose.model('Task', taskSchema);

// GET: Alle Aufgaben abrufen
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Abrufen der Aufgaben' });
  }
});

// POST: Neue Aufgabe erstellen
app.post('/tasks', async (req, res) => {
  try {
    const { title, description, dueDate, status } = req.body;
    const task = new Task({ title, description, dueDate, status });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Erstellen der Aufgabe' });
  }
});
// PUT-Anfrage zum Aktualisieren des Status einer Aufgabe
app.put('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const { status } = req.body;
  
    Task.findByIdAndUpdate(taskId, { status }, { new: true })
      .then(updatedTask => {
        if (!updatedTask) {
          return res.status(404).json({ error: 'Aufgabe nicht gefunden' });
        }
  
        if (status === 'erledigt') {
            return Task.findByIdAndRemove(taskId)
              .then(() => res.sendStatus(204));
          }
          
  
        return res.json(updatedTask);
      })
      .catch(error => {
        console.error('Fehler beim Aktualisieren des Status:', error);
        res.sendStatus(500);
      });
  });
  
  
  

// DELETE-Anfrage zum Löschen einer Aufgabe
app.delete('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    Task.findByIdAndRemove(taskId)
      .then(() => {
        res.sendStatus(204);
      })
      .catch(error => {
        console.error('Fehler beim Löschen der Aufgabe:', error);
        res.sendStatus(500);
      });
  });
  

// Server starten
const port = 3000;
app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});
