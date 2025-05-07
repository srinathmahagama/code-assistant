from flask import Flask, request, jsonify
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config
from extensions import db, migrate
from models import User


app = Flask(__name__)
CORS(app)

app.config.from_object(Config)

db.init_app(app)
migrate.init_app(app, db)

MODEL_PATH = "../finetuned-gpt2"
tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)
model = AutoModelForCausalLM.from_pretrained(MODEL_PATH)

tokenizer.pad_token = tokenizer.eos_token

@app.route('/')
def index():
    return "Flask + MySQL + SQLAlchemy + Migrate is working!"

@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    user = User(name=data['name'])
    db.session.add(user)
    db.session.commit()
    return jsonify({"id": user.id, "name": user.name}), 201

@app.route("/generate", methods=["POST"])
def generate():
    data = request.get_json()
    instruction = data.get("instruction", "").strip()
    if not instruction:
        return jsonify({"error": "Missing instruction"}), 400

    prompt = f"Instruction: {instruction}\nAnswer:\n"
    inputs = tokenizer(prompt, return_tensors="pt")
    eos_token_id = tokenizer.convert_tokens_to_ids("###")

    outputs = model.generate(
        **inputs,
        max_new_tokens=100,
        do_sample=False,
        pad_token_id=tokenizer.eos_token_id,
        eos_token_id=eos_token_id
    )

    decoded = tokenizer.decode(outputs[0], skip_special_tokens=True)
    generated = decoded[len(prompt):].split("###")[0].strip()

    return jsonify({
        "instruction": instruction,
        "generated": generated
    })

if __name__ == "__main__":
    app.run(debug=True)
