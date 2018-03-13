import React, { Component } from 'react'
import firebase from 'firebase'

class EditTaskForm extends Component {

    state = {
        taskId: this.props.taskId,
        task: this.props.task,
        description: this.props.description,



    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    handleSubmit = event => {
        event.preventDefault();
        const uid = firebase.auth().currentUser.uid;
        firebase.database().ref('/tasks/' + uid + '/' + this.props.taskId).update({
            title: this.state.task,
            description: this.state.description,

        });

    };

    render() {
        return (
            <form id="editForm"
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
                    name="description"
                    placeholder={'description'}
                    value={this.state.description}
                    onChange={this.handleChange}
                />

                <button className={'button'}>Submit</button>
            </form>
        )
    }
}

export default EditTaskForm