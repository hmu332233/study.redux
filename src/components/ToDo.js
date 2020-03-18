import React from 'react';
import { connect } from 'react-redux';

import { actionCreators } from '../store';


function Todo(props) {
  return (
    <li>
      {props.text} <button onClick={props.onDeleteButtonClick}>DEL</button>
    </li>
  );
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onDeleteButtonClick: () => dispatch(actionCreators.deleteToDo(ownProps.id)),
  };
}

export default connect(null, mapDispatchToProps)(Todo);