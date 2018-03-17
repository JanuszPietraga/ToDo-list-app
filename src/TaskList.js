import React, {Component} from 'react'
import firebase from 'firebase'
import EditTaskFormToggle from "./EditTaskFormToggle"
import moment from 'moment'



class TaskList extends Component {

    state = {
        tasks: [],
        selectedTaskIds: [],
        statusesToDisplay: ['WAITING', 'IN_PROGRESS', 'DONE']
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

    handleStatusClick = event => {
        const taskId = event.target.dataset.taskId;
        const clickedTask = this.state.tasks.find(task => task.id === taskId);
        const uid = firebase.auth().currentUser.uid;

        const taskRef =firebase.database().ref('/tasks/' +uid + '/' + taskId)

        taskRef.update({
            title: clickedTask.title,
            status: clickedTask.status === 'WAITING' ? 'IN_PROGRESS' : 'DONE'
        });




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
    renderStatusButton(statusName) {
        const isVisible = this.state.statusesToDisplay.includes(statusName);
        return (
            <button className={'button'} onClick={() => this.setState({
                statusesToDisplay: isVisible ?
                    this.state.statusesToDisplay.filter(statusToDisplay => statusToDisplay !== statusName) :
                    this.state.statusesToDisplay.concat(statusName)
            })}>{isVisible ? 'hide' : 'show'}</button>
        )
    }



    render() {


        return (
            <div>
                <h1>Tasks</h1>
                <p>
                    WAITING: {this.state.tasks.filter(task => task.status === 'WAITING').length}
                    {this.renderStatusButton('WAITING')}
                </p>
                <p>
                    IN PROGRESS: {this.state.tasks.filter(task => task.status === 'IN_PROGRESS').length}
                    {this.renderStatusButton('IN_PROGRESS')}
                </p>
                <p>
                    DONE: {this.state.tasks.filter(task => task.status === 'DONE').length}
                    {this.renderStatusButton('DONE')}
                </p>

                <button  className={'button'} onClick={this.resetCheckboxes } >clear</button>
                <button  className={'button'} onClick={this.removeSelectedTasks}>remove selected</button>
                <ul>
                    {
                        this.state.tasks.filter(
                            task => this.state.statusesToDisplay.includes(task.status)
                        ).map(
                            task => (
                                <li className={'status-' + task.status} key={task.id}>
                                    <input
                                        type="checkbox"
                                        data-task-id={task.id}
                                        checked={this.state.selectedTaskIds.includes(task.id)}
                                        onChange={this.handleCheckboxChange}
                                    />

                                    {


                                        task.title
                                           // + ' - description: '
                                          //  + task.description
                                            + ' /  ' + task.createdAta



                                    }


                                    <button className={' button button1'}
                                        data-task-id={task.id}
                                        onClick={(this.handleRemoveClick)}

                                    >
                                        remove
                                    </button>
                                    <button className={'button button2'}
                                        data-task-id={task.id}
                                        onClick={this.handleStatusClick}

                                    >
                                        {task.status}
                                    </button>



                                    <EditTaskFormToggle taskId={task.id}
                                                        task={task.title}
                                                        description={task.description}
                                    />
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
