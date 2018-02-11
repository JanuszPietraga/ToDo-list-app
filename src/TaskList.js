import React, {Component} from 'react'
import firebase from 'firebase'
import EditTaskFormToggle from "./EditTaskFormToggle";

class TaskList extends Component {

    state = {
        tasks: [],
        selectedTaskIds: []

    };


    componentDidMount() {
        const uid = firebase.auth().currentUser.uid;
        firebase.database().ref('/tasks/' + uid).on(
            'value',
            snapshot => {
                const snapshotValue = snapshot.val();
                const tasks = Object.entries(snapshotValue || {}).map(
                    ([id, val]) => ({id, ...val})
                );

                this.setState({
                    tasks
                })
            }
        )
    }

    componentWillUnmount() {
        const uid = firebase.auth().currentUser.uid;
        firebase.database().ref('/tasks/' + uid).off()
    }

    handleRemoveClick = event => {
        const taskId = event.target.dataset.taskId;
        const uid = firebase.auth().currentUser.uid;
        firebase.database().ref('/tasks/' + uid + '/' + taskId).remove()

    };
    handleToggleDoneClick = event => {
        const taskId = event.target.dataset.taskId;
        const clickedTask = this.state.tasks.find(task => task.id === taskId);
        const uid = firebase.auth().currentUser.uid;

        firebase.database().ref('/tasks/' +uid + '/' + taskId).update({
            title: clickedTask.title,
            isDone: !clickedTask.isDone
        })
    };


    handleCheckboxChange = event => {
        const taskId = event.target.dataset.taskId;
        const taskIdIsSelected = this.state.selectedTaskIds.includes(taskId);

        this.setState({
            selectedTaskIds: taskIdIsSelected ?
                this.state.selectedTaskIds.filter(
                    selectedTaskId => selectedTaskId !==taskId
                ) : this.state.selectedTaskIds.concat(taskId)
        })
    };
    resetCheckboxes = () => {
        this.setState({
            selectedTaskIds: []
        })
    };
    removeSelectedTasks = () => {
        const uid = firebase.auth().currentUser.uid;
        const tasksRef = firebase.database().ref('/tasks/' + uid);

        if (window.confirm('Do you really want to remove those tasks?')) {
            this.state.selectedTaskIds.forEach(
                taskId => tasksRef.child(taskId).remove()
            );
            this.setState({
                selectedTaskIds: []
            })

        }
    };


    render() {
        return (
            <div>
                <h1>Tasks</h1>
                <button onClick={this.resetCheckboxes}>clear</button>
                <button onClick={this.removeSelectedTasks}>remove selected</button>

                <ul>
                    {
                        this.state.tasks.map(
                            task => (
                                <li key={task.id}>
                                    <input
                                        type="checkbox"
                                        data-task-id={task.id}
                                        checked={this.state.selectedTaskIds.includes(task.id)}
                                        onChange={this.handleCheckboxChange}
                                    />

                                    {
                                        task.isDone ?
                                            <del>
                                                {task.title}
                                                {' - description: ' + task.description}
                                                {'/' + task.createdAta}
                                                </del> :
                                        task.title
                                            + ' - description: '
                                            + task.description
                                            + '/' + task.createdAta

                                    }


                                    <button
                                        data-task-id={task.id}
                                        onClick={this.handleRemoveClick}
                                    >
                                        remove
                                    </button>

                                    <button
                                        data-task-id={task.id}
                                        onClick={this.handleToggleDoneClick}
                                    >
                                        toggle done
                                    </button>

                                    <EditTaskFormToggle taskId={task.id} task={task.title} description={task.description}/>
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
