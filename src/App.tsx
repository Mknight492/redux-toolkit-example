import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { connect } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { usersSlice, fetchUserById } from "./redux/reducer";

const { actions, reducer } = usersSlice;
// actions.

// in the component
// const onClick = () => {
//   dispatch(fetchUserById(userId))
//     .then(unwrapResult)
//     .then(originalPromiseResult => {})
//     .catch(serializedError => {})
// }
console.log(usersSlice);

function App(props: any) {
  console.log(props);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button
          onClick={async () => {
            console.log("clicked");
            props.fetchUserById("4" as any);
            // var unwrapedResult = unwrapResult(res);
            // console.log(unwrapedResult);
            // .then(unwrapResult)
            // .then(originalPromiseResult => {})
            // .catch(serializedError => {})
          }}
        >
          test {props?.user?.loading === "loading" && <div>LOADING...</div>}
        </button>
        Learn React
        {props?.user.entities?.map((el: any) => (
          <div> {el?.title} </div>
        ))}
        {props?.user?.errors && <div> ERROR </div>}
      </header>
    </div>
  );
}

const mapStateToProps = (state: any /*, ownProps*/) => {
  return {
    user: state.user,
    loading: state.loading
  };
};

const mapDispatchToProps = { fetchUserById };

export default connect(mapStateToProps, mapDispatchToProps)(App);
