import React from 'react';
import TaskModel from './TaskModel';

class TableHeader extends React.Component {
    render() {
        return (
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Time</th>
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
          editing: false,
          formErrors: {employeeName: '', taskDescription: ''},
          employeeNameValid: true,
          taskDescriptionValid: true,
          formValid: true
        };
    }
    handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        }, () => {this.validateField(name, value)});
    }
    validateField(name: string, value: string) {
        let formErrors = this.state.formErrors;
        let employeeNameValid = this.state.employeeNameValid;
        let taskDescriptionValid = this.state.taskDescriptionValid;
        switch(name) {
            case 'employeeName':
                employeeNameValid = value.match(/^[a-zA-Z ]{2,30}$/);
                formErrors.employeeName = employeeNameValid ? '' : 'Employee name is not valid';
                break;
            case 'taskDescription':
                taskDescriptionValid = value.length > 0;
                formErrors.taskDescription = taskDescriptionValid ? '' : 'Task description is required';
                break;
            default:
                break;
        }
        this.setState({
            employeeNameValid: employeeNameValid,
            taskDescriptionValid: taskDescriptionValid,
            formErrors: formErrors,
            formValid: employeeNameValid && taskDescriptionValid
        })
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
            editing: false,
            formErrors: {employeeName: '', taskDescription: ''},
            employeeNameValid: true,
            taskDescriptionValid: true,
            formValid: true
        });
    }
    render() {
        const task = this.state;
        let date = formatDate(this.props.task.time);
        const editing = this.state.editing;
        return (
            <tr>
                <td>{task.id}</td>
                <td>{date}</td>
                <td>{editing ? <input className={this.state.formErrors.employeeName ? 'has-error' : ''} type='text' name='employeeName' value={task.employeeName} onChange={this.handleChange} /> : task.employeeName}</td>
                <td>{editing ?
                <select name='taskType' value={task.taskType} onChange={this.handleChange}>
                    <option value='ui'>UI</option>
                    <option value='backend'>Backend</option>
                    <option value='embedded'>Embedded</option>
                    <option value='qa'>QA</option>
                </select> : task.taskType }
                </td>
                <td>{editing ? <input type='text' className={this.state.formErrors.taskDescription ? 'has-error' : ''} name='taskDescription' value={task.taskDescription} onChange={this.handleChange} /> : task.taskDescription }</td>
                <td>{editing ? <button type='button' onClick={this.handleUpdate} disabled={!this.state.formValid}>Update</button> : <button type='button' onClick={this.handleEdit}>Edit task</button> }</td>
                <td>{!editing ? <button type='button' onClick={this.handleDelete}>Delete task</button> : <button type='button' onClick={this.cancelEdit}>Cancel</button>}</td>
            </tr>
        );
    }
}

interface TableProps {
    tasks: TaskModel[],
    filter: string,
    newTaskId: number,
    search: string,
    handleUpdate: (id: number, employeeName: string, taskType: string, taskDescription: string) => void,
    handleDelete: (id: number) => void
}
class Table extends React.Component <TableProps> {
    render() {
        let rows: any = [];
        let tasks = this.props.tasks;
        tasks.sort((a, b) => b.time - a.time);
        tasks.forEach(task => {
        if (this.props.filter !== 'all' && this.props.filter !== task.taskType) {
            return;
        }
        if (task.employeeName.indexOf(this.props.search) === -1) {
            return;
        }
        rows.push(<TableRow
            key={task.id}
            task={task}
            handleUpdate={this.props.handleUpdate}
            handleDelete={this.props.handleDelete} />);
        });
        return (
            <div>
                <table>
                    <TableHeader />
                    <tbody>{rows}</tbody>
                </table>
                {rows.length <= 0 ? <p>No records found...</p> : '' }
            </div>
        )
    }
}
function formatDate(date: number) {
    let dateArray: any = new Date(date).toString();
    dateArray = dateArray.split(' ');
    return (dateArray[1] + '/' + dateArray[2] + '/' + dateArray[3] + ' ' + dateArray[4]);
}

export default Table;