# recommend_lesson.py (updated)
import json
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Load lesson database
with open('lessons_db.json') as f:
    lessons_db = json.load(f)

# Preprocess lessons for similarity comparison
lesson_descriptions = [f"{lesson['title']} {lesson['keywords']}" for lesson in lessons_db]
vectorizer = TfidfVectorizer(stop_words='english')
lesson_vectors = vectorizer.fit_transform(lesson_descriptions)

def recommend_lesson(user_input):
    # Vectorize user input
    input_vec = vectorizer.transform([user_input.lower()])
    
    # Calculate similarity with all lessons
    similarities = cosine_similarity(input_vec, lesson_vectors)
    
    # Get top 3 most similar lessons
    top_indices = similarities.argsort()[0][-3:][::-1]
    recommended_lessons = [lessons_db[i] for i in top_indices]
    
    return {
        "level": recommended_lessons[0]['level'],
        "label": recommended_lessons[0]['level_label'],
        "recommended_lessons": recommended_lessons
    }