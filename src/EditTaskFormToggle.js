import React, { Component } from 'react'
import EditTaskForm from './EditTaskForm'

class EditTaskFormToggle extends Component {
    state = {
        inEdit: false
    };
    toggleEdit = () => this.setState({ inEdit: !this.state.inEdit});

    render() {
        return (
            this.state.inEdit === false ? (
                <button className={'button button3'} onClick={this.toggleEdit}>Open edit form</button>
            ) : (
                <div>
                    <button className={'button button3'} onClick={this.toggleEdit}>Close edit form</button>
                    <EditTaskForm taskId={this.props.taskId}
                                  task={this.props.task}
                                  description={this.props.description}
                    />
                </div>
            )



        )
    }


}
export default EditTaskFormToggle