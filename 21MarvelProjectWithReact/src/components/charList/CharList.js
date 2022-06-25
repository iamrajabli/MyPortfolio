import React from 'react';
import Marvel from '../../services/Marvel';
import Error from '../error/Error';
import Loading from '../loading/Loading';
import './charList.scss';

export default class CharList extends React.Component {
    state = {
        data: '',
        loading: true,
        error: false,
        offset: 210
    }

    marvel = new Marvel();

    componentDidMount() {
        this.getDataFromApi(210);
    }

    getDataFromApi = (offset) => {
        if (offset === 210) {
            this.showLoadingInfo();
        }
        this.marvel.getAllCharacters(offset)
            .then(this.getDataForState)
            .catch(this.showErrorInfo)
    }

    getDataForState = (newData) => {
        this.setState(({ data, offset }) => ({
            data: [...data, ...newData],
            loading: false,
            error: false,
            offset: offset + 9
        }));
    }

    showLoadingInfo = () => {
        this.setState(({
            loading: true,
            error: false
        }));
    }

    showErrorInfo = () => {
        this.setState(({
            error: true,
            loading: false
        }));
    }

    renderAllData = (data) => {
        return data.map(item => {
            return (
                <li
                    onClick={() => this.props.currentId(item.id)}
                    key={item.id}
                    className="char__item">
                    <img src={item.thumbnail} alt="abyss" />
                    <div className="char__name">{item.name}</div>
                </li>
            )
        })
    }
    render() {
        const { data, loading, error, offset } = this.state;


        const loadingArea = loading ? <Loading /> : null;
        const errorArea = error ? <Error /> : null;
        const content = !(error || loading) ? this.renderAllData(data) : null;

        return (
            <div
                className="char__list">
                <ul className="char__grid">
                    {loadingArea}
                    {errorArea}
                    {content}
                </ul>
                <button
                    className="button button__main button__long"
                    onClick={() => this.getDataFromApi(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
};