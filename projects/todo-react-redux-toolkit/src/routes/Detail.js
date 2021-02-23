import React from "react";

import { connect } from "react-redux";

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
  return { toDo: state.find(todo => todo.id === parseInt(id)) };
};

export default connect(mapStateToProps)(Detail);
