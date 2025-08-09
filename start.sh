#!/bin/bash

# Name der virtuellen Umgebung
VENV_DIR=".venv"

# Name der Screen-Session
SCREEN_NAME="flask_website"

# IP Adresse des Web-Servers
HOST="localhost"

RED='\033[0;31m'
YEL='\033[1;33m'

echo "${YEL}Diese Web-App nutzt die Python Version 3.12!!! Bitte sichergehen!"
sleep 4s

# Überprüfen, ob screen installiert ist
if ! command -v screen &> /dev/null; then
    echo "${RED}Error: screen ist nicht installiert. Bitte installiere es mit 'sudo apt-get install screen' und versuch es erneut"
    exit 1
fi

# Überprüfen, ob pip installiert ist
if ! command -v pip &> /dev/null; then
    echo "${RED}Error: pip ist nicht installiert. Bitte installiere es mit 'sudo apt-get install pip' und versuch es erneut"
    exit 1
fi

# Virtuelle Umgebung erstellen, falls sie nicht existiert
if [ ! -d "$VENV_DIR" ]; then
    echo "${YEL}Installiere python3.12-venv. Bei Fehler versuche: 'sudo apt install python3.12-venv'"
    sleep 4s
    apt install python3.12-venv
    echo "Erstelle virtuelle Umgebung..."
    python3.12 -m venv $VENV_DIR
fi

# Aktivieren der virtuellen Umgebung
source $VENV_DIR/bin/activate

# Installieren der Abhängigkeiten
./.venv/bin/python3 -m pip install --upgrade pip
./.venv/bin/python3 -m pip install -U -r requirements.txt

# Überprüfen, ob die Screen-Session bereits läuft
if screen -list | grep -q "$SCREEN_NAME"; then
    echo "Screen-Session '$SCREEN_NAME' läuft bereits. Schließe..."
    pkill -f gunicorn
    screen -d -r $SCREEN_NAME -X quit
    echo "Starte Flask-App in einer neuen Screen-Session..."
    screen -AmdS "$SCREEN_NAME" /bin/bash -c "while true; do ./.venv/bin/gunicorn -w 4 --reload -b $HOST:5000 main:app; echo 'Website crashed. Restarting in 10 seconds...'; sleep 10; done"
    echo "Flask-App läuft jetzt in der Screen-Session '$SCREEN_NAME'."
else
    echo "Starte Flask-App in einer neuen Screen-Session..."
    screen -AmdS "$SCREEN_NAME" /bin/bash -c "while true; do ./.venv/bin/gunicorn -w 4 --reload -b $HOST:5000 main:app; echo 'Website crashed. Restarting in 10 seconds...'; sleep 10; done"
    echo "Flask-App läuft jetzt in der Screen-Session '$SCREEN_NAME'."
fi