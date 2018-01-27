import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import ToDoList from "./ToDoList";
import AddTaskForm from "./AddTask";
import SignInForms from "./SignInForms";
import SignUpForm from "./SignUpForm";
import TaskList from "./TaskList";

import firebase from 'firebase'

class App extends Component {

    state = {
        user: null
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(
            user => this.setState({ user })
        )
    }



    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                   {this.state.user === null?
                    <div>
                        <SignInForms/>
                        <SignUpForm/>
                    </div> :
                    <div>

                        <ToDoList/>
                        <AddTaskForm/>
                         <TaskList/>
                    </div>
                }


            </div>
        );
    }
}

export default App;
