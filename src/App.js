import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ToDoList from "./ToDoList";
import AddTaskForm from "./AddTask";
import SignInForms from "./SignInForms";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
          <SignInForms/>
        <ToDoList/>
          <AddTaskForm/>

      </div>
    );
  }
}
export default App;
