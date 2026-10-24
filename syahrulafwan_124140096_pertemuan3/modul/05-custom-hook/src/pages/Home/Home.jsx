import React from 'react';
import Header from '../../components/Header/Header';
import TaskForm from '../../components/TaskForm/TaskForm';
import TaskItem from '../../components/TaskItem/TaskItem';
import useLocalStorage from '../../hooks/useLocalStorage';
import useWindowSize from '../../hooks/useWindowSize';
import './Home.css';

function Home() {
  // Hanya 1 baris kode menggantikan seluruh boilerplate useEffect localStorage!
  const [tasks, setTasks] = useLocalStorage('tasks_data', []);
  const { width } = useWindowSize();

  const handleAddTask = (newTask) => setTasks([...tasks, newTask]);
  const handleDeleteTask = (taskId) => setTasks(tasks.filter(t => t.id !== taskId));
  const handleToggleComplete = (taskId) =>
    setTasks(tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t));

  const handleClearAll = () => {
    if (window.confirm('Hapus semua tugas?')) {
      setTasks([]);
    }
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const remainingCount = tasks.length - completedCount;

  return (
    <div className="home">
      <Header title="React Task Manager" description="Kelola tugas dengan Custom Hook" />
      <main className="container">
        <span className="screen-badge">
          {width < 768 ? 'Mode Layar Mobile' : 'Mode Layar Desktop'}
        </span>

        <div className="stats-row">
          <div className="stats">
            <p>Total: <strong>{tasks.length}</strong> tugas</p>
            <p>Selesai: <strong style={{ color: '#10b981' }}>{completedCount}</strong></p>
            <p>Belum Selesai: <strong style={{ color: '#ef4444' }}>{remainingCount}</strong></p>
          </div>
          <button className="clear-btn" onClick={handleClearAll}>
            Hapus Semua Tugas
          </button>
        </div>

        <TaskForm onAddTask={handleAddTask} />

        <div className="task-list">
          {tasks.length === 0 ? (
            <p className="empty-message">Belum ada tugas. Tambahkan tugas baru di atas!</p>
          ) : (
            tasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onDelete={handleDeleteTask}
                onToggleComplete={handleToggleComplete}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default Home;
