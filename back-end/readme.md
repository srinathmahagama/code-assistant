
# Project Setup Guide

Follow these steps to set up and run the project:

---

## 1. Clone the Repository

```bash
git clone <your-repo-url>
cd <your-project-directory>
```

---

## 2. Set Up Python Virtual Environment

```bash
python3 -m venv venv
source venv/bin/activate   # For Linux/macOS
# OR
venv\Scripts\activate      # For Windows
```

---

## 3. Log Environment Variables (Optional)

Set or log your environment variables as required for the project.

---

## 4. Back-End Setup

```bash
cd back-end
pip install -r requirements.txt
```

---

## 5. Clean Up Old Files

```bash
rm -r finetuned-gpt2
rm -r dataset.json
```

---

## 6. Generate Dataset

```bash
python generate_dataset.py
```

---

## 7. Train the Model

```bash
python train_model.py
```

---

## 8. Run the Backend Server

```bash
python app.py
```

---

## 9. Front-End Setup

In a new terminal window:

```bash
cd front-end
npm install
npm start
```

---

> ✅ Application should now be running with both front-end and back-end servers.

# Database Setup Guide

# 1 Create a Database
```bash

CREATE DATABASE code_assistant;"

```

---
# 2 set DB connection
```bash
SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:<your_password>@localhost:3306/code_assistant'
```
---
# 3 migration steps
```bash
export FLASK_APP=app.py  # or set FLASK_APP=app.py on Windows
flask db init
flask db migrate -m "Initial migration"
flask db upgrade

```
