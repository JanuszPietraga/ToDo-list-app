
import React, { Component } from 'react'
import firebase from 'firebase'

class TaskList extends Component {

    state = {
        tasks: []
    };

    componentDidMount() {
        const uid = firebase.auth().currentUser.uid;
        firebase.database().ref('/dump/' + uid).on(
            'value',
            snapshot => {
                const snapshotValue = snapshot.val();
                const tasks = Object.entries(snapshotValue).map(
                    ([ id, name ]) => ({ id, name })
                );

                this.setState({
                    tasks
                })
            }
        )
    }

    render() {
        return (
            <div>
                <h1>Tasks</h1>
                <ul>
                    {
                        this.state.tasks.map(
                            task => (
                                <li key={task.id}>
                                    {task.name}
                                </li>
                            )
                        )
                    }
                </ul>
            </div>
        )
    }
}

export default TaskList
