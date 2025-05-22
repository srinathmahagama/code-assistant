from extensions import db

class User(db.Model):
    __tablename__ = 'users'  # safe naming
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

class Quizz(db.Model):
    __tablename__ = 'quizzes'
    id = db.Column(db.Integer, primary_key=True)
    question_text = db.Column(db.Text, nullable=False)
    answer_options = db.Column(db.JSON, nullable=False)
    correct_answer = db.Column(db.Text, nullable=False)
    language = db.Column(db.String(50), nullable=False)
    question_type = db.Column(db.String(50), nullable=False)
    difficulty = db.Column(db.String(50), nullable=False)


class QuizLevel(db.Model):
    __tablename__ = 'quiz_levels'
    id = db.Column(db.Integer, primary_key=True)
    level = db.Column(db.String(50), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    topic = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)

