import { useState } from "react";

const starterTasks = [
  { id: 1, text: "Plan the weekly design sprint", done: true },
  { id: 2, text: "Finish the hero section mockup", done: false },
  { id: 3, text: "Ship the landing page polish", done: false },
];

const App = () => {
  const [tasks, setTasks] = useState(starterTasks);
  const [taskInput, setTaskInput] = useState("");

  const completedTasks = tasks.filter((task) => task.done).length;
  const progress = tasks.length ? Math.round((completedTasks / tasks.length) * 100) : 0;

  const addTask = (event) => {
    event.preventDefault();

    const trimmed = taskInput.trim();
    if (!trimmed) {
      return;
    }

    setTasks((currentTasks) => [
      ...currentTasks,
      { id: Date.now(), text: trimmed, done: false },
    ]);
    setTaskInput("");
  };

  const toggleTask = (id) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    );
  };

  const deleteTask = (id) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
  };

  return (
    <div className="app-shell">
      <div className="todo-card">
        <header className="topbar">
          <div className="branding">
            <div className="brand-icon">✓</div>
            <div>
              <h1>FocusFlow</h1>
            </div>
          </div>
          <span className="mini-pill">All systems ready</span>
        </header>

        <section className="stats" aria-label="Task overview">
          <div className="stat-card">
            <span className="stat-label">Tasks</span>
            <span className="stat-value">{tasks.length}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Done</span>
            <span className="stat-value">{completedTasks}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Progress</span>
            <span className="stat-value">{progress}%</span>
            <div className="progress-wrap" aria-hidden="true">
              <div className="progress-bar" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </section>

        <form className="task-form" onSubmit={addTask}>
          <input
            className="task-input"
            type="text"
            value={taskInput}
            onChange={(event) => setTaskInput(event.target.value)}
            placeholder="Add a task for today..."
            aria-label="Add a task"
          />
          <button className="add-btn" type="submit">Add Task</button>
        </form>

        <ul className="task-list">
          {tasks.length === 0 ? (
            <li className="empty-state">No tasks yet — add your first win.</li>
          ) : (
            tasks.map((task) => (
              <li key={task.id} className={`task-item ${task.done ? "done" : ""}`}>
                <div className="task-main">
                  <button
                    type="button"
                    className="task-check"
                    onClick={() => toggleTask(task.id)}
                    aria-label={task.done ? "Mark task as not done" : "Mark task as done"}
                  >
                    {task.done ? "✓" : ""}
                  </button>
                  <span className="task-text">{task.text}</span>
                </div>

                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => deleteTask(task.id)}
                  aria-label={`Delete ${task.text}`}
                >
                  Delete
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default App;