import React, { useState } from 'react';
import TaskList from './components/TaskList.js';
import './App.css';

const TASKS = [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
];

const App = () => {
  const [tasks, setTasks] = useState(TASKS);

  const setComplete = (id) => {
    // console.log('Made it in setComplete');
    const updatedTasks = [...tasks];
    for (let task of updatedTasks) {
      console.log(task);
      if (task.id === id) {
        task.isComplete = !task.isComplete;
        // console.log('made in for/if statement');
      }
    }

    setTasks(updatedTasks);
  };
  const deleteTask = (id) => {
    console.log('made it in deletetask');
    const updatedTasks = tasks.filter((task) => task.id !== id);
    console.log(updatedTasks);
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          {
            <TaskList
              tasks={tasks}
              setComplete={setComplete}
              deleteTask={deleteTask}
            />
          }
        </div>
      </main>
    </div>
  );
};

export default App;
