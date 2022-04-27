import "./App.css";
import React, { useState, useReducer, useEffect, useRef } from "react";
import axios from "axios";

const reducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { newCount: state.newCount + 1, showText: state.showText };
    case "TOGGLE":
      return { newCount: state.newCount, showText: !state.showText };
    default:
      return state;
  }
};

function App() {
  //set varibale and function to useState hook, 0 is the initial state value
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
        for (let index = 0; index < newEmail.length; index++) {
          setAddEmail(newEmail[index]);
        }
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

  const [addName, setAddName] = useState("");
  const [newName, setNewName] = useState("Username");
  
  
  let changeName = (e) => {
    const changeNameValue = e.target.value;
    setAddName(changeNameValue);
  };

  const inputRef = useRef(null);
  const handleClick = () => {
    inputRef.current.value = "";
    setNewName(addName);
    //setting it equal to an empty string clears the input field
  };

  return (
    <>
      <div className="mb-5 mt-3">
        <h5>1. This portion uses the useState hook:</h5>
        {counter}{" "}
        <button
          className="btn btn-warning mx-5"
          onClick={() => {
            setCounter(counter + 1);
          }}
        >
          +
        </button>
        <input placeholder="type something..." onChange={nameInput}></input>
        <div className="my-3">{name}</div>
      </div>
      <h5>2. This portion uses the useReducer hook:</h5>
      <div className="mb-5">
        <h1>{state.newCount}</h1>
        <button type="submit"
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
        <h5>3. This portion uses the useEffect hook:</h5>
        <h1>Hello, {info.email}!</h1>
        <button
          className="btn btn-danger"
          onClick={() => {
            setAddEmail(addEmail + 1);
          }}
        >
          Next Email
        </button>
      </div>
      <div className="mb-3">
        <h5>4. This portion uses the useRef hook:</h5>
        <h1>Hello, {newName}!</h1>
        <input
          type="text"
          placeholder="Ex..."
          onChange={changeName}
          ref={inputRef}
        />
        <button onClick={handleClick} className="btn btn-primary mx-2">
          Change Name
        </button>
      </div>
    </>
  );
}

export default App;
