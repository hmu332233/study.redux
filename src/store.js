import { createSlice, createEntityAdapter, configureStore } from '@reduxjs/toolkit';

const toDoAdapter = createEntityAdapter({
  selectId: (toDo) => toDo.id,
});

export const toDoSelector = toDoAdapter.getSelectors();

const toDos = createSlice({
  name: 'toDosReducer',
  initialState: toDoAdapter.getInitialState(),
  reducers: {
    add: (state, action) => {
      console.log('asdfasdf')
      const toDo = { text: action.payload, id: Date.now() };
      toDoAdapter.addOne(state, toDo);
    },
    remove: (state, action) => {
      const id = action.payload;
      toDoAdapter.removeOne(state, id);
    }, 
  }
});


const LOCAL_STORAGE_KEY = 'toDos';

const setStateToLocalStorage = state => {
  localStorage.setItem(LOCAL_STORAGE_KEY, state);
};

const getStateFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
}

// const preloadedState = getStateFromLocalStorage();

const store = configureStore({
  reducer: toDos.reducer,
  // preloadedState,
});

// store.subscribe(() => {
//   const state = store.getState();
//   setStateToLocalStorage(JSON.stringify(state));
// });


const { add, remove } = toDos.actions;
export const actionCreators = {
  addToDo: add,
  deleteToDo: remove,
};

export default store;