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
          <Card>
            <Card.Img variant="top" src={mood.imageURL} alt="Mood Image" />
            <Card.Body>
              <Card.Text>{mood.caption}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default MoodBoard;
