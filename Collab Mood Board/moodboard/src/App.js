import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MoodForm from './moodForm';
import MoodBoard from './moodBoard';
import './App.css';


function App() {
  return (
    <div className="App" style={{ padding: '20px' }}>
      <header className="App-header">
        <h1>Collaborative Mood Board</h1>
        <MoodForm />
        <MoodBoard />
      </header>
    </div>
  );
}

export default App;
