from flask import Flask, render_template, request
from common import cache

app = Flask(__name__)

cache.init_app(app, config={"CACHE_TYPE": "filesystem", "CACHE_DIR": "./tmp"})

cache.set("clipboard", "")

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/paste', methods=['POST'])
def paste():
    cache.set("clipboard", request.json.get("clipboard"))
    return {"status": "ok"}

@app.route('/fetch')
def fetch():
    return {"clipboard": cache.get("clipboard")}

if __name__ == '__main__':
    app.run(host='0.0.0.0', ssl_context='adhoc')

