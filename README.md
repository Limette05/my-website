# my-website

my second website, for myself

## Installation

### Linux only

### Need Python3 (best >3.10) or above

### 1. Create and activate virtual environment

`python -m venv .venv`

`source .venv/bin/activate`

### 2. Install requirements

**Linux**
`python3 -m pip install -U -r requirements.txt`

### 3. Configure

- edit "host" variable in main.py to your ip-address
- edit "app.config to your needs

### 4. Start App

`gunicorn -w 4 --reload -b localhost:5000 main:app`
Use 2-4 workers per CPU Core ("... -w WORKERS ...")

## Automatic startup

Use **start.sh**

### Important

paste your ip-address in start.sh
Does **NOT** Configure app.config in main.py
