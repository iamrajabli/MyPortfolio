import './App-info.css';


export default function AppInfo(props) {
    return (
        <div className="app-info">
            <h1>Учёт сотрудников в компании N</h1>
            <h2>Общее число сотрудников: {props.info.employee}</h2>
            <h2>Премию получат: {props.info.increased}</h2>
        </div>

    );
}
