// reducers.js

import {
  ADD_TASK,
  DELETE_TASK,
  COMPLETE_TASK,
  UPDATE_TASK,
  EDIT_TASK,
} from './actions';

const initialState = {
  tasks: [],
  totalTasks: 0,
  completedTasks: 0,
  storedData: null,
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_STORED_DATA':
      return {
        ...state,
        storedData: action.payload,
      };
    case ADD_TASK:
      return {tasks: [...state.tasks, action.payload]};
    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.taskId
            ? {...task, text: action.payload.updatedTask}
            : task,
        ),
      };
    case EDIT_TASK:
      return {
        ...state,
        tasks: state.tasks.map(tasks =>
          tasks.id === action.payload.id
            ? {...tasks, name: action.payload.newText}
            : tasks,
        ),
      };

    case DELETE_TASK:
      return {tasks: state.tasks.filter(task => task.id !== action.payload)};
    case COMPLETE_TASK:
      return {
        tasks: state.tasks.map(task =>
          task.id === action.payload ? {...task, completed: true} : task,
        ),
      };
    default:
      return state;
  }
};

export default todoReducer;
