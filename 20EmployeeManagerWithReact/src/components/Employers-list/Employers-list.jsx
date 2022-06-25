import './Employers-list.css';
import EmployersListItem from "../Employers-list-item/Employers-list-item";

export default function EmployersList(props) {
    const allData = props.data.map(data => {
        const id = data.id;
        return (
            <EmployersListItem
                data={data}
                key={id}
                onDelete={props.onDelete}
                onIncrease={props.onIncrease}
                onLike={props.onLike} />
        )
    })

    return (
        <ul className="app-list list-group">
            {allData}
        </ul>
    );
};

