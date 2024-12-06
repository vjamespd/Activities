import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Row, Col } from 'react-bootstrap';

const MoodBoard = () => {
  const [moods, setMoods] = useState([]);

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/moods');
        setMoods(response.data);
      } catch (error) {
        console.error('There was an error fetching the moods:', error);
      }
    };
    fetchMoods();
  }, []);

  return (
    <Row>
      {moods.map((mood, index) => (
        <Col key={index} md={4} className="mb-4">
          <Card style={cardStyle}>
            <Card.Img variant="top" src={mood.imageURL} alt="Mood Image" style={imageStyle} />
            <Card.Body>
              <Card.Text>{mood.caption}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

const cardStyle = {
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
};

const imageStyle = {
  borderRadius: '10px 10px 0 0',
};

export default MoodBoard;
