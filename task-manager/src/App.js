import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import AddTask from './components/AddTask';
import axios from 'axios';
import { useState, useEffect } from 'react';

//DEBUGGING:
axios.defaults.withCredentials = true;


function App() {
    const api = axios.create({
        baseURL: 'http://localhost:5001/api', // Adjust if needed (e.g., 'http://localhost:5000/api')
    });

    const addBoard = async (board) => {
        try {
          const res = await api.post('/boards', board);
          const updated = await api.get('/boards');
          setBoards(updated.data);
        } catch (err) {
          console.error('Error adding board:', err);
        }
      };
      

    const [boards, setBoards] = useState([]);
    useEffect(() => {
        const fetchBoards = async () => {
          try {
            const res = await api.get('/boards');
            setBoards(res.data);
          } catch (err) {
            console.error('Error fetching boards:', err);
          }
        };
      
        fetchBoards();
      }, []);

    return (
    <div className="App">
        <h1>Task Nest</h1>
        <p>Welcome to the Task Nest task managing dashboard!</p>
        <Router>
            <Routes>
            <Route path="/" element={<Dashboard addBoard={addBoard} taskBoards={boards} />} />
            <Route path="/add-task" element={<AddTask />} />
            </Routes>
        </Router>
    </div>
    );
}

export default App;
