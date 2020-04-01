// import { createStore } from 'redux';
import { createAction, createReducer, configureStore } from '@reduxjs/toolkit';



// action creators
const addToDo = createAction('ADD');
const deleteToDo = createAction('DELETE');

// 기존 state를 변경하거나 새 state를 리턴하거나 두 방법을 사용할 수 있음
// 리턴하지 않으면 immer로 새로운 state를 리턴하도록 내부에서 동작함
const reducer = createReducer([], {
  [addToDo]: (state, action) => {
    // 이런식으로 해도 내부에 immer가 있어서 새로운 state object로 리턴함
    state.push({ text: action.payload, id: Date.now() });
  },
  [deleteToDo]: (state, action) => state.filter(item => item.id !== action.payload), 
});

const LOCAL_STORAGE_KEY = 'toDos';

const setStateToLocalStorage = state => {
  localStorage.setItem(LOCAL_STORAGE_KEY, state);
};

const getStateFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
}

const preloadedState = getStateFromLocalStorage();
const store = configureStore({
  reducer,
  preloadedState,
});

store.subscribe(() => {
  const state = store.getState();
  setStateToLocalStorage(JSON.stringify(state));
});

export const actionCreators = {
  addToDo,
  deleteToDo,
};

export default store;