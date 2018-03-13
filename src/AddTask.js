import React, { Component } from 'react'
import firebase from 'firebase'
import TaskList from "./TaskList";

class AddTaskForm extends Component {

    state = {
        task: '',
        counter: 0,
        description: '',
        createdAta: new Date().toDateString(),


    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    handleSubmit = event => {
        event.preventDefault();
        const uid = firebase.auth().currentUser.uid;
        firebase.database().ref('/tasks/' + uid).push({
            title: this.state.task,
            description: this.state.description,
            createdAta: new Date().toDateString(),
            isDone: false,
            status: 'WAITING',
            counter: this.state.counter

        });

        this.setState(
            () => ({
                task: '',
                description: '',
                createdAta: new Date().toDateString(),

            }),

        )
    };

    render() {
        return (
            <form
                onSubmit={this.handleSubmit}
            >
                <p>{this.state.counter}</p>
                <input
                    name="task"
                    value={this.state.task}
                    placeholder={'Title'}
                    onChange={this.handleChange}
                />
                <input
                    name="description"
                    placeholder={'description'}
                    value={this.state.description}
                    onChange={this.handleChange}
                />

                {this.state.createdAta}




                <button className={'button'}
                    onClick={() => this.setState(
                    {counter: this.state.counter + 1 })}>Add task</button>

            </form>
        )
    }
}

export default AddTaskForm