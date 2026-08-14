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
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  function createTask() {
    if (!task.trim()) return;

    const newTask = {
      id: "AF-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
      title: task,
      employee: "Chief",
      status: "QUEUED",
    };

    setTasks((current) => [newTask, ...current]);
    setTask("");
  }

  const working = tasks.filter((t) => t.status === "WORKING").length;
  const approval = tasks.filter((t) => t.status === "APPROVAL").length;
  const completed = tasks.filter((t) => t.status === "COMPLETED").length;
  const failed = tasks.filter((t) => t.status === "FAILED").length;

  return (
    <main>
      <header className="header">
        <div>
          <div className="eyebrow">AI WORKFORCE OPERATING SYSTEM</div>
          <h1>AI Factory HQ</h1>
          <p>One-person company. Eight AI employees. One command center.</p>
        </div>

        <div className="online">
          <span></span> ONLINE
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
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Example: Create a profitable digital product for freelance graphic designers."
        />

        <button onClick={createTask}>＋ CREATE TASK</button>
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
            {tasks.map((item) => (
              <article className="task" key={item.id}>
                <div>
                  <small>{item.id}</small>
                  <h3>{item.title}</h3>
                  <p>Assigned to: {item.employee}</p>
                </div>

                <div className="status queued">{item.status}</div>
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
            <article className="employee" key={name}>
              <div className="icon">{icon}</div>
              <div>
                <h3>{name}</h3>
                <p>{role}</p>
              </div>
              <span className="ready">READY</span>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
            }
