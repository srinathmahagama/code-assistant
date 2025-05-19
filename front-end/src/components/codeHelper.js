import React, { useState } from 'react';
import { generateAnswer } from '../services/api';
import { EventEmitter } from 'events';
export const codeHelperEvents = new EventEmitter();

const CodeHelper = () => {
  const [instruction, setInstruction] = useState('');
  const [generatedAnswer, setGeneratedAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [questionHistory, setQuestionHistory] = useState([]);
  const [showRecommendationPrompt, setShowRecommendationPrompt] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!instruction.trim()) return;

    setLoading(true);
    setError('');
    try {
      const answer = await generateAnswer(instruction);
      setGeneratedAnswer(answer);

      // Update question history (keep last 2 questions)
      const newHistory = [...questionHistory, instruction].slice(-2);
      setQuestionHistory(newHistory);

      // Show prompt after 2nd question
      if (newHistory.length >= 2 && !showRecommendationPrompt) {
        setShowRecommendationPrompt(true);
      }

    } catch (err) {
      setError('Failed to generate answer');
      console.error(err);
    }finally {
    setLoading(false);
    }
  };

  const handleGetRecommendations = () => {
    if (questionHistory.length >= 2) {
      codeHelperEvents.emit('newInstructions', questionHistory.join(' '));
      setShowRecommendationPrompt(false);
    }
  };

  return (
    <div className="instruction-form">
      <h2>Ask from Coding Assistant</h2>
      <h3>Python | javascript | ...</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={instruction}
          onChange={(e) => setInstruction(e.target.value)}
          placeholder="Enter instruction here"
          rows={5}
        />
         <div className="form-actions">
        <button type="submit" disabled={loading || !instruction.trim()}
        className={loading ? 'loading' : ''}
        >
          {loading ? (
              <>
                <span className="spinner"></span> Generating...
              </>
            ) : 'Generate Answer'}
          </button>

          {showRecommendationPrompt && (
            <button
              type="button"
              onClick={handleGetRecommendations}
              className="recommend-btn"
            >
              Get Recommendations
            </button>
          )}
        </div>
      </form>
  
      
      {/* Error message display */}
      {error && <div className="error">{error}</div>}

      {/* Generated answer display */}
      {generatedAnswer && (
        <div className="generated-answer">
          <h3>Generated Answer:</h3>
          {/* Wrap generated answer in a <pre> for better formatting and easy copying */}
          <pre>{generatedAnswer}</pre>
        </div>
      )}
    </div>
  );
};

export default CodeHelper;
