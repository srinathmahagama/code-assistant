from flask import Flask, request, jsonify
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config
from extensions import db, migrate
from models import User, Quizz, QuizLevel
import json
from sentence_transformers import SentenceTransformer, util
from recommend_lesson import LessonRecommender

lesson_recommender = LessonRecommender()

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

@app.route('/quizzes', methods=['POST'])
def create_quiz():
    data = request.get_json()
    quiz = Quizz(
        question_text=data['question'],
        correct_answer=data['correct_answer'],
        answer_options =data['answer_options'],
        question_type=data['question_type'],
        language=data['language'],
        difficulty=data['difficulty']
    )
    db.session.add(quiz)
    db.session.commit()
    return jsonify({
        "id": quiz.id,
        "question": quiz.question_text,
        "correct_answer": quiz.correct_answer,
        "answer_options": quiz.answer_options,
        "question_type": quiz.question_type,
        "language": quiz.language,
        "difficulty": quiz.difficulty
    }), 201
        
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
    
@app.route("/quizzes", methods=["GET"])
def get_quizzes():
    language = request.args.get("language")
    difficulty = request.args.get("difficulty")

    query = Quizz.query
    if language:
        query = query.filter_by(language=language)
    if difficulty:
        query = query.filter_by(difficulty=difficulty)

    quizzes = query.all()
    result = [
        {
            "id": q.id,
            "question": q.question_text,
            "correct_answer": q.correct_answer,
            "answer_options": q.answer_options,
            "question_type": q.question_type,
            "language": q.language,
            "difficulty": q.difficulty
        }
        for q in quizzes
    ]
    return jsonify(result)

@app.route("/recommend_lessons", methods=["POST"])
def recommend_lessons():
    data = request.get_json()
    user_input = data.get("user_input", "").strip()
    
    if not user_input:
        return jsonify({"error": "Missing user input"}), 400
    
    try:
        # Get recommendations based on combined questions
        recommended_lessons = lesson_recommender.recommend_lessons(user_input)
        
        return jsonify({
            "user_input": user_input,
            "recommended_lessons": recommended_lessons
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

#if __name__ == "__main__":
 #   app.run(debug=True)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5007, debug=True)
