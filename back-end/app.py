from flask import Flask, request, jsonify
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch
from flask_cors import CORS
from recommend_lesson import recommend_lesson

app = Flask(__name__)
CORS(app)

MODEL_PATH = "../finetuned-gpt2"
tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)
model = AutoModelForCausalLM.from_pretrained(MODEL_PATH)

tokenizer.pad_token = tokenizer.eos_token

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
