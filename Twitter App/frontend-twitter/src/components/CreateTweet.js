import React, { useState } from 'react';
import axios from 'axios';

const CreateTweet = ({ onTweetCreated }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/tweets', { content }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setContent('');
      onTweetCreated(res.data);
    } catch (err) {
      console.error('Error creating tweet:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="my-4">
      <div className="form-group">
        <input 
          type="text" 
          className="form-control" 
          placeholder="What's happening?" 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          required 
        />
      </div>
      <button type="submit" className="btn btn-primary btn-block">Tweet</button>
    </form>
  );
};

export default CreateTweet;
