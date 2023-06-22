Aufgabenverwaltungs-App
Dies ist eine einfache Aufgabenverwaltungs-App, die mit HTML, CSS und JavaScript entwickelt wurde. Sie ermöglicht das Erstellen, Aktualisieren und Löschen von Aufgaben.

Funktionen
Aufgaben anzeigen: Klicken Sie auf die Schaltfläche "Aufgaben abrufen", um die Liste der Aufgaben vom Server abzurufen und anzuzeigen.
Aufgabe erstellen: Füllen Sie das Formular zur Aufgabenerstellung aus und senden Sie es ab, um eine neue Aufgabe hinzuzufügen. Die Aufgabe wird in der Liste der Aufgaben angezeigt.
Aufgabenstatus aktualisieren: Ändern Sie den Status einer Aufgabe, indem Sie eine andere Option aus dem Status-Dropdown auswählen und auf die Schaltfläche "Status aktualisieren" klicken.
Aufgabe löschen: Entfernen Sie eine Aufgabe aus der Liste, indem Sie auf die Schaltfläche "Löschen" klicken, die der Aufgabe zugeordnet ist.
Verwendete Technologien
HTML: Wird für die Struktur und das Layout der App verwendet.
CSS: Wird für das Styling der App verwendet.
JavaScript: Wird für das Abrufen von Daten vom Server, die Verarbeitung von Benutzerinteraktionen und die Aktualisierung der Benutzeroberfläche verwendet.
Anwendung
Klone das Repository.
Öffne die Datei index.html in einem Webbrowser.
Klicke auf die Schaltfläche "Aufgaben abrufen", um vorhandene Aufgaben abzurufen und anzuzeigen.
Fülle das Formular zur Aufgabenerstellung mit einem Titel, einer Beschreibung und einem Fälligkeitsdatum aus und klicke dann auf die Schaltfläche "Absenden", um eine neue Aufgabe hinzuzufügen.
Um den Status einer Aufgabe zu aktualisieren, wähle eine andere Option aus dem Status-Dropdown aus und klicke auf die Schaltfläche "Status aktualisieren", die der Aufgabe zugeordnet ist.
Um eine Aufgabe zu löschen, klicke auf die Schaltfläche "Löschen", die der Aufgabe zugeordnet ist.
Hinweis: Diese App erfordert einen Server, um die API-Anfragen zu verarbeiten. Stelle sicher, dass du den Server einrichtest und die API-Endpunkte im JavaScript-Code entsprechend aktualisierst.

API-Endpunkte des Servers
GET /tasks: Ruft alle Aufgaben vom Server ab.
POST /tasks: Erstellt eine neue Aufgabe auf dem Server.
PUT /tasks/{taskId}: Aktualisiert den Status einer Aufgabe mit der angegebenen taskId auf dem Server.
DELETE /tasks/{taskId}: Löscht die Aufgabe mit der angegebenen taskId vom Server.
