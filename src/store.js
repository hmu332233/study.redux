import { createStore } from 'redux';
import { createAction } from '@reduxjs/toolkit';



// action creators
const addToDo = createAction('ADD');
const deleteToDo = createAction('DELETE');

const reducer = (state = [], action) => {
  switch (action.type) {
    case addToDo.type:
      return [{ text: action.payload, id: Date.now() }, ...state];
    case deleteToDo.type:
      return state.filter(item => item.id !== action.payload);
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