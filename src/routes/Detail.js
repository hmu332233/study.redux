import React from "react";

import { connect } from "react-redux";

import { toDoSelector } from '../store';

function Detail(props) {
  return (
    <>
      <h1>{props.toDo?.text}</h1>
      <h5>{props.toDo?.id}</h5>
    </>
  );
}

const mapStateToProps = (state, ownProps) => {
  const {
    match: {
      params: { id }
    }
  } = ownProps;
  return { toDo: toDoSelector.selectById(state, id) };
};

export default connect(mapStateToProps)(Detail);
