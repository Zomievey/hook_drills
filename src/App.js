import "./App.css";
import React, { useState, useReducer, useEffect } from "react";
import axios from "axios";

const reducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, newCount: state.newCount + 1 }; // Use the spread operator to spread the existing state instead of repeating state that hasn't changed
    case "TOGGLE":
      return { ...state, showText: !state.showText }; // Use the spread operator to spread the existing state instead of repeating state that hasn't changed
    default:
      return state;
  }
};

function App() {
  //set variable and function to useState hook, 0 is the initial state value
  const [counter, setCounter] = useState(0);
  const [name, setName] = useState("");
  //create an object to hold all our states and a dispatch function to update them
  const [state, dispatch] = useReducer(reducer, {
    newCount: 0,
    showText: true,
  });

  const [addEmail, setAddEmail] = useState(0);

  const [info, setInfo] = useState("");
  //useEffect hook to fetch data from the rest api
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/comments")
      .then((response) => {
        console.log(response);
        let newEmail = response.data[addEmail];
        // Remove for loop (it isn't necessary)
        setInfo(newEmail);
      });
  }, [addEmail]);

  // let addFunction = () => {
  //calls function setCounter and passes in the counter value plus 1
  // setCounter(counter + 1);
  // }
  let nameInput = (e) => {
    const newValue = e.target.value;
    setName(newValue);
  };

    // Create a function to handle all counters
  const incrementCount = (type) => {
    // v1: Less code, easier to read
    if (type === "counter") setCounter(counter + 1);
    if (type === "email") setAddEmail(addEmail + 1);
    // v2: More code, more difficult to read (works but lacks readability)
    // return type === "counter" 
    // ? setCounter(counter + 1)
    // : type === "email" 
    // ? setAddEmail(addEmail + 1) 
    // : null
  }

  return (
    <>
      <div className="mb-3 mt-3">
        <h5>This portion uses the useState hook:</h5>
        {counter}{" "}
        <button
          className="btn btn-warning mx-5"
          onClick={() => {
            incrementCount("counter");
          }}
        >
          +
        </button>
        <input placeholder="type something..." onChange={nameInput}></input>
        <div className="my-3">{name}</div>
      </div>
      <h5>This portion uses the useReducer hook:</h5>
      <div>
        <h1>{state.newCount}</h1>
        <button
          className="btn btn-secondary"
          onClick={() => {
            dispatch({ type: "INCREMENT" });
            dispatch({ type: "TOGGLE" });
          }}
        >
          Click Here
        </button>
        {state.showText ? <h1>Hello</h1> : <h1>Goodbye</h1>}
      </div>
      <div className="mb-5">
        <h5>This portion uses the useEffect hook:</h5>
        <h1>Hello, {info.email}!</h1>
        <button
          className="btn btn-danger"
          onClick={() => {
            incrementCount("email");
          }}
        >
          next email
        </button>
      </div>
    </>
  );
}

export default App;
