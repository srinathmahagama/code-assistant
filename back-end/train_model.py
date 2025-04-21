import torch
from datasets import load_dataset
from transformers import AutoTokenizer, AutoModelForCausalLM, TrainingArguments, Trainer, DataCollatorForLanguageModeling

# Load dataset
dataset = load_dataset("json", data_files="dataset.json")

def format_dataset(example):
    prompt = f"Instruction: {example['instruction']}\nAnswer:\n{example['output']}###"
    return {"text": prompt}


dataset = dataset.map(format_dataset)
dataset = dataset["train"]

# Load tokenizer and model
model_name = "gpt2"
tokenizer = AutoTokenizer.from_pretrained(model_name)
tokenizer.pad_token = tokenizer.eos_token  # GPT-2 doesn't have a pad token

model = AutoModelForCausalLM.from_pretrained(model_name)

# Tokenize the dataset
def tokenize(example):
    return tokenizer(example["text"], truncation=True, padding="max_length", max_length=512)

tokenized_dataset = dataset.map(tokenize, batched=True)
tokenized_dataset.set_format("torch", columns=["input_ids", "attention_mask"])

# Training arguments
training_args = TrainingArguments(
    output_dir="../finetuned-gpt2",
    overwrite_output_dir=True,
    num_train_epochs=3,
    per_device_train_batch_size=2,
    save_strategy="epoch",
    logging_dir="../logs",
    logging_steps=10,
    fp16=torch.cuda.is_available(),
)

# Trainer setup
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_dataset,
    tokenizer=tokenizer,
    data_collator=DataCollatorForLanguageModeling(tokenizer, mlm=False),
)

# Train!
trainer.train()

# Save locally
model.save_pretrained("../finetuned-gpt2")
tokenizer.save_pretrained("../finetuned-gpt2")
