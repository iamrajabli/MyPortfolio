import React from 'react';
import Marvel from '../../services/Marvel';
import Error from '../error/Error';
import Loading from '../loading/Loading';
import Skeleton from '../skeleton/Skeleton';
import './charInfo.scss';
import thor from '../../resources/img/thor.jpeg';


export default class CharInfo extends React.Component {

    state = {
        data: '',
        loading: false,
        error: false,
        currentId: null
    }

    marvel = new Marvel();

    componentDidMount() {
        this.getDataFromApi();
    }

    componentDidUpdate(prevProps) {
        if (this.props.currentId !== prevProps.currentId) {
            this.getDataFromApi(this.props.currentId)
        }
    }

    getDataFromApi = (currentId) => {

        if (!currentId) {
            return;
        }

        this.showLoadingInfo();
        this.marvel.getCharacter(currentId)
            .then(this.getDataForState)
            .catch(this.showErrorInfo)
    }

    getDataForState = (data) => {
        this.setState(({
            data,
            currentId: data.id,
            loading: false,
            error: false
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

    render() {

        const { data, loading, error, currentId } = this.state;
        const loadingArea = loading ? <Loading /> : null;
        const skeleton = !(currentId) ? <Skeleton /> : null;
        const errorArea = error ? <Error /> : null;
        const content = !(error || loading || !currentId) ? <View data={data} /> : null;

        return (
            <div className="char__info">
                {skeleton}
                {loadingArea}
                {errorArea}
                {content}
            </div>
        )
    }
};


const View = (props) => {
    const { name, description, thumbnail } = props.data;
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt="abyss" />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href="#" className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href="#" className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                <li className="char__comics-item">
                    All-Winners Squad: Band of Heroes (2011) #3
                </li>
                <li className="char__comics-item">
                    Alpha Flight (1983) #50
                </li>
                <li className="char__comics-item">
                    Amazing Spider-Man (1999) #503
                </li>
                <li className="char__comics-item">
                    Amazing Spider-Man (1999) #504
                </li>
                <li className="char__comics-item">
                    AMAZING SPIDER-MAN VOL. 7: BOOK OF EZEKIEL TPB (Trade Paperback)
                </li>
                <li className="char__comics-item">
                    Amazing-Spider-Man: Worldwide Vol. 8 (Trade Paperback)
                </li>
                <li className="char__comics-item">
                    Asgardians Of The Galaxy Vol. 2: War Of The Realms (Trade Paperback)
                </li>
                <li className="char__comics-item">
                    Vengeance (2011) #4
                </li>
                <li className="char__comics-item">
                    Avengers (1963) #1
                </li>
                <li className="char__comics-item">
                    Avengers (1996) #1
                </li>
            </ul>
        </>
    )
}