import React from 'react';
import TaskModel from './TaskModel';

class TableHeader extends React.Component {
    render() {
        return (
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Task Type</th>
                    <th>Task Description</th>
                    <th colSpan={2}>Actions</th>
                </tr>
            </thead>
        )
    }
}

interface TableRowProps {
    task: TaskModel,
    handleUpdate: (id: number, employeeName: string, taskType: string, taskDescription: string) => void,
    handleDelete: (id: number) => void
}
class TableRow extends React.Component <TableRowProps, any> {
    constructor(props: TableRowProps) {
        super(props);
        const task = props.task;
        this.state = {
          id: task.id,
          employeeName: task.employeeName,
          taskType: task.taskType,
          taskDescription: task.taskDescription,
          editing: false
        };
    }
    handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
    }
    handleUpdate = (e: any) => {
        e.preventDefault();
        this.setState({
            editing: false
        });
        this.props.handleUpdate(this.state.id, this.state.employeeName, this.state.taskType, this.state.taskDescription);
    }
    handleDelete = (e: any) => {
        e.preventDefault();
        this.props.handleDelete(this.state.id);
    }
    handleEdit = (e: any) => {
        this.setState({
            editing: true
        });
    }
    cancelEdit = () => {
        const task = this.props.task;
        this.setState({
            employeeName: task.employeeName,
            taskType: task.taskType,
            taskDescription: task.taskDescription,
            editing: false
        });
    }
    render() {
        const task = this.state;
        return (
            <tr>
                <td>{task.id}</td>
                <td>{this.state.editing ? <input type='text' name='employeeName' value={task.employeeName} onChange={this.handleChange} /> : task.employeeName}</td>
                <td>{this.state.editing ?
                <select name='taskType' value={task.taskType} onChange={this.handleChange}>
                    <option value='ui'>UI</option>
                    <option value='backend'>Backend</option>
                    <option value='embedded'>Embedded</option>
                    <option value='qa'>QA</option>
                </select> : task.taskType }
                </td>
                <td>{this.state.editing ? <input type='text' name='taskDescription' value={task.taskDescription} onChange={this.handleChange} /> : task.taskDescription }</td>
                <td>{this.state.editing ? <button type='button' onClick={this.handleUpdate}>Update</button> : <button type='button' onClick={this.handleEdit}>Edit task</button> }</td>
                <td>{!this.state.editing ? <button type='button' onClick={this.handleDelete}>Delete task</button> : <button type='button' onClick={this.cancelEdit}>Cancel</button>}</td>
            </tr>
        );
    }
}

interface TableProps {
    tasks: TaskModel[],
    filter: string,
    newTaskId: number,
    handleUpdate: (id: number, employeeName: string, taskType: string, taskDescription: string) => void,
    handleDelete: (id: number) => void
}
class Table extends React.Component <TableProps> {
    render() {
        let rows: any = [];
        this.props.tasks.forEach(task => {
        if (this.props.filter !== 'all' && this.props.filter !== task.taskType) {
            return;
        }
        rows.push(<TableRow
            key={task.id}
            task={task}
            handleUpdate={this.props.handleUpdate}
            handleDelete={this.props.handleDelete} />);
        });
        return (
            <table>
                <TableHeader />
                <tbody>{rows}</tbody>
            </table>
        )
    }
}

export default Table;