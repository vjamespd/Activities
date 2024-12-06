import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TweetList = ({ tweets, setTweets }) => {
  useEffect(() => {
    const fetchTweets = async () => {
      const res = await axios.get('http://localhost:5000/tweets', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setTweets(res.data);
    };
    fetchTweets();
  }, [setTweets]);

  return (
    <div className="mt-4">
      <h2 className="text-center">Tweets</h2>
      <ul className="list-group">
        {tweets.map(tweet => (
          <li key={tweet._id} className="list-group-item">
            <p>{tweet.content} by {tweet.user.username}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TweetList;
