import React, { Component } from 'react'
import firebase from 'firebase'

class AddTaskForm extends Component {

    state = {
        task: '',
        counter: 0,
        description: '',
        status: 'ToDo',
        createdAta: ''
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

        });

        this.setState(
            () => ({ task: '', description: ''}),

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
                <textarea
                    name={'description'}
                    placeholder={'description'}
                    value={this.state.description}
                    onChange={this.handleChange}
                />
                <input
                    type={'text'}
                    placeholder="Date (dd/mm/yyyy)"
                />


                <button onClick={() => this.setState({counter: this.state.counter + 1 })}>Add task</button>

            </form>
        )
    }
}

export default AddTaskForm