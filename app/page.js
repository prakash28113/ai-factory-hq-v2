"use client";

import { useState } from "react";

const employees = [
  ["👑", "Chief", "Orchestrator"],
  ["🔎", "Scout", "Research"],
  ["🧠", "Forge", "Product"],
  ["✍️", "Wordsmith", "Content"],
  ["🎨", "Atlas", "Design"],
  ["📣", "Pulse", "Marketing"],
  ["📊", "Ledger", "Finance"],
  ["⚙️", "Ops", "Operations"],
];

export default function Home() {
  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState([]);

  function createTask() {
    const title = taskText.trim();

    if (!title) {
      alert("Please enter a task first.");
      return;
    }

    const newTask = {
      id: `AF-${Date.now().toString(36).toUpperCase()}`,
      title,
      employee: "Chief",
      status: "QUEUED",
    };

    setTasks((previousTasks) => [
      newTask,
      ...previousTasks,
    ]);

    setTaskText("");
  }

  const working = tasks.filter(
    (task) => task.status === "WORKING"
  ).length;

  const approval = tasks.filter(
    (task) => task.status === "APPROVAL"
  ).length;

  const completed = tasks.filter(
    (task) => task.status === "COMPLETED"
  ).length;

  const failed = tasks.filter(
    (task) => task.status === "FAILED"
  ).length;

  return (
    <main>
      <header className="header">
        <div>
          <div className="eyebrow">
            AI WORKFORCE OPERATING SYSTEM
          </div>

          <h1>AI Factory HQ</h1>

          <p>
            One-person company. Eight AI employees. One command center.
          </p>
        </div>

        <div className="online">
          <span></span>
          ONLINE
        </div>
      </header>

      <section className="stats">
        <div className="stat">
          <strong>{working}</strong>
          <small>WORKING</small>
        </div>

        <div className="stat">
          <strong>{approval}</strong>
          <small>APPROVAL</small>
        </div>

        <div className="stat">
          <strong>{completed}</strong>
          <small>COMPLETED</small>
        </div>

        <div className="stat">
          <strong>{failed}</strong>
          <small>FAILED</small>
        </div>
      </section>

      <section className="command">
        <div className="section-title">
          <span>COMMAND THE FACTORY</span>
          <small>Give the workforce a job.</small>
        </div>

        <textarea
          value={taskText}
          onChange={(event) => setTaskText(event.target.value)}
          placeholder="Example: Create a profitable digital product for freelance graphic designers."
        />

        <button
          type="button"
          onClick={createTask}
        >
          ＋ CREATE TASK
        </button>
      </section>

      <section className="board">
        <div className="section-title">
          <span>LIVE TASK BOARD</span>
          <small>{tasks.length} total tasks</small>
        </div>

        {tasks.length === 0 ? (
          <div className="empty">
            No tasks yet.
            <br />
            Create your first task above.
          </div>
        ) : (
          <div className="tasks">
            {tasks.map((task) => (
              <article className="task" key={task.id}>
                <div>
                  <small>{task.id}</small>

                  <h3>{task.title}</h3>

                  <p>
                    Assigned to: {task.employee}
                  </p>
                </div>

                <div className="status queued">
                  {task.status}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="employees">
        <div className="section-title">
          <span>AI EMPLOYEES</span>
          <small>8 employees ready</small>
        </div>

        <div className="grid">
          {employees.map(([icon, name, role]) => (
            <article
              className="employee"
              key={name}
            >
              <div className="icon">
                {icon}
              </div>

              <div>
                <h3>{name}</h3>
                <p>{role}</p>
              </div>

              <span className="ready">
                READY
              </span>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
