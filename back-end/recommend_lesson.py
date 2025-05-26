# recommend_lesson.py
from sentence_transformers import SentenceTransformer, util


class LessonRecommender:
    def __init__(self):
        self.embedder = SentenceTransformer('all-MiniLM-L6-v2')
        self.lessons = [
            {
                "title": "Variables & Data Types",
                "description": "Learn about Python variables and basic data types",
                "keywords": ["variable", "data type", "string", "integer", "float", "boolean"]
            },
            {
                "title": "Conditional Statements",
                "description": "Master if-else conditions and boolean logic",
                "keywords": ["if", "else", "elif", "condition", "boolean", "comparison"]
            },
            {
                "title": "Loops",
                "description": "Understand for and while loops in Python",
                "keywords": ["for loop", "while loop", "iteration", "range", "break", "continue"]
            },
            {
                "title": "Functions",
                "description": "Learn to create reusable code with functions",
                "keywords": ["function", "def", "parameter", "argument", "return", "scope"]
            },
            {
                "title": "Object-Oriented Programming",
                "description": "Introduction to classes and objects",
                "keywords": ["class", "object", "inheritance", "method", "attribute", "OOP"]
            },
            {
                "title": "Error Handling",
                "description": "Manage exceptions in your code",
                "keywords": ["try", "except", "exception", "error", "finally", "raise"]
            }
        ]
        
        # Precompute embeddings for all lessons
        self.lesson_texts = [
            f"{lesson['title']}. {lesson['description']}. Keywords: {', '.join(lesson['keywords'])}"
            for lesson in self.lessons
        ]
        self.lesson_embeddings = self.embedder.encode(self.lesson_texts, convert_to_tensor=True)

    def recommend_lessons(self, user_input, top_n=2):
        # Get embedding for user input
        input_embedding = self.embedder.encode(user_input, convert_to_tensor=True)
        
        # Compute similarity scores
        scores = util.cos_sim(input_embedding, self.lesson_embeddings)[0]
        
        # Get top N most similar lessons
        top_indices = scores.argsort(descending=True)[:top_n].tolist()
        recommended_lessons = [self.lessons[i] for i in top_indices]
        
        return recommended_lessons