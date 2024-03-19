import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [healthStatus, setHealthStatus] = useState(null);


  useEffect(() => {
    const fetchHealthCheck = async () => {
      try {
        const response = await fetch('https://back.mate85.tauane.artadevs.tech/health-check');
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        setHealthStatus(data.status);
      } catch (error) {
        console.error('Error fetching health check:', error);
        setHealthStatus('Error');
      }
    };

    fetchHealthCheck();
  }, []); // Empty dependency array means this effect runs once after the first render

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      {healthStatus !== null && (
          <p>
            Health Check Status: {healthStatus}
          </p>
        )}
      </header>
    </div>
  );
}

export default App;
