import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList.js';
import NewTaskForm from './components/NewTaskForm.js';
import './App.css';
import axios from 'axios';

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasksFromAPI();
  }, []);

  const getTasksFromAPI = () => {
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
      })
      .catch((error) => {
        console.log(error);
        console.log("Couldn't get task data");
      });
  };

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
        // getTasksFromAPI();
      })
      .catch((error) => {
        console.log(error);
        console.log(`Couldn't update task ${id}`);
      });
  };

  const deleteTask = (id) => {
    axios
      .delete(`https://task-list-api-c17.herokuapp.com/tasks/${id}`)
      .then(() => {
        const updatedTasks = tasks.filter((task) => task.id !== id);
        setTasks(updatedTasks);
        // getTasksFromAPI();
      })
      .catch((error) => {
        console.log(error);
        console.log(`Couldn't update task ${id}`);
      });
  };

  const makeNewTask = (data) => {
    axios
      .post('https://task-list-api-c17.herokuapp.com/tasks', data)
      .then(() => getTasksFromAPI())
      .catch((error) => {
        console.log(error);
        console.log("Couldn't add a new task");
      });
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          <TaskList
            tasks={tasks}
            setComplete={setComplete}
            deleteTask={deleteTask}
          />
          <NewTaskForm handleSubmission={makeNewTask} />
        </div>
      </main>
    </div>
  );
};

export default App;
