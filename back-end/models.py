from extensions import db

class User(db.Model):
    __tablename__ = 'users'  # safe naming
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
