import React from 'react';
import './Employers-list-item.css';

export default function EmployersListItem(props) {

    // dist props.data
    const { id, name, salary, increase, like } = props.data;

    // validation increase
    let classList = "list-group-item d-flex justify-content-between";
    if (increase) {
        classList += " increase";
    }

    // validation like
    if (like) {
        classList += " like";
    }

    return (
        <li className={classList}>
            <span
                className="list-group-item-label"
                onClick={() => props.onLike(id)}> {name} </span>
            <input type="text" className="list-group-item-input" defaultValue={`${salary}$`} />
            <div className='d-flex justify-content-center align-items-center'>
                <button
                    type="button"
                    className="btn-cookie btn-sm"
                    onClick={() => props.onIncrease(id)}>
                    <i className="fas fa-cookie"></i>
                </button>

                <button
                    type="button"
                    className="btn-trash btn-sm"
                    onClick={() => props.onDelete(id)}>
                    <i className="fas fa-trash"></i>
                </button>
                <i className="fas fa-star"></i>
            </div>
        </li >
    );
};