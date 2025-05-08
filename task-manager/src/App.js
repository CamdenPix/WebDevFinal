import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import AddTask from './components/AddTask';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
    const api = axios.create({
        baseURL: 'http://localhost:5000/api', // Adjust if needed (e.g., 'http://localhost:5000/api')
    });
    const [boards, setBoards] = useState([]);
    useEffect(() => {
        api.get('/boards')
          .then(res => setBoards(res.data))
          .catch(err => console.error('Error fetching boards', err));
    }, [boards, api]);
    //export const addBoard = () => async (){} or something to optimize?
    async function addBoard(board){
        console.log(board);
        try {
            const res = await api.post('/boards', board);
            const newBoards = [...boards, res.data];
            setBoards(newBoards);
            console.log(boards)
        } catch (e) {
            console.error('Error creating board:', e);
        }
    }

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
