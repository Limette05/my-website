#!/bin/bash

# Name der virtuellen Umgebung
VENV_DIR=".venv"

# Name der Screen-Session
SCREEN_NAME="flask_app"

HOST="localhost"

# Überprüfen, ob screen installiert ist
if ! command -v screen &> /dev/null; then
    echo "Error: screen ist nicht installiert. Bitte installiere es mit 'sudo apt-get install screen'"
    exit 1
fi

# Virtuelle Umgebung erstellen, falls sie nicht existiert
if [ ! -d "$VENV_DIR" ]; then
    echo "Erstelle virtuelle Umgebung..."
    python3 -m venv $VENV_DIR
fi

# Aktivieren der virtuellen Umgebung
source $VENV_DIR/bin/activate

# Installieren der Abhängigkeiten
./.venv/bin/python3 -m pip install --upgrade pip
./.venv/bin/python3 -m pip install -U -r requirements.txt

# Überprüfen, ob die Screen-Session bereits läuft
if screen -list | grep -q "$SCREEN_NAME"; then
    echo "Screen-Session '$SCREEN_NAME' läuft bereits. Schließe..."
    screen -d -r $SCREEN_NAME -X quit
    echo "Starte Flask-App in einer neuen Screen-Session..."
    screen -AmdS "$SCREEN_NAME" /bin/bash -c "while true; do ./.venv/bin/gunicorn -w 2 --reload -b $HOST:5000 main:app; echo 'Website crashed. Restarting in 10 seconds...'; sleep 10; done"
    echo "Flask-App läuft jetzt in der Screen-Session '$SCREEN_NAME'."
else
    echo "Starte Flask-App in einer neuen Screen-Session..."
    screen -AmdS "$SCREEN_NAME" /bin/bash -c "while true; do ./.venv/bin/gunicorn -w 4 --reload -b $HOST:5000 main:app; echo 'Website crashed. Restarting in 10 seconds...'; sleep 10; done"
    echo "Flask-App läuft jetzt in der Screen-Session '$SCREEN_NAME'."
fi