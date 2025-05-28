import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    fetch('http://localhost:8000')
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => setMessage('Error connecting to backend'));
  }, []);

  return (
    <div className="min-h-screen bg-indigo-600 text-white flex items-center justify-center">
      <h1 className="text-4xl font-bold">{message}</h1>
    </div>
  );
}

export default App;