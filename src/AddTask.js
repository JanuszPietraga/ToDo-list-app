import React, { Component } from 'react'
import firebase from 'firebase'

class AddTaskForm extends Component {

    state = {
        task: '',
        counter: 0,

    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };
    handleCheckboxChange = () => {
        this.setState({
            importantChecked: !this.state.importantChecked
        })
    };
    handleDoneCheckboxChange = () => {
        this.setState({
            doneChecked: !this.state.doneChecked
        })
    };

    handleSubmit = event => {
        event.preventDefault();
        const uid = firebase.auth().currentUser.uid;
        firebase.database().ref('/tasks/' + uid).push({
            title: this.state.task,
            isDone: false
        });

        this.setState(
            () => ({ task: '' })
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
                    onChange={this.handleChange}
                />
                <label>
                    <input
                        type="checkbox"
                        onChange={this.handleCheckboxChange}
                        checked={this.state.importantChecked}
                    /> is important
                </label>

                <button onClick={() => this.setState({counter: this.state.counter + 1 })}>Add task</button>

            </form>
        )
    }
}

export default AddTaskForm