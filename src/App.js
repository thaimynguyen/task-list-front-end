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
        const updatedTasks = response.data.map((task) => {
          return {
            id: task.id,
            title: task.title,
            isComplete: task.is_complete,
          };
        });
        setTasks(updatedTasks);
        console.log(updatedTasks);
      })
      .catch((error) => {
        console.log(error);
        console.log("Couldn't get task data");
      });
  }, []);

  const setComplete = (id) => {
    const updatedTasks = [...tasks];
    let targetTask;
    for (const task of updatedTasks) {
      if (task.id === id) {
        targetTask = task;
      }
    }
    let url;
    if (targetTask.isComplete === true) {
      url = `https://task-list-api-c17.herokuapp.com/tasks/${id}/mark_incomplete`;
    } else if (targetTask.isComplete === false) {
      url = `https://task-list-api-c17.herokuapp.com/tasks/${id}/mark_complete`;
    }
    axios
      .patch(url)
      .then(() => {
        targetTask.isComplete = !targetTask.isComplete;
        setTasks(updatedTasks);
      })
      .catch((error) => {
        console.log(error);
        console.log(`Couldn't update task ${id}`);
      });
  };

  const deleteTask = (id) => {
    console.log('made it in deletetask');
    console.log(tasks);
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
