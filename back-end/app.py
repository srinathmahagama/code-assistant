from flask import Flask, request, jsonify
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch
from flask_cors import CORS

from recommend_lesson import recommend_lesson
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config
from extensions import db, migrate
from models import User
import json
from sentence_transformers import SentenceTransformer, util


app = Flask(__name__)
CORS(app)

app.config.from_object(Config)

db.init_app(app)
migrate.init_app(app, db)

MODEL_PATH = "../finetuned-gpt2"
tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)
model = AutoModelForCausalLM.from_pretrained(MODEL_PATH)

tokenizer.pad_token = tokenizer.eos_token

# Load embedding model
embedder = SentenceTransformer('all-MiniLM-L6-v2')

with open("dataset.json") as f:
    knowledge_base = json.load(f)

instruction_texts = [item["instruction"] for item in knowledge_base]
instruction_embeddings = embedder.encode(instruction_texts, convert_to_tensor=True)


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
    
@app.route("/ask", methods=["POST"])
def ask():
    data = request.get_json()
    instruction = data.get("instruction", "").strip()
    if not instruction:
        return jsonify({"error": "Missing instruction"}), 400

    query_embedding = embedder.encode(instruction, convert_to_tensor=True)
    scores = util.cos_sim(query_embedding, instruction_embeddings)[0]
    top_idx = scores.argmax().item()
    match = knowledge_base[top_idx]

    return jsonify({
        "instruction": instruction,
        "matched_instruction": match["instruction"],
        "generated": match["output"]
    })

@app.route("/recommend", methods=["GET"])
def recommend():
    user_input = request.args.get("input", "").strip()
    
    if not user_input:
        return jsonify({
            "error": "Empty input",
            "message": "Please provide a question about programming"
        }), 400

    result = recommend_lesson(user_input)
    return jsonify({
        "level": result["level"],
        "label": result["label"],
        "lessons": result["recommended_lessons"]
    })

if __name__ == "__main__":
    app.run(debug=True)

#if __name__ == "__main__":
#    app.run(host="0.0.0.0", port=5002, debug=True)
