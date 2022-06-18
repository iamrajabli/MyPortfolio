import React from 'react';
import AppInfo from '../App-info/App-info';
import SearchPanel from '../Search-panel/Search-panel';
import AppFilter from '../App-filter/App-filter';
import EmployersList from '../Employers-list/Employers-list';
import EmployersForm from '../Employers-add-form/Employers-add-form';
import './App.css';


export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [
                { id: 1, name: 'Roman D.', salary: 800, increase: true, like: false },
                { id: 2, name: 'Alex R.', salary: 3000, increase: false, like: false },
                { id: 3, name: 'Carl M.', salary: 5000, increase: false, like: true },
            ],
            searchValue: '',
            filterValue: 'All'
        }
    }

    // Delete employee
    onDelete = (id) => {
        this.setState(({ data }) => ({
            data: data.filter(item => item.id !== id)
        }))
    };

    // Increase employee
    onIncrease = (id) => {
        this.setState(({ data }) => ({
            data: data.map(item => {
                if (item.id === id) return { ...item, increase: !item.increase }
                return item;
            })
        }));
    };

    // Like employee
    onLike = (id) => {
        this.setState(({ data }) => ({
            data: data.map(item => {
                if (item.id === id) return { ...item, like: !item.like }
                return item;
            })
        }))
    };

    // Add employee
    addEmployee = (obj) => {
        const newData = {
            id: this.idGenerator(),
            ...obj,
            increase: false,
            like: false,
        }

        this.setState(({ data }) => ({
            data: [...data, newData]
        }))
    }

    // ID Generator
    idGenerator = () => {
        return new Date().getTime().toString().slice(9, 14);
    }

    // Set Search Value
    setSearchValue = (searchValue) => {
        this.setState(({ searchValue }));
    }

    // Search employee
    searchEmployee = (searchValue, items) => {

        if (searchValue.length === 0) {
            return items;
        }

        return items.filter(item => item.name.indexOf(searchValue) > -1);

    }

    // Set Filter Value
    setFilterValue = (filterValue) => {
        this.setState(({ filterValue }));
    }

    // Filter employee
    filterEmployee = (filter, data) => {
        switch (filter) {
            case 'All':
                return data;
            case 'More1000':
                return data.filter(item => item.salary > 1000);
            case 'Like':
                return data.filter(item => item.like);
        }
    }


    render() {

        // disc state
        const { data, searchValue, filterValue } = this.state;

        // App info
        const info = {
            employee: data.length,
            increased: data.filter(item => item.increase).length
        }

        // Filtered data
        const filtered = this.filterEmployee(filterValue, this.searchEmployee(searchValue, data))

        return (
            <div className="app">
                <AppInfo info={info} />
                <div className="search-panel">
                    <SearchPanel setSearchValue={this.setSearchValue} />
                    <AppFilter 
                    setFilterValue={this.setFilterValue}
                    filterValue={filterValue}/>
                </div>

                <EmployersList
                    data={filtered}
                    onDelete={this.onDelete}
                    onIncrease={this.onIncrease}
                    onLike={this.onLike} />
                <EmployersForm
                    addEmployee={this.addEmployee} />
            </div>
        );
    }
}