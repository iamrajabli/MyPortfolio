import React from 'react';
import './Employers-add-form.css';

class EmployersForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            salary: ''
        }
    }

    // preventDefault, send data to props addEmployee, reset values
    addEmploye = (e) => {
        e.preventDefault();

        // Validation empty
        if (this.state.name.length !== 0 && this.state.salary.length !== 0) {
            this.props.addEmployee(this.state);
            this.resetValue();
        }

    }

    // get state values
    getValue = (e) => {
        this.setState(({ [e.target.name]: e.target.value.trim() }))
    }

    // Reset value inputs
    resetValue = () => {
        this.setState(({
            name: '',
            salary: ''
        }))
    }

    render() {
        return (
            <div className="app-add-form">
                <h3>Добавьте нового сотрудника</h3>
                <form
                    className="add-form d-flex"
                    onSubmit={this.addEmploye}>
                    <input
                        type="text"
                        className="form-control new-post-label"
                        placeholder="Как его зовут?"
                        name='name'
                        value={this.state.name}
                        onChange={this.getValue} />
                    <input
                        type="number"
                        className="form-control new-post-label"
                        placeholder="З/П в $?"
                        name='salary'
                        value={this.state.salary}
                        onChange={this.getValue} />

                    <button
                        type="submit"
                        className="btn btn-outline-light">Добавить
                    </button>
                </form>
            </div>
        );
    }
};

export default EmployersForm;