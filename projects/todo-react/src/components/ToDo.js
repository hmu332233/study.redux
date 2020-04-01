import React from 'react';
import { connect } from 'react-redux';
import { actionCreators } from '../store';

import { Link } from 'react-router-dom';


function Todo(props) {
  return (
    <li>
      <Link to={`/${props.id}`}>
        {props.text} <button onClick={props.onDeleteButtonClick}>DEL</button>
      </Link>
    </li>
  );
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onDeleteButtonClick: () => dispatch(actionCreators.deleteToDo(ownProps.id)),
  };
}

export default connect(null, mapDispatchToProps)(Todo);