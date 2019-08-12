import React from 'react';

interface FormTaskProps {
    handleAdd: (employeeName: string, taskType: string, taskDescription: string) => void
  }
class Form extends React.Component <FormTaskProps, any> {
    constructor(props: FormTaskProps) {
        super(props);
        this.state = {
            employeeName: '',
            taskType: 'ui',
            taskDescription: ''
        };
    }
    handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
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
                    <input type='text' name='employeeName' onChange={this.handleChange} value={this.state.employeeName} />
                    <select name='taskType' value={this.state.taskType} onChange={this.handleChange}>
                        <option value='ui'>UI</option>
                        <option value='backend'>Backend</option>
                        <option value='embedded'>Embedded</option>
                        <option value='qa'>QA</option>
                    </select>
                    <input type='text' name='taskDescription' value={this.state.taskDescription} onChange={this.handleChange} />
                    <input type='submit' value='Add task' />
                </form>
            </div>
        );
    }
}

export default Form;