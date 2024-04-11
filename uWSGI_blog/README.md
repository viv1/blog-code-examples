```bash
python3 -m venv venv
source venv/bin/activate

cd pythonGIL

From terminal 1, 
```bash
docker build -t blog-uwsgi -f Dockerfile .
docker run -p 8000:8000 blog-uwsgi
```

From terminal 2,
```bash
pip install -r requirements.txt
python client.py
```
