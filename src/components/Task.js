import React from 'react';
import PropTypes from 'prop-types';

import './Task.css';

const Task = ({ id, title, is_complete, setComplete, deleteTask }) => {
  // console.log(isComplete);
  // const [complete, setComplete] = useState(isComplete);
  const buttonClass = is_complete ? 'tasks__item__toggle--completed' : '';
  // console.log(buttonClass);

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={() => {
          setComplete(id);
          console.log(id);
        }}
      >
        {title}
      </button>
      <button
        className="tasks__item__remove button"
        onClick={() => {
          deleteTask(id);
          console.log(id);
        }}
      >
        x
      </button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  is_complete: PropTypes.bool.isRequired,
  setComplete: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default Task;
