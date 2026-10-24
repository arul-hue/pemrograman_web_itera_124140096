import React from 'react';
import Header from '../../components/Header/Header';
import TaskForm from '../../components/TaskForm/TaskForm';
import TaskItem from '../../components/TaskItem/TaskItem';
import { useTasks } from '../../context/TaskContext';
import useWindowSize from '../../hooks/useWindowSize';
import './Home.css';

function Home() {
  // Panggil context langsung tanpa menerima props dari App!
  const { tasks, addTask, deleteTask, toggleComplete, clearTasks, stats } = useTasks();
  const { width } = useWindowSize();

  const handleClearAll = () => {
    if (window.confirm('Hapus semua tugas?')) {
      clearTasks();
    }
  };

  return (
    <div className="home">
      <Header title="React Task Manager" description="State Global dengan Context API" />
      <main className="container">
        <span className="screen-badge">
          {width < 768 ? 'Mode Layar Mobile' : 'Mode Layar Desktop'}
        </span>

        <div className="stats-row">
          <div className="stats">
            <p>Total: {stats.total}</p>
            <p>Selesai: {stats.completed}</p>
            <p>Progress: {stats.completionRate.toFixed(0)}%</p>
          </div>
          <button className="clear-btn" onClick={handleClearAll}>
            Hapus Semua Tugas
          </button>
        </div>

        <TaskForm onAddTask={addTask} />

        <div className="task-list">
          {tasks.length === 0 ? (
            <p className="empty-message">Belum ada tugas. Tambahkan tugas baru di atas!</p>
          ) : (
            tasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onDelete={deleteTask}
                onToggleComplete={toggleComplete}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default Home;
