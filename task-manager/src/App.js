import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import AddTask from './components/AddTask';

function App() {
  return (
    <div className="App">
        <h1>Task Nest</h1>
        <p>Welcome to the Task Nest task managing dashboard!</p>
      <Router>
          <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-task" element={<AddTask />} />
          </Routes>
      </Router>
      </div>
    
  );
}

export default App;
