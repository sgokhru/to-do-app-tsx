import React from 'react';
import {FormErrors} from './FormErrors';

interface FormTaskProps {
    handleAdd: (employeeName: string, taskType: string, taskDescription: string) => void
  }
class Form extends React.Component <FormTaskProps, any> {
    constructor(props: FormTaskProps) {
        super(props);
        this.state = {
            employeeName: '',
            taskType: 'ui',
            taskDescription: '',
            formErrors: {employeeName: '', taskDescription: ''},
            employeeNameValid: false,
            taskDescriptionValid: false,
            formValid: false
        };
    }
    handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        }, () => { this.validateField(name, value) });
    }
    validateField(fieldName: string, value: string) {
        let fieldValidationErrors = this.state.formErrors;
        let employeeNameValid = this.state.employeeNameValid;
        let taskDescriptionValid = this.state.taskDescriptionValid;
        switch(fieldName) {
            case 'employeeName':
                employeeNameValid = value.match(/^[a-zA-Z ]{2,30}$/);
                fieldValidationErrors.employeeName = employeeNameValid ? '' : 'Employee name is invalid';
                break;
            case 'taskDescription':
                taskDescriptionValid = value.length > 0;
                fieldValidationErrors.taskDescription = taskDescriptionValid ? '': 'Task description is required';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
            employeeNameValid: employeeNameValid,
            taskDescriptionValid: taskDescriptionValid
            }, this.validateForm);
    }
    validateForm() {
        this.setState({formValid: this.state.employeeNameValid && this.state.taskDescriptionValid});
    }
    handleSubmit = (e: any) => {
        e.preventDefault();
        this.props.handleAdd(this.state.employeeName, this.state.taskType, this.state.taskDescription);
        this.setState({
            employeeName: '',
            taskType: 'ui',
            taskDescription: ''
        });
    }
    render() {
        return (
            <div>
                <h3>Add New Task</h3>
                <form onSubmit={this.handleSubmit}>
                    <label>Name: 
                        <input style={{marginLeft: 10}} className={(this.state.formErrors.employeeName ? 'has-error' : '')} type='text' name='employeeName' onChange={this.handleChange} value={this.state.employeeName} />
                    </label>
                    <label>Task Type: 
                        <select style={{marginLeft: 10}} name='taskType' value={this.state.taskType} onChange={this.handleChange}>
                            <option value='ui'>UI</option>
                            <option value='backend'>Backend</option>
                            <option value='embedded'>Embedded</option>
                            <option value='qa'>QA</option>
                        </select>
                    </label>
                    <label>Task Description: 
                        <input style={{marginLeft: 10}} className={(this.state.formErrors.taskDescription ? 'has-error' : '')} type='text' name='taskDescription' value={this.state.taskDescription} onChange={this.handleChange} />
                    </label>
                    <input type='submit' value='Add task' disabled={!this.state.formValid} />
                </form>
                <FormErrors formErrors={this.state.formErrors} />
            </div>
        );
    }
}

export default Form;