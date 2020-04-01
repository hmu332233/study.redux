import { createStore } from 'redux';

const ADD = 'ADD';
const DELETE = 'DELETE';

// action creators
const addToDo = text => {
  return {
    type: ADD,
    text,
  }
}
const deleteToDo = id => {
  return {
    type: DELETE,
    id,
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [{ text: action.text, id: Date.now() }, ...state];
    case DELETE:
      return state.filter(item => item.id !== action.id);
    default:
      return state;
  }
}

const LOCAL_STORAGE_KEY = 'toDos';

const setStateToLocalStorage = state => {
  localStorage.setItem(LOCAL_STORAGE_KEY, state);
};

const getStateFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
}

const preloadedState = getStateFromLocalStorage();
const store = createStore(reducer, preloadedState);

store.subscribe(() => {
  const state = store.getState();
  setStateToLocalStorage(JSON.stringify(state));
});

export const actionCreators = {
  addToDo,
  deleteToDo,
};

export default store;