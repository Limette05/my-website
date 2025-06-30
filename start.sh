python3 -m venv .venv
source .venv/bin/activate
./.venv/bin/python -m pip install -U -r requirements.txt
./.venv/bin/gunicorn -w 4 --reload -b localhost:5000 main:app