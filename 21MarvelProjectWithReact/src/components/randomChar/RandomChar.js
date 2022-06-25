import React from 'react';
import Marvel from '../../services/Marvel';
import Error from '../error/Error';
import Loading from '../loading/Loading';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';


export default class RandomChar extends React.Component {

    state = {
        data: '',
        loading: true,
        error: false
    }

    marvel = new Marvel();

    componentDidMount() {
        this.getDataFromApi();
    }

    getDataFromApi = () => {
        const randID = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.showLoadingInfo();
        this.marvel.getCharacter(randID)
            .then(this.getDataForState)
            .catch(this.showErrorInfo)
    }

    getDataForState = (data) => {
        this.setState(({
            data,
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

        const { data, loading, error } = this.state;

        const loadingArea = loading ? <Loading /> : null;
        const errorArea = error ? <Error /> : null;
        const content = !(error || loading) ? <View data={data} /> : null;


        return (
            <div className="randomchar">
                <div className="randomchar__block">
                    {loadingArea}
                    {errorArea}
                    {content}
                </div>


                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br />
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button 
                    className="button button__main"
                    onClick={() => this.getDataFromApi()}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
                </div>
            </div>


        )
    }
};

const View = (props) => {
    const { name, description, thumbnail } = props.data

    return (
        <>
            <img src={thumbnail} alt="Random character" className="randomchar__img" />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href="#" className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href="#" className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </>
    )
}