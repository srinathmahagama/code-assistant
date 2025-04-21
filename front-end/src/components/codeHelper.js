import React, { useState } from 'react';
import { generateAnswer } from '../services/api';

const CodeHelper = () => {
  const [instruction, setInstruction] = useState('');
  const [generatedAnswer, setGeneratedAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const answer = await generateAnswer(instruction);
      setGeneratedAnswer(answer);
    } catch (err) {
      setError('Failed to generate answer');
    }
    setLoading(false);
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
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Answer'}
        </button>
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
