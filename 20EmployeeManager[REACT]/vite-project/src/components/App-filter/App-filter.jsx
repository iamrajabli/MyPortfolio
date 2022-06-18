import './App-filter.css';


export default function AppFilter(props) {

    // Validation class
    const defClass = (filterValue) => {
        if (filterValue === props.filterValue) {
            return "btn btn-light";
        }
        return "btn btn-outline-light"
    }


    return (
        <div className="btn-group">

            <button
                className={defClass('All')}
                onClick={() => props.setFilterValue('All')}>
                Все сотрудники
            </button>

            <button
                className={defClass('Like')}
                onClick={() => props.setFilterValue('Like')}>
                На повышение
            </button>

            <button
                className={defClass('More1000')}
                onClick={() => props.setFilterValue('More1000')}>
                З/П больше 1000$
            </button>
        </div>
    );
}