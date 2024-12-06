import React, { useState, useEffect } from 'react';
import CreateTweet from './CreateTweet';
import TweetList from './TweetList';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [tweets, setTweets] = useState([]);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    console.log('Retrieved username from localStorage:', storedUsername); // Log retrieved username
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleNewTweet = (newTweet) => {
    setTweets(prevTweets => [newTweet, ...prevTweets]);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div className="mt-4">
      <h1 className="text-center">Tweet Sharing App</h1>
      <button className="btn btn-secondary mb-3 float-right" onClick={handleLogout}>Logout</button>
      {username && <h2 className="text-center">Welcome, {username}!</h2>}
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <CreateTweet onTweetCreated={handleNewTweet} />
          <TweetList tweets={tweets} setTweets={setTweets} />
        </div>
      </div>
    </div>
  );
};

export default Home;
