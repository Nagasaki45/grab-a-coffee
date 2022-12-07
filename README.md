# GrabACoffee

## Getting started

```bash
python -m venv env
source env/bin/activate
pip install -r requirements.txt
```

Run the server with

```bash
FLASK_ENV=development python app.py
```

## Deployment

The project is available on [grab-a-coffee.tomgurion.me](https://grab-a-coffee.tomgurion.me). It is deployed on digital ocean app platform. DNS through cloudflare. For the record, here's the `run command` defined in digitalocean:

```bash
gunicorn --worker-class eventlet --worker-tmp-dir /dev/shm app:app
```
