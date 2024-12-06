import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

const MoodForm = () => {
  const [imageURL, setImageURL] = useState('');
  const [caption, setCaption] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMood = { imageURL, caption };
    try {
      await axios.post('http://localhost:5000/api/moods', newMood);
      setImageURL('');
      setCaption('');
    } catch (error) {
      console.error('There was an error submitting the mood:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit} style={formStyle}>
      <Form.Group controlId="formImageURL">
        <Form.Label>Enter Image URL</Form.Label>
        <Form.Control 
          type="url" 
          value={imageURL} 
          onChange={(e) => setImageURL(e.target.value)} 
          required 
          style={inputStyle}
        />
      </Form.Group>
      <Form.Group controlId="formCaption">
        <Form.Label>Enter Caption</Form.Label>
        <Form.Control 
          type="text" 
          value={caption} 
          onChange={(e) => setCaption(e.target.value)} 
          required 
          style={inputStyle}
        />
      </Form.Group>
      <Button variant="primary" type="submit" style={buttonStyle}>
        Add to Board
      </Button>
    </Form>
  );
};

const formStyle = {
  backgroundColor: '#f7f7f7',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  marginBottom: '20px',
};

const inputStyle = {
  marginBottom: '10px',
};

const buttonStyle = {
  backgroundColor: '#007bff',
  borderColor: '#007bff',
  marginTop: '10px',
};

export default MoodForm;
