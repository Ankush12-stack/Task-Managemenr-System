import React, {useState,useEffect} from "react";
// import TaskForm from './taskForm';
// import TaskList from './TaskList';
import { signUp, signIn, signOut, auth } from './Auth';
import './App.css';
import TaskDashborad from "./Context/TaskDashborad";
function App() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleLogin = (username, password) => {
    // Simulate authentication (replace with actual authentication logic)
    if (username === 'user' && password === 'password') {
      setUser(username);
      setError('');
    } else {
      setError('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const updateTask = (taskId, updatedTask) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, ...updatedTask } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <div className="app">
    {user ? (
        <>
          <h1>Welcome, {user}!</h1>
          
          {/* <TaskForm onAddTask={addTask} /> */}
          <button onClick={handleLogout}>Sign out</button>
          {/* <TaskList tasks={tasks} onUpdateTask={updateTask} onDeleteTask={deleteTask} /> */}
          <TaskDashborad/>
        </>
      ) : (
        <LoginForm onLogin={handleLogin} error={error} />
      )}
    </div>
  );
}

function LoginForm({ onLogin, error }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default App;
