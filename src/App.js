import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import axios from 'axios';

// const TASKS = [
//     {
//         "description": "Task 1",
//         "id": 152,
//         "is_complete": false,
//         "title": "Fena & Amy task 1"
//     },
//     {
//         "description": "Task 2",
//         "id": 153,
//         "is_complete": false,
//         "title": "Fena & Amy task 2"
//     },
//     {
//         "description": "Task 3",
//         "id": 154,
//         "is_complete": false,
//         "title": "Fena & Amy task 3"
//     },
// ];

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get('https://task-list-api-c17.herokuapp.com/tasks')
      .then((response) => {
        setTasks(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        console.log("Couldn't get task data");
      });
  }, []);

  const setComplete = (id) => {
    const updatedTasks = [...tasks];
    console.log(updatedTasks);
    let targetTask;
    for (const task of updatedTasks) {
      console.log(task);
      if (task.id === id) {
        targetTask = task;
        console.log(targetTask);
      }
    }
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
