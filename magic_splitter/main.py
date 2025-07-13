from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route("/")
def home():
    return "🎧 Magic Splitter API Online!"

@app.route("/upload", methods=["POST"])
def upload_audio():
    if 'file' not in request.files:
        return jsonify({"error": "Nenhum ficheiro recebido"}), 400

    file = request.files['file']
    tipo = request.form.get('tipo')

    if file.filename == '':
        return jsonify({"error": "Nome de ficheiro vazio"}), 400

    filename = file.filename
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)

    print(f"🛠️ Tipo escolhido: {tipo}")
    print(f"📁 Ficheiro salvo em: {filepath}")

    return jsonify({"filename": filename})

@app.route("/audio/<filename>")
def servir_audio(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)