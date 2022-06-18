import React from 'react';
import './Search-panel.css';


class SearchPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchValue: ''
        }
    }

    getValue = (e) => {
        const searchValue = e.target.value;
        this.setState(({ searchValue }));
        this.props.setSearchValue(searchValue);

    }


    render() {
        return (
            <input
                type="text"
                className="form-control search-input"
                placeholder="Найти сотрудника"
                value={this.state.searchValue}
                onChange={this.getValue} />
        );
    }
}


export default SearchPanel;