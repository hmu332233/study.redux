import React, { useState } from 'react';
import { connect } from 'react-redux';

import { actionCreators } from '../store';

import ToDo from '../components/ToDo';

function Home(props) {
  const [text, setText] = useState('');
  const onChange = e => {
    setText(e.target.value);
  }
  const onSubmit = e => {
    e.preventDefault();
    props.addToDo(text);
    setText('');
  }
  return (
    <>
      <h1>To Do</h1>
      <form onSubmit={onSubmit}>
        <input type="text" value={text} onChange={onChange} />
        <button>Add</button>
      </form>
      <ul>
        {props.toDos.map(toDo => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </>
  );
}

// store의 state를 component의 props로 맵핑한다.
// state: from redux-store
// ownProps: from parent component
const mapStateToProps = (state, ownProps) => {
  return { toDos: state };
}

// store의 dispatch를 props로 맵핑한다.
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addToDo: text => dispatch(actionCreators.addToDo(text)),
    deleteTodo: id => dispatch(actionCreators.deleteToDo(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);